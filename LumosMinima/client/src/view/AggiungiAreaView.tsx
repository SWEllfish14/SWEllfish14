import { observer } from "mobx-react-lite";
import { IAggiungiAreaViewModel } from "../ViewModel/AggiungiAreaViewModel";

interface Props {
  viewModel: IAggiungiAreaViewModel;
}
const AggiungiAreaView = ({ viewModel }: Props) => (
  <div>
    <form action="" method="post" onSubmit={viewModel.submit} onFocus={viewModel.clearError}>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <h1>Aggiunta area</h1>
            <p className="menu-label">
              <label htmlFor="citta">Nome città</label>
              <input
                id="citta"
                name="citta"
                className="input"
                type="text"
                placeholder="Nome città in cui si trova il sistema di illuminazione"

              ></input>
              <label htmlFor="zonaGeografica">Zona geografica città</label>
              <input
                id="zonaGeografica"
                name="zonaGeografica"
                className="input"
                type="text"
                placeholder="Zona geografica della città in cui si trova il sistema di illuminazione"

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
                placeholder="Luminosità che l'impianto produrrà quando non ci sono rilevamenti di utenti stradali"

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
                placeholder="Luminosità che l'imianto produrrà quando ci sarà un rilevamento di un utente stradale"

              ></input>
            </p>
          </article>
        </div>
      </div>

      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <button type="submit" className="button is-success m-1" >
              Conferma e Inserisci
            </button>
            <button className="button is-outlined m-1">Cancella campi</button>
          </article>
        </div>
      </div>
    </form>
    {viewModel.submitIsError() ===true ? <>{viewModel.submitError}</>:<></>}
    <></>
  </div>

  
);

export default observer(AggiungiAreaView);
