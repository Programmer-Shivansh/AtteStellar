import React, { useState } from 'react';
import './AttestModal.css'; // Make sure to update this CSS file for styling the modal
// import {handleWalletSelection,openModal} from './ConnectBlockchain'
const AttestModal = ({ newSchema, onClose, onSubmit }) => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when the field is updated
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateInput = (value, type) => {
    switch (type) {
      case "Bool":
        return value === "true" || value === "false";
      // case "symbol_short (9 char)":
      //   return /^[a-zA-Z0-9_]{1,9}$/.test(value); // 1 to 9 characters
      case "Symbol (32 char)":
        return /^[a-zA-Z0-9_]{1,32}$/.test(value); // 1 to 32 characters
      case "32-bit Integers (signed)":
        return /^-?\d{1,10}$/.test(value); // Includes negative values
      case "32-bit Integers (unsigned)":
        return /^\d{1,10}$/.test(value); // Only positive values
      case "64-bit Integers (signed)":
        return /^-?\d{1,19}$/.test(value); // Includes negative values
      case "64-bit Integers (unsigned)":
        return /^\d{1,19}$/.test(value); // Only positive values
      case "128-bit Integers (signed)":
        return /^-?\d{1,38}$/.test(value); // Includes negative values
      case "128-bit Integers (unsigned)":
        return /^\d{1,38}$/.test(value); // Only positive values
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    newSchema.forEach((field) => {
      const value = fields[field.field] || '';
      if (!value.trim()) {
        newErrors[field.field] = 'This field is required.';
      } else if (!validateInput(value, field.type)) {
        newErrors[field.field] = `Invalid input for type ${field.type}.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // ConnectButton();
    // openModal();
    onSubmit(fields);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Attest Schema</h2>
        {newSchema && newSchema.length > 0 ? (
          newSchema.map((field, index) => (
            <div key={index} className="modal-field">
              <label>
                {field.field} ({field.type}):
                {field.type === "Bool" ? (
                  <select
                    name={field.field}
                    value={fields[field.field] || ''}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select true or false</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name={field.field}
                    value={fields[field.field] || ''}
                    onChange={handleChange}
                  />
                )}
              </label>
              {errors[field.field] && (
                <div className="error-message">{errors[field.field]}</div>
              )}
            </div>
          ))
        ) : (
          <p>No fields available</p>
        )}
        <div className="modal-actions">
          <button className="modal-button" onClick={onClose}>Cancel</button>
          <button className="modal-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AttestModal;
