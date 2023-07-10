import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LampList from "./LampList";
import { useNavigate } from "react-router-dom";
import { Area } from "./Area";
import { Link } from "react-router-dom";
import { Header } from "./Header";
const headers = {
  "Content-Type": "application/json",
};



export function GestioneAree() {
    const params = useParams();
    const id = params.id;
    const [areaList, setAreaList] = useState([]);
    const { isLoading, error, data, isFetching } = useQuery(["area"], () =>
        axios.get("http://localhost:3002/aree")
            .then((res) => setAreaList(res.data))
    )
    return (
        <>
        <div class ="tile is-ancestor">
        <div class="tile is-parent">
        <article class="tile is-child box">
        <h1>Lista aree</h1>
        <p class="menu-label">
            
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
        </p>
        </article>
        </div>
        </div>
        </>
    )

}