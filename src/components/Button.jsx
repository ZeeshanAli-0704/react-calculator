import React from "react";
import "./Button.css";

export const Button = ({ className, value, onClick, datatestid }) => {
  return (
    <button className={className} data-testid={datatestid} onClick={onClick}>
      {value}
    </button>
  );
};
