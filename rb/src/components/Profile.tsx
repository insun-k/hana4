import { Session } from '../App.tsx';

type Props = {
  session: Session; // App에서 export한 type 사용
  logout: () => void;
};

export default function Profile({ session, logout }: Props) {
  return (
    <div>
      <h3>{session.loginUser?.name} Logined</h3>
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
}
