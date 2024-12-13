// useState(1) or useState(() => 1)
// 함수 x) setState(x)  ---> dispatch(x) ==> reducer(s, x);
// 함수일때) setState(pre => pre + 1) ---> dispatch(x) ==> reducer(s, pre => pre + 1);
// function useMyState<S>(init: S | () => S) { // init -> 함수이거나 아니거나
//   const [state, dispatch] = useReducer(
//     (pre: S, action: S|(s:S) => S) => typeof action === 'function'? action(pre) : action,
//     typeof init === 'function'? init() : init
//   )
//   return [state, dispatch] as const;
// };
