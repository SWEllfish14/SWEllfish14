from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import json
import requests

def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')
app = Flask(__name__)
CORS(app)
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3030',
    'http://127.0.0.1:3030/sensor'
    'http://127.0.0.1:3020/lamp'
]

parser = argparse.ArgumentParser()
parser.add_argument("-i", "--id", type=str)
parser.add_argument("-s", "--status",type=str2bool, nargs='?',
                        const=True, default=False)

parser.add_argument("-r", "--range", type=str)
parser.add_argument("-idlamp", "--idlamp", type=str)


args = parser.parse_args()
sensor_id = args.id
sensor_detection = []
range_detection = args.range
lamp_id = args.idlamp


if bool(args.status) is True:
 print("On")
 sensor_detection = True
if bool(args.status) is False:
 print("off")
 sensor_detection= False

# Identificativo del sensore
#sensor_id = 1

# Stato del sensore (True = acceso, False = spento)
#sensor_detection = True

# raggio rilevamento sensore 0-100m
#range_detection = 25


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

def turn_on_lamps(lamp_id,lamp_port, brightness_value):
    api_url = 'http://localhost:'+port+'/lamp'
    todo = {"lamp_id": lamp_id, "lamp_status": "1", "brightness": brightness_value}
    headers =  {'Content-Type':'application/json'}
    response = requests.post(api_url, data=json.dumps(todo), headers=headers)
    response.json()

def turn_off_lamps(lamp_id,lamp_port, brightness_value):
    api_url = 'http://localhost:'+port+'/lamp'
    todo = {"lamp_id": lamp_id, "lamp_status": "0", "brightness": brightness_value}
    headers =  {'Content-Type':'application/json'}
    response = requests.post(api_url, data=json.dumps(todo), headers=headers)
    response.json()
# Pagina web che mostra il quadrato sincronizzato con lo stato del lampione e la luminosità impostata
@app.route('/', methods=['GET'])
def index():
    return render_template('index_sensor.html')


if __name__ == '__main__':
    app.run(host="127.0.0.1",debug=True, port="3030")
