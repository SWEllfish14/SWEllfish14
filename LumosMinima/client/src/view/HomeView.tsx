import { observer } from "mobx-react-lite";
import { IHomeViewModel } from "../ViewModel/HomeViewModel";

interface Props {
    viewModel:IHomeViewModel;
  }
  const HomeView = ({viewModel}: Props) => (
   
 <div className ="tile is-ancestor">
    <div className="tile is-parent">
    <article className="tile is-child box">
        <h1>Stato sistema</h1>
        <p className="menu-label">
             <li>Numero Guasti a sistema:{viewModel.guastiNumberisLoading() ? <p>Loading...</p> : viewModel.guastiNumber()}</li> 
             <li>Numero lampioni a sistema:{viewModel.lampioniisLoading() ? <p>Loading...</p> : viewModel.lampioniNumber()}</li>
             <li>Numero sensori a sistema:{viewModel.sensoriisLoading() ? <p>Loading...</p> : viewModel.sensoriNumber()}</li>
             <li>Numero aree geografiche a sistema:{viewModel.numeroAareeisLoading() ? <p>Loading...</p> : viewModel.numeroAree()}</li>
        </p>
    </article>
    </div>
 <div className="tile is-child">
 <article className="tile is-child box">
 <h1>Lista aree</h1>

 <p className="menu-label">
     {viewModel.areeLimitisLoading() ? <p>Loading...</p> :
         <ul>
             {viewModel.areeLimit()?.map(area => (
                 <li key={area.ID}>
                     ID: {area.ID}
                     Città: {area.città}
                 </li>
             ))}
         </ul>}
             
 </p>
             
 </article>
 </div>


 <div className ="tile is-anchestor">
    <div className = "tile is-parent">
 <article className="tile is-child box">
 <h1>Ultimi guasti inseriti a sistema </h1>

<p className="menu-label">
    {viewModel.guastiisLoading() ? <p>Loading...</p> :
        <ul>
            {viewModel.guasti()?.map(guasto => (
                <li key={guasto.ID}>
                   ID guasto: {guasto.ID}
                   ID zona illuminata: {guasto.id_area_illuminata}
                   </li>
            ))}
        </ul>}
        
            
</p>
</article>
<div className="tile is-parent">
         <article className="tile is-child box">
                    <h1>Altro</h1>
                    <p className="menu-list">
                    <li>Manuale Utente</li>
                    </p>
            </article>
            </div>
            </div>
            </div>
            </div>
 
    )
  
 
 
 export default observer(HomeView)