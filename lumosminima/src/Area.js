import axios from "axios";
import {useState} from 'react';
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import LampList from "./LampList";
const headers = {
    
    'Content-Type': 'application/json'
  
}

export function Area() {
    const params = useParams();
    const id = params.id;
    const { data: area, isLoading: areaLoading, error: areaError } = useQuery(
      ['area', id],
      () => axios.get(`http://localhost:3002/area/${id}`, { headers })
        .then((res) => res.data)
    );
  
    return (
      <div>
        <h1>Query Result:</h1>
        {areaLoading && <p>Loading...</p>}
        {areaError && <p>Error: {areaError.message}</p>}
        {area && (
          <pre>{JSON.stringify(area, null, 2)}</pre>
        )}
      </div>
    );
  }
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  