import { observer } from "mobx-react-lite"
import {IModificaAreaViewModel } from "../ViewModel/ModificaAreaViewModel";
import { useParams } from "react-router-dom";
 interface Props {
   viewModel:IModificaAreaViewModel;
 }
 const ModificaAreaView = ({viewModel}: Props) => (
  <div>
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Modifica area</h1>
<p className="menu-label">
    <h1>Nome città</h1>
    <input className="input" type="text" placeholder={viewModel.areaDetails().data?.città}></input>
    <h1>Zona geografica città</h1>
    <input className="input" type="text" placeholder={viewModel.areaDetails().data?.zona_geografica_città}></input>
    <h1>Luminosità default</h1>
    <input className="input" type="text" placeholder={viewModel.areaDetails().data?.luminosità_standard.toString()}></input>
    <h1>Luminosità rilevamento </h1>
    <input className="input" type="text" placeholder={viewModel.areaDetails().data?.luminosità_rilevamento.toString()}></input>

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
 


export default observer(ModificaAreaView)

