import React from "react";
import "./Calculator.css";

export const Calculator = ({ children, datatestid }) => {
  return <div className="wrapper" data-testid={datatestid}>{children}</div>;
};
