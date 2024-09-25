import { useState } from 'react';

export default function useToggle(defVal: boolean = false) {
  const [state, setState] = useState(defVal);

  const toggle = () => setState((pre) => !pre);

  return [state, toggle] as const;
}
