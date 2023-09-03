import { observer } from "mobx-react-lite"
import {IAggiungiSensoreViewModel } from "../ViewModel/AggiungiSensoreViewModel";

 interface Props {
   viewModel:IAggiungiSensoreViewModel;
 }
 const AggiungiSensoreView = ({viewModel}: Props) => (
  <div>
    <form action="" method="post" onSubmit={viewModel.submit}>
      <div id="sensore-margin" className="tile-is-ancestor">
        <div className="tile-is-parent">
          <article className="art">
            <h1>Aggiunta sensore</h1>
            <p className="width-area">
              <label className="login-label" htmlFor="ip">Indirizzo IP sensore</label>
              <input
                id="ip"
                name="ip"
                className="input"
                type="text"
                placeholder="Indirizzo ip del sensore"
              ></input>
              <label className="login-label" htmlFor="polling">Polling time sensore</label>
              <input
                id="polling"
                name="polling"
                className="input"
                type="text"
                placeholder="Polling time del sensore"
              ></input>
              <label className="login-label" htmlFor="zona_geografica">Zona Geografica</label>
              <input
                id="zona_geografica"
                name="zona_geografica"
                className="input"
                type="text"
                placeholder="Zona geografica in cui è posizionato il senore"
              ></input>
              <label className="login-label" htmlFor="tipo_interazione">Stato</label>
              <select id="tipo_interazione" name="tipo_interazione" className="input">
                <option value="PUSH">PUSH</option>
                <option value="PULL">PULL</option>
              </select>
              
              <label className="login-label" htmlFor="raggio_azione">Raggio azione del sensore</label>
              <input
                id="raggio_azione"
                name="raggio_azione"
                className="input"
                type="number"
                min={0}
                max={100}
                placeholder="Raggio Azione del sensore"
              ></input>
               <label className="login-label" htmlFor="id_area">Id area illuminata afferenza</label>
    <input
                  id="id_area"
                  name="id_area"
                  className="input"
                  type="text"
                  value={viewModel.areaDetails().data?.ID.toString()}
                  readOnly
                ></input>
            </p>
          </article>
        </div>
      </div>
    <div className ="tile-is-ancestor">
    <div className="tile-is-parent">
    <article className="tile-is-child-box">
    <button type="submit" className="button is-success">Conferma e Inserisci</button>
    <button className="button is-outlined">Cancella campi</button>
    </article>
    </div>
    </div>
    </form>
    {viewModel.submitIsError() ===true ? <>{viewModel.submitError()}</>:<></>}
      <></>
    </div>

   )
 


export default observer(AggiungiSensoreView)

