import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { api_url } from './constants/index.ts';

function App() {
  const [response, setResponse] = useState<AxiosResponse<string> | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAPIstatus = async () => {
      try {
        setResponse(null);
        setLoading(true);

        const response: AxiosResponse<string> = await axios.get(
          `${api_url}/status`
        );

        const tId = setTimeout(() => {
          setResponse(response);
          clearTimeout(tId);
        }, 1000);
      } catch (err) {
        if (err instanceof AxiosError) setError(err);
        console.error(err);
      } finally {
        const tId = setTimeout(() => {
          setLoading(false);
          clearTimeout(tId);
        }, 1000);
      }
    };
    checkAPIstatus();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {response && (
        <p>
          {response.status} : {response.data}
        </p>
      )}
      {error && <p>{error.message}</p>}
    </>
  );
}

export default App;
