import { useState } from 'react';

export default function useToggle(defVal: boolean = false) {
  const [state, setState] = useState(defVal);

  const toggle = (forceState: unknown) =>
    setState((pre) => (typeof forceState === 'boolean' ? forceState : !pre));

  return [state, toggle] as const;
}
