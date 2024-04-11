from flask import Flask, request, jsonify
import json

app = Flask(__name__)

DATA_FILE = 'registration.json'

def load_data():
    try:
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def save_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)

@app.route('/', methods=['POST'])
def post():
    data = request.json
    if data:
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
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)