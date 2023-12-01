import React from "react";
import { Textfit } from "react-textfit";
import "./Screen.css";

export const Screen = ({ value, datatestid }) => {
  return (
    <Textfit className="screen"  data-testid={datatestid} mode="single" max={70}>
      {value}
    </Textfit>
  );
};
