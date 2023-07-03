import axios from "axios";
import { useState } from 'react';
import { useQuery } from "react-query";
import { Area } from "./Area";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export function GestioneAree() {
    const [areaList, setAreaList] = useState([]);
    
    const { isLoading, error, data, isFetching } = useQuery(["area"], () =>
        axios.get("http://localhost:3002/aree")
            .then((res) => setAreaList(res.data))
    )
    return (
        <>
            <Header></Header>
        <div>
            <p>Lista aree</p>
            {isLoading ? <p>Loading...</p> :
                <ul>
                    {areaList.map(area => (
                        <li key={area.ID}>
                            <Link to={{
                                pathname: `/area/${area.ID}`
                            }}>{area.zona_geografica}</Link>
                        </li>
                    ))}
                </ul>}

        </div>
        </>
    )

}