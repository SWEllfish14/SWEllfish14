import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export function Login() {
    const [errorePresente, setErrorePresente] = useState(false);
    const [loginRiuscito, setLoginRiuscito] = useState(false);
    const [nomeUtente, setNomeUtente] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const credenziali = { nomeUtente: nomeUtente, password: password }
    const headers = {
        'Content-Type': 'application/json'
    }

    const Autenticazione = async (e) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:3002/autenticazione", credenziali, { headers })
            .then(
                response => setLoginRiuscito(true),
                setTimeout(() => {
                    navigate('/')
                }, 1000),
                
            )
            .catch(error => {
                setErrorePresente(true)
            });
    }
    return (
        <form onSubmit={Autenticazione}>
            <label htmlFor="nomeUtente">Nome utente</label>
            <input id="nomeUtente" type='text' value={nomeUtente} onChange={(e) => setNomeUtente(e.target.value)}></input>
            <label htmlFor="password">Password</label>
            <input id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input type="submit" />
            {errorePresente ? <>Username o password incorretta</> : <></>}
            {loginRiuscito ? <>Login riuscito!</> : <></>}
        </form>
    )

}