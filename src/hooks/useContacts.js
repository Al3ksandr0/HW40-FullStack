import { useState } from "react";
import { getDefaultContacts } from "../api/contacts";

export default function useContacts() {
  //все контакты
  const [contacts, setContacts] = useState([]);

  // грузим все контакты с апи
  const loadDefaultContacts = async () => {
    const data = await getDefaultContacts();
    setContacts(data);
  };

  const addContact = (newContact) => {

    const contactWithId = {
      ...newContact,
      id: Date.now(),
      //всем контактам даем айди 
    };

    setContacts((previousContacts) => [...previousContacts, contactWithId]); // их в конец
  };

  // редактируем
  const updateContact = (updatedContact) => {
    setContacts((previousContacts) =>
      previousContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact // если id тот же то обновим
      )
    );
  };

  // удаляем
  const deleteContact = (idToDelete) => {
    setContacts((previousContacts) =>
      previousContacts.filter((contact) => contact.id !== idToDelete)
    );
  };

  // експорт их в app.jsx
  return {
    contacts,
    loadDefaultContacts,
    addContact,
    updateContact,
    deleteContact,
  };
}
