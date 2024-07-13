// import { Keypair, Network, TransactionBuilder, Server } from '@stellar/stellar-sdk';
// import { SorobanServer } from '@stellar/soroban-sdk';
import * as StellarSdk from '@stellar/stellar-sdk';
import fs from 'fs';

// Replace the following parameters according to your situation
const secret = 'SAAPYAPTTRZMCUZFPG3G66V4ZMHTK4TWA6NS7U4F7Z3IMUD52EK4DDEV';
const rpcServerUrl = 'https://soroban-testnet.stellar.org';
const networkPassphrase = StellarSdk.Networks.TESTNET_NETWORK_PASSPHRASE;
const contractFilePath = '/Users/shivanshchauhan/Desktop/Work/RUST/try/soroban-hello-world/target/wasm32-unknown-unknown/release/hello_world.wasm';
// StellarSdk.Soroban.SorobanServer
const kp = StellarSdk.Keypair.fromSecret(secret);
const sorobanServer = new StellarSdk.Soroban.SorobanServer(rpcServerUrl);

console.log('Installing contract...');

// Load the source account
(async () => {
  try {
    const source = await sorobanServer.loadAccount(kp.publicKey());

    // Read the contract binary data
    const contractBinary = fs.readFileSync(contractFilePath);

    // Create and build the transaction
    const tx = new StellarSdk.TransactionBuilder(source, { networkPassphrase })
      .setTimeout(300)
      .addOperation({
        type: 'install_contract_code',
        contract: contractBinary,
        source: kp.publicKey()
      })
      .build();

    console.log('Transaction built successfully.');
    // Further code to submit the transaction and handle response
  } catch (error) {
    console.error('Error:', error);
  }
})();



// // deployWasm.js
// import {  Keypair, Networks, Server,SorobanClient } from '@stellar/stellar-sdk';
// import fs from 'fs';
// import path from 'path';
// // import SorobanClient from 'soroban-client'; // Make sure this is the correct import for Soroban

// // Initialize Stellar network
// const server = new Server('https://horizon-testnet.stellar.org'); // Use the appropriate network
// const networkPassphrase = Networks.TESTNET; // Replace with Networks.PUBLIC for mainnet

// // Read the WASM contract
// const contractWASMPath = path.resolve('/Users/shivanshchauhan/Desktop/Work/RUST/try/soroban-hello-world/target/wasm32-unknown-unknown/release/hello_world.wasm'); // Replace with your WASM file path
// const contractWASM = fs.readFileSync(contractWASMPath);

// const deployWasmContract = async () => {
//     try {
//         // Load or create Stellar keypair
//         const secret = process.env.STELLAR_SECRET;
//         if (!secret) {
//             throw new Error("STELLAR_SECRET environment variable is not set");
//         }
//         const keypair = Keypair.fromSecret(secret);

//         // Initialize Soroban client
//         const sorobanClient = new SorobanClient(server, networkPassphrase);
        
//         // Deploy contract
//         const tx = await sorobanClient.createContract({
//             wasm: contractWASM,
//             publicKey: keypair.publicKey(),
//             // Additional options as needed
//         });

//         // Submit the transaction
//         const result = await tx.submit();
        
//         // Check transaction status
//         const response = await server.transactions().transaction(result.transactionHash).call();
//         if (response.success) {
//             return result.contractAddress; // Adjust according to actual return value
//         } else {
//             throw new Error(`Failed to deploy contract: ${response.errorMessage}`);
//         }
//     } catch (error) {
//         console.error("Failed to deploy WASM contract:", error.message);
//         throw error; // Re-throw the error after logging
//     }
// };

// export { deployWasmContract };
