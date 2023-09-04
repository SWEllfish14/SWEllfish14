import { observer } from "mobx-react-lite";
import { IListaLampioniViewModel } from "../ViewModel/ListaLampioniViewModel";
import { Link } from "react-router-dom";

interface Props {
  viewModel: IListaLampioniViewModel;
}
const ListaLampioniView = ({ viewModel }: Props) => (
  <div>
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box">
          <h1>Lista Lampioni</h1>
          <p className="menu-label">
            {viewModel.isLoading() ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {viewModel.listaLampioni()?.map((lampioni) => (
                  <div className ="tile is-ancestor">
                  <div className="tile is-parent is-small">
                  <article className="tile is-child box">
                  <li key={lampioni.ID}>
                    <p>
                     <button className="button is-warning is-small is-responsive">
                       ID: {lampioni.ID}</button> 
                    </p>
                    <p>
                    <button className = "button is-info is-small is-responsive">IP: {lampioni.IP}</button>
                    </p>
                    <p>
                      {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
                        <>
                      Stato:{" "}
                      {lampioni.stato ? (
                        <>Acceso <>
                        <p>
                        <button
                          className="button is-danger is-small"
                          onClick={() =>
                            viewModel.spegniLampione(lampioni.ID)
                          }
                          
                        >
                          Spegni Lampione
                        </button>
                        </p>
                      </></>
                      ) : (
                        <>
                          Spento
                          <>
                          <p>
                            <button
                              className="button is-success is-small"
                              onClick={() =>
                                viewModel.accendiLampione(lampioni.ID)
                              }
                              
                            >
                              Accendi Lampione
                            </button>
                            </p>
                          </>
                        </>
                      )}
                      </>):(<></>)}
                    </p>
                    <p>Tipo interazione: {lampioni.tipo_interazione}</p>
                    <p>
                    <Link to={{ pathname: `/modificaLampione/${lampioni.ID}` }}>
                      <button className="button is-outlined">
                        {" "}
                        Modifica dettagli Lampione{" "}
                      </button>
                    </Link>
                    </p>
                  </li>
                  </article>
                  </div>
                  </div>
                ))}
              </ul>
            )}
          </p>
        </article>
      </div>
    </div>
  </div>
);

export default observer(ListaLampioniView);
