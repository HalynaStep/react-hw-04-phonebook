import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/Form/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/ContactFilter/ContactFilter';

const initialContacts = () => {
  const localStorageContact = localStorage.getItem('contacts');
  if (localStorageContact === '' || JSON.parse(localStorageContact) === null) {
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  }
  return JSON.parse(localStorageContact);
};

export function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  const filteredContacts = filterContacts();

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function setFilterValue(evt) {
    const {
      target: { value },
    } = evt;
    setFilter(value);
  }

  function handleSubmit(name, number) {
    if (contacts.some(contact => contact.name.includes(name))) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(state => [...state, { id: nanoid(), name, number }]);
  }

  function filterContacts() {
    const filterValue = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  }

  function deleteContact(id) {
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  return (
    <div className="App">
      <ContactForm handleSubmit={handleSubmit} />
      <Filter filter={filter} setFilterValue={setFilterValue} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
}
