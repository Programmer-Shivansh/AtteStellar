const { exec } = require('child_process');
const path = require('path');

// Function to deploy a Stellar contract and capture the output
function deployStellarContract(wasmPath, source, network) {
  return new Promise((resolve, reject) => {
    // Construct the command with the provided arguments
    const command = `stellar contract deploy --wasm ${wasmPath} --source ${source} --network ${network}`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

// Example usage
const wasmFilePath = path.resolve(__dirname, '/Users/shivanshchauhan/Desktop/Work/RUST/try/soroban-hello-world/target/wasm32-unknown-unknown/release/hello_world.wasm'); // Adjust the path as needed
const sourceAccount = 'alice';
const networkType = 'testnet';

// Call the function and handle the output
deployStellarContract(wasmFilePath, sourceAccount, networkType)
  .then(output => {
    console.log('Deployment Output:', output);
  })
  .catch(error => {
    console.error('Deployment Error:', error);
  });
