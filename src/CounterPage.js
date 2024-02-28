import { Wrapper, CounterText, Button, Label, Input } from "./Components";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const getInitialCounter = () =>
  new Promise((res) => {
    setTimeout(() => {
      res(100);
    }, 1000);
  });

export const CounterPage = () => {
  const [initialCounter, setInitialCounter] = useState(0);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const inputEl = useRef(null);

  // fetch api via .then
  useEffect(() => {
    setLoading(true);
    getInitialCounter().then((initialCounter) => {
      setLoading(false);
      setInitialCounter(initialCounter);

      // inputEl.current.focus();
    });
  }, []);

  // focus input by using useRef
  useEffect(() => {
    if (!loading) {
      inputEl.current.focus();
    }
  }, [loading]);

  // set counter (main)
  useEffect(() => {
    let id;
    setCounter(initialCounter);
    id = setInterval(() => {
      console.log("countdown", initialCounter);
      // console.log("id", id)
      setCounter((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    }, 1000);

    // clear effect
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [initialCounter]);

  console.log("rerender");

  const decrement = useCallback(() => {
    setCounter((prevCount) => prevCount - 1);
  }, [setCounter]);

  const increment = useCallback(() => {
    setCounter((prevCount) => prevCount + 1);
  }, [setCounter]);

  const handleChange = useCallback(
    (e) => {
      setInitialCounter(e.target.value);
    },
    [setInitialCounter]
  );

  if (loading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  return (
    <Wrapper>
      <CounterText>{counter}</CounterText>
      <div>
        <Button onClick={decrement}>-1</Button>{" "}
        <Button onClick={increment}>+1</Button>
      </div>

      <Label>
        <span>Initial Counter</span>
        <Input ref={inputEl} value={initialCounter} onChange={handleChange} />
      </Label>
    </Wrapper>
  );
};

export default CounterPage;
