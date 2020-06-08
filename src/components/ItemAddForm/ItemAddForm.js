import React from "react";

import "./ItemAddForm.css";

const ItemAddForm = ({ onItemAdded }) => {
  return (
    <div className="item-add-form">
      <button className="btn btn-outline-secondary" onClick={onItemAdded}>
        Add Item
      </button>
    </div>
  );
};
export default ItemAddForm;
