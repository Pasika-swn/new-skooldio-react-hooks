import { Wrapper, CounterText, Button } from "./Components";
import { useState, useEffect } from "react";

export const CounterPage = () => {
  const [counter, setCounter] = useState(10);
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
    </Wrapper>
  );
};

export default CounterPage;
