import React from "react";
import { createPortal } from "react-dom";
import Card from "./Card";
import "../../styles/global.css";

const Modal = ({ 
  children, 
  onClose, 
  title, 
  description, 
  icon: Icon, 
  iconColor = "#06b6d4",
  className = "" 
}) => {
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  const modalContent = (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <Card ultra className={`form-modal-box ${className}`}>
        <div className="modal-header-glass">
          {Icon && (
            <div className="header-icon-box" style={{ background: `${iconColor}1a`, border: `1px solid ${iconColor}33` }}>
              <Icon size={24} color={iconColor} />
            </div>
          )}
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
        {children}
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
