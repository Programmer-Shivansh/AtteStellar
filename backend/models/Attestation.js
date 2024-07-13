// const { default: mongoose } = require("mongoose");

// models/Transaction.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionSchema = new mongoose.Schema({
    schemaUID: String,
    attest: Array,
    id: String,
    paging_token: String,
    successful: Boolean,
    hash: String,
    ledger: Number,
    created_at: Date,
    source_account: String,
    fee_charged: Number,
    max_fee: Number,
    operation_count: Number,
    envelope_xdr: String,
    result_xdr: String,
    result_meta_xdr: String,
    fee_meta_xdr: String,
    memo_type: String,
    memo: String,
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;