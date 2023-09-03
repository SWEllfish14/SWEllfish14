import { observer } from "mobx-react-lite"
import {IListaSensoriViewModel } from "../ViewModel/ListaSensoriViewModel";
import { Link } from "react-router-dom";

 interface Props {
   viewModel:IListaSensoriViewModel;
 }
 const ListaSensoriView = ({viewModel}: Props) => (
  <div>
<div className ="tile-is-ancestor">
<div className="tile-is-parent">
<article className="art">
<h1>Lista Sensori</h1>
<p className="login-label">
    
    {viewModel.isLoading() ? <p>Loading...</p> :
        <ul  className="width-area">
            {viewModel.listaSensori()?.map(sensori => (
              <div  className="width-area">
              <div  className="width-area">
              <article  className="width-area">
                <li key={sensori.ID}>
                    <p className="width-area">
                    <p  className="width-area">ID: {sensori.ID}</p> 
                    </p>
                    <p className="width-area">
                    <p  className="width-area">IP: {sensori.IP}</p>
                    </p>
                    <p className="width-area">Tipo interazione: {sensori.tipo_interazione}, Polling time: {sensori.polling_time} ms, Raggio Azione : {sensori.raggio_azione} metri
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

