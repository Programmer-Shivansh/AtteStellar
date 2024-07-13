// connectWallet.js
import {
    StellarWalletsKit,
    WalletNetwork,
    XBULL_ID,
    xBullModule,
    FreighterModule,
    AlbedoModule,
  } from "@creit.tech/stellar-wallets-kit";
  import * as StellarSdk from "@stellar/stellar-sdk";
  import axios from 'axios';

  const sendTransactionResultToBackend = async (txnResult, schemaUID, attest) => {
    try {
        console.log(schemaUID)
        const response = await axios.post('http://localhost:5003/data/transactions', {
            txnResult,
            schemaUID,
            attest,
        });
        console.log('Transaction result sent to backend:', response.data);
    } catch (error) {
        console.error('Error sending transaction result to backend:', error);
    }
};

  const kit = new StellarWalletsKit({
    selectedWalletId: XBULL_ID,
    network: WalletNetwork.TESTNET,
    modules: [new xBullModule(), new FreighterModule(), new AlbedoModule()],
  });
  
  export  const handleWalletSelection = async (option,schemaUID,attest) => {
    if (!option.isAvailable) {
      // TODO: Show error
      return;
    }
  
    kit.setWallet(option.id);
  
    const publicKey = await kit.getPublicKey();
  
    try {
      const server = new StellarSdk.Horizon.Server(
        "https://horizon-testnet.stellar.org"
      );
  
      // TODO: Check if account activated
      const account = await server.loadAccount(publicKey);
  
      // TODO: Put server wallet address in env
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination:
              "GAKK3J2FUPRA7JM3GVZWG7VUZGQ5FERXWXVNWHSZ2OIT57J3IR2B4WH2",
            asset: StellarSdk.Asset.native(),
            amount: "0.5",
          })
        )
        .addMemo(StellarSdk.Memo.text("Deposite"))
        .setTimeout(60)
        .build();
  
      const { result: signedTxnXdr } = await kit.signTx({
        xdr: transaction.toXDR(),
        publicKeys: [publicKey],
        network: WalletNetwork.TESTNET,
      });
  
      const signedTxn = new StellarSdk.Transaction(
        signedTxnXdr,
        StellarSdk.Networks.TESTNET
      );
  
      const txnResult = await server.submitTransaction(signedTxn, {
        skipMemoRequiredCheck: true,
      });
  
      // TODO: Pass txHash to the backend and verify data on-chain
      await sendTransactionResultToBackend(txnResult, schemaUID, attest);

      return txnResult.successful;
    } catch (error) {
      console.error(`Error depositing funds - ${error?.message}`);
  
      return false;
    }
  };
  
  export const openModal = async (schemaUID,attested) => {
    await kit.openModal({
      onWalletSelected: async (option) => {
        await handleWalletSelection(option,schemaUID,attested);
        // await sendTransactionResultToBackend(result);
        // return selectionResult;
      },
    });
    // return result;
  };
  
  
// async function payment(amt) {
//     // console.log("first")
//     const key = await retrievePublicKey();
//     var server = new StellarSdk.Horizon.Server(
//       "https://horizon-testnet.stellar.org"
//     );
//     var sourceKeys = StellarSdk.Keypair.fromSecret(
//       "SDXDMZXOD7Q3TGWVKOACARGXCV2NKB5FNBOGWBYE67BFYAJTIAKCTTRE"
//     );

//     var destinationId = key;
//     var transaction;
//     // console.log("sec")
//     server
//       .loadAccount(destinationId)
//       .catch(function (error) {
//         if (error instanceof StellarSdk.NotFoundError) {
//           throw new Error("The destination account does not exist!");
//         } else {
//           throw error;
//         }
//       })
//       .then(function () {
//         return server.loadAccount(sourceKeys.publicKey());
//       })
//       .then(function (sourceAccount) {
//         // Start building the transaction.
//         transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
//           fee: StellarSdk.BASE_FEE,
//           networkPassphrase: StellarSdk.Networks.TESTNET,
//         })
//           .addOperation(
//             StellarSdk.Operation.payment({
//               destination: destinationId,
//               asset: StellarSdk.Asset.native(),
//               amount: amt,
//             })
//           )
//           .addMemo(StellarSdk.Memo.text("Test Transaction"))
//           .setTimeout(180)
//           .build();
//         transaction.sign(sourceKeys);
//         return server.submitTransaction(transaction);
//       })
//       .then(function (result) {
//         console.log("Success! Results:", result);
//       })
//       .catch(function (error) {
//         console.error("Something went wrong!", error);
//       });
// }
// export default async function ConnectBlockchain(org_schema,attested_schema) {
    
