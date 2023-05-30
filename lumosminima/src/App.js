import './App.css';
import axios from 'axios';
import {useState} from 'react';
import { useQuery } from "react-query";



function App() {
  const [id,setId] = useState()
  const [luminosità, setLuminosità] = useState([])
  const [stato,setStato] = useState(false)
  const [modify,setModify] = useState(true)
  const fetchLamp = async () => {
    const result = await axios.get("http://127.0.0.1:3001/lamp",{headers:{"Content-Type" :'application/json'}}).then(
      (res) => (
        setId(res.data.lamp_id),
        setLuminosità(res.data.brightness),
        setStato(res.data.lamp_status)
      )
      
      
    );
  }

  const fetchFromDb = async () => {
    const res = await axios.get("http://127.0.0.1:3002/lamp")
  }
  const headers = {
    'Content-Type': 'application/json'
  }
  const lamp = {lamp_id: id, brightness: luminosità, lamp_status:stato}
  const handleSubmit = async (event) => {
    event.preventDefault();
    const s = await axios.post("http://127.0.0.1:3001/lamp",lamp,{ headers })
    setModify(current => !current)
  }
  const handleClick = () => setModify( current => !current )
  const { isLoading, error, data, isFetching } = useQuery('lamp',fetchLamp)
  if (isLoading) return "Loading...";
  
  if (error) return "An error has occurred: " + error.message;

  
  return (
    <div className="App"> 
     {modify ? 
     <div><p>Id lampada:{id}</p>
      <p>Livello di luminosità:{luminosità}</p>
      {stato ? <p>Acceso</p>:<p>Spento</p>}
    <button onClick={() => handleClick()} >Cambia valori</button></div>
    : 
    <form onSubmit={handleSubmit}>
          <label htmlFor="luminosità">Luminosità:</label>
          <input id="luminosità" type="number" value={luminosità} onChange={(e) => setLuminosità(e.target.value)}></input>
          <label htmlFor="stato">Stato:</label>
          <input id="stato" type="boolean" value={stato} onChange={(e) => setStato(e.target.value)}></input>
          <input type="submit" />
    </form>
      }
     <button onClick={() => fetchFromDb}>fetchFromDb</button>
    </div>
  );
}

export default App;
