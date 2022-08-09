import React from "react";

function Counter({ messagesLength }) {
  return (
    <div id="counterContainer">
      <div id="counter">Counter: {messagesLength}</div>
    </div>
  );
}

export default Counter;
