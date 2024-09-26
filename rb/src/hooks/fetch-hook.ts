import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string, depArr: unknown[] = []) => {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    const abortcontroller = new AbortController();
    const { signal } = abortcontroller;

    (async function () {
      try {
        const data = (await fetch(url, { signal }).then((res) =>
          res.json()
        )) as T;
        console.log('useFecth.data>>', data);
        setResult(data);
      } catch (error) {
        console.error('Error>>', error);
      }
    })();

    return () => abortcontroller.abort('Clean Up!');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depArr);
  return result;
};
