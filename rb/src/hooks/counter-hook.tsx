import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
  //seState,
} from 'react';

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

type Action = {
  type: 'plus' | 'minus';
  payload: number;
};

// 렌더링 되지않는 밖에 만드는게 효율적
const reducer = (count: number, { type, payload }: Action) => {
  if (type === 'plus') return count + payload;
  if (type === 'minus') return count - payload;
  return count;
};

export const CounterProvider = ({ children }: PropsWithChildren) => {
  // const [count, setCount] = useState(0);   // !! useState 버전
  // !! useReducer 버전
  const [count, dispatch] = useReducer(reducer, 0);
  const plusCount = (step: number = 1) => {
    //console.log('plus!!');
    // setCount((pre) => pre + 1);
    dispatch({ type: 'plus', payload: step });
  };
  const minusCount = (step: number = 1) => {
    //console.log('minus!!');
    // setCount((pre) => pre - 1);
    dispatch({ type: 'minus', payload: step });
  };

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => useContext(CounterContext);
