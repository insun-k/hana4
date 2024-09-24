import { ForwardedRef, forwardRef } from 'react';
import { useSession } from '../hooks/session-context';
// import { Session } from '../App.tsx';
// import Button from './atoms/Button.tsx';

// type Props = {
//   session: Session; // App에서 export한 type 사용
//   logout: () => void;
// };

const Profile = forwardRef(
  (_: unknown, ref: ForwardedRef<HTMLButtonElement>) => {
    const { session, logout } = useSession();
    return (
      <div>
        <h3 className='m-4 text-center text-green-300'>
          {session.loginUser?.name} Logined
        </h3>

        {/* <Button onClick={logout} variant='btn-primary ' text='Sign Out' /> */}
        <button onClick={logout} className='btn btn-primary' ref={ref}>
          Sign Out
        </button>
      </div>
    );
  }
);

Profile.displayName = 'Profile'; // <Profile/> 로 사용하기 위해(컴포넌트로 인식하기 위해) 표시 필요

export default Profile;
