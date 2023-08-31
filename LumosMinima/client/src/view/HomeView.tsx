import { observer } from "mobx-react-lite";
import { IHomeViewModel } from "../ViewModel/HomeViewModel";
import { Link } from "react-router-dom";
const rimuovi = ()=>(
  localStorage.removeItem("user-token")
)

interface Props {
  viewModel: IHomeViewModel;
}
const HomeView = ({ viewModel }: Props) => (
  <div>
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box">
          <button className="button is-info">Stato sistema</button>
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
          <button className="button is-warning">Lista aree</button>

          <p className="menu-label">
            {viewModel.areeLimitisLoading() ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {viewModel.areeLimit()?.map((area) => (
                  <li key={area.ID}>
                    <Link
                      to={{
                        pathname: `/area/${area.ID}`,
                      }}
                    >
                      <p>
                      {area.città}, Località: {area.zona_geografica_città}{area.stato === 1 ? (
                        <button className="button is-success is-small is-responsive is-rounded">ON</button>
                      ):
                      (<button className="button is-danger is-small is-responsive is-rounded">OFF</button>)
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
          <button className="button is-danger">Ultimi guasti inseriti a sistema </button>

          <p className="menu-label">
            {viewModel.guastiisLoading() ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {viewModel.guasti()?.map((guasto) => (
                  <li key={guasto.ID}>
                      {guasto.data_rilevamento.toString()} : Guasto a {guasto["area.città"]},{guasto["area.zona_geografica_città"]}.
                  </li>
                ))}
              </ul>
            )}
          </p>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box">
          <button className="button">Utility</button>
          <p>
          <a href="/">Manuale Utente</a>
          </p>
        </article>
      </div>
    </div>
  </div>
);
export default observer(HomeView);
