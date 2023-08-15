import { observer } from "mobx-react-lite"
import {IModificaSensoreViewModel } from "../ViewModel/ModificaSensoreViewModel";
import { useParams } from "react-router-dom";
 interface Props {
   viewModel:IModificaSensoreViewModel;
 }
 const ModificaSensoreView = ({viewModel}: Props) => (
  <div>
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Modifica Sensore</h1>
<p className="menu-label">
    <h1>IP</h1>
    <input className="input" type="text" placeholder={viewModel.sensoreDetails().data?.IP}></input>
    <h1>Polling time</h1>
    <input className="input" type="text" placeholder={viewModel.sensoreDetails().data?.polling_time.toString()}></input>
    <h1>Localizzazione geografica</h1>
    <input className="input" type="text" placeholder={viewModel.sensoreDetails().data?.zona_geografica_posizionamento.toString()}></input>

    <h1>Tipo interazione con il sensore</h1>
    <div className="select is-info">
    <select>
    <option>PUSH</option>
    <option>PULL</option>
    </select>
    </div>
    
    <h1>Raggio Azione</h1>
    <input className="input" type="text" placeholder={viewModel.sensoreDetails().data?.raggio_azione.toString()}></input>


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
 


export default observer(ModificaSensoreView)

