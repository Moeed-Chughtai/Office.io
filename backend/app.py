from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'a_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

# Event for when a user sends a message
@socketio.on('send_message')
def handle_send_message(data):
    message = data['message']
    sender = data['sender']
    recipient = data['recipient']
    
    # Broadcast message to all connected clients
    emit('receive_message', {
        'message': message,
        'sender': sender,
        'recipient': recipient,
    }, broadcast=True)

@app.route('/')
def index():
    return "Server is running"

if __name__ == '__main__':
    socketio.run(app, debug=True)
