interface AbiIO {
    indexed?: boolean;
    internalType: string;
    name: string;
    type: string;
}

interface Abi {
    input: AbiIO[];
    output: AbiIO[];
    name: string;
    stateMutability: string;
    type: string;
    anonymous?: boolean;
}

interface ContractData {
    contractName: string;
    byteCode: string;
    abi: Abi[];
}

export const compile = (contractCode: string): Promise<ContractData[]> => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(
            new URL("./solc.worker.ts", import.meta.url), { type: "module" }
        );
        worker.onmessage = function (e: any) {
            const output = e.data.output;
            const result = [];
            for (const contractName in output.contracts['contract']) {
                const contract = output.contracts['contract'][contractName];
                result.push({
                    contractName: contractName,
                    byteCode: contract.evm.bytecode.object,
                    abi: contract.abi
                } as ContractData);
            }
            resolve(result);
        };
        worker.onerror = reject;
        worker.postMessage({
            contractCode: contractCode,
        });
    });
};