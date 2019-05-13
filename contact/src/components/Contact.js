import React, { Component } from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";
import ContactCreate from "./ContactCreate";

class Contact extends Component {
  constructor(props) {
    super(props);
    const contactData = localStorage.contactData;
    console.log(contactData);

    this.state = {
      selectedKey: -1,
      keyword: "",
      contactData: contactData ? JSON.parse(contactData) : []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.contactData) !==
      JSON.stringify(this.state.contactData)
    ) {
      localStorage.contactData = JSON.stringify(this.state.contactData);
    }
  }
  handleEdit(name, phone) {
    if (this.state.selectedKey > 0) {
      this.setState({
        contactData: [
          ...this.state.contactData.slice(0, this.state.selectedKey),
          {
            name: name,
            phone: phone
          },
          ...this.state.contactData.slice(this.state.selectedKey + 1)
        ]
      });
    }
  }

  handleRemove() {
    if (this.state.selectedKey > 0) {
      this.setState({
        contactData: [
          ...this.state.contactData.slice(0, this.state.selectedKey),
          ...this.state.contactData.slice(this.state.selectedKey + 1)
        ],
        selectedKey: -1
      });
    }
  }

  handleCreate(contact) {
    this.setState({
      contactData: [...this.state.contactData, contact]
    });
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
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <ContactCreate onCreate={this.handleCreate} />
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
