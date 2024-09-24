import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useId,
} from 'react';

type Props = {
  label: string;
  type?: string;
  placehoder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  //ref: RefObject<HTMLInputElement> | null;
  classNames?: string;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
};

function LabelInput(
  {
    label,
    inputAttrs,
    type = 'text',
    placehoder = `${label}...`,
    onChange = () => {},
    classNames = '',
    // ref = null,
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();
  // console.log('🚀  id:', id);

  return (
    <div className='my-3 flex'>
      <label htmlFor={id} className='w-32'>
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placehoder}
        className={`inp ${classNames}`}
        onChange={onChange}
        {...inputAttrs}
      />
    </div>
  );
}

export default forwardRef(LabelInput);
