import { observer } from "mobx-react-lite"
import {IModificaLampioneViewModel } from "../ViewModel/ModificaLampioneViewModel";

 interface Props {
   viewModel:IModificaLampioneViewModel;
 }
 const ModificaLampioneView = ({viewModel}: Props) => (
  <div>
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Modifica Lampione</h1>
<p className="menu-label">
    <h1>IP lampione</h1>
    <input className="input" type="text" placeholder="Ip lampione"></input>

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
 


export default observer(ModificaLampioneView)

