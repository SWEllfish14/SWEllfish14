import { observer } from "mobx-react-lite"
import {IAggiungiLampioneViewModel } from "../ViewModel/AggiungiLampioneViewModel";

 interface Props {
   viewModel:IAggiungiLampioneViewModel;
 }
 const AggiungiLampioneView = ({viewModel}: Props) => (
  <div>
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Aggiunta Lampione</h1>
<p className="menu-label">
    <h1>ID Lampione</h1>
    <input className="input" type="text" placeholder="Inserisci ID"></input>

    <h1>IP lampione</h1>
    <input className="input" type="text" placeholder="Inserisci l'indirizzo IP del lampione"></input>

    <h1>Tipo interazione con il lampione</h1>
    <div className="select is-info">
    <select>
    <option>PUSH</option>
    <option>PULL</option>
    </select>
    </div>

    <h1>Luminosità default</h1>
    <div className="select is-info">
    <select>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    <option>6</option>
    <option>7</option>
    <option>8</option>
    <option>9</option>
    <option>10</option>
    </select>
    </div>

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
 


export default observer(AggiungiLampioneView)

