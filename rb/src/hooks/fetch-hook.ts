import { useEffect, useState } from 'react';

const ABORT_REASON = 'My useFetch Clean Up!'; // 이 메시지는 cleanup 함수여서 무시

const cache: Record<string, unknown> = {};

type ErrorWithMessage = {
  message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof error.message === 'string';

const toErrorWithMessage = (error: unknown) =>
  isErrorWithMessage(error) ? error : new Error(JSON.stringify(error));

export const useFetch = <T>(
  url: string,
  isCache: boolean = false,
  depArr: unknown[] = []
) => {
  const [result, setResult] = useState<T>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorWithMessage>();

  useEffect(() => {
    console.log('useFetch>>', depArr);
    const abortcontroller = new AbortController();
    const { signal } = abortcontroller;

    (async function () {
      try {
        // console.log('cache11>>s', cache);
        if (isCache && url in cache) {
          // console.log('cccccc');
          return setResult(cache[url] as T);
        }
        setLoading(true);

        // 무시해도되는 abort 메시지 대신 다른 에러 뜨게 처리
        const data = (await fetch(url, { signal }).then((res) => {
          if (res.ok) return res.json();
          throw new Error(`${res.status} ${res.statusText}`);
        })) as T;
        setResult(data);
        setError(undefined);

        if (isCache) cache[url] = data;
        // console.log('useFecth.data>>', data);
        // console.log('cache22>>', cache);
      } catch (error) {
        // console.error('Error>>', error, String(error));
        if (error && String(error) !== ABORT_REASON) {
          setError(toErrorWithMessage(error));
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => abortcontroller.abort(ABORT_REASON);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depArr);
  return { data: result, isLoading, error };
};
