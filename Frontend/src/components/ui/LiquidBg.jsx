import React from "react";
import "../../styles/global.css";

const LiquidBg = ({ children }) => {
  return (
    <div className="login-container">
      <div className="liquid-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2" style={{ bottom: '10%', right: '10%' }}></div>
        <div className="blob blob-3" style={{ top: '20%', left: '70%', background: '#ff00ff' }}></div>
      </div>
      {children}
    </div>
  );
};

export default LiquidBg;


