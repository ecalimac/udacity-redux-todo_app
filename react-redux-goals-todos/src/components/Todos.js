import React from "react";
import { connect } from "react-redux";
import List from "./List";

import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggleTodo,
} from "../actions/todos";

class Todos extends React.Component {
  addItem = (e) => {
    e.preventDefault();

    this.props.dispatch(
      handleAddTodo(this.input.value, () => (this.input.value = ""))
    );
  };
  removeItem = (todo) => {
    //first try: you can notice that will appear a slight delay because it take some time to delete it from the server
    // return API.deleteGoal(goal.id).then(() => {
    //   this.props.store.dispatch(removeGoalAction(goal.id));
    // });
    //second happy try: optimistic update
    // this.props.store.dispatch(removeTodoAction(todo.id));
    // return API.deleteTodo(todo.id).catch(() => {
    //   this.props.store.dispatch(addTodoAction(todo));
    //   alert("An error occurred. Try again");
    // });
    // Cause is better to have ui code and data fetching separately all the logic above has been moved to handleDeleteTodo action creator
    this.props.dispatch(handleDeleteTodo(todo));
  };
  toggleItem = (id) => {
    this.props.dispatch(handleToggleTodo(id));
  };
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          placeholder="Add Todo"
          ref={(input) => (this.input = input)}
        />
        <button onClick={this.addItem}>Add Todo</button>
        <List
          items={this.props.todos}
          remove={this.removeItem}
          toggle={this.toggleItem}
        />
      </div>
    );
  }
}

export default connect((state) => ({
  todos: state.todos,
}))(Todos);
