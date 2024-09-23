import { Session } from '../App.tsx';
import Button from './atoms/Button.tsx';

type Props = {
  session: Session; // App에서 export한 type 사용
  logout: () => void;
};

export default function Profile({ session, logout }: Props) {
  return (
    <div>
      <h3>{session.loginUser?.name} Logined</h3>
      <Button onClick={logout} variant='btn-primary' text='Sign Out' />
      <button onClick={logout} className='btn'>
        Sign Out
      </button>
    </div>
  );
}
