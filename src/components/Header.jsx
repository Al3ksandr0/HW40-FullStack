import React from "react";
import "./styles/Header.css";

function Header({ onAddClick, onListClick }) {
    return (
        <div className="header-container">
            <button onClick={onListClick}>Список контактів</button>
            <button onClick={onAddClick}>Додати контакт</button>
        </div>
    );
}

export default Header;
