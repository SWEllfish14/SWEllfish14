import { observer } from "mobx-react-lite"
import {IAreeViewModel } from "../ViewModel/AreeViewModel";
import { Link } from "react-router-dom";

 interface Props {
   viewModel:IAreeViewModel;
 }
 const AreeView = ({viewModel}: Props) => (
  <div>
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Lista aree</h1>
<p className="menu-label">
    
    {viewModel.isLoading() ? <p>Loading...</p> :
        <ul>
            {viewModel.aree()?.map(area => (
                <li key={area.ID}>
                    <div>
                    <Link to={{
                                pathname: `/area/${area.ID}`
                            }}>ID: {area.ID}
                            <p>
                            {area.città}, {area.zona_geografica_città}</p></Link>
                            
                            </div>
                </li>
            ))}
        </ul>}
</p>
            
</article>
</div>
</div>
<div className =" tile is-anchestor">
<div className="tile is-parent">
<article className="tile is-child box">
    <a href="/aggiungiArea"><button className = "button is-outlined">Aggiungi nuova area</button></a>
</article>
</div>
</div>
</div>

   )
 


export default observer(AreeView)

