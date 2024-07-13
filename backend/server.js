import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/Schemas.js"; // Ensure this path is correct
import cors from "cors";
import { uploadJSONToPinata } from "./pinataService.js"; // Import the IPFS upload function
import Transaction from "./models/Attestation.js";
// import { viewIPFSData } from "../frontend/src/call_schemaUID.js"; // Import the IPFS retrieval function
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(
  cors({
    origin: "https://atte-stellar-hv1fgowyh-programmer-shivanshs-projects.vercel.app/", // Allow only this origin
  })
);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.get("/data", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/schema", async (req, res) => {
    try {
      const data = await User.find(); // Fetch all documents from the User collection
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/data/:id', async (req, res) => {
    try {
        // console.log("first")
        // console.log(req.params.id)
      const schema = await User.findById(req.params.id);
      // console.log(schema)
      if (!schema) {
        return res.status(404).send('Schema not found');
      }
      res.json(schema);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });


app.post("/data/new", async (req, res) => {
  // console.log("Received data:", req.body); // Debugging log

  const { fields } = req.body;

  if (!fields || !Array.isArray(fields)) {
    return res.status(400).json({ error: "Fields array is required" });
  }

  try {
    // Upload fields data to IPFS
    const fieldsData = JSON.stringify(fields);
    const jsonFields = JSON.parse(fieldsData);
    // console.log("Fields data:", jsonFields); // Debugging log
    const fieldsHash = await uploadJSONToPinata(jsonFields);
    const schemaUID = fieldsHash.IpfsHash;

    // Save IPFS hash and other data to MongoDB
    const newUser = new User({ fields, schemaUID });
    const data = await newUser.save();

    // console.log("Saved data:", data); // Debugging log
    // const retrievalData = await viewIPFSData(schemaUID);
    // console.log("retrieved data:", data); // Debugging log
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/data/transactions", async (req, res) => {
  // console.log("Received data:", req.body); // Debugging log

  const { txnResult, schemaUID, attest } = req.body;

  if (!txnResult) {
      return res.status(400).json({ error: "Transaction result is required" });
  }

  try {
      // Create a new transaction object
      const transaction = new Transaction({
        schemaUID,
        attest,
          ...txnResult,
      });

      // Save transaction data to MongoDB
      const savedTransaction = await transaction.save();

      // console.log("Saved transaction:", savedTransaction); // Debugging log
      res.status(201).json(savedTransaction);
  } catch (error) {
      console.error("Failed to save transaction:", error); // Debugging log
      res.status(500).json({ error: 'Failed to save transaction' });
  }
});

app.get('/attestations/:id', async (req, res) => {
  const { id } = req.params; // Extract the id from the URL parameters
  // console.log(id)
  try {
      // Query the User model to find documents where schemaUID matches the id
      const data = await Transaction.find({ schemaUID: id });
      // console.log(data)
      if (data.length === 0) {
          return res.status(404).json({ error: 'No data found for the given schemaUID' });
      }

      res.json(data); // Respond with the data found
  } catch (error) {
      console.error('Error fetching data:', error); // Debugging log
      res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.delete("/data/delete/:id", async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
