import React from "react";
import ConnectedTodos from "./Todos";
import ConnectedGoals from "./Goals";
import { connect } from "react-redux";
import handleInitialData from "../actions/shared";

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleInitialData());

    //we move this implementation inside ComponentApp
    // store.subscribe(() => this.forceUpdate());
  }
  render() {
    if (this.props.loading === true) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}

// the connect function will do two things:
//render any component and pass that component any data that it need from the store
//we want to invoke connect that will return us ConnectedApp
export default connect((state) => ({
  loading: state.loading,
}))(App);
