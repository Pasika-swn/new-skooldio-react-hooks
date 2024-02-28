import { Wrapper, CounterText, Button, Label, Input } from "./Components";
import { useState, useEffect } from "react";

export const CounterPage = () => {
  const [initialCounter, setInitialCounter] = useState(10);
  const [counter, setCounter] = useState(initialCounter);

  useEffect(() => {
    setCounter(initialCounter);
    const id = setInterval(() => {
      console.log("countdown", initialCounter);
      setCounter((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    }, 1000);
    return ()=> {
      clearInterval(id)
    }
  }, [initialCounter]);

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
