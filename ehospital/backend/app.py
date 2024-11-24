from flask import Flask, jsonify, request
import json

from flask_cors import CORS

# Load the JSON data into memory once
with open('patients_data.json', 'r') as f:
    data_dict = json.load(f)

# Initialize Flask app
app = Flask(__name__)
# Enable CORS for all domains (or specify specific domains)
CORS(app)

# Define a route to get specific patient details by patient_id
@app.route('/patient', methods=['GET'])
def get_patient_info():
    # Get patient_id from query parameters
    patient_id = request.args.get('patient_id')
    
    if not patient_id:
        return jsonify({"error": "Please provide a patient_id"}), 400
    
    # Fetch all details for the specified patient_id
    patient_info = data_dict.get(patient_id)
    
    if not patient_info:
        return jsonify({"error": "Patient not found"}), 404
    
    # Filter the response to only include specific fields
    filtered_info = {
        "age": patient_info.get("Age"),
        "ethnicity": patient_info.get("ETHNICITY"),
        "gender": patient_info.get("GENDER"),
        "diagnosis": patient_info.get("DIAGNOSIS")
    }
    
    # Return the filtered details of the patient
    return jsonify({patient_id: filtered_info})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
