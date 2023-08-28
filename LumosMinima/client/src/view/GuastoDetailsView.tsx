import { IGuastoDetailsViewModel } from "../ViewModel/GuastoDetailsViewModel";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";


interface Props {
  viewModel: IGuastoDetailsViewModel;
}

const GuastoDetailsView = ({ viewModel }: Props) => (
<div>
    <div className="columns">
      <div className="column is-half">
        {viewModel.isLoading() && <p>Loading...</p>}
        {viewModel.isError() && <p>Error: {viewModel.error()?.message}</p>}
        {viewModel.guastoDetails() && (
          <div className="box">
            <h1>Data rilevamento: {viewModel.guastoDetails().data?.data_rilevamento.toString()}</h1> 
            <p>Id area: {viewModel.guastoDetails().data?.id_area_illuminata}</p>
            <p>Stato: {viewModel.guastoDetails().data?.stato}</p>
            <p>Note: {viewModel.guastoDetails().data?.note}</p>
          </div>
        )}
        </div>
    </div>

    <div className="column is-half">
      <div className="box">
        <p>Impostazioni Guasto</p>

        <Link
          to={{ pathname: `/modificaGuasto/${viewModel.guastoDetails().data?.ID}` }}
        >
          <button className="button is-outlined">Modifica dettagli guasto</button>
        </Link>

        <button
          className="button is-danger is-small"
           onClick={() => viewModel.eliminaGuasto()} 
        >
          Elimina guasto
        </button>

      </div>
    </div>
</div>
);

export default observer(GuastoDetailsView);