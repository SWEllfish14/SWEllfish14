import axios from "axios";
import { useState } from 'react';
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
            Lista aree con guasti
            {
                guastiLoading ? <p>Loading...</p> :
                    <ul>
                        {guastoList.map(guasto => (
                            <li key={guasto.ID}>
                                Guasto a {guasto.zona_geografica} all'area {guasto.id_area_illuminata} <button onClick={() => rimuoviAreaDaGuasto(guasto.ID)}>Rimuovi</button>
                            </li>
                        ))}
                    </ul>
            }

            Aggiungi una nuova area alla sezione guasti

            <Select
                name="amministratori"
                options={areaList}
                value={areaDaAggiungere}
                onChange={setAreaDaAggiungere}
                getOptionLabel={(area) => area.zona_geografica}
                getOptionValue={(area) => area.ID}></Select>
            <button onClick={() => aggiungiAreaGuasto(areaDaAggiungere)}>Aggiungi</button>
        </>

    )
}
