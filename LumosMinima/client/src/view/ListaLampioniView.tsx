import { observer } from "mobx-react-lite"
import {IListaLampioniViewModel } from "../ViewModel/ListaLampioniViewModel";
import { Link } from "react-router-dom";

 interface Props {
   viewModel:IListaLampioniViewModel;
 }
 const ListaLampioniView = ({viewModel}: Props) => (
  <div>
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Lista Lampioni</h1>
<p className="menu-label">
    
    {viewModel.isLoading() ? <p>Loading...</p> :
        <ul>
            {viewModel.listaLampioni()?.map(lampioni => (
                <li key={lampioni.ID}>
                    <p>
                    ID: {lampioni.ID}, IP: {lampioni.IP}
                    </p>
                    <p>
                    Tipo interazione: {lampioni.tipo_interazione}
                    </p>

<Link to={{pathname: `/modificaLampione/${lampioni.ID}`}}>
<button
              className="button is-outlined"
            > Modifica dettagli Lampione </button>
            </Link>
                    
                </li>
            ))}
           
            
    
              
        </ul>
        }
        </p>
            
</article>
</div>
</div>
</div>

   );
 


export default observer(ListaLampioniView)

