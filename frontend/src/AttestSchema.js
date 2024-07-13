import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './AttestSchema.css';
import { viewIPFSData } from './call_schemaUID';
import { openModal } from './ConnectBlockchain';
import AttestModal from './AttestModal';

const SchemaDetail = () => {
  const { id } = useParams();
  const [schema, setSchema] = useState(null);
  const [attestationCount, setAttestationCount] = useState(0); // New state for attestation count
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSchema, setNewSchema] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        // Fetch schema data
        const schemaResponse = await axios.get(`https://attestellar-backend-yzl9.onrender.com/data/${id}`);
        setSchema(schemaResponse.data);

        // Fetch attestation count
        const attestationResponse = await axios.get(`https://attestellar-backend-yzl9.onrender.com/attestations/${schemaResponse.data.schemaUID}`);
        setAttestationCount(attestationResponse.data.length || 0);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSchema();
  }, [id]);

  const handleAttest = async () => {
    try {
      const fetchedSchema = await viewIPFSData(schema.schemaUID);
      if (Array.isArray(fetchedSchema) && fetchedSchema.length > 0) {
        setNewSchema(fetchedSchema);
        setIsModalOpen(true);
      } else {
        console.error('No fields available in the fetched schema.');
      }
    } catch (err) {
      console.error('Error during attestation:', err.message);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewSchema(null);
  };

  const handleModalSubmit = async (fields) => {
    const arr = Object.entries(fields);
    await openModal(schema.schemaUID, arr);
    handleModalClose();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="SchemaDetail">
      <h1>Schema Details</h1>
      {schema ? (
        <div className="schema-detail-container">
          <div className="schema-detail-item">
            <strong>Schema UID:</strong>
            <span>{schema.schemaUID}</span>
          </div>
          <div className="schema-detail-item">
            <strong>Document ID:</strong>
            <span>{schema._id}</span>
          </div>
          <div className="schema-detail-item">
            <strong>Timestamp:</strong>
            <span>{new Date(schema.timestamp).toLocaleString()}</span>
          </div>
          <Link to={`/attestations/${schema.schemaUID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="schema-detail-item clickable">
              <strong>Number of On-Chain Attestations: </strong>
              {attestationCount}
            </div>
          </Link>
          <div className="schema-detail-item">
            <strong>Fields:</strong>
            {schema.fields && schema.fields.length > 0 ? (
              <ul>
                {schema.fields.map((field, index) => (
                  <li key={index}>
                    <strong>Field:</strong> {field.field}, <strong>Type:</strong> {field.type}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No fields available</p>
            )}
          </div>
          <button onClick={handleAttest} className="attest-button">Attest</button>
        </div>
      ) : (
        <p>No schema found</p>
      )}
      {isModalOpen && (
        <AttestModal
          newSchema={newSchema}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default SchemaDetail;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import './AttestSchema.css';
// import { viewIPFSData } from './call_schemaUID';
// import { openModal } from './ConnectBlockchain';
// import AttestModal from './AttestModal';
// // import ConnectBlockchain from './ConnectBlockchain';
// const SchemaDetail = () => {
//   const { id } = useParams();
//   const [schema, setSchema] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newSchema, setNewSchema] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   useEffect(() => {
//     const fetchSchema = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5003/data/${id}`);
//         setSchema(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchSchema();
//   }, [id]);

//   const handleAttest = async () => {
//     try {
//       const fetchedSchema = await viewIPFSData(schema.schemaUID);
//       // console.log('Fetched Schema:', fetchedSchema); // Debug log
//       if (Array.isArray(fetchedSchema) && fetchedSchema.length > 0) {
//         // console.log(fetchedSchema[0])
//         setNewSchema(fetchedSchema);
//         setIsModalOpen(true);
//       } else {
//         console.error('No fields available in the fetched schema.');
//         console.log('Fetched Schema Structure:', fetchedSchema);
//       }
//     } catch (err) {
//       console.error('Error during attestation:', err.message);
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setNewSchema(null);
//   };

//   const handleModalSubmit = async (fields) => {
//     // const fetchedSchema = await viewIPFSData(schema.schemaUID);
//     // console.log('Fetched Schema:', fetchedSchema); // Debug log  
//     // console.log('Attested Fields:', fields);
//     // if (Object.keys(fields).length === 1) {
//     //   fields =  [fields];
//     // }
//     const arr = Object.entries(fields);
//     // console.log(arr)
//     await openModal(schema.schemaUID, arr);
//     // console.log("transact-",result)
//     // ConnectBlockchain(fetchedSchema, fields);
//     // Implement the actual attestation logic here
//     handleModalClose();
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="SchemaDetail">
//       <h1>Schema Details</h1>
//       {schema ? (
//         <div className="schema-detail-container">
//           <div className="schema-detail-item">
//             <strong>Schema UID:</strong>
//             <span>{schema.schemaUID}</span>
//           </div>
//           <div className="schema-detail-item">
//             <strong>Document ID:</strong>
//             <span>{schema._id}</span>
//           </div>
//           <div className="schema-detail-item">
//             <strong>Timestamp:</strong>
//             <span>{new Date(schema.timestamp).toLocaleString()}</span>
//           </div>
//           <Link to={`/attestations/${schema.schemaUID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//             <div className="schema-detail-item clickable">
//               <strong>Number of On-Chain Attestations: </strong>
//               {schema.attestations ? schema.attestations.length : 0}
//             </div>
//           </Link>
//           <div className="schema-detail-item">
//             <strong>Fields:</strong>
//             {schema.fields && schema.fields.length > 0 ? (
//               <ul>
//                 {schema.fields.map((field, index) => (
//                   <li key={index}>
//                     <strong>Field:</strong> {field.field}, <strong>Type:</strong> {field.type}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No fields available</p>
//             )}
//           </div>
//           <button onClick={handleAttest} className="attest-button">Attest</button>
//         </div>
//       ) : (
//         <p>No schema found</p>
//       )}
//       {isModalOpen && (
//         <AttestModal
//           newSchema={newSchema}
//           onClose={handleModalClose}
//           onSubmit={handleModalSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default SchemaDetail;


// // SchemaDetail.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import './AttestSchema.css'; // Ensure the CSS file exists and is correctly named
// import { viewIPFSData } from './call_schemaUID'
// const SchemaDetail = () => {
//   const { id } = useParams(); // Retrieve ID from the URL
//   const [schema, setSchema] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSchema = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5003/data/${id}`);
//         setSchema(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchSchema();
//   }, [id]);

//   const handleAttest = async () => {
//     try {
//       const newSchema = await viewIPFSData(schema.schemaUID);
//       // Example attestation logic
//       // console.log(typeof(newSchema));
//       // Implement the actual attestation logic here, e.g., making a request to your attestation endpoint
//     } catch (err) {
//       console.error('Error during attestation:', err.message);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="SchemaDetail">
//       <h1>Schema Details</h1>
//       {schema ? (
//         <div className="schema-detail-container">
//           <div className="schema-detail-item">
//             <strong>Schema UID:</strong>
//             <span>{schema.schemaUID}</span>
//           </div>
//           <div className="schema-detail-item">
//             <strong>Document ID:</strong>
//             <span>{schema._id}</span>
//           </div>
//           <div className="schema-detail-item">
//             <strong>Timestamp:</strong>
//             <span>{new Date(schema.timestamp).toLocaleString()}</span>
//           </div>
//             <Link to={`/attestations/${schema.schemaUID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//             <div className="schema-detail-item clickable">
//                 <strong>Number of On-Chain Attestations:</strong>
//                 {schema.attestations ? schema.attestations.length : 0}
//             </div>
//             </Link>
//           <div className="schema-detail-item">
//             <strong>Fields:</strong>
//             {schema.fields && schema.fields.length > 0 ? (
//               <ul>
//                 {schema.fields.map((field, index) => (
//                   <li key={index}>
//                     <strong>Field:</strong> {field.field}, <strong>Type:</strong> {field.type}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No fields available</p>
//             )}
//           </div>
//           <button onClick={handleAttest} className="attest-button">Attest</button>
//         </div>
//       ) : (
//         <p>No schema found</p>
//       )}
//     </div>
//   );
// };

// export default SchemaDetail;
