import { Session } from '../App.tsx';
import Login from './Login.tsx';
import Profile from './Profile.tsx';

type Props = {
  session: Session; // App에서 export한 type 사용
  logout: () => void;
  //login: (id: number, name: string) => void;
  login: () => void;
};

export default function My({ session, logout, login }: Props) {
  return (
    <>
      {session.loginUser ? (
        <Profile session={session} logout={logout} />
      ) : (
        <Login login={login} />
      )}

      {/* <ul>
        {session.cart.map((item) => (
          <li key={item.id}>
            {item.name} <small>({item.price})</small>
          </li>
        ))}
      </ul> */}
      {/* 위 코드랑 다른점 : 디스트럭처링 사용 */}
      <ul>
        {session.cart.map(({ id, name, price }) => (
          <li key={id}>
            {name} <small>({price})</small>
          </li>
        ))}
      </ul>
    </>
  );
}
