import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';

// const SampleSession = {
//   loginUser: { id: 1, name: 'Hong' },
//   cart: [
//     { id: 100, name: '라면', price: 3000 },
//     { id: 101, name: '컵라면', price: 2000 },
//     { id: 200, name: '파', price: 5000 },
//   ],
// };

// function My(){
//   return(
//     SampleSession.loginUser
//   )
// }

function App() {
  const [count, setCount] = useState(0);
  const plusCount = () => setCount((count) => count + 1);
  const minusCount = () => setCount(count - 1);

  return (
    <>
      {/* <h1>rbvite</h1> */}
      <Hello
        name='React!'
        age={33}
        plusCount={plusCount}
        minusCount={minusCount}
      />
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          App.count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
