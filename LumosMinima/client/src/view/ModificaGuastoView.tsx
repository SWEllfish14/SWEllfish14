import { observer } from "mobx-react-lite";
import { IModificaGuastoViewModel } from "../ViewModel/ModificaGuastoViewModel";
interface Props {
  viewModel: IModificaGuastoViewModel;
}
const ModificaGuastoView = ({ viewModel }: Props) => (

  <div>
    <form action="" method="post" onSubmit={viewModel.submit} onFocus={viewModel.clearError}>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <h1>Modifica guasto</h1>
            <p className="menu-label">
              <label htmlFor="id">ID città</label>
              <input
                id="id"
                name="id"
                className="input"
                type="text"
                value={viewModel.guastoDetails().data?.ID.toString()}
                readOnly
              ></input>
              
              {/* <label htmlFor="citta">Nome città</label>
              <input
                id="citta"
                name="citta"
                className="input"
                type="text"
                placeholder={viewModel.guastoDetails().data?.città}
                defaultValue={viewModel.guastoDetails().data?.città}
              ></input>
              <label htmlFor="zonaGeografica">Zona geografica città</label>
              <input
                id="zonaGeografica"
                name="zonaGeografica"
                className="input"
                type="text"
                placeholder={viewModel.guastoDetails().data?.zona_geografica_città}
                defaultValue={viewModel.guastoDetails().data?.zona_geografica_città}
              ></input>
              <label htmlFor="modalita">Modalità funzionamento</label>
              <select id="modalita"
                name="modalita" className="input">
                <option value="A">Automatico</option>
                <option value="M">Manuale</option>
                <option defaultValue = {viewModel.guastoDetails().data?.modalità_funzionamento.toString()}></option>
              </select>
              <label htmlFor="stato">Stato</label>
              <select id="stato" name="stato" className="input">
                <option value="0">Spento</option>
                <option value="1">Acceso</option>
                <option defaultValue={viewModel.guastoDetails().data?.stato}></option>
              </select>
              
              <label htmlFor="luminositaDefault">Luminosità default</label>
              <input
                id="luminositaDefault"
                name="luminositaDefault"
                className="input"
                type="number"
                min={0}
                max={10}
                placeholder={viewModel.guastoDetails().data?.luminosità_standard.toString()}
                defaultValue={viewModel.guastoDetails().data?.luminosità_standard.toString()}
              ></input>
              <label htmlFor="luminositaRilevamento">
                Luminosità rilevamento{" "}
              </label>
              <input
                id="luminositaRilevamento"
                name="luminositaRilevamento"
                className="input"
                type="number"
                min={0}
                max={10}
                placeholder={viewModel.guastoDetails().data?.luminosità_rilevamento.toString()}
                defaultValue={viewModel.guastoDetails().data?.luminosità_rilevamento.toString()}
              ></input> */}
            </p>
          </article>
        </div>
      </div>

      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <button type="submit" className="button is-success" >
              Conferma e Inserisci
            </button>
            <button className="button is-outlined">Cancella campi</button>
          </article>
        </div>
      </div>
    </form>
    {viewModel.submitIsError() ===true ? <>{viewModel.submitError()}</>:<></>}
    <></>
  </div>

  
);

export default observer(ModificaGuastoView);
