import { Wrapper, CounterText, Button, Label, Input } from "./Components";
import { useState, useEffect, useRef } from "react";

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

  useEffect(() => {
    setLoading(true);
    getInitialCounter().then((initialCounter) => {
      setLoading(false);
      setInitialCounter(initialCounter);
      
      // inputEl.current.focus();
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      inputEl.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    let id;

    setCounter(initialCounter);
    id = setInterval(() => {
      console.log("countdown", initialCounter);
      // console.log("id", id)
      setCounter((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    }, 1000);

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [initialCounter]);

  if (loading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  return (
    <Wrapper>
      <CounterText>{counter}</CounterText>
      <div>
        <Button
          onClick={() => {
            setCounter((prevCount) => prevCount - 1);
          }}
        >
          -1
        </Button>{" "}
        <Button
          onClick={() => {
            setCounter((prevCount) => prevCount + 1);
          }}
        >
          +1
        </Button>
      </div>

      <Label>
        <span>Initial Counter</span>
        <Input
          ref={inputEl}
          value={initialCounter}
          onChange={(e) => setInitialCounter(e.target.value)}
        />
      </Label>
    </Wrapper>
  );
};

export default CounterPage;
