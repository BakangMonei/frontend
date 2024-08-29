// src/App.js
import React, { useState, useEffect } from "react";
import ItemCard from "./components/ItemCard";
import ItemForm from "./components/ItemForm";

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSave = async (item) => {
    if (editingItem) {
      // Update item
      try {
        await fetch(`http://localhost:5000/items/${editingItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        setEditingItem(null);
        fetchItems(); // Refresh the list after update
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      // Create new item
      try {
        await fetch("http://localhost:5000/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        fetchItems(); // Refresh the list after creation
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
      });
      fetchItems(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className=" text-5xl font-bold mb-4">CRUD Application</h1>
      <ItemForm
        item={editingItem}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <div className="flex flex-wrap -mx-4">
        {items.map((item) => (
          <div key={item._id} className="px-4 w-full md:w-1/2 lg:w-1/3">
            <ItemCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
