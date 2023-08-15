import { observer } from "mobx-react-lite"
import {IListaGuastiViewModel } from "../ViewModel/ListaGuastiViewModel";

 interface Props {
   viewModel:IListaGuastiViewModel;
 }
 const ListaGuastiView = ({viewModel}: Props) => (
  <div>
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Lista Guasti</h1>
<p className="menu-label">
    
    {viewModel.isLoading() ? <p>Loading...</p> :
        <ul>
            {viewModel.guasti()?.map(guasto => (
                <li key={guasto.ID}>
                    <a href='guasto/${area.ID.toString}'>
                    ID: {guasto.ID}: Guasto a {guasto["area.città"]}, zona {guasto["area.zona_geografica_città"]}
                    </a>
                </li>
            ))}
            
        </ul>
        }
        </p>
            
</article>
</div>
</div>
</div>

   )
 


export default observer(ListaGuastiView)

