from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
#import paho.mqtt.client as mqtt
import json
import argparse


app = Flask(__name__)
CORS(app)
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3020',
    'http://127.0.0.1:3020/lamp'
]

parser = argparse.ArgumentParser()
parser.add_argument("-i", "--id", type=str)
#parser.add_argument("-s", "--status", type=str)
parser.add_argument("-b", "--brightness", type=str)
parser.add_argument("-p", "--port", type=str)

args = parser.parse_args()
lamp_id = args.id
lamp_status = True
brightness = args.brightness
lamp_port = args.port

# API REST per ottenere lo stato del lampione e la luminosità impostata
@app.route('/lamp', methods=['GET'])
def get_lamp_status():
    return jsonify({'lamp_id': lamp_id, 'lamp_status': lamp_status, 'brightness': brightness})

# API REST per accendere o spegnere il lampione e impostare la luminosità
@app.route('/lamp', methods=['POST'])
def set_lamp_status():
    global lamp_status, brightness
    data = request.json
    if (data.get('lamp_id') != lamp_id):
        return jsonify({'lamp_id': lamp_id, 'error': 'lamp_id is not the same of this lamp.'}), 400
    
    lamp_status = data.get('lamp_status', lamp_status)
    brightness = data.get('brightness', brightness)
    return jsonify({'lamp_id': lamp_id, 'lamp_status': lamp_status, 'brightness': brightness})

# Pagina web che mostra il quadrato sincronizzato con lo stato del lampione e la luminosità impostata
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host="127.0.0.1",debug=True, port=lamp_port);
