import React from "react";
import ContactRow from "./ContactRow";
import "./styles/ContactList.css";

function ContactList({ contacts, onDelete, onEdit }) {
    if (contacts.length === 0) return <p>Контактів поки немає.</p>;

    return (
        <div className="contact-list">
            <div className="contact-list-header">
                <div>Ім’я</div>
                <div>Прізвище</div>
                <div>Телефон</div>
                <div>Дії</div>
            </div>
            {/* простой проход и вывод с двумя кнопками */}
            {contacts.map((contact) => (
                <ContactRow
                    key={contact.id}
                    contact={contact}
                    onDelete={() => onDelete(contact.id)}
                    onEdit={() => onEdit(contact)}
                />
            ))}
        </div>
    );
}

export default ContactList;
