import { observer } from "mobx-react-lite";
import { IHomeViewModel } from "../ViewModel/HomeViewModel";
import { Link } from "react-router-dom";

interface Props {
  viewModel: IHomeViewModel;
}
const HomeView = ({ viewModel }: Props) => (
  <div>
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box">
          <h1>Stato sistema</h1>
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
          <h1>Lista aree</h1>

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
                      {area.città}, Località: {area.zona_geografica_città}
                      {" "}Stato: {area.stato === 1 ? "On" : "Off"}
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
          <h1>Ultimi guasti inseriti a sistema </h1>

          <p className="menu-label">
            {viewModel.guastiisLoading() ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {viewModel.guasti()?.map((guasto) => (
                  <li key={guasto.ID}>
                      Guasto a {guasto.città},{guasto.zona_geografica_città}.
                      Data rilevamento: {guasto.data_rilevamento.toString()}
                  </li>
                ))}
              </ul>
            )}
          </p>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box">
          <h1>Utility</h1>

          <a href="/">Manuale Utente</a>
        </article>
      </div>
    </div>
  </div>
);
export default observer(HomeView);
