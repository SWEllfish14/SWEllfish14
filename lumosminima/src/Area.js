import axios from "axios";
import {useState} from 'react';
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
const headers = {
    
    'Content-Type': 'application/json'
  
}

export function Area(){
    const params = useParams();
    
    const [lampList,setLampList] = useState([]);
        const {isLoading, error} = useQuery(["lamp"], () =>
        axios.get("http://localhost:3002/lamps/"+params.id,{headers})
        .then((res) => setLampList(res.data))
        )
    const [area,setArea] = useState("");
    const {isLoading:areaLoading,error:areaError}= useQuery(["area"],  () =>
    axios.get("http://localhost:3002/area/"+params.id,{headers})
    .then((res) => setArea(res.data)))
        return (
            <div>
            <p>Area {params.id}</p>
            {isLoading ? <p>Loading...</p>:
            <>
            <ul>
                {lampList.map(lamp => (
                    <li key={lamp.lamp_id}>
                       Lampione ID:{lamp.lamp_id} Luminosità:{lamp.brightness} Stato:{lamp.lamp_status? <>Acceso</>:<>Spento <button>Accendi</button></>}
                    </li>
                ) )}
            </ul>
            </>
            }
            {areaLoading ? <p>Loading</p>:
            <>
                {area.map(info =>(
                    <p>Luminosità di default{info.luminosita_default} Luminosità impostata{info.luminosita_impostata}</p>
                ))}
                
            </>
            }
        </div>
        )
}