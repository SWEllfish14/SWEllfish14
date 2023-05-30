import axios from "axios";
import {useState} from 'react';
import { useQuery } from "react-query";
import {useLocation} from "react-router-dom"
import { useParams } from 'react-router-dom';
const headers = {
    
    'Content-Type': 'application/json'
  
}

export function Area(){
    const params = useParams();
    
    const [lampList,setLampList] = useState([]);
        const {isLoading, error} = useQuery(["lamp"], () =>
        axios.get("http://localhost:3002/area/"+params.id,{headers})
        .then((res) => setLampList(res.data))
        )
        return (
            <div>
            <p>Area </p>
            {isLoading ? <p>Loading...</p>:
            <>
            
            <ul>
                {lampList.map(lamp => (
                    <li key={lamp.IP}>
                       Lampione all'ip:{lamp.IP} Stato:{lamp.status}
                    </li>
                ) )}
            </ul>
            </>
            }
            
        </div>
        )
}