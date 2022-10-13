import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { compile } from '../src/sol/compiler';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [byteCode, setByteCode] = useState("");
  const [abi, setAbi] = useState("");

  const compileSourceCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.disabled = true;
    compile(sourceCode)
      .then(contractData => {
        const data = contractData[0];
        setByteCode(() => data.byteCode);
        setAbi(() => JSON.stringify(data.abi));
      })
      .catch(console.error)
      .finally(() => {
        button.disabled = false;
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Solidity Compiler</title>
        <meta name="description" content="Compile solidity code on frontend with Next.js and Solc-js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Frontend Solidity Compiler
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Source Code</h2>
            <textarea rows={20} cols={50} onChange={e => setSourceCode(e.target.value)} />
            <div className={styles.buttonWrapper}>
              <button onClick={compileSourceCode}>Compile</button>
            </div>
          </div>
          <div className={styles.card}>
            <h2>ABI</h2>
            <textarea readOnly rows={10} cols={60} value={abi} />
            <h2 className={styles.subtitle}>Compiled ByteCode</h2>
            <textarea readOnly rows={10} cols={60} value={byteCode} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
