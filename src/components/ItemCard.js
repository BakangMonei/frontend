import React, { useState } from "react";

const ItemCard = ({ item, onEdit, onDelete }) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div className="bg-gray-600 shadow-lg rounded-lg p-4 mb-4 w-full">
      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      <p className="text-white">{item.description}</p>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all duration-200"
          onClick={() => onEdit(item)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-200"
          onClick={() => setShowPopover(true)}
        >
          Delete
        </button>
      </div>

      {/* Popover for delete confirmation */}
      {showPopover && (
        <div className="absolute z-10 mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-64">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete this item?
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
              onClick={() => setShowPopover(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => {
                onDelete(item._id);
                setShowPopover(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
