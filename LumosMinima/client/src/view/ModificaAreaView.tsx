import { observer } from "mobx-react-lite";
import { IModificaAreaViewModel } from "../ViewModel/ModificaAreaViewModel";
interface Props {
  viewModel: IModificaAreaViewModel;
}
const ModificaAreaView = ({ viewModel }: Props) => (
  <div>
    <form action="" method="post" onSubmit={viewModel.submit}>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <h1>Modifica area</h1>
            <p className="menu-label">
              <label htmlFor="citta">Nome città</label>
              <input
                id="citta"
                name="citta"
                className="input"
                type="text"
                placeholder={viewModel.areaDetails().data?.città}
              ></input>
              <label htmlFor="zonaGeografica">Zona geografica città</label>
              <input
                id="zonaGeografica"
                name="zonaGeografica"
                className="input"
                type="text"
                placeholder={viewModel.areaDetails().data?.zona_geografica_città}
              ></input>
              <label htmlFor="modalita">Modalità funzionamento</label>
              <select id="modalita"
                name="modalita" className="input">
                <option value="A">Automatico</option>
                <option value="M">Manuale</option>
              </select>
              <label htmlFor="stato">Stato</label>
              <select id="stato" name="stato" className="input">
                <option value="0">Spento</option>
                <option value="1">Acceso</option>
              </select>
              
              <label htmlFor="luminositaDefault">Luminosità default</label>
              <input
                id="luminositaDefault"
                name="luminositaDefault"
                className="input"
                type="number"
                min={0}
                max={10}
                placeholder={viewModel.areaDetails().data?.luminosità_standard.toString()}
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
                placeholder={viewModel.areaDetails().data?.luminosità_rilevamento.toString()}
              ></input>
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

export default observer(ModificaAreaView);
