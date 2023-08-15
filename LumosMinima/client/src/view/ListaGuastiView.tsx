import { observer } from "mobx-react-lite"
import {IListaGuastiViewModel } from "../ViewModel/ListaGuastiViewModel";
import { Link } from "react-router-dom";

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
                    <Link to={{pathname: `/guasti/${guasto.ID}`}}>
                    ID: {guasto.ID}: Guasto a {guasto.città}, zona {guasto.zona_geografica_città}
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

   )
 


export default observer(ListaGuastiView)

