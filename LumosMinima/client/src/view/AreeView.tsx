import { observer } from "mobx-react-lite"
import {IAreeViewModel } from "../ViewModel/AreeViewModel";
import { Link } from "react-router-dom";

 interface Props {
   viewModel:IAreeViewModel;
 }

 const AreeView = ({viewModel}: Props) => (
  <div>

    <div>

    <div className="box has-text-centered">
        
        <h2 className="title is-5" >Impostazioni Aree</h2>
        <div className="columns">
            <div className="column">
                <p><a href="/aggiungiArea"><button className = "button is-outlined">Aggiungi nuova area</button></a></p>
            </div>
            <div className="column">
                <p><button className = "button is-warning" onClick={() => viewModel.aumentaLuminositaCrepuscolo()}>Aumenta Luminosità di tutte la aree</button></p>
            </div>
            <div className="column">
                <p><button className = "button is-danger" onClick={() => viewModel.diminuisciLuminositaCrepuscolo()}>Diminuisci Luminosità di tutte la aree</button></p>
            </div>
        </div>
    </div>


    <div className ="tile is-ancestor">
        <div className="tile is-parent is-small">
        <article className="tile is-child box">
        <h2 className="title is-5" >Lista aree</h2>

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

        </div>
</div>
   )
 


export default observer(AreeView)

