import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import { useCounter } from '../hooks/counter-hook';
import { useFetch } from '../hooks/fetch-hook';
import { FaSpinner } from 'react-icons/fa';

//const Title = (props: { text: string }) => <h1>{props.text}</h1>;

// 가독성위해 type 별도로
type TitleProps = {
  text: string;
  name: string;
};

type Props = {
  name: string;
  friend: number;
  // plusCount: () => void;
  // minusCount: () => void;
};

//prop
const Title = ({ text, name }: TitleProps) => (
  <h1 className='text-4xl font-bold'>
    {text} {name}
  </h1>
); // destructuring 사용 가능

// children
const Body = ({ children }: { children: ReactNode }) => {
  // console.log('bbbbbb!!');
  return <div className='red'>{children}</div>;
};

export type MyHandler = {
  jumpHelloState: () => void;
};

type PlaceUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};

function Hello({ name, friend }: Props, ref: ForwardedRef<MyHandler>) {
  // Hello => container componentis
  const { count, plusCount, minusCount } = useCounter();
  const [myState, setMyState] = useState(0); // 상태
  let v = 1;
  // console.log('**************', v, myState);

  const handler: MyHandler = {
    jumpHelloState: () => setMyState((pre) => pre * 10),
  };
  useImperativeHandle(ref, () => handler);

  const {
    data: friendInfo,
    isLoading,
    error,
  } = useFetch<PlaceUser>(
    `https://jsonplaceholder.typicode.com/users/${friend}`,
    true,
    [friend]
  );

  return (
    <div className='w-2/3 border p-5 text-center'>
      <Title text='Hi,' name={name} />
      <Body>
        <h3 className='text-center text-2xl'>myState : {myState}</h3>
        {isLoading && (
          <h3>
            <FaSpinner size={20} className='animate-spin text-blue-500' />
          </h3>
        )}
        {error ? (
          <strong className='text-red-500'>
            {error.message && error.message.startsWith('404')
              ? `Your friend is not found ${friend}`
              : error.message}
          </strong>
        ) : (
          <strong className='text-blue-500'>
            My friend is {friendInfo?.id}.{friendInfo?.username}
          </strong>
        )}
        <p>
          {v} - {friend}
        </p>
      </Body>
      <button
        className='btn'
        onClick={() => {
          v++;
          plusCount();
          setMyState(myState + 1);
          //console.log('v=', v);
        }}
      >
        Hello
      </button>
      <strong className='mx-5'>{count}</strong>
      <button
        className='btn btn-danger'
        onClick={() => {
          minusCount();
          setMyState(myState - 1);
        }}
      >
        Minus
      </button>
    </div>
  );
}

const ImpHello = forwardRef(Hello);
export default ImpHello;

// 버튼 누를때마다 component(Body), container component(Hello) 모두 실행됨 (console.log 참고)
// => 불합리  => container component 적절한 사용 필요
