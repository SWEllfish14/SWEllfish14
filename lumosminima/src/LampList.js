import axios from "axios";
import {useState} from 'react';
import { useQuery } from "react-query";
const headers = {
    
    'Content-Type': 'application/json'
  
}
export default function LampList({id}){
    const [lampList,setLampList] = useState([]);
        const {isLoading, error} = useQuery(["lamp"], () =>
        axios.get("http://localhost:3002/lamps/"+id,{headers})
        .then((res) => setLampList(res.data))
        )

        if(isLoading) return "Caricando..."
        if(error) return "Errore: " + error.message

        return(
            <>
                Lista lampioni
            <ul>
                {lampList.map(lamp => (
                    <li key={lamp.lamp_id}>
                       Lampione ID:{lamp.lamp_id} Luminosità:{lamp.brightness} Stato:{lamp.lamp_status? <>Acceso</>:<>Spento <button>Accendi</button></>}
                    </li>
                ) )}
            </ul>
            </>
        )
};