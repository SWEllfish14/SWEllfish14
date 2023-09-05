import { IAreaDetailsViewModel } from "../ViewModel/AreaDetailsViewModel";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface Props {
  viewModel: IAreaDetailsViewModel;
}

const AreaDetailsView = ({ viewModel }: Props) => (
  <div>
    <div className="box">
    <div className="columns">
      <div className="column is-half">
        {viewModel.isLoading() && <p>Loading...</p>}
        {viewModel.isError() && <p>Error: {viewModel.error()?.message}</p>}
        {viewModel.areaDetails() && (
          <div className="box">
            <h2 className="title is-5">Dettagli area</h2>
            <p>ID: {viewModel.areaDetails().data?.ID}</p>
            <p>Città: {viewModel.areaDetails().data?.città}</p>
            <p>Zona: {viewModel.areaDetails().data?.zona_geografica_città}</p>
            <p>
            {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
              <>
              {viewModel.areaDetails().data?.stato === 0 ? (
                <>
                <p>Stato: Spento
                  </p>
                  </>
              ) :(
                <>
                <p>
                  Stato : Acceso
                </p>
                </>
              )
              }
              </>
            ):(viewModel.areaDetails().data?.modalità_funzionamento === "A")
              }
            </p>
            <p>
              {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
                <>
                  Luminosità in modalità manuale:{" "}
                  {viewModel.areaDetails().data?.luminosità_manuale
                  }
                </>
              ) : (
                <>
                  Luminosità in modalità automatica:{" "}
                  {viewModel.areaDetails().data?.luminosità_standard}
                </>
              )}
              <p>
              <Link
          to={{ pathname: `/aggiungiGuasto/${viewModel.areaDetails().data?.ID}` }}
        >
          <button className="button is-outlined">Aggiungi guasto</button>
        </Link>
              </p>
            </p>

          </div>
        )}
      </div>

      <div className="column is-half">
        <div className="box">
        <h2 className="title is-5">Impostazioni Luminosità</h2>
          {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
            <>
          {viewModel.areaDetails().data?.stato === 1 ? (
                <><button
                className="button is-danger is-small"
                onClick={() => viewModel.spegniLampioniArea()}
              >
                Spegni lampioni
              </button></>
              ) : (
                <><button
                className="button is-success is-small"
                onClick={() => viewModel.accendiLampioniArea()}
              >
                Accendi Lampioni
              </button></>
              )}
              </>):(<></>)
              }
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
            {viewModel.areaDetails().data?.stato === 0 ? (
              <>
            {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
              <>
                
                <p>
                  <button
                    className="button is-warning  mt-2"
                    onClick={() => viewModel.aumentaLuminosità()}
                  >
                    Aumenta Luminosità
                  </button>
                </p>
                
                <p>
                  <button
                    className="button is-warning is-light  mt-3"
                    onClick={() => viewModel.diminuisciLuminosità()}
                  >
                    Diminuisci Luminosità
                  </button>
                </p>
              </>
            ) : (
              <></>
            )}
            </>):(<></>)}

            {viewModel.submitHasError ? 
            <div className="notification is-danger is-light">
              {viewModel.errorMessage}
            </div>
            :<></>}
          </h3>
        </div>
      </div>
    </div>

    
    <div className="column is-half">
      <div className="box" >
      <h2 className="title is-5">Impostazioni Area</h2>

        <Link
          to={{ pathname: `/modificaArea/${viewModel.areaDetails().data?.ID}` }}
        >
          <button className="button is-outlined">Modifica dettagli area</button>
        </Link>

        <button
          className="button is-danger is-small "
          onClick={() => viewModel.eliminaArea()}
        >
          Elimina area
        </button>
      </div>
    </div>

    <div className="column is-half">
      <div className="box">
      <h2 className="title is-5">Impostazioni Sensori</h2>
        <Link to={{ pathname: `/aggiungiSensore/${viewModel.areaDetails().data?.ID}` }}>
          <button className="button is-outlined">Aggiungi sensore</button>
        </Link>

        <Link to={{ pathname: `/sensori/${viewModel.areaDetails().data?.ID}` }}>
          <button className="button is-outlined">Lista Sensori</button>
        </Link>
      </div>
    </div>

    <div className="column is-half">
      <div className="box">
      <h2 className="title is-5">Impostazioni Lampioni</h2>
        <Link to={{ pathname: `/aggiungiLampione/${viewModel.areaDetails().data?.ID}`}}>
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
  </div>
);
export default observer(AreaDetailsView);
