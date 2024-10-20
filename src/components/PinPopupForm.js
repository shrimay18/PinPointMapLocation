import React, { useState } from "react";
import './PinPopupForm.css'

const PinPopupForm = ({ onSubmit }) => {
  const [remark, setRemark] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(remark);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Remark:</label>
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Pin</button>
    </form>
  );
};

export default PinPopupForm;
