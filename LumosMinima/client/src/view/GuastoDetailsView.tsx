import { IGuastoDetailsViewModel } from "../ViewModel/GuastoDetailsViewModel";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { GuastoDetails } from "../pages/GuastoDetails";


interface Props {
  viewModel: IGuastoDetailsViewModel;
}

const GuastoDetailsView = ({ viewModel }: Props) => (
<div>
    <div id="width-area" className="tile-is-ancestor">
      <div id="mguasto-margin" className="tile-is-parent">
        {viewModel.isLoading() && <p>Loading...</p>}
        {viewModel.isError() && <p>Error: {viewModel.error()?.message}</p>}
        {viewModel.guastoDetails() && (
          
          <div className="row">
            <h2 className="width-area"> ID: {viewModel.guastoDetails().data?.ID.toString()}</h2>
            <p className="width-area">Data rilevamento: {viewModel.guastoDetails().data?.data_rilevamento.toString()}</p> 
            <p className="width-area">Id area: {viewModel.guastoDetails().data?.id_area_illuminata}</p>
            <p className="width-area">Stato: {viewModel.guastoDetails().data?.stato == "0"? "Non risolto" : "Risolto"}</p>
            <p className="width-area">Note: {viewModel.guastoDetails().data?.note}</p>
          </div>
        )}
        </div>
    </div>

        {viewModel.guastoDetails().data?.stato.toString() === "0" ? (
          <>
          <div className="tile-is-parent">
            <div className="row">
              <p id="bold" className="width-area">Impostazioni Guasto</p>
                <p className="width-area">
                <Link
                  to={{ pathname: `/modificaGuasto/${viewModel.guastoDetails().data?.ID}` }}
                >
                <button className="button is-outlined">Modifica dettagli guasto</button>
                </Link>
                <button
                  className="button is-danger is-small"
                  onClick={() => viewModel.chiudiGuasto()} >
                  Chiudi Guasto
                </button>
                </p>
                </div>
          </div>
          </>
        ) : (
          <>
            
          </>
        )}
      
</div>
);

export default observer(GuastoDetailsView);