import { observer } from "mobx-react-lite"
import {IAggiungiLampioneViewModel } from "../ViewModel/AggiungiLampioneViewModel";

 interface Props {
   viewModel:IAggiungiLampioneViewModel;
   
 }
 const AggiungiLampioneView = ({viewModel}: Props) => (
  <div>
  <form action="" method="post" onSubmit={viewModel.aggiungiLampione} onFocus={viewModel.clearError}>
  <div className ="tile is-ancestor">
  <div className="tile is-parent">
  <article className="tile is-child box">
  <h1>Aggiunta Lampione</h1>
  <p className="menu-label">
                <label htmlFor="IP">IP</label>
                <input
                  id="ip"
                  name="ip"
                  className="input"
                  type="text"
                  placeholder="IP lampione"
                ></input> 

  <label htmlFor="tipo_interazione">Tipo interazione con il lampione</label>
      <select id="tipo_interazione" name="tipo_interazione" className="input">
      <option value="PUSH">PUSH</option>
      <option value ="PULL">PULL</option>
      </select>

      <label htmlFor="luminositaDefault">Luminosità standard</label>
                <input
                  id="luminositaDefault"
                  name="luminositaDefault"
                  className="input"
                  type="number"
                  min={0}
                  max={10}
                  placeholder="Luminosità che l'impianto produrrà quando non ci sono rilevamenti di utenti stradali"
                ></input>

  <label htmlFor="luminositaDefault">Luminosità Manuale</label>
                <input
                  id="luminositaManuale"
                  name="luminositaManuale"
                  className="input"
                  type="number"
                  min={0}
                  max={10}
                  placeholder="Luminosità che l'impianto produrrà quando è in modalità manuale"
                ></input>

  <label htmlFor="stato">Stato</label>
                <select id="stato" name="stato" className="input">
                  <option value="0">Spento</option>
                  <option value="1">Acceso</option>
                </select>
                

    <label htmlFor="area">Id area illuminata afferenza</label>
    <input
                  id="area"
                  name="area"
                  className="input"
                  type="text"
                  value={viewModel.areaDetails().data?.ID.toString()}
                  readOnly
                ></input>
                  
      </p>
      
      </article>
      </div>
      </div>

      <div className ="tile is-ancestor">
      <div className="tile is-parent">
      <article className="tile is-child box">
      <button type="submit" className="button is-success">Conferma e Inserisci</button>
      <button className="button is-outlined">Cancella campi</button>
      </article>
      </div>
      </div>
      </form>
      {viewModel.submitIsError() ===true ? <>{viewModel.submitError()}</>:<></>}
      <></>
      </div>
      

   );
 


export default observer(AggiungiLampioneView)

