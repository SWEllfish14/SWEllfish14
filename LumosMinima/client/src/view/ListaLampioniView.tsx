import { observer } from "mobx-react-lite"
import {IListaLampioniViewModel } from "../ViewModel/ListaLampioniViewModel";

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
            {/*viewModel.lampioni()?.map(lampione => (
                <li key={lampione.ID}>
                    ID: {lampione.ID}, IP: {lampione.IP}, luminosità default: {lampione.luminosita_default}, luminosità impostata: {lampione.luminosita_impostata}
                </li>
            ))}
            }
            {/*<h1>{viewModel.lampioni().data?.IP}</h1>*/}
              
        </ul>
        }
        </p>
            
</article>
</div>
</div>
</div>

   )
 


export default observer(ListaLampioniView)