// }
// import {nativeToScVal} from "@stellar/stellar-sdk"
// import {  checkConnection,retrievePublicKey} from "./freighter";
// import * as StellarSdk from "stellar-sdk";
// import {callGetMyBatchProcessing} from './Transaction'
// function generateUUID() {
//     return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
//       (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//     );
// }

// const boolToScVal = (value) => {
//   return nativeToScVal(value, { type: "bool" });
// };
// const shortSymbolToScVal = (value) => {
// //   if (value.length !== 9) {
// //     throw new Error("Symbol must be exactly 9 characters long");
// //   }
//   return nativeToScVal(value, { type: "symbol_short" });
// };
// const symbolToScVal = (value) => {
//   if (value.length !== 32) {
//     throw new Error("Symbol must be exactly 32 characters long");
//   }
//   return nativeToScVal(value, { type: "symbol" });
// };
// const int32ToScVal = (value) => {
//   return nativeToScVal(value, { type: "i32" });
// };
// const uint32ToScVal = (value) => {
//   return nativeToScVal(value, { type: "u32" });
// };
// const int64ToScVal = (value) => {
//   return nativeToScVal(value, { type: "i64" });
// };
// const uint64ToScVal = (value) => {
//   return nativeToScVal(value, { type: "u64" });
// };
// const int128ToScVal = (value) => {
//   return nativeToScVal(value, { type: "i128" });
// };
// const uint128ToScVal = (value) => {
//   return nativeToScVal(value, { type: "u128" });
// };
    
  


    // const output = {};

    // // Initialize arrays for each type
    // const types = [
    // "Bool",
    // // "symbol_short (9 char)",
    // "Symbol (32 char)",
    // "32-bit Integers (signed)",
    // "32-bit Integers (unsigned)",
    // "64-bit Integers (signed)",
    // "64-bit Integers (unsigned)",
    // "128-bit Integers (signed)",
    // "128-bit Integers (unsigned)"
    // ];

    // types.forEach(type => {
    // output[type] = [];
    // });

    // // Iterate over the second input array
    // org_schema.forEach(item => {
    // const { field, type } = item;
    // if (output[type] !== undefined && attested_schema[field] !== undefined) {
    //     output[type].push(attested_schema[field]);
    // }
    // });

    // // Extract arrays by type name
    // const bool = output['Bool'] || [];
    // // const symbol_short = output['symbol_short (9 char)'] || [];
    // const symbol_32_char = output['Symbol (32 char)'] || [];
    // const int32_signed = output['32-bit Integers (signed)'] || [];
    // const uint32_unsigned = output['32-bit Integers (unsigned)'] || [];
    // // const int64_signed = output['64-bit Integers (signed)'] || [];
    // // const uint64_unsigned = output['64-bit Integers (unsigned)'] || [];
    // // const int128_signed = output['128-bit Integers (signed)'] || [];
    // // const uint128_unsigned = output['128-bit Integers (unsigned)'] || [];
    // let res_bool = bool;
    // let key_bool = [];
    // for (let i = 0; i < bool.length; i++) {
    //     // res_bool.push(boolToScVal(bool[i]));
    //     key_bool.push(generateUUID());
    // }
    // // let res_symbol_short = [];
    // // let key_symbol_short = [];
    // // for (let i = 0; i < symbol_short.length; i++) {
    // //     res_symbol_short.push(shortSymbolToScVal(symbol_short[i]));
    // //     key_symbol_short.push(generateUUID());
    // // }
    // let res_symbol_32_char = [];
    // let key_symbol_32_char = [];
    // for (let i = 0; i < symbol_32_char.length; i++) {
    //     res_symbol_32_char.push(symbolToScVal(symbol_32_char[i]));
    //     key_symbol_32_char.push(generateUUID());
    // }
    // let res_int32_signed = int32_signed;
    // let key_int32_signed = [];
    // for (let i = 0; i < int32_signed.length; i++) {
    //     // res_int32_signed.push(int32ToScVal(int32_signed[i]));
    //     key_int32_signed.push(generateUUID());
    // }
    // let res_uint32_unsigned = uint32_unsigned;
    // let key_uint32_unsigned = [];
    // for (let i = 0; i < uint32_unsigned.length; i++) {
    //     // res_uint32_unsigned.push(uint32ToScVal(uint32_unsigned[i]));
    //     key_uint32_unsigned.push(generateUUID());
    // }

    // if(checkConnection()){
    //     const pubKey = await retrievePublicKey();
    //     console.log(pubKey)
    //     try{
    //         await callGetMyBatchProcessing(pubKey,key_bool,key_symbol_32_char,key_int32_signed,key_uint32_unsigned,res_bool,res_symbol_32_char,res_int32_signed,res_uint32_unsigned)
    //         console.log( "success")
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    // }


