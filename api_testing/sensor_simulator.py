from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
#import paho.mqtt.client as mqtt
import json

app = Flask(__name__)
CORS(app)
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3030',
    'http://127.0.0.1:3030/sensor'
]
# Identificativo del sensore
sensor_id = 123

# Stato del sensore (True = acceso, False = spento)
sensor_detection = True

# raggio rilevamento sensore 0-100m
range_detection = 25


# API REST per ottenere lo stato del lampione e la luminosità impostata
@app.route('/sensor', methods=['GET'])
def get_sensor_status():
    return jsonify({'sensor_id': sensor_id, 'sensor_detection': sensor_detection, 'range_detection': range_detection})

# API REST per accendere o spegnere il lampione e impostare la luminosità
@app.route('/sensor', methods=['POST'])
def set_sensor_status():
    global sensor_detection, range_detection
    data = request.json
    if (data.get('sensor_id') != sensor_id):
        return jsonify({'sensor_id': sensor_id, 'error': 'sensor_id is not the same of this sensor.'}), 400
    
    sensor_detection = data.get('sensor_detection', sensor_detection)
    range_detection = data.get('range_detection', range_detection)
    return jsonify({'sensor_id': sensor_id, 'sensor_detection': sensor_detection, 'range_detection': range_detection})

# Pagina web che mostra il quadrato sincronizzato con lo stato del lampione e la luminosità impostata
@app.route('/', methods=['GET'])
def index():
    return render_template('index_sensor.html')


if __name__ == '__main__':
    #mqtt_client.connect(mqtt_broker_address, mqtt_broker_port)
    #mqtt_client.loop_start()
    app.run(host="127.0.0.1",debug=True, port="3030")
