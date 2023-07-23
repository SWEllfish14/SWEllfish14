import axios from "axios";
import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import Select from "react-select";
import { AggiungiArea } from "./AggiungiArea";
export function GestioneGuasti() {
    const headers = {
        'Content-Type': 'application/json'
    }
    const [areaList, setAreaList] = useState([]);
    const [areaDaAggiungere, setAreaDaAggiungere] = useState("");
    const [guastoList, setGuastoList] = useState([]);
    const [NumeroGuasti] = useState([]);
    const { } = useQuery(["amministratore"], () =>
        axios.get("http://localhost:3002/aree")
            .then((res) => setAreaList(res.data))
    )
    const { isLoading: guastiLoading } = useQuery(["guasto"], () =>
        axios.get("http://localhost:3002/guasti")
            .then((res) => setGuastoList(res.data))
    )
    const rimuoviAreaDaGuasto = (id) => {
        axios.post("http://127.0.0.1:3002/rimuoviGuasto" , null, {
            params: {
              id: id
            }}).then((res) =>
            axios.get("http://localhost:3002/guasti")
                .then((res) => setGuastoList(res.data)))
    }

    
    const getNumeroGuasti = () =>{
        axios.post("http://127.0.0.1:3002/numeroGuasti" , null, {}).then((res) =>
            NumeroGuasti(res.data))
    return (
        <>
        <div>
            Numero Guasti a sistema: {NumeroGuasti}
            </div>
            </>
    )
    }
   
    const aggiungiAreaGuasto = (id) => {
        axios.post("http://127.0.0.1:3002/AggiungiGuasto" , null, {
            params: {
              id: id
            }}).then((res) =>
            axios.get("http://localhost:3002/guasti")
                .then((res) => setGuastoList(res.data)))
    }
    return (
        <>
        <div class ="box">
            Aggiungi una nuova area alla sezione guasti
            <Select
                name="amministratori"
                options={areaList}
                value={areaDaAggiungere}
                onChange={setAreaDaAggiungere}
                getOptionLabel={(area) => area.zona_geografica}
                getOptionValue={(area) => area.ID}></Select>
            <button class = "button is-success" onClick={() => aggiungiAreaGuasto(areaDaAggiungere)}>Aggiungi</button>
            </div>
            
        <div class ="box">
            Lista aree con guasti
        </div>
            {
                guastiLoading ? <p>Loading...</p> :
                    <ul>
                        {guastoList.map(guasto => (
                           <div class="tile is-ancestor">
                            <div class="tile is-parent">
                              <article class="tile is-child box">
                            <li key={guasto.ID}>
                                <h1>{guasto.zona_geografica}</h1>
                                <p>Guasto nell'area {guasto.id_area_illuminata}</p>
                                <p>Località: {guasto.localita}</p>
                                <li><button class ="button is-success" onClick={() => rimuoviAreaDaGuasto(guasto.ID)}>Rimuovi</button></li>
                            </li>
                            </article>
                            </div>
                            </div> 
                        ))}
                    </ul>
                    
            }
            
        </>

    )
}


