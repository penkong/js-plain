import React, { Component } from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos } from "../actions/index";
import { StoreState } from "../reducers/index";
//
interface AppProps {
  todos: Todo[];
  fetchTodos(): any;
}

class _App extends Component<AppProps> {
  onBtnClick = (): void => {
    this.props.fetchTodos();
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return <div key={todo.id}>{todo.title}</div>;
    });
  }

  render() {
    console.log(this.props.todos);
    return (
      <div>
        <button onClick={this.onBtnClick}>fetch</button>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(mapStateToProps, { fetchTodos })(_App);
