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
              <div className ="tile is-ancestor">
              <div className="tile is-parent is-small">
              <article className="tile is-child box">
                <li key={sensori.ID}>
                    <p>
                    <button className="button is-success is-small is-responsive">ID: {sensori.ID}</button> 
                    </p>
                    <p>
                    <button className = "button is-info is-small is-responsive">IP: {sensori.IP}</button>
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
                </article>
                </div>
                </div>
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

