import multiprocessing
import argparse
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
#import paho.mqtt.client as mqtt
import json
import subprocess
import sys
import os


i = 0


print("Running the script")
f = open('lamps.json')
data = json.load(f)
active = (len(data['lampione']))

numbero_of_subprocesses = 25
def run_script(i):
    if i < active:
        print(data['lampione'][i]["ID"])
        port = 3000 + int(data['lampione'][i]["ID"])
        if (data['lampione'][i]["stato"]) == "1":
            status = True
            subprocess.Popen(['python', './lamp_simulator.py', "-i " + str(data['lampione'][i]["ID"]) ,"-s" + str(status), "-b " + str(data['lampione'][i]["luminosita_default"]) , "-p " + str(port) ])
            
        if (data['lampione'][i]["stato"]) == "0":
            status = False
            subprocess.Popen(['python', './lamp_simulator.py', "-i " + str(data['lampione'][i]["ID"]) ,"-s" + str(status), "-b " + str(data['lampione'][i]["luminosita_default"]) , "-p " + str(port) ])
    i = i+1
f.close()
        
if __name__ == "__main__":
    num_processes = numbero_of_subprocesses  # Adjust the number of parallel processes as needed
    processes = []

    for _ in range(num_processes):
        process = multiprocessing.Process(target=run_script(_))
        processes.append(process)
        process.start()

    for process in processes:
        process.join()

print("All processes completed")