// }
    // const scValKey1 = StellarSdk.xdr.ScVal.scvVec(key_bool.map(k => StellarSdk.xdr.ScVal.scvSymbol(k)));
    // const scValKey2 = StellarSdk.xdr.ScVal.scvVec(key_symbol_32_char.map(k => StellarSdk.xdr.ScVal.scvSymbol(k)));
    // const scValKey3 = StellarSdk.xdr.ScVal.scvVec(key_int32_signed.map(k => StellarSdk.xdr.ScVal.scvSymbol(k)));
    // const scValKey4 = StellarSdk.xdr.ScVal.scvVec(key_uint32_unsigned.map(k => StellarSdk.xdr.ScVal.scvSymbol(k)));

    // const scValValue1 = StellarSdk.xdr.ScVal.scvVec(res_bool.map(v => v ? StellarSdk.xdr.ScVal.scvTrue() : StellarSdk.xdr.ScVal.scvFalse()));
    // const scValValue2 = StellarSdk.xdr.ScVal.scvVec(res_symbol_32_char.map(v => StellarSdk.xdr.ScVal.scvSymbol(v)));
    // const scValValue3 = StellarSdk.xdr.ScVal.scvVec(res_int32_signed.map(v => StellarSdk.xdr.ScVal.scvI32(v)));
    // const scValValue4 = StellarSdk.xdr.ScVal.scvVec(res_uint32_unsigned.map(v => StellarSdk.xdr.ScVal.scvU32(v)));
    // // let res_int64_signed = int64_signed;
    // let key_int64_signed = [];
    // for (let i = 0; i < int64_signed.length; i++) {
    //     // res_int64_signed.push(int64ToScVal(int64_signed[i]));
    //     key_int64_signed.push(generateUUID());
    // }
    // let res_uint64_unsigned = uint64_unsigned;
    // let key_uint64_unsigned = [];
    // for (let i = 0; i < uint64_unsigned.length; i++) {
    //     // res_uint64_unsigned.push(uint64ToScVal(uint64_unsigned[i]));
    //     key_uint64_unsigned.push(generateUUID());
    // }
    // let res_int128_signed =int128_signed;
    // let key_int128_signed = [];
    // for (let i = 0; i < int128_signed.length; i++) {
    //     // res_int128_signed.push(int128ToScVal(int128_signed[i]));
    //     key_int128_signed.push(generateUUID());
    // }
    // let res_uint128_unsigned = uint128_unsigned;
    // let key_uint128_unsigned = [];
    // for (let i = 0; i < uint128_unsigned.length; i++) {
    //     // res_uint128_unsigned.push(uint128ToScVal(uint128_unsigned[i]));
    //     key_uint128_unsigned.push(generateUUID());
    // }

    // console.log(res_bool);
    // console.log(key_bool);
    // console.log(res_symbol_short);
    // console.log(key_symbol_short);
    // console.log(res_symbol_32_char);
    // console.log(key_symbol_32_char);
    // console.log(res_int32_signed);
    // console.log(key_int32_signed);

    // const finalArray= []
    // finalArray.push(scValKey1)
    // finalArray.push(scValKey2)
    // finalArray.push(scValKey3)
    // finalArray.push(scValKey4)
    // finalArray.push(scValValue1)
    // finalArray.push(scValValue2)
    // finalArray.push(scValValue3)
    // finalArray.push(scValValue4)

    // const finalscVal = StellarSdk.xdr.ScVal.scvVec(finalArray)
    // if(await checkConnection()){

    //     const pubKey = await retrievePublicKey();
    //     console.log(pubKey)
    //     try{
    //         const result =  await set_batch_processing(pubKey,finalscVal)
    //         console.log( result)
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    // }
    
