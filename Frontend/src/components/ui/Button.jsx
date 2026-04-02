import React from "react";
import "../../styles/global.css";

const Button = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary", // primary, secondary, icon, danger
  type = "button", 
  disabled = false,
  shimmer = false,
  style = {}
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary": return "secondary-btn";
      case "icon": return "icon-btn";
      case "danger": return "icon-btn delete";
      default: return "add-btn";
    }
  };

  const combinedClassName = `${getVariantClass()} ${shimmer ? "liquid-shimmer" : ""} ${className}`;

  return (
    <button 
      type={type} 
      className={combinedClassName} 
      onClick={onClick} 
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;


