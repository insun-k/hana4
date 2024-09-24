import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react';
import { LoginHandler } from '../components/Login';

const SampleSession = {
  loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

type LoginUser = typeof SampleSession.loginUser;
type cartItem = { id: number; name: string; price: number };
export type Session = { loginUser: LoginUser | null; cart: cartItem[] };

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
};

type SessionContextProps = Omit<typeof contextInitValue, 'session'> & {
  session: Session;
};

const SessionContext = createContext<SessionContextProps>(contextInitValue);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(SampleSession);

  const logout = () => setSession({ ...session, loginUser: null });

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
    setSession({ ...session, loginUser: { id, name } });
  };

  const addCartItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map(({ id }) => id), 0) + 1;
    setSession({
      ...session,
      cart: [...session.cart, { id: id, name, price }],
    });
  };

  const removeCartItem = (id: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((item) => item.id !== id),
    });
  };
  return (
    <SessionContext.Provider
      value={{ session, logout, login, removeCartItem, addCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
