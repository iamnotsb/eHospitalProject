import React, { useState } from 'react';

function HomePage() {
  const [patientId, setPatientId] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!patientId) {
      alert("Please enter a patient ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:5000/get_patient_data?patient_id=${patientId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      // First get the response as text
      const responseText = await response.text();
      
      // Replace NaN with null in the response text
      const sanitizedText = responseText.replace(/:\s*NaN/g, ': null');
      
      // Parse the sanitized JSON
      let data;
      try {
        data = JSON.parse(sanitizedText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Invalid data format received from server');
      }

      // Optional: Clean up the data object by converting any remaining NaN values to null
      const cleanData = JSON.parse(
        JSON.stringify(data, (key, value) => 
          Number.isNaN(value) ? null : value
        )
      );

      console.log("API Response:", cleanData);
      setPatientData(cleanData);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Welcome to eHospital</h2>
        <p>This is the main dashboard for managing hospital records and patient information.</p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <label htmlFor="patientId">Search for Patient ID:</label>
          <input 
            id="patientId"
            type="text" 
            value={patientId} 
            onChange={(e) => setPatientId(e.target.value)} 
            placeholder="Enter Patient ID" 
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className={loading ? 'loading' : ''}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      {patientData && (
        <div className="patient-info">
          <h3>Patient Information</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Patient ID:</strong></td>
                <td>{patientData.patient_id}</td>
              </tr>
              <tr>
                <td><strong>Age:</strong></td>
                <td>{patientData.age}</td>
              </tr>
              <tr>
                <td><strong>Gender:</strong></td>
                <td>{patientData.gender}</td>
              </tr>
              <tr>
                <td><strong>Ethnicity:</strong></td>
                <td>{patientData.ethnicity}</td>
              </tr>
              <tr>
                <td><strong>Diagnosis:</strong></td>
                <td>{patientData.diagnosis}</td>
              </tr>
            </tbody>
          </table>

          <h3>Patient Prediction</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Original Admission Location:</strong></td>
                <td>{patientData.original_admission_location}</td>
              </tr>
              <tr>
                <td><strong>Predicted Admission Location:</strong></td>
                <td>{patientData.predicted_admission_location}</td>
              </tr>
              <tr>
                <td><strong>Original Discharge Location:</strong></td>
                <td>{patientData.original_discharge_location}</td>
              </tr>
              <tr>
                <td><strong>Predicted Discharge Location:</strong></td>
                <td>{patientData.predicted_discharge_location}</td>
              </tr>
              <tr>
                <td><strong>Original Length of Stay:</strong></td>
                <td>{patientData.original_los}</td>
              </tr>
              <tr>
                <td><strong>Predicted Length of Stay:</strong></td>
                <td>{patientData.predicted_los}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {!patientData && !loading && !error && (
        <div className="no-data">
          No patient data available. Please search for a valid patient ID.
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          background: #007acc;
          border-radius: 8px;
        }

        .header h2 {
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .search-section {
          margin-bottom: 30px;
        }

        .search-box {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 15px;
        }

        input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          flex: 1;
          max-width: 300px;
        }

        button {
          padding: 8px 20px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #2980b9;
        }

        button:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }

        .error-message {
          color: #e74c3c;
          padding: 10px;
          background-color: #fadbd8;
          border-radius: 4px;
          margin-top: 10px;
        }

        .patient-info {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .patient-info h3 {
          color: #2c3e50;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #3498db;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }

        table td strong {
          color: #34495e;
        }

        .no-data {
          text-align: center;
          padding: 40px;
          color: #7f8c8d;
          background: #f8f9fa;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .search-box {
            flex-direction: column;
            align-items: stretch;
          }

          input {
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
