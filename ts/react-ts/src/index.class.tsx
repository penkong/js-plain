import React from "react";
import ReactDOM from "react-dom";

interface AppProps {
  color?: string;
}

interface AppState {
  counter: number;
}

class App extends React.Component<AppProps, AppState> {
  // in line state over write generic state of  component.
  // state inline != state constructor
  constructor(props: AppProps) {
    super(props);
    this.state = { counter: 0 };
  }

  onInc = (): void => {
    this.setState({ counter: this.state.counter + 1 });
  };

  onDec = (): void => {
    this.setState({ counter: this.state.counter - 1 });
  };

  render() {
    return (
      <div>
        <button onClick={this.onInc}>Incr</button>
        <button onClick={this.onDec}>dec</button>
        {this.state.counter}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
