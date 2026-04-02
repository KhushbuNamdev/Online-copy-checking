import React from "react";
import Card from "./Card";
import "../../styles/global.css";

const Table = ({ headers, children, className = "" }) => {
  return (
    <Card className={`table-wrapper ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
