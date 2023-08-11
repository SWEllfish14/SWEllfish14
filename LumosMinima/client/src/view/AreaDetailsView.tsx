import { useParams } from "react-router-dom";
import { IAreaDetailsViewModel } from "../ViewModel/AreaDetailsViewModel";
import { observer } from "mobx-react-lite";

interface Props {
    viewModel:IAreaDetailsViewModel;
  }
  
  const AreaDetailsView = ({viewModel}: Props) => (
   
    <div>
      <div className="columns">
      
        <div className="column is-half">
          
          {viewModel.isLoading() && <p>Loading...</p>}
          {/* {viewModel.isError() && <p>Error: {viewModel.error().message}</p>} */}
          {viewModel.areaDetails() && (
            <div className="box">
              <h1>{viewModel.areaDetails().data?.città}</h1>
              
              <p>Zona: {viewModel.areaDetails().data?.zona_geografica_città}</p>
              {/* <p>Stato:{viewModel.areaDetails().data?..luminosita_impostata != area.luminosita_default ? <>Manuale</> : <>Automatico</>}</p> */}
              <p>Luminosità:{viewModel.areaDetails().data?.luminosità_standard}</p>
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
            <p>
            <button
              className="button is-warning"
            //   onClick={() => aumentaLuminosita()}
            >
              Aumenta Luminosità
            </button>
            </p>
            <p>
            <button
              className="button is-warning is-light"
            //   onClick={() => diminuisciLuminosita()}
            >
              Diminuisci Luminosità
            </button>
            </p>
          </div>
          <div className="box">
            {/* <Sensori /> */}
          </div>
        </div>
      </div>
      <button
        className="button is-danger is-small"
        // onClick={() => eliminaArea()}
      >
        Elimina area
      </button>

      <button className="button is-outlined">
        Modifica dettagli area
      </button>

      <button className="button is-outlined">
      <a href="/aggiungiSensore"><button className = "button is-outlined">Aggiungi sensore</button></a>
      </button>

      <button className="button is-outlined">
      <a href="/aggiungiLampione"><button className = "button is-outlined">Aggiungi lampione</button></a>
      </button>

      <button className="button is-outlined">
      <a href="/lamps/:id"><button className = "button is-outlined">Lista Lampioni</button></a>
      </button>
      </div>
      
  );
  export default observer(AreaDetailsView)