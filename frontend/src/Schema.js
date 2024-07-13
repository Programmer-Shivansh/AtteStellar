// Schema.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import './Schema.css';

const Schema = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5003/data');
        // console.log("Data received:", response.data); // Debugging log
        const sortedData = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setData(sortedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err); // Debugging log
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="Schema">
      <h1>Schema Data</h1>
      <div className="schema-container">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="schema-card">
              <div className="schema-header">
                <h2>
                  <Link to={`/schema/${item._id}`} className="schema-link">
                    Schema UID: {item.schemaUID}
                  </Link>
                </h2>
                <p className="document-id">Document ID: {item._id}</p>
              </div>
              <div className="schema-content">
                <div className="schema-column">
                  <strong>Fields:</strong>
                  {item.fields && item.fields.length > 0 ? (
                    <ul>
                      {item.fields.map((field, index) => (
                        <li key={index}>
                          <strong>Field:</strong> {field.field}, <strong>Type:</strong> {field.type}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'No fields available'
                  )}
                </div>
                <div className="schema-column">
                  <strong>Timestamp:</strong> {new Date(item.timestamp).toLocaleString()}
                </div>
                {/* <div className="schema-column">
                  <strong>Version:</strong> {item.__v}
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Schema;
