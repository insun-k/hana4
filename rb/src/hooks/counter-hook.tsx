import { createContext, PropsWithChildren, useContext, useState } from 'react';

type CounterContextProps = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};

// value에서 내보낼 타입 작성 (<CounterContextProps>)
const CounterContext = createContext<CounterContextProps>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

export const CounterProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const plusCount = () => {
    //console.log('plus!!');
    setCount((pre) => pre + 1);
  };
  const minusCount = () => {
    //console.log('minus!!');
    setCount((pre) => pre - 1);
  };

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => useContext(CounterContext);
