import { observer } from "mobx-react-lite"
import {IAreeViewModel } from "../ViewModel/AreeViewModel";

 interface Props {
   viewModel:IAreeViewModel;
 }
 const AreeView = ({viewModel}: Props) => (
  
<div className ="tile is-ancestor">
<div className="tile is-parent">
<article className="tile is-child box">
<h1>Lista aree</h1>
<p className="menu-label">
    
    {viewModel.isLoading() ? <p>Loading...</p> :
        <ul>
            {viewModel.aree()?.map(area => (
                <li key={area.ID}>
                    ID: {area.ID}
                    Città: {area.città}
                    Zona geografica: {area.zona_geografica_città}
                </li>
            ))}
        </ul>}
</p>
            
</article>
</div>
</div>

   )
 


export default observer(AreeView)
