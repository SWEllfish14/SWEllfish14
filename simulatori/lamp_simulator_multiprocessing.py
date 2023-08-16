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

numbero_of_subprocesses = active
def run_script(i):
    # Your code here
    if i < active:
        print("okkk")
        id = data['lampione'][i]["ID"]
        status = True
        brightness = data['lampione'][i]["luminosita_default"]
        print(id)
        port = 3020 + i
        subprocess.Popen(['python', 'lamp_simulator.py', "-i " + str(id) , "-b " + str(brightness) , "-p " + str(port) ])
    i = i+1
    print(port)
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




