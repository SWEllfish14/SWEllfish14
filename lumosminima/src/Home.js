import {Grid,Item} from '@mui/material'
import { Header } from './Header'
import axios from "axios";
import { useState } from 'react';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";


var styles = `
    .menu-list { 
        font-family: Georgia,Cambria,"Times New Roman",Times,serif;
        color: red;
    }
    .menu-list-border-left{
        1px solid 
    }
`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

export function Home() {
    const [areaList, setAreaList] = useState([]);
    const [guastoList, setGuastoList] = useState([]);
    const { isLoading:areaLoading, error, data, isFetching } = useQuery(["area"], () =>
        axios.get("http://localhost:3002/aree")
            .then((res) => setAreaList(res.data))
            )
    const {isLoading:guastiLoading} = useQuery(["guasto"], () =>
    axios.get("http://localhost:3002/guasti")
        .then((res) => setGuastoList(res.data))
        )
    return (
        
        <>
        <div class ="tile is-ancestor">
            <div class="tile is-parent">
            <article class="tile is-child box">
            
            <p class="menu-label">
                Stato sistema
            </p>
        </article>
        </div>

        <div class="tile is-child">
        <article class="tile is-child box">
                    
                    Gestione aree
                    {areaLoading ? <p>Loading...</p> :
                    
                <ul>
                    {areaList.map(area => (
                        <li key={area.ID}>
                            <Link to={{
                                pathname: `/area/${area.ID}`
                            }}>{area.zona_geografica}</Link>
                        </li>
                    ))}
                </ul>}
                </article>
                </div>
            </div>  

            <div class = "tile is-ancestor">
                <div class="tile is-parent">
                 <article class="tile is-child box">
                    Gestione guasti
                    {
                        guastiLoading ? <p>Loading...</p>:
                        <ul>
                            {guastoList.map(guasto => (
                                <li key={guasto.ID}>
                                   Guasto a {guasto.zona_geografica} 
                                </li>
                            ))}
                        </ul>
                    }
                    </article>
                </div>
                <div class="tile is-parent">
        <article class="tile is-child box">
                    Altro
                
            </article>
            </div>
            </div>
        </>

    )
}