import {Grid,Item} from '@mui/material'
import { Header } from './Header'
import axios from "axios";
import { useState } from 'react';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

var styles = `
    .menu-list { 
        font-family: Georgia,Cambria,"Times New Roman",Times,serif;
    }
    .menu-list-border-left{
        1px solid 
    }
    }
`


var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


export function Home() {

    const [areaList, setAreaList] = useState([]);
    const [guastoList, setGuastoList] = useState([]);
    const [numeroGuasti, setNumeroGuasti] = useState();
    const [numeroLampioni, setNumeroLampioni] = useState();
    const [numeroSensori, setNumeroSensori] = useState();
    const { isLoading:areaLoading, error, data, isFetching } = useQuery(["areelimit"], () =>
        axios.get("http://localhost:3002/areelimit")
            .then((res) => setAreaList(res.data))
            )
    const {isLoading:guastiLoading} = useQuery(["guasto"], () =>
    axios.get("http://localhost:3002/guasti")
        .then((res) => setGuastoList(res.data))
        )
    const {isLoading:numeroGuastiLoading} = useQuery(["numeroguasto"], () =>
    axios.get("http://localhost:3002/numeroGuasti")
        .then((res) => setNumeroGuasti(res.data)))

        const {isLoading:numeroLampioniLoading} = useQuery(["numerolampioni"], () =>
        axios.get("http://localhost:3002/numeroLampioni")
            .then((res) => setNumeroLampioni(res.data)))

            const {isLoading:numeroSensoriLoading} = useQuery(["numerosensori"], () =>
            axios.get("http://localhost:3002/numeroSensori")
                .then((res) => setNumeroSensori(res.data)))
    return (
        <>
        <div class ="tile is-ancestor">
        <div class="tile is-parent">
        <article class="tile is-child box">
        <h1>Stato sistema</h1>
        <p class="menu-label">
            <li>Numero Guasti a sistema:{numeroGuastiLoading ? <p>Loading...</p> : numeroGuasti}</li>
            <li>Numero lampioni a sistema:{numeroLampioniLoading ? <p>Loading...</p> : numeroLampioni}</li>
            <li>Numero sensori a sistema:{numeroSensoriLoading ? <p>Loading...</p> : numeroSensori}</li> 
        </p>
    </article>
    </div>

        <div class="tile is-child">
       <article class="tile is-child box">
        <h1>Gestione aree aggiunte di recente</h1>  
             <p class ="menu-label">      
                    {areaLoading ? <p>Loading...</p> :
                    
                <ul>
                    
                    {areaList.map(area => (
                        <li key={area.ID}>
                            {area.zona_geografica}, Stato: {area.stato == 1? 'On' : 'Off'}, Località: {area.localita}
                            <p>
                            <button className ="button is-small is-responsive ">
                            <Link to={{
                                pathname: `/area/${area.ID}`
                            }}>Gestisci area</Link>
                            </button>
                            </p>
                        </li>
                        
                    ))}
                    
                </ul>}
                </p>
                </article>
                </div>
                </div>
              

            <div class = "tile is-ancestor">
            <div class="tile is-parent">
            <article class="tile is-child box">
                    <h1>Ultimi guasti inseriti a sistema</h1>
                    <p class="menu-label">
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
                    <button className="button is-success">
                    <Link to={{
                                 pathname: `/guasti/`
                                }}>Gestisci Guasti </Link>
                        </button>
                        </p>
                    </article>
                </div>



         <div class="tile is-parent">
         <article class="tile is-child box">
                    <h1>Altro</h1>
                    <p class="menu-list">
                    <li>Manuale Utente</li>
                    </p>
            </article>
            </div>
            </div>
        </>

    )
}