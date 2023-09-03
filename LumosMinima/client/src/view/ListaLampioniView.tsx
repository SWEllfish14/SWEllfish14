import { observer } from "mobx-react-lite";
import { IListaLampioniViewModel } from "../ViewModel/ListaLampioniViewModel";
import { Link } from "react-router-dom";

interface Props {
  viewModel: IListaLampioniViewModel;
}
const ListaLampioniView = ({ viewModel }: Props) => (
  <div>
    <div className="tile-is-ancestor">
      <div className="tile-is-parent">
        <article className="art">
          <h1>Lista Lampioni</h1>
          <p className="login-label">
            {viewModel.isLoading() ? (
              <p>Loading...</p>
            ) : (
              <ul className="width-area">
                {viewModel.listaLampioni()?.map((lampioni) => (
                  <div className="width-area">
                  <div  className="width-area">
                  <article className="width-area">
                  <li className="width-area" key={lampioni.ID}>
                    <p  className="width-area">
                     <p  className="width-area">
                       ID: {lampioni.ID}</p> 
                    </p>
                    <p className="width-area">
                    <p className="width-area">IP: {lampioni.IP}</p>
                    </p>
                    <p className="width-area">Tipo interazione: {lampioni.tipo_interazione}</p>
                      <p className="width-area">
                        {viewModel.areaDetails().data?.modalità_funzionamento === "M" ? (
                          <>
                        Stato:{" "}
                        {lampioni.stato ? (
                          <>Acceso <>
                          <p className="width-area"> 
                          <button
                            className="spento"
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
                            <p className="width-area">
                              <button
                                className="acceso"
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
                    
                      <p className="width-area">
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
