import { observer } from "mobx-react-lite"
import {IListaSensoriViewModel } from "../ViewModel/ListaSensoriViewModel";
import { Link } from "react-router-dom";

 interface Props {
   viewModel:IListaSensoriViewModel;
 }
 const ListaSensoriView = ({viewModel}: Props) => (
  <div>
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Lista Sensori</h1>
<p className="menu-label">
    
    {viewModel.isLoading() ? <p>Loading...</p> :
        <ul>
            {viewModel.listaSensori()?.map(sensori => (
                <li key={sensori.ID}>
                    <p>
                    ID: {sensori.ID}, IP: {sensori.IP}
                    </p>
                    <p>Tipo interazione: {sensori.tipo_interazione}, Polling time: {sensori.polling_time} ms, Raggio Azione : {sensori.raggio_azione} metri
                    </p>
                    <p>

      <Link to={{pathname: `/modificaSensore/${sensori.ID}`}}>
            <button
              className="button is-outlined"
            > Modifica dettagli Sensore </button>
            </Link>
                    </p>
                </li>
            ))}
        <p>
        </p>            
            
    
              
        </ul>
        }
        </p>
            
</article>
</div>
</div>
</div>

   );
 


   export default observer(ListaSensoriView)

