import { useParams } from "react-router-dom";
import { IAreaDetailsViewModel } from "../ViewModel/AreaDetailsViewModel";
import { observer } from "mobx-react-lite";

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
            {viewModel.areaDetails().data?.modalità_funzionamento === 'M'?<>Luminosità manuale: {viewModel.areaDetails().data?.luminosità_manuale}</>
              :<>Luminosità standard: {viewModel.areaDetails().data?.luminosità_standard}</>
            }
            </p>
            {/* <p>Numero lampioni: {numeroLampioni}</p>
              <p>Numero sensori: {numeroSensori}</p> */}
          </div>
        )}
        {/* <div className="box">
            <LampList id = {id} />
          </div> */}
      </div>
      <div className="column is-half">
        <div className="box">
          <h2>Impostazioni Luminosità</h2>
          <h3>{viewModel.areaDetails().data?.modalità_funzionamento === 'M'?<>Manuale<p>
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
          </p></>:<>Automatico</>}</h3>
          
        </div>
        <div className="box">{/* <Sensori /> */}</div>
      </div>
    </div>
    <button
      className="button is-danger is-small"
      // onClick={() => eliminaArea()}
    >
      Elimina area
    </button>

    <button className="button is-outlined">Modifica dettagli area</button>

    
      <a href="/aggiungiSensore">
        <button className="button is-outlined">Aggiungi sensore</button>
      </a>
    

    
      <a href="/aggiungiLampione">
        <button className="button is-outlined">Aggiungi lampione</button>
      </a>
    

   
      <a href="/lamps/:id">
        <button className="button is-outlined">Lista Lampioni</button>
      </a>
    
  </div>
);
export default observer(AreaDetailsView);
