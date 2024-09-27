import { useEffect } from 'react';

export const useTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  // const setup = () => {};
  // const clear = () => {};
  // const reset = () => {};

  useEffect(() => {
    const timer = setTimeout(cb, delay, ...args);
    return () => clearTimeout(timer);
  }, [cb, delay, args]);
};

export const useInterval = (cb: () => void, delay: number) => {
  useEffect(() => {
    const intl = setInterval(cb, delay);
    return () => clearInterval(intl);
  });
};
