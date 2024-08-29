import React, { useState, useEffect } from "react";

const ItemForm = ({ item, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description) {
      setAlertType("error");
      setAlertMessage("Please fill out all fields.");
      return;
    }

    onSave({ name, description });
    setName("");
    setDescription("");
    setAlertType("success");
    setAlertMessage("Item saved successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">
        {item ? "Edit Item" : "Add Item"}
      </h2>
      {alertMessage && (
        <div
          className={`p-4 mb-4 rounded ${
            alertType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alertMessage}
        </div>
      )}
      <label className="block mb-2">
        <span className="text-gray-700">Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </label>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-200"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
