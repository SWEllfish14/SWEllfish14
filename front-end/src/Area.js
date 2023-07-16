import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LampList from "./LampList";
import { useNavigate } from "react-router-dom";
const headers = {
  "Content-Type": "application/json",
};

export function Area() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [area, setArea] = useState();
  const { isLoading: areaLoading, error: areaError } = useQuery(["area"], () =>
    axios
      .get("http://localhost:3002/area/" + params.id, { headers })
      .then((res) => setArea(res.data))
  );
  const [numeroLampioni, setNumeroLampioni] = useState();
  axios
    .get("http://localhost:3002/overviewlampioni/" + params.id, { headers })
    .then((res) => setNumeroLampioni(res.data));
  const [numeroSensori, setNumeroSensori] = useState();
  axios
    .get("http://localhost:3002/overviewsensori/" + params.id, { headers })
    .then((res) => setNumeroSensori(res.data));

  const aumentaLuminosita = async () => {
    const id = params.id;
    await axios
      .post("http://127.0.0.1:3002/aumentaluminosita", null, {
        params: {
          id: id,
        },
      })
      .then(() => {
        axios
          .get("http://localhost:3002/area/" + params.id, { headers })
          .then((res) => setArea(res.data));
      });
  };
  const diminuisciLuminosita = async () => {
    const id = params.id;
    await axios
      .post("http://127.0.0.1:3002/diminuisciluminosita", null, {
        params: {
          id: id,
        },
      })
      .then(() => {
        axios
          .get("http://localhost:3002/area/" + params.id, { headers })
          .then((res) => setArea(res.data));
      });
  };

  const eliminaArea = async () => {
    const id = params.id;
    await axios
      .post("http://localhost:3002/eliminaArea/", null, {
        params: {
          id: id,
        },
      })
      .then(() => navigate("/"));
  };
  return (
    <>
      <div className="columns">
      
        <div className="column is-half">
          
          {areaLoading && <p>Loading...</p>}
          {areaError && <p>Error: {areaError.message}</p>}
          {area && (
            <div className="box">
              <h1>Zona geografica:{area.zona_geografica}</h1>
              
              <p>Stato:{area.stato ? <>Manuale</> : <>Automatico</>}</p>
              <p>Luminosità:{area.luminosita_impostata}</p>
              <p>Numero lampioni: {numeroLampioni}</p>
              <p>Numero sensori: {numeroSensori}</p>
            </div>
            
          )}
          <div className="box">
            <LampList id = {id} />
          </div>
        </div>
        <div className="column is-half">
          <div className="box">
            <h2>Impostazioni Luminosità</h2>
            
            <button
              className="button is-success"
              onClick={() => aumentaLuminosita()}
            >
              Aumenta Luminosità
            </button>
            <button
              className="button is-success"
              onClick={() => diminuisciLuminosita()}
            >
              Diminuisci Luminosità
            </button>
          </div>
          <div className="box">
            <Sensori />
          </div>
        </div>
      </div>
      <button
        className="button is-danger is-light is-full"
        onClick={() => eliminaArea()}
      >
        Elimina area
      </button>
    </>
  );
}

export function Sensori() {
  const params = useParams();
  const id = params.id;
  const [sensoriList, setsensoriList] = useState([]);
  const {
    data: sensori,
    isLoading: sensoriLoading,
    error: sensoriError,
  } = useQuery(["area", id], () =>
    axios
      .get(`http://localhost:3002/sensori/${id}`, { headers })
      .then((res) => setsensoriList(res.data))
  );
  const rimuoviSensore = (ip) => {
    axios
      .post("http://127.0.0.1:3002/rimuoviSensore", null, {
        params: {
          ip: ip,
        },
      })
      .then(() =>
        axios
          .get("http://localhost:3002/sensori/${id}`", { headers })
          .then((res) => setsensoriList(res.data))
      );

      
  };

  return (
    <div>
      <h1>Lista Sensori:</h1>
      {sensoriLoading && <p>Loading...</p>}
      {sensoriError && <p>Error: {sensoriError.message}</p>}
      {sensoriList.map((sensore) => (
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <article className="tile is-child box">
             
                <h1>Zona geografica:{sensore.zona_geografica}</h1>
                <h1>IP sensore:{sensore.IP}</h1>
                <h1>Raggio Azione: {sensore.raggio_azione} metri</h1>
                <button
                  className="button is-danger"
                  onClick={() => rimuoviSensore(sensore.IP)}>
                  Elimina
                  </button>
            </article>
          </div>
        </div>
      ))}
    </div>
  );
}
