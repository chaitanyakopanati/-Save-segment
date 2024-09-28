"use client"; // Client Component

import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [schemaOptions, setSchemaOptions] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]);
  const [currentSchema, setCurrentSchema] = useState('');

  const handleAddSchema = () => {
    if (currentSchema) {
      const selectedOption = schemaOptions.find(option => option.value === currentSchema);
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setSchemaOptions(schemaOptions.filter(option => option.value !== currentSchema));
      setCurrentSchema(''); // Reset dropdown
    }
  };

  const handleSaveSegment = () => {
    const segmentData = {
      segment_name: segmentName,
      schema: selectedSchemas.map(option => ({
        [option.value]: option.label,
      })),
    };
    console.log('Saving segment:', segmentData);
    setIsOpen(false); // Close the popup after saving
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Save Segment Button with styling */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Save segment
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            border: '1px solid black',
            backgroundColor: 'white',
            zIndex: 1000,
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '400px',
          }}
        >
          {/* Save Segment Form */}
          <h2 style={{ textAlign: 'center' }}>Save Segment</h2>

          <div style={{ marginBottom: '10px' }}>
            <label>Segment Name:</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Enter segment name"
              style={{
                display: 'block',
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
                <p className='mb-2'>To save your segment,you need to add the schemas to build the query</p>
          <div style={{ marginBottom: '10px' }}>
            <label>Add schema to segment:</label>
            <select
              value={currentSchema}
              onChange={(e) => setCurrentSchema(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              <option value="">Select schema</option>
              {schemaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddSchema}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              + Add new schema
            </button>
          </div>

          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid blue', backgroundColor: '#e0f7ff' }}>
            {selectedSchemas.length === 0 ? (
              <p>No schema added yet.</p>
            ) : (
              selectedSchemas.map((schema, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <select
                    value={schema.value}
                    onChange={(e) => {
                      const newSchema = schemaOptions.find(option => option.value === e.target.value);
                      const updatedSchemas = [...selectedSchemas];
                      updatedSchemas[index] = newSchema;
                      setSelectedSchemas(updatedSchemas);
                      setSchemaOptions([
                        ...schemaOptions.filter(option => option.value !== newSchema.value),
                        schema,
                      ]);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    <option value={schema.value}>{schema.label}</option>
                    {schemaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            )}
          </div>

          {/* Save Button with blue color */}
          <button
            onClick={handleSaveSegment}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Save the segment
          </button>

          {/* Cancel button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#ccc',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
