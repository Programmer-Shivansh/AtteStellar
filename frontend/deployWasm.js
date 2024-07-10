// deployWasm.js
import { Connection, Keypair, Networks, Server } from 'stellar-sdk'; 
import { SorobanClient } from 'soroban-sdk'; // Replace with actual Soroban library import
import fs from 'fs';
import path from 'path';

// Initialize Stellar network
const server = new Server('https://horizon-testnet.stellar.org'); // Use the appropriate network
const networkPassphrase = Networks.TESTNET; // Replace with 'Public' for mainnet

// Read the WASM contract
const contractWASM = fs.readFileSync(path.resolve(__dirname, './contract.wasm')); // Replace with your WASM file path

const deployWasmContract = async () => {
    try {
        // Load or create Stellar keypair
        const keypair = Keypair.fromSecret(process.env.STELLAR_SECRET); // Use environment variable for secret

        // Initialize Soroban client
        const sorobanClient = new SorobanClient(server, networkPassphrase);
        
        // Deploy contract
        const tx = await sorobanClient.createContract({
            wasm: contractWASM,
            account: keypair.publicKey(),
            // Additional options as needed
        });

        // Submit the transaction
        const result = await tx.submit();
        
        // Check transaction status
        const response = await server.transactions().transaction(result.transactionHash).call();
        if (response.success) {
            return result.contractAddress; // Adjust according to actual return value
        } else {
            throw new Error(`Failed to deploy contract: ${response.errorMessage}`);
        }
    } catch (error) {
        throw new Error("Failed to deploy WASM contract: " + error.message);
    }
};

export { deployWasmContract };
