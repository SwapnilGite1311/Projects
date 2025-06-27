from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) #Allow frontend to connectfrom a different origin

#here we will load product data from products.json
with open('products.json', 'r') as f:
    products = json.load(f)

@app.route('/')
def home():
    return ' Flask is running! Use /search?query=iphone to test the chatbot API.'

#this script will handle the search query
@app.route('/search')
def search():
    query = request.args.get('query', '').lower()
    results = [p for p in products if query in p['name'].lower() or query in p['brand'].lower()]
    return jsonify(results)
    


# Note: Make sure to have a products.json file in the same directory with the appropriate structure.

#this script will handle the user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    with open('users.json', 'r') as f:#opening the users.json file in read mode
        users = json.load(f)
    
    for user in users:#checking if the user exists in the users.json file
        if user['username'] == username and user['password'] == password:
            return jsonify({"status": "success", "message": "Login successful!"})
            #if the user exists, this if statement will return success message
        
    return jsonify({"status": "failure", "message": "Invalid username or password!"})
    #if no match is found after loop, this will return failure message


from datetime import datetime

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    username = data.get('username')
    message = data.get('message')

    #Load the product data
    results = [p for p in products if message.lower() in p['name'].lower() or message.lower() in p['brand'].lower()]
    response_text = ""

    if results:
        response_text = "; ".join([f"{p['name']} by {p['brand']} - ${p['price']}" for p in results])
    else:
        response_text = f"No products found for `{message}`"

    #Load existing chat history
    try:
        with open('chat_history.json', 'r') as f:
            history = json.load(f)
    except FileNotFoundError:
        history = {}

    if username not in history:
        history[username] = []

    history[username].append({
        "timestamp":datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user":message,
        "bot":response_text
     })

    #Save the Updated History
    with open('chat_history.json','w') as f:
        json.dump(history, f, indent=2)

    return jsonify({"reply":response_text})


#this script will handle the chat history retrieval
#it will return the chat history of the user
@app.route('/history/<username>', methods=['GET'])
def get_history(username):
    try:
        with open('chat_history.json', 'r') as f:
            history = json.load(f)
    except FileNotFoundError:
        history = {}

    user_history = history.get(username, [])
    return jsonify(user_history)

# always remember to run the app.py file before running the index.html file to get the desired output
if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app on port 5000