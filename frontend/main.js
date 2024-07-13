import {
    Contract,
    SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    nativeToScVal,
    Address,
  } from "@stellar/stellar-sdk";
import { retrievePublicKey, checkConnection, userSignTransaction } from "../Freighter";
// import { userSignTransaction } from "../Freighter";

let rpcUrl = "https://soroban-testnet.stellar.org";

let contractAddress ="CCBBTP2FWKLNSEMOXM3VH32FPXVOYK6OBB4D26RPAYATZX5GYN36EHZ4";
const boolToScVal = (value) => {
  return nativeToScVal(value, { type: "bool" });
};
const shortSymbolToScVal = (value) => {
  if (value.length !== 9) {
    throw new Error("Symbol must be exactly 9 characters long");
  }
  return nativeToScVal(value, { type: "symbol_short" });
};
const symbolToScVal = (value) => {
  if (value.length !== 32) {
    throw new Error("Symbol must be exactly 32 characters long");
  }
  return nativeToScVal(value, { type: "symbol" });
};
const int32ToScVal = (value) => {
  return nativeToScVal(value, { type: "i32" });
};
const uint32ToScVal = (value) => {
  return nativeToScVal(value, { type: "u32" });
};
const int64ToScVal = (value) => {
  return nativeToScVal(value, { type: "i64" });
};
const uint64ToScVal = (value) => {
  return nativeToScVal(value, { type: "u64" });
};
const int128ToScVal = (value) => {
  return nativeToScVal(value, { type: "i128" });
};
const uint128ToScVal = (value) => {
  return nativeToScVal(value, { type: "u128" });
};
let params = {
  fee: BASE_FEE,
  networkPassphrase: Networks.TESTNET,
};

async function contractInt(caller, functName, values) {
  const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
  const sourceAccount = await provider.getAccount(caller);
  const contract = new Contract(contractAddress);
  let buildTx;

  if (values == null) {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName))
      .setTimeout(30)
      .build();
  } else if (Array.isArray(values)) {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName, ...values))
      .setTimeout(30)
      .build();
  } else {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName, values))
      .setTimeout(30)
      .build();
  }

  let _buildTx = await provider.prepareTransaction(buildTx);

  let prepareTx = _buildTx.toXDR(); // pre-encoding (converting it to XDR format)

  let signedTx = await userSignTransaction(prepareTx, "TESTNET", caller);

  let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);

  try {
    let sendTx = await provider.sendTransaction(tx).catch(function (err) {
      console.error("Catch-1", err);
      return err;
    });
    if (sendTx.errorResult) {
      throw new Error("Unable to submit transaction");
    }
    if (sendTx.status === "PENDING") {
      let txResponse = await provider.getTransaction(sendTx.hash);
      //   we will continously checking the transaction status until it gets successfull added to the blockchain ledger or it gets rejected
      while (txResponse.status === "NOT_FOUND") {
        txResponse = await provider.getTransaction(sendTx.hash);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (txResponse.status === "SUCCESS") {
        let result = txResponse.returnValue;
        return result;
      }
    }
  } catch (err) {
    console.log("Catch-2", err);
    return;
  }
}