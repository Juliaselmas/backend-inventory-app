"use client";
import { useAuth } from "@/context/auth";
import { useState, useEffect } from "react";
import ItemCard from "@/components/ItemCard"; // Importera ItemCard-komponenten
import { useRouter } from "next/navigation"; // För att omdirigera efter utloggning

export default function ItemsPage() {
  const { user, logout } = useAuth();
  const token = user?.token;
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    quantity: 1,
    category: "",
  });
  const [isEditing, setIsEditing] = useState(null); // Håller koll på vilket item som redigeras
  const router = useRouter(); // Omdirigering

  // Hämta items från API
  useEffect(() => {
    fetchItems();
  }, [user, token]);

  async function fetchItems() {
    if (!user || !token) return;

    const response = await fetch("/api/items", {
      headers: {
        Authorization: `Bearer ${token}`,
        userId: user.id,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setItems(data);
    }
  }

  const handleLogout = () => {
    logout(); // Rensa token och användarinformation
    router.push("/"); // Omdirigera till inloggningssidan
  };

  const handleCreate = async (e) => {
    if (!user || !token) return; // Kontrollera att användaren är inloggad

    e.preventDefault();
    console.log(token);
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Skicka token
        userId: user.id, // Dynamiskt userId
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      const createdItem = await response.json();
      setItems([...items, createdItem]);
      setNewItem({ name: "", description: "", quantity: 1, category: "" });
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "quantity") {
      return setNewItem({
        ...newItem,
        [e.target.name]: Number(e.target.value),
      });
    }
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setIsEditing(item); // Ställer in det item som ska redigeras
    setNewItem({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      category: item.category,
    });
  };

  const handleUpdate = async (e) => {
    if (!user || !token || !isEditing) return;

    e.preventDefault();
    const response = await fetch(`/api/items/${isEditing.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        userId: user.id,
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      const updatedItem = await response.json();
      setItems(
        items.map((item) => (item.id === isEditing.id ? updatedItem : item))
      );
      setIsEditing(null); // Återställ redigeringstillstånd
      setNewItem({ name: "", description: "", quantity: 1, category: "" });
    }
  };

  // Hantering för radering av ett item
  const handleDelete = async (id) => {
    if (!user || !token) return;

    const response = await fetch(`/api/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        userId: user.id,
      },
    });

    if (response.ok) {
      setItems(items.filter((item) => item.id !== id)); // Ta bort det raderade item från listan
    }
  };

  return (
    <main className="items-container">
      <button className="logout-button" onClick={handleLogout}>
        Log out
      </button>

      <form
        onSubmit={isEditing ? handleUpdate : handleCreate}
        className="item-form-container"
      >
        <h2 className="item-form__title">
          {isEditing ? "Edit Item" : "Create a New Item"}
        </h2>
        <div className="item-form-container">
          <div className="item-form__group">
            <label htmlFor="name" className="item-form__label">
              Name:
            </label>
            <input
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              className="item-form__input"
              required
            />
          </div>
          <div className="item-form__group">
            <label htmlFor="description" className="item-form__label">
              Description:
            </label>
            <input
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              className="item-form__input"
              required
            />
          </div>
          <div className="item-form__group">
            <label htmlFor="quantity" className="item-form__label">
              Quantity:
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={newItem.quantity}
              onChange={handleInputChange}
              className="item-form__input"
              required
            />
          </div>
          <div className="item-form__group">
            <label htmlFor="category" className="item-form__label">
              Category:
            </label>
            <input
              id="category"
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
              className="item-form__input"
              required
            />
          </div>
          <div className="item-form__button-group">
            <button
              type="submit"
              className="item-form__button item-form__button--primary"
            >
              {isEditing ? "Update Item" : "Create Item"}
            </button>
          </div>
        </div>
      </form>

      <div className="items-grid">
        <div className="item-card header-panel">
          <div className="item-details">
            <div className="item-detail">
              <strong>Name:</strong>
            </div>
            <div className="item-detail">
              <strong>Description:</strong>
            </div>
            <div className="item-detail">
              <strong>Quantity:</strong>
            </div>
            <div className="item-detail">
              <strong>Category:</strong>
            </div>
          </div>
        </div>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
}
