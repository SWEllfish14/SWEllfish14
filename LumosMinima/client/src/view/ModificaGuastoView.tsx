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
              <label htmlFor="id">ID guasto</label>
              <input
                id="id"
                name="id"
                className="input"
                type="text"
                value={viewModel.guastoDetails().data?.ID.toString()}
                readOnly
              ></input>
              
              <label htmlFor="new_data_rilevamento">data rilevamento guasto</label>
              <input
                id="new_data_rilevamento"
                name="new_data_rilevamento"
                className="input"
                type="text"
                placeholder={viewModel.guastoDetails().data?.data_rilevamento.toString()}
                defaultValue={viewModel.guastoDetails().data?.data_rilevamento.toString()}
                disabled
              ></input>

              <label htmlFor="new_stato">stato</label>
              <select id="new_stato" name="new_stato" className="input" value={viewModel.guastoDetails().data?.stato}>
                <option value="0" >Risolto</option>
                <option value="1">Non risolto</option>
              </select>


              <label htmlFor="new_note">note</label>
              <input
                id="new_note"
                name="new_note"
                className="input"
                type="text"
                placeholder={viewModel.guastoDetails().data?.note}
                defaultValue={viewModel.guastoDetails().data?.note}
              ></input>

              <label htmlFor="new_id_area_illuminata">id area illuminata</label>
              <input
                id="new_id_area_illuminata"
                name="new_id_area_illuminata"
                className="input"
                type="text"
                placeholder={viewModel.guastoDetails().data?.id_area_illuminata.toString()}
                defaultValue={viewModel.guastoDetails().data?.id_area_illuminata.toString()}
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

export default observer(ModificaGuastoView);
