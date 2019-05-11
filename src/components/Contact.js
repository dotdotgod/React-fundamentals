import React, { Component } from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: "",
      contactData: [
        {
          name: "Abet",
          phone: "010-0000-0001"
        },
        {
          name: "Betty",
          phone: "010-0000-0002"
        },
        {
          name: "Eharlie",
          phone: "010-0000-0003"
        },
        {
          name: "David",
          phone: "010-0000-0004"
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    this.setState({
      selectedKey: key
    });

    console.log(key, "is selected");
  }

  handleChange(event) {
    this.setState({
      keyword: event.target.value
    });
  }

  render() {
    const mapToComponents = items => {
      items.sort((a, b) => {
        const convertedA = a.name.toString().toLowerCase();
        const convertedB = b.name.toString().toLowerCase();
        return convertedA < convertedB ? -1 : convertedA === convertedB ? 0 : 1;
      });

      items = items.filter(
        contact => contact.name.toLowerCase().indexOf(this.state.keyword) > -1
      );

      return items.map((item, i) => {
        return (
          <ContactInfo
            contact={item}
            key={i}
            onClick={() => this.handleClick(i)}
          />
        );
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          name="keyword"
          placeholder="search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey !== -1}
          contact={this.state.contactData[this.state.selectedKey]}
        />
      </div>
    );
  }
}

ContactDetails.defaultProps = {
  contact: {
    name: "",
    phone: ""
  }
};
export default Contact;
