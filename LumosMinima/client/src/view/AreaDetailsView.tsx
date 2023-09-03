import { IAreaDetailsViewModel } from "../ViewModel/AreaDetailsViewModel";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface Props {
  viewModel: IAreaDetailsViewModel;
}

const AreaDetailsView = ({ viewModel }: Props) => (
  <div className="grid">
    <div className="first-row">
      <div className="column-is-half">
        {viewModel.isLoading() && <p>Loading...</p>}
        {viewModel.isError() && <p>Error: {viewModel.error()?.message}</p>}
        {viewModel.areaDetails() && (
          <div className="row">
            <p className="area-title-info">Informazioni area</p>
            <p>ID: {viewModel.areaDetails().data?.ID}</p>
            <p>Città: {viewModel.areaDetails().data?.città}</p>
            <p>Zona: {viewModel.areaDetails().data?.zona_geografica_città}</p>
            <p>
            {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
              <>
              {viewModel.areaDetails().data?.stato === 0 ? (
                <>
                <p className="width-area">Stato: Spento
                  </p>
                  </>
              ) :(
                <>
                <p className="width-area">
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
      <div className="column-is-half">
        <div className="row">
          <h2>Impostazioni Luminosità</h2>
          {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
            <>
          {viewModel.areaDetails().data?.stato === 1 ? (
                <><button
                className="spento"
                onClick={() => viewModel.spegniLampioniArea()}
              >
                Spegni lampioni
              </button></>
              ) : (
                <><button
                className="acceso"
                onClick={() => viewModel.accendiLampioniArea()}
              >
                Accendi Lampioni
              </button></>
            
              )}
              </>):(<></>)
              }
          <h3>
            <div className="field">
              
            <label className="login-label" htmlFor="switchManuale">Manuale</label>
              <input
                id="switchManuale"
                checked={viewModel.areaDetails().data?.modalità_funzionamento === "M" ? true:false}
                type="checkbox"
                name="switchManuale"
                className="switch"
                onChange={viewModel.cambiaModalità}
              />
            </div>
            <div className="field">
              
            <label className="login-label"htmlFor="switchAutomatico">Automatico</label>
              <input
                id="switchAutomatico"
                checked={viewModel.areaDetails().data?.modalità_funzionamento === "A" ? true:false}
                type="checkbox"
                name="switchAutomatico"
                className="switch"
                onChange={viewModel.cambiaModalità}
              />
            </div>
            {viewModel.areaDetails().data?.stato === 0 ? (
              <>
            {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
              <>
                
                <p>
                  <button
                    className="acceso"
                    onClick={() => viewModel.aumentaLuminosità()}
                  >
                    Aumenta Luminosità
                  </button>
                </p>
                
                <p>
                  <button
                    className="spento"
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
    <div className="second-row">
      <div className="column-is-half">
        <div className="box">
          <p className="area-title-info">Impostazioni Area</p>
          <button
            className="danger"
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

      <div className="column-is-half">
        <div className="box">
          <p className="area-title-info">Impostazioni Sensori</p>
          <Link to={{ pathname: `/aggiungiSensore/${viewModel.areaDetails().data?.ID}` }}>
            <button className="button is-outlined">Aggiungi sensore</button>
          </Link>

          <Link to={{ pathname: `/sensori/${viewModel.areaDetails().data?.ID}` }}>
            <button className="button is-outlined">Lista Sensori</button>
          </Link>
        </div>
      </div>

      <div className="column-is-half">
        <div className="box">
          <p className="area-title-info">Impostazioni Lampioni</p>
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
