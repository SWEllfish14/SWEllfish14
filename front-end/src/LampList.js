import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
const headers = {
  "Content-Type": "application/json",
};
export default function LampList({ id }) {
  const [lampList, setLampList] = useState([]);
  const { isLoading, error } = useQuery(["lamp"], () =>
    axios
      .get("http://localhost:3002/lamps/" + id, { headers })
      .then((res) => setLampList(res.data))
  );

  if (isLoading) return "Caricando...";
  if (error) return "Errore: " + error.message;
  const accendi = async (ip) => {
    await axios
      .post("http://127.0.0.1:3002/accendiLampione", null, {
        params: {
          ip: ip,
          id:id,
        },
      })
      .then(() =>
        axios
          .get("http://localhost:3002/lamps/" + id, { headers })
          .then((res) => setLampList(res.data))
      );
  };
  const spegni = async (ip) => {
    await axios
      .post("http://127.0.0.1:3002/spegniLampione", null, {
        params: {
          ip: ip,
        },
      })
      .then(() =>
        axios
          .get("http://localhost:3002/lamps/" + id, { headers })
          .then((res) => setLampList(res.data))
      );
  };

  const eliminaLampione = async(ip) =>{
    await axios
      .post("http://127.0.0.1:3002/eliminaLampione", null, {
        params: {
          ip: ip,
        },
      })
      .then(() =>
        axios
          .get("http://localhost:3002/lamps/" + id, { headers })
          .then((res) => setLampList(res.data))
      );
  }
  return (
    <>
      Lista lampioni
      <ul>
        {lampList.map((lamp) => (
          <li key={lamp.ID}>
            Lampione ID:{lamp.ID}
            Luminosità:{lamp.luminosita_impostata} 
            Stato:{lamp.status == 1 ? (
              <>Acceso
              <button
                  class="button is-danger is-light"
                  onClick={() => spegni(lamp.ip)}
                >Spegni</button></>
            ) : (
              <>
                Spento
                <button
                  class="button is-success"
                  onClick={() => accendi(lamp.ip)}
                >
                  Accendi
                </button>
              </>
            )}
            <button
                  class="button is-danger"
                  onClick={() => eliminaLampione(lamp.ip)}
                >Elimina lampione</button>
          </li>
        ))}
      </ul>
    </>
  );
}
