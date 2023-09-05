import { observer } from "mobx-react-lite";
import { IHomeViewModel } from "../ViewModel/HomeViewModel";
import { Link, useNavigate } from "react-router-dom";

const rimuovi = ()=>{
  localStorage.removeItem("user-token");
  window.location.replace("/login")
}


interface Props {
  viewModel: IHomeViewModel;
}
const HomeView = ({ viewModel }: Props) => (
  <div>
    
    <div className="tile is-anchestor">
      <div className="tile is-parent">
      <article className="tile is-child box">
          <h2 className="title is-4" >Stato sistema</h2>
          <p className="menu-label">
            <li>
              Numero Guasti a sistema:
              {viewModel.guastiNumberisLoading() ? (
                <p>Loading...</p>
              ) : (
                viewModel.guastiNumber()
              )}
            </li>
            <li>
              Numero lampioni a sistema:
              {viewModel.lampioniisLoading() ? (
                <p>Loading...</p>
              ) : (
                viewModel.lampioniNumber()
              )}
            </li>
            <li>
              Numero sensori a sistema:
              {viewModel.sensoriisLoading() ? (
                <p>Loading...</p>
              ) : (
                viewModel.sensoriNumber()
              )}
            </li>
            <li>
              Numero aree geografiche a sistema:
              {viewModel.numeroAreeisLoading() ? (
                <p>Loading...</p>
              ) : (
                viewModel.numeroAree()
              )}
            </li>
          </p>
        </article>
      </div>
      <div className="tile is-parent">
      <article className="tile is-child box">
        <h2 className="title is-4" >Lista aree</h2>
          <p className="menu-label">
            {viewModel.areeLimitisLoading() ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {viewModel.areeLimit()?.map((area) => (
                  <li key={area.ID} className="m-2">
                    <Link
                      to={{
                        pathname: `/area/${area.ID}`,
                      }}
                    >
                      <p>
                      {area.città}, Località: {area.zona_geografica_città} - {area.stato === 1 ? (
                        <span className="button is-success is-small is-responsive is-light ">ACCESA</span>
                      ):
                      (<span className="button is-danger is-small is-responsive is-light">SPENTA</span>)
                      }
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </p>
        </article>
      </div>
    </div>

    <div className="tile is-anchestor">
      <div className="tile is-parent">
        <article className="tile is-child box">
        <h2 className="title is-4" >Ultimi guasti inseriti a sistema</h2>

          <p className="menu-label">
            {viewModel.guastiisLoading() ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {viewModel.guasti()?.map((guasto) => (
                  <li key={guasto.ID} >
                    <Link
                      to={{
                        pathname: `/guasti/${guasto.ID}`,
                      }}
                    >
                     <p>{guasto.data_rilevamento.toString()} : Guasto a {guasto["area.città"]},{guasto["area.zona_geografica_città"]}.</p> 
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </p>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box">
          <h2 className="title is-4" >Utility</h2>
          <p>
          <a href="/">Manuale Utente</a>
          </p>
          <p>
          <button className="button is-danger is-small" onClick={rimuovi}>Logout</button>
          </p>
        </article>
      </div>
    </div>
  </div>
);
export default observer(HomeView);
