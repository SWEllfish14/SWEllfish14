import { observer } from "mobx-react-lite"
import {IAreeViewModel } from "../ViewModel/AreeViewModel";
import { Link } from "react-router-dom";

 interface Props {
   viewModel:IAreeViewModel;
 }

 const AreeView = ({viewModel}: Props) => (
  <div>
    
    <div className =" tile-is-anchestor">
        <div className="tile-is-parent">
            <article className="tile-is-child box">
                <p id="areas-settings">Impostazioni Aree</p>
                <p>
                <a href="/aggiungiArea"><button className = "button-is-outlined">Aggiungi nuova area</button></a>
                </p>
                <p>
                <button className = "acceso" onClick={() => viewModel.aumentaLuminositaCrepuscolo()}>Aumenta Luminosità di tutte la aree</button>
                </p>
                <p>
                <button className = "spento" onClick={() => viewModel.diminuisciLuminositaCrepuscolo()}>Diminuisci Luminosità di tutte la aree</button>
                </p>
            </article>
        </div>
    </div>
     
     <div id="areas-area" className ="tile-is-ancestor">
     
        <div className="tile-is-parent-is-small">
        <article className="art">
        <h1 className="title">Lista aree</h1>

            <p className="width-area">
                
                {viewModel.isLoading() ? <p>Loading...</p> :
                
                    <ul className="width-area">
                        {viewModel.aree()?.map(area => (
                            <div className ="width-area">
                            <div className="width-area">
                            <article className="width-area">
                            
                            <li className="area-lista" key={area.ID}>
                                <div className="width-area">
                                ID: {area.ID}
                                        <p className="area">
                                        {area.città}, {area.zona_geografica_città}</p>
                                        <p className="area">
                                            {area.modalità_funzionamento == "M" ? (
                                                <p className="area">Funzionamento Manuale
                                                    </p>
                                            ):
                                            (<p className="area">Funzionamento Automatico</p>
                                            )}
                                            </p>
                                            <Link to={{
                                            pathname: `/area/${area.ID}`
                                        }}><button className = "area-details">Dettagli Area</button></Link>
                                        
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
   )
 


export default observer(AreeView)

