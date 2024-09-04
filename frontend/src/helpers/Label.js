import React from "react";
import "../styles/AddingForm.css";

const Label = ({ header, name, value, onChange }) => {
  return (
    <label className="xlabel">
      {header}
      <input className="xinput" type="text" name={name} value={value} onChange={onChange} required/>
    </label>
  );
};

export default Label;
