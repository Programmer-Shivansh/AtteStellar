import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for individual field items
const fieldSchema = new Schema(
  {
    field: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { _id: false }
); // Disable automatic _id generation for subdocuments

// Define the main schema that contains an array of fieldSchema
const userSchema = new Schema({
  fields: {
    type: [fieldSchema],
    required: true,
  },
  schemaUID: {
    type: String,
    required: true, // Add required if IPFS hash is mandatory
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
