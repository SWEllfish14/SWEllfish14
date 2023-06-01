import {Grid,Item} from '@mui/material'
import { Header } from './Header'
import axios from "axios";
import { useState } from 'react';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
export function Home() {
    const [areaList, setAreaList] = useState([]);

    const { isLoading, error, data, isFetching } = useQuery(["area"], () =>
        axios.get("http://localhost:3002/aree")
            .then((res) => setAreaList(res.data))
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
                </Grid>
                <Grid item xs={6}>
                    Gestione guasti
                </Grid>
                <Grid item xs={6}>
                    Altro
                </Grid>
            </Grid>
        </>

    )
}