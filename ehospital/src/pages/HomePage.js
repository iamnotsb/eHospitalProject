import React, { useState } from 'react';

function HomePage() {
  const [patientId, setPatientId] = useState(''); // State for patient ID
  const [patientData, setPatientData] = useState(null); // State for fetched data
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  // Handle the search functionality
  const handleSearch = async () => {
    if (!patientId) {
      alert("Please enter a patient ID");
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Reset previous errors

    try {
      // Make API request
      const response = await fetch(`http://127.0.0.1:5000/patient?patient_id=${patientId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json(); // Parse the response as JSON

      console.log("API Response:", data); // Log the response for debugging

      // Check if the patient ID exists in the data response
      const patientInfo = data[patientId]; // Access data using the dynamic key
      if (patientInfo) {
        setPatientData(patientInfo); // Set the data in state
      } else {
        throw new Error('Patient not found');
      }
    } catch (err) {
      setError(err.message); // Set error message if API fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Welcome to eHospital</h2>
      <p>This is the main dashboard for managing hospital records and patient information.</p>

      {/* Search Form */}
      <div>
        <label>Search for Patient ID:</label>
        <input 
          type="text" 
          value={patientId} 
          onChange={(e) => setPatientId(e.target.value)} 
          placeholder="Enter Patient ID" 
        />
        <button onClick={handleSearch}>Submit</button>
      </div>

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Patient Data if available */}
      {patientData && (
        <div>
          <h3>Patient Information</h3>
          <ul>
            <li><strong>Age:</strong> {patientData.age}</li>
            <li><strong>Diagnosis:</strong> {patientData.diagnosis}</li>
            <li><strong>Ethnicity:</strong> {patientData.ethnicity}</li>
            <li><strong>Gender:</strong> {patientData.gender}</li>
          </ul>
        </div>
      )}

      {/* If no data is available */}
      {!patientData && !loading && !error && (
        <p>No patient data available. Please search for a valid patient ID.</p>
      )}
    </div>
  );
}
//version

export default HomePage;
