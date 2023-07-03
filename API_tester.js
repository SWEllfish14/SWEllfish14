async function getLampData() {
  try {
    const response = await fetch('http://127.0.0.1:5000/lamp', {
      method: 'GET'
    });
    const lampData = await response.json();  
    return lampData;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function printLampData(){
  try {
    const lampData = await getLampData();
    dataDisplayerParagraph.innerHTML = "Brightness: " + lampData.brightness + " lamp_id: " + lampData.lamp_id + " lamp_status: " + lampData.lamp_status;
  } catch (error) {
    console.log('Errore:', error);
  }
}


async function changeBrightness(brightnessValue) {
  const lampData = await getLampData();
  lampData.brightness = brightnessValue;

  try {
    const response = await fetch('http://127.0.0.1:5000/lamp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lampData)
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const brightnessButton = document.getElementById("brightnessButton");
const lampInfoButton = document.getElementById("lampInfoButton");
const changeBrightnessButton = document.getElementById("changeBrightnessButton");
let newBrightness = document.getElementById("newBrightness")

// aggiunta degli eventListener

lampInfoButton.addEventListener('click', function(){
  printLampData();
});

changeBrightnessButton.addEventListener('click', function(){
  changeBrightness(newBrightness.value);
});