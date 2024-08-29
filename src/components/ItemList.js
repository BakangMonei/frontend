import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemForm from "./ItemForm";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("http://localhost:5000/items");
      setItems(res.data);
    };
    fetchItems();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    setItems(items.filter((item) => item._id !== id));
  };

  const handleSubmit = async () => {
    const res = await axios.get("http://localhost:5000/items");
    setItems(res.data);
    setEditingItem(null);
  };

  return (
    <div>
      <ItemForm item={editingItem} onSubmit={handleSubmit} />
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
