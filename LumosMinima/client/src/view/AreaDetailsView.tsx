import { IAreaDetailsViewModel } from "../ViewModel/AreaDetailsViewModel";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface Props {
  viewModel: IAreaDetailsViewModel;
}

const AreaDetailsView = ({ viewModel }: Props) => (
  <div>
    <div className="columns">
      <div className="column is-half">
        {viewModel.isLoading() && <p>Loading...</p>}
        {viewModel.isError() && <p>Error: {viewModel.error()?.message}</p>}
        {viewModel.areaDetails() && (
          <div className="box">
            <h1>Città: {viewModel.areaDetails().data?.città}</h1>
            <p>Zona: {viewModel.areaDetails().data?.zona_geografica_città}</p>
            <p>
              Stato:{" "}
              {viewModel.areaDetails().data?.stato === 1 ? (
                <>Acceso</>
              ) : (
                <>Spento</>
              )}
            </p>
            <p>
              {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
                <>
                  Luminosità in modalità manuale:{" "}
                  {viewModel.areaDetails().data?.luminosità_manuale}
                </>
              ) : (
                <>
                  Luminosità in modalità automatica:{" "}
                  {viewModel.areaDetails().data?.luminosità_standard}
                </>
              )}
            </p>
            {/* <p>Numero lampioni: {numeroLampioni}</p>
              <p>Numero sensori: {numeroSensori}</p> */}
          </div>
        )}
        {/* { <div className="box">
            <LampList viewModel={viewModel} />
          </div> } */}
      </div>
      <div className="column is-half">
        <div className="box">
          <h2>Impostazioni Luminosità</h2>
          <h3>
            <div className="field">
              <input
                id="switchManuale"
                checked={viewModel.areaDetails().data?.modalità_funzionamento === "M" ? true:false}
                type="checkbox"
                name="switchManuale"
                className="switch"
                onChange={viewModel.cambiaModalità}
              />
              <label htmlFor="switchManuale">Manuale</label>
            </div>
            <div className="field">
              <input
                id="switchAutomatico"
                checked={viewModel.areaDetails().data?.modalità_funzionamento === "A" ? true:false}
                type="checkbox"
                name="switchAutomatico"
                className="switch"
                onChange={viewModel.cambiaModalità}
              />
              <label htmlFor="switchAutomatico">Automatico</label>
            </div>
            {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
              <>
                Manuale
                <p>
                  <button
                    className="button is-warning"
                    onClick={() => viewModel.aumentaLuminosità()}
                  >
                    Aumenta Luminosità
                  </button>
                </p>
                <p>
                  <button
                    className="button is-warning is-light"
                    onClick={() => viewModel.diminuisciLuminosità()}
                  >
                    Diminuisci Luminosità
                  </button>
                </p>
              </>
            ) : (
              <>Automatico</>
            )}
          </h3>
        </div>
        <div className="box">{/* <Sensori /> */}</div>
      </div>
    </div>

    <div className="column is-half">
      <div className="box">
        <p>Impostazioni Area</p>
        <button
          className="button is-danger is-small"
          onClick={() => viewModel.eliminaArea()}
        >
          Elimina area
        </button>

        <Link
          to={{ pathname: `/modificaArea/${viewModel.areaDetails().data?.ID}` }}
        >
          <button className="button is-outlined">Modifica dettagli area</button>
        </Link>
      </div>
    </div>

    <div className="column is-half">
      <div className="box">
        <p>Impostazioni Sensori</p>
        <Link to={{ pathname: `/aggiungiSensore` }}>
          <button className="button is-outlined">Aggiungi sensore</button>
        </Link>

        <Link to={{ pathname: `/sensori/${viewModel.areaDetails().data?.ID}` }}>
          <button className="button is-outlined">Lista Sensori</button>
        </Link>
      </div>
    </div>

    <div className="column is-half">
      <div className="box">
        <p>Impostazioni Lampioni</p>
        <Link to={{ pathname: `/aggiungiLampione` }}>
          <button className="button is-outlined">Aggiungi lampione</button>
        </Link>

        <Link
          to={{ pathname: `/lampioni/${viewModel.areaDetails().data?.ID}` }}
        >
          <button className="button is-outlined">Lista Lampioni</button>
        </Link>
      </div>
    </div>
  </div>
);
export default observer(AreaDetailsView);
