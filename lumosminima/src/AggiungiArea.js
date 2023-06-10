import Select from "react-select";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

export function AggiungiArea() {
    const [amministratori, setAmministratori] = useState([])
    const { isLoading, error, data, isFetching } = useQuery(["amministratore"], () =>
        axios.get("http://localhost:3002/amministratori")
            .then((res) => setAmministratori(res.data))
    )
    const headers = {
        'Content-Type': 'application/json'
    }
    
    const [zonaArea, setZonaArea] = useState("")
    const [statoArea, setStatoArea] = useState("")
    const [luminositaImpostataArea, setLuminositaImpostataArea] = useState("")
    const [luminositaDefaultArea, setLuminositaDefaultArea] = useState("")
    const [userAmministratore, setUserAmministratore] = useState("")
    const nuovaArea= { zonaArea:zonaArea, statoArea: statoArea, luminositaImpostataArea: luminositaImpostataArea, luminositaDefaultArea:luminositaDefaultArea , userAmministratore:userAmministratore }
    const aggiungiNuovaArea = async (e) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:3002/aggiungiArea", nuovaArea, { headers })
    }
    return (
        <>
            <form onSubmit={aggiungiNuovaArea}>
                <label htmlFor="zonaArea">Inserisci la zona dell'area:</label>
                <input id="zonaArea" type="text" value={zonaArea} onChange={(e) => setZonaArea(e.target.value)}></input>
                <label htmlFor="statoArea">Stato dell'area:</label>
                <input id="statoArea" size={1} type="text" value={statoArea} onChange={(e) => setStatoArea(e.target.value)}></input>
                <label htmlFor="luminositaImpostataArea">Luminosità impostata dell'area:</label>
                <input id="luminositaImpostataArea" type='number' value={luminositaImpostataArea} onChange={(e) => setLuminositaImpostataArea(e.target.value)}></input>
                <label htmlFor="luminositaDefaultArea">Luminosità default dell'area:</label>
                <input id="luminositaDefaultArea" type='number' value={luminositaDefaultArea} onChange={(e) => setLuminositaDefaultArea(e.target.value)}></input>
                <Select
                    name="amministratori"
                    options={amministratori}
                    value={userAmministratore}
                    onChange={setUserAmministratore}
                    getOptionLabel={(amministratore) => amministratore.Username}
                    getOptionValue={(amministratore) => amministratore.Username}></Select>
                <input type="submit" />
            </form>
        </>
    )
}