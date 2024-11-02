from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Paths to JSON files
CONVERSATIONS_FILE = 'data/conversations.json'
MESSAGES_FILE = 'data/messages.json'
USER_FILE = 'data/user.json'


def load_data(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            return json.load(file)
    return {}


def save_data(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)


# Route to get all conversations
@app.route('/conversations', methods=['GET'])
def get_conversations():
    conversations = load_data(CONVERSATIONS_FILE)
    return jsonify(list(conversations.values()))


# Route to get the current user information
@app.route('/user', methods=['GET'])
def get_user():
    user = load_data(USER_FILE)
    return jsonify(user)


# Route to get messages for a specific conversation
@app.route('/conversations/<conversation_id>/messages', methods=['GET'])
def get_messages(conversation_id):
    messages = load_data(MESSAGES_FILE).get(conversation_id, [])
    user = load_data(USER_FILE)
    for msg in messages:
        # Mark messages from the current user for frontend display
        msg['isCurrentUser'] = (msg['senderId'] == user['userId'])
    return jsonify(messages)


# Route to add a new message to a conversation
@app.route('/conversations/<conversation_id>/messages', methods=['POST'])
def add_message(conversation_id):
    message_data = request.json
    messages = load_data(MESSAGES_FILE)

    new_message = {
        "text": message_data.get("text"),
        "senderId": message_data.get("senderId"),
        "timestamp": message_data.get("timestamp"),
    }
    if conversation_id not in messages:
        messages[conversation_id] = []
    messages[conversation_id].append(new_message)

    # Save messages
    save_data(MESSAGES_FILE, messages)
    
    # Update last message in conversations file for preview
    conversations = load_data(CONVERSATIONS_FILE)
    if conversation_id in conversations:
        conversations[conversation_id]["lastMessage"] = message_data.get("text")
    save_data(CONVERSATIONS_FILE, conversations)

    return jsonify(new_message), 201


if __name__ == '__main__':
    os.makedirs('data', exist_ok=True)
    for file_name in [CONVERSATIONS_FILE, MESSAGES_FILE, USER_FILE]:
        if not os.path.exists(file_name):
            with open(file_name, 'w') as f:
                json.dump({}, f)
    app.run(debug=True)
