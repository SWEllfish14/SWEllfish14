import { observer } from "mobx-react-lite"
import {IAggiungiSensoreViewModel } from "../ViewModel/AggiungiSensoreViewModel";

 interface Props {
   viewModel:IAggiungiSensoreViewModel;
 }
 const AggiungiSensoreView = ({viewModel}: Props) => (
  <div>
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Aggiunta Sensore</h1>
<p className="menu-label">
    <h1>ID Sensore</h1>
    <input className="input" type="text" placeholder="Inserisci ID"></input>

    <h1>IP Sensore</h1>
    <input className="input" type="text" placeholder="Inserisci l'indirizzo IP del Sensore"></input>

    <h1>Polling time</h1>
    <input className="input" type="text" placeholder="Inserisci il polling time del Sensore"></input>

    <h1>Posizionamento geografico</h1>
    <input className="input" type="text" placeholder="Inserisci la posizione geografica esatta del Sensore"></input>

    <h1>Tipo interazione</h1>
    <div className="select is-info">
    <select>
    <option>PUSH</option>
    <option>PUll</option>
    </select>
    </div>

    <h1>Raggio azione</h1>
    <input className="input" type="text" placeholder="Inserisci il raggio di azione in metri del Sensore"></input>

    <h1>Area Illuminata afferenza</h1>
    <input className="input" type="text" placeholder="Luminosità che l'impianto produrrà quando non ci sono rilevamenti di utenti stradali"></input>

    </p>
    
    </article>
    </div>
    </div>

    <div className ="tile is-ancestor">
    <div className="tile is-parent">
    <article className="tile is-child box">
    <button className="button is-success">Conferma e Inserisci</button>
    <button className="button is-outlined">Cancella campi</button>
    </article>
    </div>
    </div>
    </div>

   )
 


export default observer(AggiungiSensoreView)

