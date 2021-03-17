import * as React from 'react';
import {MMKV} from 'react-native-mmkv';
type CounterContextType = {
  count: number;
  increment: Function;
  decrement: Function;
};

const CounterContext = React.createContext<CounterContextType>(
  {} as CounterContextType,
);
const useCounter = () => React.useContext(CounterContext);

const CounterContextProvider: React.FC = ({children}) => {
  const [count, setCount] = React.useState(0);
  const increment = () => {
    setCount((value) => value + 1);
  };
  const decrement = () => setCount((value) => value - 1);

  React.useEffect(() => {
    if (count !== 0) {
      MMKV.set('COUNTER_APP::COUNT_VALUE', `${count}`);
    }
  }, [count]);
  React.useEffect(() => {
    const value = MMKV.getNumber('COUNTER_APP::COUNT_VALUE');
    if (value) {
      setCount(value);
    }
  }, []);

  return (
    <CounterContext.Provider
      value={{
        count,
        increment,
        decrement,
      }}>
      {children}
    </CounterContext.Provider>
  );
};

export {useCounter, CounterContextProvider};
