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
            {/* <p>data risoluzione: {viewModel.guastoDetails().data?}</p> */}
          </div>
        )}
        </div>
    </div>
</div>
);

export default observer(GuastoDetailsView);