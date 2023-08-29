import { observer } from "mobx-react-lite";
import { IAggiungiGuastoViewModel } from "../ViewModel/AggiungiGuastoViewModel";

interface Props {
  viewModel: IAggiungiGuastoViewModel;
}
const AggiungiGuastoView = ({ viewModel }: Props) => (
  <div>
    <form action="" method="post" onSubmit={viewModel.submit} onFocus={viewModel.clearError}>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <h1>Aggiunta guasto</h1>
            <p className="menu-label">
              <label htmlFor="dataRilevamento">Data Rilevamento Guasto</label>
              <input
                id="dataRilevamento"
                name="dataRilevamento"
                className="input"
                type="date"
                placeholder="Data in cui è stato rilevato il guasto"

              ></input>
              <label htmlFor="stato">Stato</label>
              <select id="stato"
                name="stato" className="input">
                <option value="0">0</option>
                <option value="1">1</option>
              </select>
              
              <label htmlFor="note">Note aggiuntive</label>
              <input
                id="note"
                name="note"
                className="input"
                type="text"
                placeholder="Note che possono aiutare i manutentori ad individuare meglio il guasto"

              ></input>

<label htmlFor="id_area">Id area illuminata afferenza</label>
<input
                  id="id_area"
                  name="id_area"
                  className="input"
                  type="number"
                  min={1}
                  max= {viewModel.IDAreeMax.toString()}
                  placeholder="ID area illuminata afferenza"
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

export default observer(AggiungiGuastoView);
