import json
from flask import Flask, render_template, request
from flask_cors import CORS
from pymongo import MongoClient
from flask import Flask, jsonify, redirect
from bson.json_util import dumps 
import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb+srv://anshu8877947678:atlas@cluster0.luftk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')  
db = client['Calender'] 
collection1 = db['Companies']
collection2 = db['Communications']  # Assuming you have a 'Communications' collection

# Route to get all companies
@app.route('/api/companies', methods=['GET'])
def get_companies():
    companies = list(collection1.find())  # Convert the cursor to a list
    print(companies)
    
    # # Convert ObjectId to string for JSON serialization
    for com in companies:
        com["_id"] = str(com["_id"]) 
    
    return jsonify({"data": companies})

# Route to add a new company
@app.route('/api/companies', methods=['POST'])
def add_company():
    company_data = request.json
    company = {
        "name": company_data["name"],
        "location": company_data["location"],
        "linkedin": company_data["linkedInProfile"],
        "emails": company_data["emails"],
        "phoneNumbers": company_data["phoneNumbers"],
        "comments": company_data["comments"],
        "communicationPeriodicity": company_data["communicationPeriodicity"]
    }
    result = collection1.insert_one(company)
    return jsonify({"message": "Company added"})

# Route to update a company
@app.route('/api/companies/<company_id>', methods=['PUT'])
def update_company(company_id):
    company_data = request.json
    collection1.update_one(
        {"_id": ObjectId(company_id)},
        {"$set": company_data}
    )
    return jsonify({"message": "Company updated"})

# Route to delete a company
@app.route('/api/companies/<company_id>', methods=['DELETE'])
def delete_company(company_id):
    collection1.delete_one({"_id": ObjectId(company_id)})
    return jsonify({"message": "Company deleted"})

# Route to fetch communication methods (Example list of methods)
@app.route('/api/communication-methods', methods=['GET'])
def get_communication_methods():
    methods = ['Email', 'Phone', 'SMS']  # Example communication methods
    return jsonify(methods)

# Route to log a communication
@app.route('/api/communications', methods=['POST'])
def log_communication():
    communication_data = request.json
    communication = {
        "companyId": communication_data["companyId"],
        "method": communication_data["method"],
        "communicationDate": communication_data["communicationDate"],
        "status": communication_data["status"],
        "notes": communication_data.get("notes", "")
    }
    result = collection2.insert_one(communication)
    return jsonify({"message": "Communication logged", "id": str(result.inserted_id)})

# Route to fetch overdue communications
@app.route('/api/communications/overdue', methods=['GET'])
def get_overdue_communications():
    current_date = request.args.get("current_date")  # Pass the current date to filter overdue
    overdue_communications = collection2.find({
        "communicationDate": {"$lt": current_date}, 
        "status": {"$ne": "Completed"}  # Assuming status can be "Completed"
    })
    return jsonify([comm for comm in overdue_communications])

# Route to fetch due communications
@app.route('/api/communications/due', methods=['GET'])
def get_due_communications():
    current_date = request.args.get("current_date")  # Pass the current date to filter due
    due_communications = collection2.find({
        "communicationDate": {"$gte": current_date},
        "status": {"$ne": "Completed"}  # Assuming status can be "Completed"
    })
    return jsonify([comm for comm in due_communications])

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0", port=4663)
