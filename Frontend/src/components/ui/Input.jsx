import React from "react";
import "../../styles/global.css";

const Input = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  className = "",
  wrapperClassName = "",
  disabled = false,
  ...props
}) => {
  return (
    <div className={`input-group ${wrapperClassName}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input-field-glass ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;


