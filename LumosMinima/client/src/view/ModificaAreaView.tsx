import { observer } from "mobx-react-lite";
import { IModificaAreaViewModel } from "../ViewModel/ModificaAreaViewModel";
interface Props {
  viewModel: IModificaAreaViewModel;
}
const ModificaAreaView = ({ viewModel }: Props) => (
  <div>
    <form action="" method="post" onSubmit={viewModel.modificaArea}>
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
              <label htmlFor="zonaCitta">Zona geografica città</label>
              <input
                id="zonaCitta"
                name="zonaCitta"
                className="input"
                type="text"
                placeholder={
                  viewModel.areaDetails().data?.zona_geografica_città
                }
              ></input>
              <label htmlFor="luminositaDefault">Luminosità default</label>
              <input
                id="luminositaDefault"
                name="luminositaDefault"
                className="input"
                type="text"
                placeholder={viewModel
                  .areaDetails()
                  .data?.luminosità_standard.toString()}
              ></input>
              <label htmlFor="luminositaRilevamento">Luminosità rilevamento </label>
              <input
                id="luminositaRilevamento"
                name="luminositaRilevamento"
                className="input"
                type="text"
                placeholder={viewModel
                  .areaDetails()
                  .data?.luminosità_rilevamento.toString()}
              ></input>
            </p>
          </article>
        </div>
      </div>

      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <button className="button is-success" type="submit">Conferma e Inserisci</button>
            <button className="button is-outlined" type="reset">Cancella campi</button>
          </article>
        </div>
      </div>
    </form>
  </div>
);

export default observer(ModificaAreaView);
