import multiprocessing
import argparse
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import json
import subprocess
import sys
import os


i = 0


print("Running the script")
f = open('sensors.json')
data = json.load(f)
active = (len(data['sensore']))

numbero_of_subprocesses = 2
def run_script(i):
    if i < active:
        print(data['sensore'][i]["ID"])
        port = 4000 + int(data['sensore'][i]["ID"])
        range = int(data['sensore'][i]['raggio_azione'])
        area = int(data['sensore'][i]['id_area_illuminata'])
        if (data['sensore'][i]["rilevamento"]) == "1":
            status = True
            subprocess.Popen(['python', './sensor_simulator.py', "-i " + str(data['sensore'][i]["ID"]) ,"-s" + str(status), "-r " + str(range), "-p " + str(port), "-a " + str(area)])
            
        if (data['sensore'][i]["rilevamento"]) == "0":
            status = False
            subprocess.Popen(['python', './sensor_simulator.py', "-i " + str(data['sensore'][i]["ID"]) ,"-s" + str(status), "-r " +  str(range), "-p " + str(port), "-a " + str(area)])
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



