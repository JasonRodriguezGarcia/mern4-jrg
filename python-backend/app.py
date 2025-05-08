from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# OJO EL RETURN DE PYTHON DEVUELVE .JSON
@app.route('/')
def hello():
	return jsonify(message="Hello World!")

@app.route('/test')
def test():
	edad = 10
	return jsonify(message=f"Hello TEST! Tienes {edad} años")

@app.route('/random-emoji', methods = ['GET'])
def random_emoji():
    # List of emojis you might want to return
    emojis = ["😀", "😎", "😂", "😍", "🥺", "😜", "😇", "🥳", "😈", "😱", "🙃", "🤔", "😏", "🤩"]
    random_emoji = random.randint(0, len(emojis)-1)
    return jsonify(emoji=emojis[random_emoji], result='ok')

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8000)
