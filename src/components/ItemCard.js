import React from "react";

export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="item-card">
      <h3 className="item-card__title">{item.name}</h3>
      <p className="item-card__detail">{item.description}</p>
      <p className="item-card__label">Quantity: {item.quantity}</p>
      <p className="item-card__label">Category: {item.category}</p>

      <div className="item-card__button-group">
        <button
          onClick={() => onEdit(item)} // Nu används props-funktionen onEdit
          className="item-card__button item-card__button--edit"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)} // Nu används props-funktionen onDelete
          className="item-card__button item-card__button--delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

/*
   name         String
  description  String
  quantity     Int
  category     String
  */
