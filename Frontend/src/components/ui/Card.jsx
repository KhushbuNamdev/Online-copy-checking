import React from "react";
import "../../styles/global.css";

const Card = ({ children, className = "", ultra = false }) => {
  return (
    <div className={`glass-card ${ultra ? "ultra-glass" : ""} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
