import {
  Keypair,
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
} from "@stellar/stellar-sdk";
// import { checkConnection, retrievePublicKey} from './freighter'
// Assuming you have the necessary setup (public key, contract address, etc.)
// if(checkConnection()){
//     const key = await retrievePublicKey();
//     const sourcePublicKey = key;
// }
const contractAddress =
  "CBJ6KBFQYDCIJDZ3FI3XF2T2X53ZL4E3IPXGQTIFARZ6U4GU3AJFRAML";

export async function callGetMyBatchProcessing(
  sourcePublicKey,
  param1,
  param2,
  param3,
  param4,
  param5,
  param6,
  param7,
  param8
) {
  try {
    // Create a Soroban RPC server instance
    console.log("first line");
    const server = new SorobanRpc.Server(
      "https://soroban-testnet.stellar.org",
      { allowHttp: true }
    );
    console.log("second line");
    // Get the source account detailsg

    console.log(sourcePublicKey);
    const sourceAccount = await server.getAccount(sourcePublicKey);
    console.log("2.5 line");
    console.log("sourceAccount", sourceAccount);
    // Build the transaction
    const tx = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Contract.call(contractAddress, "set_my_batch_processing", [
          nativeToScVal(param1),
          nativeToScVal(param2),
          nativeToScVal(param3),
          nativeToScVal(param4),
          nativeToScVal(param5),
          nativeToScVal(param6),
          nativeToScVal(param7),
          nativeToScVal(param8),
        ])
      )
      // .setTimeout(0)
      .build();
    console.log("third line");
    // Sign the transaction
    const sourceKeypair = Keypair.fromPublicKey(sourcePublicKey);
    tx.sign(sourceKeypair);
    console.log("fourth line");
    // Submit the transaction
    const submitResponse = await server.submitTransaction(tx);
    console.log("Submitted transaction:", submitResponse);

    // Wait for the transaction to be confirmed
    const transactionStatus = await waitForTransactionConfirmation(
      server,
      submitResponse.id
    );
    console.log("Transaction status:", transactionStatus);

    // Process the transaction result
    if (transactionStatus.status === "SUCCESS") {
      const returnValue = transactionStatus.resultMetaXdr
        .v3()
        .sorobanMeta()
        .returnValue()
        .value();
      console.log("Transaction result:", returnValue);
    } else {
      console.error("Transaction failed:", transactionStatus.resultXdr);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function waitForTransactionConfirmation(server, transactionId) {
  let transactionStatus;
  while (true) {
    try {
      transactionStatus = await server.getTransaction(transactionId);
      if (transactionStatus.status !== "NOT_FOUND") {
        break;
      }
    } catch (error) {
      console.error("Error fetching transaction status:", error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return transactionStatus;
}

// callGetMyBatchProcessing();
