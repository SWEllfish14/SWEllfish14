function getLampData(){
    fetch('http://127.0.0.1:5000/lamp',{
      method:"GET",
    })
    .then(response => response.json())  // converte la mia risposta in un oggetto json
    .then((lampData) => {
      dataDisplayerParagraph.innerHTML = "Brightness: " + lampData.brightness + " lamp_id: " + lampData.lamp_id + " lamp_status: " + lampData.lamp_status;
    })
    .catch(error => {
      // gestione degli errori
      console.log(error);
    });
}

/* function printLampData(){

    getLampData().then(data => {
    dataDisplayerParagraph.innerHTML("ciao")
  }) 
} */


const brightnessButton = document.getElementById("brightnessButton");
const dataDisplayerParagraph = document.getElementById("dataDisplayerParagraph");

// aggiunta degli eventListener

brightnessButton.addEventListener('click', function(){
    getLampData();
});