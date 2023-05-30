import axios from "axios";
import { useState } from 'react';
import { useQuery } from "react-query";
import { Area } from "./Area";
import { Link } from "react-router-dom";

export function GestioneAree() {
    const [areaList, setAreaList] = useState([]);

    const { isLoading, error, data, isFetching } = useQuery(["area"], () =>
        axios.get("http://localhost:3002/aree")
            .then((res) => setAreaList(res.data))
    )
    if (error) return "An error has occurred: " + error.message;
    return (
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
    )

}