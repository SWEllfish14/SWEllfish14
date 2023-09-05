import { IGuastoDetailsViewModel } from "../ViewModel/GuastoDetailsViewModel";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { GuastoDetails } from "../pages/GuastoDetails";


interface Props {
  viewModel: IGuastoDetailsViewModel;
}

const GuastoDetailsView = ({ viewModel }: Props) => (
<div>
  <div className="box">
    <div className="columns">
      
      <div className="column is-half">
        
          {viewModel.isLoading() && <p>Loading...</p>}
          {viewModel.isError() && <p>Error: {viewModel.error()?.message}</p>}
          {viewModel.guastoDetails() && (
            
            <div className="box">
              <h1> ID: {viewModel.guastoDetails().data?.ID.toString()}</h1>
              <h1>Data rilevamento: {viewModel.guastoDetails().data?.data_rilevamento.toString()}</h1> 
              <p>Id area: {viewModel.guastoDetails().data?.id_area_illuminata}</p>
              <p>Stato: {viewModel.guastoDetails().data?.stato == "0"? "Non risolto" : "Risolto"}</p>
              <p>Note: {viewModel.guastoDetails().data?.note}</p>
            </div>
          )}
        </div>
    </div>
  

        {viewModel.guastoDetails().data?.stato.toString() === "0" ? (
          <>
          <div className="columns">
            
            
          <div className="column is-half">
            <div className="box">
              <div className="is-flex is-flex-direction-row">
                <h2 className="title is-flex is-5" >Impostazioni Guasto</h2>
                <div className="is-flex is-flex-direction-column is-flex-grow-1">
                <button
                  className="button is-danger is-small is-flex is-align-self-flex-end"
                  onClick={() => viewModel.chiudiGuasto()} >
                  Chiudi Guasto
                </button>
                </div>
              </div>

              <p>
              <Link
                to={{ pathname: `/modificaGuasto/${viewModel.guastoDetails().data?.ID}` }}
              >
              <button className="button is-outlined">Modifica dettagli guasto</button>
              </Link>
              </p>

            </div>
          </div>
          </div>
          </>
        ) : (
          <>
            
          </>
        )}
  </div>    
</div>
);

export default observer(GuastoDetailsView);