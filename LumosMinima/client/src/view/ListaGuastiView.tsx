import { observer } from "mobx-react-lite"
import {IListaGuastiViewModel } from "../ViewModel/ListaGuastiViewModel";
import { Link } from "react-router-dom";

 interface Props {
   viewModel:IListaGuastiViewModel;
 }
 const ListaGuastiView = ({viewModel}: Props) => (
  <div>
<div id="guasti" className ="tile-is-ancestor">
<div className="tile-is-parent">
<article className="art">

<h1>Lista Guasti a Sistema</h1>

<div className="columns">
    
    <div className="menu-label column is-half">
        <h2>Guasti aperti</h2>
        {viewModel.isLoading() ? <p>Loading...</p> :
        <ul>
            {viewModel.guastiAperti()?.map(guasto => (
                    <div className ="tile is-ancestor">
                    <div className="tile is-parent is-small">
                    <article className="tile is-child box">
                    
                <li key={guasto.ID}>
                    
                    {guasto.data_rilevamento.toString()} 
                    <p>ID: {guasto.ID}: Guasto a {guasto["area.città"]}, zona {guasto["area.zona_geografica_città"]}
                    </p>
                    <Link to={{pathname: `/guasti/${guasto.ID}`}}><button className="button is-success">Vai ai dettagli</button></Link>
                
                </li>
                </article>
                </div>
                </div>
            ))}
            
        </ul>
        }
    </div>

    <div className=" menu-label column is-half">
    <h2>Guasti chiusi</h2>
    {
        <ul>
            {viewModel.guastiChiusi()?.map(guasto => (
                    <div className ="tile is-ancestor">
                    <div className="tile is-parent is-small">
                    <article className="tile is-child box">
                    
                <li key={guasto.ID}>
                    
                    {guasto.data_rilevamento.toString()} 
                    <p>ID: {guasto.ID}: Guasto a {guasto["area.città"]}, zona {guasto["area.zona_geografica_città"]}
                    </p>
                    <Link to={{pathname: `/guasti/${guasto.ID}`}}><button className="button is-success">Vai ai dettagli</button></Link>
                
                </li>
                </article>
                </div>
                </div>
            ))}
            
        </ul>
        }
    </div>
</div>
            
</article>
</div>
</div>
</div>
)

{/* <h1 className="title">Lista Guasti a Sistema</h1>
<p className="menu-label">
    
    {viewModel.isLoading() ? <p>Loading...</p> :
        <ul className="width-area">
            {viewModel.guastiAperti()?.map(guasto => (
                 <div className="width-area">
                 <div className="width-area">
                 <article className="width-area">
                 
                <li className="area-lista" key={guasto.ID}>
                    
                    {guasto.data_rilevamento.toString()} 
                    <p className="width-area">ID: {guasto.ID}: Guasto a {guasto["area.città"]}, zona {guasto["area.zona_geografica_città"]}
                    </p>
                    <Link to={{pathname: `/guasti/${guasto.ID}`}}><button className="button is-success">Vai ai dettagli</button></Link>
                
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
</div> */}

   
 


export default observer(ListaGuastiView)

