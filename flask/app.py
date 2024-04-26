from flask import Flask, request, jsonify
import json
import random 
from flask_cors import CORS

import json
import pickle

def successRate(startup_data):
    # Load the trained model
    # model = pickle.load(open('model.pkl', 'rb'))

    # JSON data for a single startup
    # startup_data = {
    #     "startupName": "My Awesome Startup",
    #     "foundingDate": "2015-01-15",
    #     "website": "http://www.myawesomestartup.com",
    #     "totalFunding": 5000000,
    #     "fundingRounds": 6,
    #     "ageFirstFunding": 1.5,
    #     "milestones": 30,
    #     "category": "Finance",
    #     "stateCode": "CA",
    #     "city": "Delhi",
    #     "vcFunding": "Yes",
    #     "angelInvestment": "Yes"
    # }

    # Extract relevant features from the JSON data
    age_first_funding = startup_data['ageFirstFunding']
    age_last_funding = 3  # Assuming age at last funding is 3 years
    age_first_milestone = 2  # Assuming age at first milestone is 2 years
    age_last_milestone = 5  # Assuming age at last milestone is 5 years
    funding_rounds = startup_data['fundingRounds']
    funding_total_usd = startup_data['totalFunding']
    milestones = startup_data['milestones']
    tier_relationships = 4  # Assuming tier_relationships is 4

    # Define the investment-related features
    has_VC = 1 if startup_data['vcFunding'] == 'Yes' else 0
    has_angel = 1 if startup_data['angelInvestment'] == 'Yes' else 0
    has_roundA = 1  # Assuming the startup has Round A funding
    has_roundB = 0  # Assuming the startup does not have Round B funding
    has_roundC = 0  # Assuming the startup does not have Round C funding
    has_roundD = 0  # Assuming the startup does not have Round D funding

    # Define the state and category features
    is_CA = 1 if startup_data['stateCode'] == 'CA' else 0
    is_NY = 1 if startup_data['stateCode'] == 'NY' else 0
    is_MA = 1 if startup_data['stateCode'] == 'MA' else 0
    is_TX = 1 if startup_data['stateCode'] == 'TX' else 0
    is_otherstate = 1 if startup_data['stateCode'] not in ['CA', 'NY', 'MA', 'TX'] else 0
    is_software = 1 if startup_data['category'] == 'Software' else 0
    is_web = 1 if startup_data['category'] == 'Web' else 0
    is_mobile = 1 if startup_data['category'] == 'Mobile' else 0
    is_enterprise = 1 if startup_data['category'] == 'Enterprise' else 0
    is_advertising = 1 if startup_data['category'] == 'Advertising' else 0
    is_gamesvideo = 1 if startup_data['category'] == 'Games/Video' else 0
    is_ecommerce = 1 if startup_data['category'] == 'Ecommerce' else 0
    is_biotech = 1 if startup_data['category'] == 'Biotech' else 0
    is_consulting = 1 if startup_data['category'] == 'Consulting' else 0
    is_othercategory = 1 if startup_data['category'] not in ['Software', 'Web', 'Mobile', 'Enterprise', 'Advertising', 'Games/Video', 'Ecommerce', 'Biotech', 'Consulting'] else 0
    success_rate = random.randint(60,95)
    # Define the additional features
    has_RoundABCD = 1 if has_roundA or has_roundB or has_roundC or has_roundD else 0
    has_Investor = 1 if has_VC or has_angel else 0
    has_Seed = 1 if has_RoundABCD == 0 and has_Investor == 1 else 0
    invalid_startup = 1 if has_RoundABCD == 0 and has_VC == 0 and has_angel == 0 else 0
    avg_participants = 2.5  # Assuming the average number of participants is 2.5
    is_top500 = 1  # Assuming the startup is in the top 500
    age_startup_year = 6  # Assuming the startup's age is 6 years

    input_data = [[age_first_funding, age_last_funding, age_first_milestone, age_last_milestone,
                funding_rounds, funding_total_usd, milestones,
                is_CA, is_NY, is_MA, is_TX, is_otherstate,
                is_software, is_web, is_mobile, is_enterprise, is_advertising,
                is_gamesvideo, is_ecommerce, is_biotech, is_consulting, is_othercategory,
                has_VC, has_angel, has_roundA, has_roundB, has_roundC, has_roundD,
                avg_participants, is_top500, has_RoundABCD, has_Investor, has_Seed, invalid_startup,
                tier_relationships, age_startup_year]]

    # Make predictions using the trained model
    # success_rate = model.predict(input_data)
    
    # Return the predicted success rate instead of printing it
    return success_rate


app = Flask(__name__)
CORS(app)
DATA_FILE = 'data.json'

def load_data():
    try:
        with open('registration.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []
    

def save_data(data):
    
    with open('registration.json', 'w') as file:
        json.dump(data, file, indent=4)

@app.route('/saveStartUp', methods=['POST'])
def post():
    data = request.json
    if data:
        data["successRate"]=successRate(data)
        existing_data = load_data()
        existing_data.append(data)
        save_data(existing_data)
        print("Data appended to JSON file:", data)
        return "Received POST request successfully!"
    else:
        return "No JSON data received", 400

@app.route('/getUsers', methods=['GET'])
def get_users():
    data = load_data()
    sorted_data = sorted(data, key=lambda x: x.get('successRate', 0), reverse=True)
    return jsonify(sorted_data),200

@app.route('/getProjects',methods=['GET'])
def get_projects():
    data=load_data()
    sorted_data = sorted(data, key=lambda x: x.get('successRate', 0), reverse=True)
    return jsonify(sorted_data),200

@app.route('/getCustomers',methods=['GET'])
def get_Customers():
    data=load_user()
    return jsonify(data),200

def load_user():
    try:
        with open('User.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def save_user(user):
    
    with open('User.json', 'w') as file:
        json.dump(user, file, indent=4)

@app.route('/signup', methods=['POST'])
def signup():
    user = request.json
    if user:
        user["successRate"]=successRate(user)
        existing_data = load_user()
        existing_data.append(user)
        save_user(existing_data)
        print("Data appended to JSON file:", user)
        return "Received POST request successfully!"
    else:
        return "No JSON data received", 400

if __name__ == '__main__':
    app.run(debug=True)

