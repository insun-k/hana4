type Params = {
  params: {
    time: string;
    cmt: string;
  };
};

export default function Comment({ params: { time, cmt } }: Params) {
  return (
    <>
      Good {time}! comment - <span className='text-red-600'>{cmt}</span>
    </>
  );
}
