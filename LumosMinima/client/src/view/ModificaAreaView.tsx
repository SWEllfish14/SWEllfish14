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
<h1>Aggiunta area</h1>
<p className="menu-label">
    <h1>Nome città</h1>
    <input className="input" type="text" placeholder="Nome città in cui si trova il sistema di illuminazione"></input>
    <h1>Zona geografica città</h1>
    <input className="input" type="text" placeholder="Zona geografica della città in cui si trova il sistema di illuminazione"></input>
    <h1>Luminosità default</h1>
    <input className="input" type="text" placeholder="Luminosità che l'impianto produrrà quando non ci sono rilevamenti di utenti stradali"></input>
    <h1>Luminosità rilevamento </h1>
    <input className="input" type="text" placeholder="Luminosità che l'imianto produrrà quando ci sarà un rilevamento di un utente stradale"></input>

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

