import React, { Component } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import Counter from "./Counter";

class App extends Component {
  static propTypes = {
    number: PropTypes.number
  };

  static defaultProps = {
    number: -1
  };

  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
    this.addNumber = this.addNumber.bind(this);
    this.subtractNumber = this.subtractNumber.bind(this);
  }

  addNumber() {
    this.setState({
      number: this.state.number + 1
    });
  }
  subtractNumber() {
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return <Counter />;
  }
}

export default hot(module)(App);
