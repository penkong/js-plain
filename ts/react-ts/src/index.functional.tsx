import React from "react";
import ReactDOM from "react-dom";

interface AppProps {
  color?: string;
}

interface AppState {
  counter: number;
}

const App = (props: AppProps): JSX.Element => {
  return <div>{props.color}</div>;
};

ReactDOM.render(<App color="red" />, document.getElementById("root"));
