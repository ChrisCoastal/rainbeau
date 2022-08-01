import { useState } from 'react';

interface FetchMethod {
  method: string;
  headers: {
    [key: string]: string;
  };
}

const get = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const useFetch = async (url: string, method: FetchMethod = get) => {
  const [data, setData] = useState<{} | null>(null);
  const [error, setError] = useState<any | null>(null);

  try {
    const response = await fetch(url, method);
    const apiData = await response.json();
    setData(apiData);
  } catch (err) {
    console.log(err);
    setError(err);
  }
  return { data, error };
};

export default useFetch;
