import { Navigate, useNavigate } from 'react-router-dom';
import { useTimeout } from './hooks/timer-hooks';

export const NotFound = () => {
  const navigate = useNavigate();
  useTimeout(() => {
    navigate('/');
  }, 2000);
  return (
    <div>
      페이지를 찾을 수 없습니다!
      <Navigate to='/' />
    </div>
  );
};
