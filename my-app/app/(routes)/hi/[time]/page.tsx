type Params = {
  params: {
    time: string;
  };
  searchParams: {
    q: string;
  };
};

// 미리 생성해두기
export function generateStaticParams() {
  return ['morning', 'afternoon', 'evening', 'night'].map((time) => ({ time }));
}

export default function Time({
  params: { time },
  searchParams: { q },
}: Params) {
  return (
    <>
      Good {time}! <span className='text-red-600'>{q}</span>
    </>
  );
}
