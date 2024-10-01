import {
  createContext,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react';
import { LoginHandler } from '../components/Login';
import { useFetch } from './fetch-hook';

// useFetch로 대체
// const SampleSession = {
//   loginUser: { id: 1, name: 'Hong' },
//   cart: [
//     { id: 100, name: '라면', price: 3000 },
//     { id: 101, name: '컵라면', price: 2000 },
//     { id: 200, name: '파', price: 5000 },
//   ],
// };

const SampleSession = {
  loginUser: null,
  cart: [],
};

type LoginUser = { id: number; name: string };
export type CartItem = { id: number; name: string; price: number };
export type Session = { loginUser: LoginUser | null; cart: CartItem[] };

const contextInitValue = {
  session: SampleSession,
  logout: () => {},
  login: (id: number, name: string) => {
    console.log(id, name);
  },
  removeCartItem: (itemId: number) => {
    console.log(itemId);
  },
  addCartItem: (name: string, price: number) => {
    console.log(name, price);
  },
  editCartItem: (item: CartItem) => console.log(item),
};

type SessionContextProps = Omit<typeof contextInitValue, 'session'> & {
  session: Session;
};

const SessionContext = createContext<SessionContextProps>(contextInitValue);

type Action =
  | { type: 'intialize'; payload: Session }
  | {
      type: 'login';
      payload: LoginUser;
    }
  | {
      type: 'logout';
      payload: null;
    }
  | {
      type: 'addCartItem';
      payload: CartItem;
    }
  | {
      type: 'removeCartItem';
      payload: number;
    }
  | {
      type: 'editCartItem';
      payload: CartItem;
    };

const reducer = (session: Session, { type, payload }: Action) => {
  switch (type) {
    case 'intialize':
      return payload;
    case 'login':
      return { ...session, loginUser: payload };
    case 'logout':
      return { ...session, payload };
    case 'addCartItem':
      return {
        ...session,
        cart: [...session.cart, payload],
      };
    case 'editCartItem':
      return {
        ...session,
        cart: session.cart.map((oldItem) =>
          oldItem.id === payload.id ? payload : oldItem
        ),
      };
    case 'removeCartItem':
      return {
        ...session,
        cart: session.cart.filter(({ id }) => id !== payload),
      };
    default:
      return session;
  }
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  //const [session, setSession] = useState<Session>(SampleSession);
  const [session, dispatchSession] = useReducer(reducer, SampleSession);

  const logout = () => dispatchSession({ type: 'logout', payload: null });
  //setSession({ ...session, loginUser: null });

  const { data } = useFetch<Session>('/data/sample.json');
  useLayoutEffect(() => {
    // effect보다(useFetch) 빨리 실행하려고 LayoutEffect사용
    // setSession(data || SampleSession);
    dispatchSession({ type: 'intialize', payload: data || SampleSession });
  }, [data]);

  const loginRef = useRef<LoginHandler>(null);
  const login = (id: number, name: string) => {
    if (!id) {
      alert('Id를 입력하세요');
      return loginRef.current?.focus('id');
    }
    if (!name) {
      alert('name을 입력하세요');
      return loginRef.current?.focus('name');
    }
    console.log('!!!', loginRef.current);

    // setSession({ ...session, loginUser: { id, name } });
    dispatchSession({ type: 'login', payload: { id, name } });
  };

  const addCartItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map(({ id }) => id), 0) + 1;
    // setSession({
    //   ...session,
    //   cart: [...session.cart, { id: id, name, price }],
    // });
    dispatchSession({ type: 'addCartItem', payload: { id, name, price } });
  };

  const removeCartItem = (toRemoveId: number) => {
    // setSession({
    //   ...session,
    //   cart: session.cart.filter((item) => item.id !== id),
    // });
    dispatchSession({ type: 'removeCartItem', payload: toRemoveId });
  };

  const editCartItem = (item: CartItem) => {
    // setSession({
    //   ...session,
    //   cart: session.cart.map((oldItem) =>
    //     oldItem.id === item.id ? item : oldItem
    //   ),
    // });
    dispatchSession({ type: 'editCartItem', payload: item });
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        logout,
        login,
        removeCartItem,
        addCartItem,
        editCartItem,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
