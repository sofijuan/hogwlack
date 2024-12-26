// src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import config from '../config.js';

function useFetch(
  path,
  method,
  body = undefined,
  needAuth = false,
  isList = false
) {
  const [data, setData] = useState(isList ? [] : undefined);

  const fetchConfig = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (needAuth) {
    fetchConfig.headers['Authorization'] = `Bearer ${localStorage.getItem(
      'token'
    )}`;
  }

  const url = config.apiUrl + path;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, fetchConfig, body);
        const data = await response.json();
        if (response.ok) {
          setData(data);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchData();
  }, []);

  return { data };
}

export default useFetch;
