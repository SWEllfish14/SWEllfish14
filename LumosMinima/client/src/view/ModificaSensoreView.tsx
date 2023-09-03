import { observer } from "mobx-react-lite"
import {IModificaSensoreViewModel } from "../ViewModel/ModificaSensoreViewModel";
import { useParams } from "react-router-dom";
 interface Props {
   viewModel:IModificaSensoreViewModel;
 }
 const ModificaSensoreView = ({viewModel}: Props) => (
  <div>
  <form action="" method="post" onSubmit={viewModel.submit} onFocus={viewModel.clearError}>
    <div id="msensore-margin"className="tile-is-ancestor">
      <div className="tile-is-parent">
        <article className="art">
          <h1 className="width-area">Modifica sensore</h1>
          <p className="width-area">
            <label className="login-label" htmlFor="id">ID Sensore</label>
            <input
              id="id"
              name="id"
              className="input"
              type="text"
              value={viewModel.sensoreDetails().data?.ID.toString()}
              readOnly
            ></input>
            <label className="login-label" htmlFor="ip">IP sensore</label>
            <input
              id="ip"
              name="ip"
              className="input"
              type="text"
              placeholder={viewModel.sensoreDetails().data?.IP.toString()}
              defaultValue ={viewModel.sensoreDetails().data?.IP.toString()}
            ></input>
            <label className="login-label" htmlFor="polling_time">Polling Time</label>
            <input
              id="polling_time"
              name="polling_time"
              className="input"
              type="text"
              placeholder={viewModel.sensoreDetails().data?.polling_time.toString()}
              defaultValue={viewModel.sensoreDetails().data?.polling_time.toString()}
            ></input>
            <label className="login-label" htmlFor="zona_geografica">Zona Geografica Posizionamento</label>
            <input
              id="zona_geografica"
              name="zona_geografica"
              className="input"
              type="text"
              placeholder={viewModel.sensoreDetails().data?.zona_geografica_posizionamento}
              defaultValue={viewModel.sensoreDetails().data?.zona_geografica_posizionamento}
            ></input>
            <label className="login-label" htmlFor="tipo_interazione">Tipo Interazione</label>
            <select id="tipo_interazione" name="tipo_interazione" className="input">
              <option value="PUSH">PUSH</option>
              <option value="PULL">PULL</option>
              <option defaultValue={viewModel.sensoreDetails().data?.tipo_interazione.toString()}></option>
            </select>
            
            <label className="login-label" htmlFor="raggio_azione">Raggio Azione</label>
            <input
              id="raggio_azione"
              name="raggio_azione"
              className="input"
              type="text"
              min={0}
              max={100}
              placeholder={viewModel.sensoreDetails().data?.raggio_azione.toString()}
              defaultValue={viewModel.sensoreDetails().data?.raggio_azione.toString()}
            ></input>
          </p>
        </article>
      </div>
    </div>

    <div className="tile-is-ancestor">
      <div className="tile-is-parent">
        <article id="conferma" className="art">
          <button type="submit" className="button is-success" >
            Conferma e Inserisci
          </button>
          <button className="button is-outlined">Cancella campi</button>
          <button
              className="danger"
                 onClick={() => viewModel.eliminaSensore()}
            > Elimina Sensore </button>
        </article>
      </div>
    </div>
  </form>
  {viewModel.submitIsError() ===true ? <>{viewModel.submitError()}</>:<></>}
  <></>
</div>


   )
 


export default observer(ModificaSensoreView)

