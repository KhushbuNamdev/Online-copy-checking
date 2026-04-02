import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "../../styles/global.css";

const Select = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  required = false, 
  className = "",
  wrapperClassName = "",
  disabled = false,
  placeholder = "Select Option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (val) => {
    if (disabled) return;
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => 
    (typeof opt === "string" ? opt === value : (opt.value || opt._id) === value)
  );

  const getLabel = (opt) => typeof opt === "string" ? opt : (opt.label || opt.name);
  const getValue = (opt) => typeof opt === "string" ? opt : (opt.value || opt._id);

  return (
    <div className={`input-group custom-select-wrapper ${wrapperClassName}`} ref={dropdownRef}>
      {label && <label>{label}</label>}
      <div 
        className={`input-field-glass custom-select ${disabled ? 'disabled' : ''} ${className}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span className={!value ? "placeholder-text" : ""}>
          {selectedOption ? getLabel(selectedOption) : placeholder}
        </span>
        <ChevronDown size={18} className={`select-chevron ${isOpen ? 'open' : ''}`} />
      </div>

      {isOpen && (
        <ul className="custom-select-options glass-card">
          {options.map((opt, i) => (
            <li 
              key={i} 
              className={`custom-select-option ${getValue(opt) === value ? 'selected' : ''}`}
              onClick={() => handleSelect(getValue(opt))}
            >
              {getLabel(opt)}
            </li>
          ))}
        </ul>
      )}

      {/* Hidden native select for form support/requirements if any component expects standard behavior */}
      <select 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required} 
        style={{ display: 'none' }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, i) => (
          <option key={i} value={getValue(opt)}>{getLabel(opt)}</option>
        ))}
      </select>

      <style>{`
        .custom-select-wrapper {
          position: relative;
          width: 100%;
        }
        .custom-select {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          user-select: none;
        }
        .custom-select.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .placeholder-text {
          color: var(--text-dim, #94a3b8);
        }
        .select-chevron {
          transition: transform 0.3s ease;
          color: var(--text-dim, #94a3b8);
        }
        .select-chevron.open {
          transform: rotate(180deg);
        }
        .custom-select-options {
          position: absolute;
          top: calc(100% + 5px);
          left: 0;
          right: 0;
          z-index: 50;
          max-height: 250px;
          overflow-y: auto;
          margin: 0;
          padding: 8px;
          list-style: none;
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        }
        .custom-select-options::-webkit-scrollbar {
          width: 6px;
        }
        .custom-select-options::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-select-option {
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
          color: #fff;
          font-size: 14px;
        }
        .custom-select-option:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-select-option.selected {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default Select;
