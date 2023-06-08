import {Grid,Item} from '@mui/material'
import { Header } from './Header'
import axios from "axios";
import { useState } from 'react';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
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
            <Header></Header>
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    Generali
                    <ul>
                        <li>Stato</li>
                        <li>Guasti</li>
                        <li>Manuale</li>
                    </ul>
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
                    Gestione guasti
                    {
                        guastiLoading ? <p>Loading...</p>:
                        <ul>
                            {guastoList.map(guasto => (
                                <li key={guasto.ID}>
                                   Guasto a {guasto.zona_geografica} all'area {guasto.id_area_illuminata}
                                </li>
                            ))}
                        </ul>
                    }
                </Grid>
                <Grid item xs={6}>
                    Altro
                </Grid>
            </Grid>
        </>

    )
}