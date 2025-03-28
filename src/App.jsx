import { useState, useEffect } from "react";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import EditModal from "./components/EditModal";
import useContacts from "./hooks/useContacts";

function App() {
  const {
    contacts,
    loadDefaultContacts,
    addContact,
    updateContact,
    deleteContact,
  } = useContacts();

  const [view, setView] = useState("list");
  const [editableContact, setEditableContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadDefaultContacts();
  }, []);

  const handleEdit = (contact) => {
    setEditableContact(contact);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      {/* переключение старниц */}
      <Header onAddClick={() => setView("form")} onListClick={() => setView("list")} />

      {view === "list" ? (
        <ContactList contacts={contacts} onDelete={deleteContact} onEdit={handleEdit} />
      ) : (
        <ContactForm
          contact={editableContact}
          onSave={(contact) => {
            contact.id ? updateContact(contact) : addContact(contact);
            setView("list");
          }}
          onCancel={() => setView("list")}
        />
      )}

      <EditModal
        open={isModalOpen}
        contact={editableContact}
        onCancel={() => {
          setIsModalOpen(false);
          setEditableContact(null);
        }}
        onSave={(contact) => {
          updateContact(contact);
          setIsModalOpen(false);
          setEditableContact(null);
        }}
      />

    </div>
  );
}
export default App;
