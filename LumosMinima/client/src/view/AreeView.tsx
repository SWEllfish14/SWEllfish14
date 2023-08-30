import { observer } from "mobx-react-lite"
import {IAreeViewModel } from "../ViewModel/AreeViewModel";
import { Link } from "react-router-dom";

 interface Props {
   viewModel:IAreeViewModel;
 }

 const AreeView = ({viewModel}: Props) => (
  <div>
     
     <div className ="tile is-ancestor">
     
                <div className="tile is-parent is-small">
                <article className="tile is-child box">
               <h1>Lista aree</h1>

<p className="menu-label">
    
    {viewModel.isLoading() ? <p>Loading...</p> :
    
        <ul>
            {viewModel.aree()?.map(area => (
                <div className ="tile is-ancestor">
                <div className="tile is-parent is-small">
                <article className="tile is-child box">
                
                <li key={area.ID}>
                    <div className="tile is-child">
                    ID: {area.ID}
                            <p>
                            {area.città}, {area.zona_geografica_città}</p>
                            <p>
                                {area.modalità_funzionamento == "M" ? (
                                    <p>Funzionamento Manuale
                                        </p>
                                ):
                                (<p>Funzionamento Automatico</p>
                                )}
                                </p>
                                <Link to={{
                                pathname: `/area/${area.ID}`
                            }}><button className = "button is-success">Dettagli Area</button></Link>
                            
                            </div>
                </li>
               
        </article>
        </div>
        </div>
            ))}
       </ul>
   
                        }
</p>
</article>
        </div>
        </div>

<div className =" tile is-anchestor">
<div className="tile is-parent">
<article className="tile is-child box">
    <p>Impostazioni Aree</p>
    <p>
    <a href="/aggiungiArea"><button className = "button is-outlined">Aggiungi nuova area</button></a>
    </p>
</article>
</div>
</div>
</div>
   )
 


export default observer(AreeView)

