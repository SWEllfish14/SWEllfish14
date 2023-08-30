from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import json
import requests
import argparse

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
CORS_ORIGIN_ALLOW_ALL = True

parser = argparse.ArgumentParser()
parser.add_argument("-i", "--id", type=str)
parser.add_argument("-s", "--status",type=str2bool, nargs='?',
                        const=True, default=False)

parser.add_argument("-r", "--range", type=str)
parser.add_argument("-p", "--port", type=str)
parser.add_argument("-a", "--area_id", type=str)


args = parser.parse_args()
sensor_id = args.id
sensor_detection = []
range_detection = args.range
sensor_port = args.port
id_area = args.area_id


if bool(args.status) is True:
 print("On")
 sensor_detection = True
if bool(args.status) is False:
 print("off")
 sensor_detection= False

# API REST per ottenere lo stato del lampione e la luminosità impostata
@app.route('/sensor', methods=['GET'])
def get_sensor_status():
    return jsonify({'sensor_id': sensor_id, 'sensor_detection': sensor_detection, 'range_detection': range_detection, 'id_area': id_area})


# API REST per accendere o spegnere il lampione e impostare la luminosità
@app.route('/sensor', methods=['POST'])
def set_sensor_status():
    global sensor_detection, range_detection
    data = request.json
    if (data.get('sensor_id') != sensor_id):
        return jsonify({'sensor_id': sensor_id, 'error': 'sensor_id is not the same of this sensor.'}), 400
    
    sensor_detection = data.get('sensor_detection', sensor_detection)
    range_detection = data.get('range_detection', range_detection)
    return jsonify({'sensor_id': sensor_id, 'sensor_detection': sensor_detection, 'range_detection': range_detection, 'id_area': id_area})

# Pagina web che mostra il quadrato sincronizzato con lo stato del lampione e la luminosità impostata
@app.route('/', methods=['GET'])
def index():
    return render_template('index_sensor.html')


if __name__ == '__main__':
    app.run(host="127.0.0.1",debug=True, port=sensor_port)
