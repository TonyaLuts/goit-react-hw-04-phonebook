import { useEffect, useState } from 'react';
import { GlobalStyle } from '../GlobalStyle';
import { nanoid } from 'nanoid';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';
import { FilterContact } from '../Filter/Filter';
import { Container } from './App.styled.js';

const keyLS = 'contacts-items';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem(keyLS);
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(keyLS, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contactVerification = contacts.findIndex(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    console.log(contactVerification);
    if (contactVerification >= 0) {
      alert(`${name} is already in contacts.`);
      return false;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      {
        id: nanoid(),
        name: name,
        number: number,
      },
    ]);
    return true;
  };

  const deleteContact = idx => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== idx)
    );
  };

  const searchFilter = event => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    const newArrayContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    return newArrayContacts;
  };

  return (
    <>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={addContact}></ContactForm>

        <h2>Contacts</h2>
        <FilterContact filter={filter} onSearch={searchFilter} />
        {contacts.length > 0 && (
          <ContactList
            contacts={getVisibleContacts()}
            onDelete={deleteContact}
          ></ContactList>
        )}
      </Container>
      <GlobalStyle />
    </>
  );
};
