import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/Form/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/ContactFilter/ContactFilter';

import { filterContacts } from 'helpers/filterContact';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    if (this.state.contacts.length !== prevState.contacts.length) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }
  handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    resetForm({
      values: {
        name: '',
        number: '',
      },
    });

    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name, number, id: nanoid() }],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setFilterValue = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  render() {
    const filteredContacts = filterContacts(
      this.state.contacts,
      this.state.filter
    );
    return (
      <div className="App">
        <ContactForm handleSubmit={this.handleSubmit} />
        <Filter handleSetFilterValue={this.setFilterValue} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
