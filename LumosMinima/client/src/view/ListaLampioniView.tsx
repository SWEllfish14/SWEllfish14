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
            {viewModel.dettaglilampioni()?.map(lampioni => (
                <li key={lampioni.ID}>
                    <p>
                    ID: {lampioni.ID}, IP: {lampioni.IP}
                    </p>
                    <p>Tipo interazione: {lampioni.tipo_iterazione}, luminosità default: {lampioni.luminosita_default}, luminosità impostata: {lampioni.luminosita_impostata}
                    </p>
                    <p>
                    <button
              className="button is-danger"
                 onClick={() => viewModel.eliminaLampione()}
            > Elimina Lampione </button>

<button
              className="button is-outlined"
                 onClick={() => viewModel.eliminaLampione()}
            > Modifica dettagli Lampione </button>
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
 


export default observer(ListaLampioniView)

