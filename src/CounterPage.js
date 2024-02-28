import { Wrapper, CounterText, Button, Label, Input } from "./Components";
import { useState, useEffect } from "react";

const getInitialCounter = () =>
  new Promise((res) => {
    setTimeout(() => {
      res(10);
    }, 1000);
  });

export const CounterPage = () => {
  const [initialCounter, setInitialCounter] = useState(10);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let id;
    getInitialCounter().then((initialCounter) => {
      setCounter(initialCounter);
      id = setInterval(() => {
        console.log("countdown", initialCounter);
        // console.log("id", id)
        setCounter((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
      }, 1000);
    });

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, []);

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
          value={initialCounter}
          onChange={(e) => setInitialCounter(e.target.value)}
        />
      </Label>
    </Wrapper>
  );
};

export default CounterPage;
