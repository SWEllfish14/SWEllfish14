import { observer } from "mobx-react-lite"
import {IModificaLampioneViewModel } from "../ViewModel/ModificaLampioneViewModel";

 interface Props {
   viewModel:IModificaLampioneViewModel;
   
 }
 const ModificaLampioneView = ({viewModel}: Props) => (
  <div>
  <form action="" method="post" onSubmit={viewModel.modificaLampione}>
  <div className ="tile is-ancestor">
  <div className="tile is-parent">
  <article className="tile is-child box">
  <h1>Modifica Lampione</h1>

                <label htmlFor="id">ID</label>
                <input
                  id="id"
                  name="id"
                  className="input"
                  type="text"
                  value = {viewModel.dettagliLampione().data?.ID.toString()}
                  readOnly
                ></input> 
  <p className="menu-label">
                <label htmlFor="IP">IP</label>
                <input
                  id="ip"
                  name="ip"
                  className="input"
                  type="text"
                  placeholder={viewModel.dettagliLampione().data?.IP.toString()}
                  defaultValue={viewModel.dettagliLampione().data?.IP.toString()}
                ></input> 

  <label htmlFor="tipo_interazione">Tipo interazione con il lampione</label>
      <select id="tipo_interazione" name="tipo_interazione" className="input">
      <option value="PUSH">PUSH</option>
      <option value ="PULL">PULL</option>
      <option defaultValue = {viewModel.dettagliLampione().data?.tipo_interazione.toString()}></option>
      </select>

      <label htmlFor="luminositaDefault">Luminosità default</label>
                <input
                  id="luminositaDefault"
                  name="luminositaDefault"
                  className="input"
                  type="number"
                  min={0}
                  max={10}
                  placeholder="Luminosità che il lampione produrrà quando non ci sono rilevamenti"
                  defaultValue="1"
                ></input>

  <label htmlFor="luminositaManuale">Luminosità impostata</label>
                <input
                  id="luminositaManuale"
                  name="luminositaManuale"
                  className="input"
                  type="number"
                  min={0}
                  max={10}
                  placeholder= "Luminosità che il lampione produrrà in modalità manuale"
                  defaultValue= "1"
                ></input>

  <label htmlFor="stato">Stato</label>
                <select id="stato" name="stato" className="input">
                  <option value="0">Spento</option>
                  <option value="1">Acceso</option>
                  <option defaultValue="0"></option>
                </select>
                

      </p>
      
      </article>
      </div>
      </div>

      <div className ="tile is-ancestor">
      <div className="tile is-parent">
      <article className="tile is-child box">
      <button type="submit" className="button is-success">Conferma e Inserisci</button>
      <button className="button is-outlined">Cancella campi</button>
      <button
              className="button is-danger"
                 //onClick={() => viewModel.eliminaLampione(Id)}
            > Elimina Lampione </button>
      </article>
      </div>
      </div>
      {viewModel.submitIsError() ===true ? <>{viewModel.submitError()}</>:<></>}
      <></>
      </form>
      </div>
      

   );
 


export default observer(ModificaLampioneView)

