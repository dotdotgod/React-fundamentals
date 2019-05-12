import React, { Component } from "react";
import PropTypes from "prop-types";

class ContactCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.handleClick();
    }
  }

  handleClick() {
    const contact = {
      name: this.state.name,
      phone: this.state.phone
    };

    this.props.onCreate(contact);
    this.setState({
      name: "",
      phone: ""
    });
    this.nameInput.focus();
  }

  handleChange(event) {
    let nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <div>
        <h2>Create Contact</h2>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={this.state.name}
          onChange={this.handleChange}
          ref={ref => {
            this.nameInput = ref;
          }}
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={this.state.phone}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <p />
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}
ContactCreate.propTypes = {
  onCreate: PropTypes.func
};
ContactCreate.defaultPropTypes = {
  onCreate: () => {
    console.error("onCreate Not Define");
  }
};

export default ContactCreate;
