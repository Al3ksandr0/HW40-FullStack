import React, { useEffect, useState } from "react";
import validatePhone from "./validatePhone";
import "./styles/ContactForm.css";
import validateName from "./validateName";

function ContactForm({ contact, onCancel, onSave }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});

    // если редактируем контакт то заполняем поля
    useEffect(() => {
        if (contact) {
            setFirstName(contact.firstName || "");
            setLastName(contact.lastName || "");
            setPhone(contact.phone || "");
        }
    }, [contact]);

    const validate = () => {
        const newErrors = {};
        const namePattern = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'-]+$/;

        if (!firstName.trim()) {
            newErrors.firstName = "Ім’я обов’язкове";
        } else if (!validateName(firstName)) {
            newErrors.firstName = "Ім’я має містити тільки літери та дефіси";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Прізвище обов’язкове";
        } else if (!validateName(lastName)) {
            newErrors.lastName = "Прізвище має містити тільки літери та дефіси";
        }

        if (!validatePhone(phone)) {
            newErrors.phone = "Некоректний номер телефону";
        }

        setErrors(newErrors);

        // нет ошибок тогда тру
        return Object.keys(newErrors).length === 0;
    };

    // кнопка сохранить
    const handleSubmit = (e) => {
        e.preventDefault(); // типо не дает обновить старницу чтобы не терять введенные данные, т к я без куки (

        if (!validate()) return;

        const newContact = {
            id: contact?.id,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone: phone.trim(),
        };

        onSave(newContact);
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ім’я"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}

            <input
                type="text"
                placeholder="Прізвище"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}

            <input
                type="text"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <div className="buttons">
                <button type="submit">Зберегти</button>
                <button type="button" onClick={onCancel}>Відміна</button>
            </div>
        </form>
    );
}

export default ContactForm;
