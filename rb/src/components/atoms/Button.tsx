import { ButtonHTMLAttributes } from 'react';

type Props = {
  text: string;
  variant?: string;
  classNames?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>; // onclick 넣는 대신 BUTTON에 해당하는 모든 기능

export default function Button({
  text,
  variant = '',
  classNames = '',
  ...props
}: Props) {
  return (
    <button
      // onClick={props.onClick}
      {...props} // 위에 대신 스프레드 사용
      //className={`btn ${variant} ${classNames}`}
      className={`btn ${variant} ${classNames}`}
    >
      {text}
    </button>
  );
}
