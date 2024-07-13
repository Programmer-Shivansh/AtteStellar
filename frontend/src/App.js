// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import CreateSchema from './CreateSchema';
import Schema from './Schema';
import './App.css'; // Optional: for additional styling
import SchemaDetail from './AttestSchema';
import AttestationsDetail from './AttestationsDetail';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Welcome to the App</div>} />
          <Route path="/create-schema" element={<CreateSchema />} />
          <Route path="/schema/:id" element={<SchemaDetail />} />
          <Route path="/attestations/:schemaUID" element={<AttestationsDetail />} />
          <Route path="/schema" element={<Schema />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import "./index.css"; // Import CSS file for styling

// const App = () => {
//   const [entries, setEntries] = useState([{ field: "", type: "" }]);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);

//   const typeOptions = [
//     "Bool",
//     "symbol_short (9 char)",
//     "Symbol (32 char)",
//     "32-bit Integers (signed)",
//     "32-bit Integers (unsigned)",
//     "64-bit Integers (signed)",
//     "64-bit Integers (unsigned)",
//     "128-bit Integers (signed)",
//     "128-bit Integers (unsigned)"
//   ];

//   const handleChange = (index, event) => {
//     const values = [...entries];
//     values[index][event.target.name] = event.target.value;
//     setEntries(values);
//   };

//   const handleAdd = () => {
//     setEntries([...entries, { field: "", type: "" }]);
//   };

//   const handleRemove = (index) => {
//     if (entries.length > 1) {
//       const values = [...entries];
//       values.splice(index, 1);
//       setEntries(values);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     // Debugging: Log the entries to check their content
//     console.log("Submitting Entries:", entries);

//     try {
//       // Send a single POST request with an array of field objects
//       const result = await axios.post("http://localhost:5003/data/new", {
//         fields: entries
//       });
//       setResponse(result.data);
//       setError(null);
//     } catch (err) {
//       setResponse(null);
//       setError(err.response ? err.response.data : "Error connecting to server");
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Submit Data</h1>
//       <form onSubmit={handleSubmit}>
//         {entries.map((entry, index) => (
//           <div key={index} className="form-group">
//             <label htmlFor={`field-${index}`}>Field:</label>
//             <input
//               type="text"
//               id={`field-${index}`}
//               name="field"
//               value={entry.field}
//               onChange={(e) => handleChange(index, e)}
//               required
//             />
//             <label htmlFor={`type-${index}`}>Type:</label>
//             <select
//               id={`type-${index}`}
//               name="type"
//               value={entry.type}
//               onChange={(e) => handleChange(index, e)}
//               required
//             >
//               <option value="" disabled>Select a type</option>
//               {typeOptions.map((option, idx) => (
//                 <option key={idx} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button type="button" onClick={() => handleRemove(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAdd}>
//           Add Another
//         </button>
//         <button type="submit">Submit</button>
//       </form>

//       {response && (
//         <div className="response">
//           <h2>Response:</h2>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}

//       {error && (
//         <div className="error">
//           <h2>Error:</h2>
//           <pre>{typeof error === 'object' ? JSON.stringify(error, null, 2) : error}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
