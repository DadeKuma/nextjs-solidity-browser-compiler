importScripts('https://binaries.soliditylang.org/bin/soljson-latest.js');
import wrapper from 'solc/wrapper';

self.onmessage = (event) => {
    const contractCode = event.data.contractCode;
    const sourceCode = {
        language: 'Solidity',
        sources: {
            contract: { content: contractCode }
        },
        settings: {
            outputSelection: { '*': { '*': ['*'] } }
        }
    };
    const compiler = wrapper((self as any).Module);
    self.postMessage({
        output: JSON.parse(compiler.compile(JSON.stringify(sourceCode)))
    });
};