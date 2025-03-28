import React from "react";
import "./styles/ContactRow.css";

function ContactRow({ contact, onDelete, onEdit }) {
    return (
        <div className="contact-row">
            <div className="contact-cell">{contact.firstName}</div>
            <div className="contact-cell">{contact.lastName}</div>
            <div className="contact-cell">{contact.phone}</div>
            <div className="contact-cell contact-actions">
                <button onClick={onEdit}>Редагувати</button>
                <button onClick={onDelete} className="delete-btn">Видалити</button>
            </div>
        </div>
    );
}

export default ContactRow;
