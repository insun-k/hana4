import { ReactNode, useState } from 'react';

//const Title = (props: { text: string }) => <h1>{props.text}</h1>;

// 가독성위해 type 별도로
type TitleProps = {
  text: string;
  name: string;
};

type Props = {
  name: string;
  age: number;
  plusCount: () => void;
  minusCount: () => void;
};

//prop
const Title = ({ text, name }: TitleProps) => (
  <h1>
    {text} {name}
  </h1>
); // destructuring 사용 가능

// children
const Body = ({ children }: { children: ReactNode }) => {
  // console.log('bbbbbb!!');
  return <div className='red'>{children}</div>;
};

export default function Hello({ name, age, plusCount, minusCount }: Props) {
  // Hello => container component
  const [myState, setMyState] = useState(0); // 상태
  // let v = 1;
  // console.log('**************', v, myState);
  return (
    <>
      <Title text='Hi,' name={name} />
      <Body>
        This is Hello Body Component. {myState} - {age}
      </Body>
      <button
        onClick={() => {
          // v++;
          plusCount();
          setMyState(myState + 1);
          //console.log('v=', v);
        }}
      >
        Hello.Click Here!
      </button>
      <button
        onClick={() => {
          minusCount();
          setMyState(myState - 1);
        }}
      >
        Minus
      </button>
    </>
  );
}

// 버튼 누를때마다 component(Body), container component(Hello) 모두 실행됨 (console.log 참고)
// => 불합리  => container component 적절한 사용 필요
