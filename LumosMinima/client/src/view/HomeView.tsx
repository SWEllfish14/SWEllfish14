import { observer } from "mobx-react-lite";
import { IHomeViewModel } from "../ViewModel/HomeViewModel";

interface Props {
    viewModel:IHomeViewModel;
  }
  const HomeView = ({viewModel}: Props) => (
   
 <div className ="tile is-ancestor">
    <article className="tile is-child box">
        <h1>Stato sistema</h1>
        <p className="menu-label">
             <li>Numero Guasti a sistema:{viewModel.guastiisLoading() ? <p>Loading...</p> : viewModel.guastiNumber()}</li> 
             <li>Numero lampioni a sistema:{viewModel.lampioniisLoading() ? <p>Loading...</p> : viewModel.lampioniNumber()}</li>
             <li>Numero sensori a sistema:{viewModel.sensoriisLoading() ? <p>Loading...</p> : viewModel.sensoriNumber()}</li>
             <li>Numero aree geografiche a sistema:{viewModel.areeisLoading() ? <p>Loading...</p> : viewModel.aree()}</li>
        </p>
    </article>
 <div className="tile is-parent">
 <article className="tile is-child box">
 <h1>Lista aree</h1>
 {/*}
 {<p className="menu-label">
     }
     {viewModel.areeisLoading() ? <p>Loading...</p> :
         <ul>
             {viewModel.areeLimit()?.map(area => (
                 <li key={area.ID}>
                     {area.ID}
                     {area.zona_geografica}
                 </li>
             ))}
         </ul>}
 </p>
             */}
 </article>
 </div>
 
 </div>
 
    )
  
 
 
 export default observer(HomeView)