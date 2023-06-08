import axios from "axios";
import {useState} from 'react';
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import LampList from "./LampList";
const headers = {
    
    'Content-Type': 'application/json'
  
}

export function Area(){
    const params = useParams();
    const id = params.id
    
    const [area,setArea] = useState("");
    const {isLoading:areaLoading,error:areaError}= useQuery(["area"],  () =>
    axios.get("http://localhost:3002/area/"+params.id,{headers})
    .then((res) => setArea(res.data)))
        return (
            <div>
            <p>Area {params.id}</p>
            
            <>
            <LampList id={id}/>
            </>
            
            {areaLoading ? <p>Loading</p>:
            <>
                
                    <p>Luminosità di default{area.luminosita_default} Luminosità impostata{area.luminosita_impostata}</p>
                
                
            </>
            }
        </div>
        )
}