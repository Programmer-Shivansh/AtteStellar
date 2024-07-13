import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AttestationsDetail.css'; // Add CSS for styling if needed

const AttestationsDetail = () => {
  const { schemaUID } = useParams(); // Retrieve schemaUID from the URL
  const [attestations, setAttestations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttestations = async () => {
      try {
        const response = await axios.get(`https://attestellar-backend-yzl9.onrender.com/attestations/${schemaUID}`);
        
        if (response.status === 404) {
          setError('No data found for the given schemaUID');
        } else {
          setAttestations(response.data);
        }
        setLoading(false);
      } catch (err) {
        setError('No Attestations found for the given schemaUID');
        setLoading(false);
      }
    };

    fetchAttestations();
  }, [schemaUID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="AttestationsDetail">
      <h1>Attestations for Schema UID: {schemaUID}</h1>
      <div className="cards-container">
        {attestations.map((attestation) => (
          <div key={attestation._id} className="attestation-card">
            {Object.keys(attestation).map((header) => (
              <div key={header} className="attestation-detail">
                <strong>{header}:</strong> <span>{String(attestation[header])}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttestationsDetail;
