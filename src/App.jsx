import React, { useState } from "react";

import { Button } from "./components/Button";
import { Screen } from "./components/Screen";
import { Calculator } from "./components/Calculator";
import { ButtonBox } from "./components/ButtonBox";

const button_values = [
  ["C", "√", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (number) =>
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (number) => String(number).replace(/\s/g, "");

const math = (y, z, symb) => {
  switch (symb) {
    case "+":
      return y + z;
    case "-":
      return y - z;
    case "X":
      return y * z;
    case "/":
      return y / z;
    case "√":
      return Math.sqrt(y);
    default:
      return y;
  }
};

const zeroDivisionError = "Oops! it's imposible to divide with 0";

const App = () => {
  let [calc, setCalc] = useState({
    symb: "",
    number: 0,
    res: 0,
  });
  let [history, setHistory] = useState([]);

  const addHistoryEntry = () => {
    const historyEntry = `${calc.res} ${calc.symb} ${calc.number} = ${calc.res}`;
    setHistory([historyEntry, ...history]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.number).length < 16) {
      setCalc({
        ...calc,
        number:
          removeSpaces(calc.number) % 1 === 0 &&
          !calc.number.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.number + value)))
            : toLocaleString(calc.number + value),
        res: !calc.symb ? 0 : calc.res,
      });
    }
  };

  const comaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      number: !calc.number.toString().includes(".")
        ? calc.number + value
        : calc.number,
    });
  };

  const symbClickHandler = (e) => {
    setCalc({
      ...calc,
      symb: e.target.innerHTML,
      res: !calc.number
        ? calc.res
        : !calc.res
        ? calc.number
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.number)),
              calc.symb
            )
          ),
      number: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.symb && calc.number) {
      setCalc({
        ...calc,
        res:
          calc.number === "0" && calc.symb === "/"
            ? zeroDivisionError
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.number)),
                  calc.symb
                )
              ),
        symb: "",
        number: 0,
      });
      addHistoryEntry();
    }
  };

  const percentClickHandler = function () {
    let number = calc.number ? parseFloat(removeSpaces(calc.number)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      number: (number /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      symb: "",
    });
  };
  const resetClickHandler = function () {
    setCalc({
      ...calc,
      symb: "",
      number: 0,
      res: 0,
    });
  };

  const sqrtClickHandler = () => {
    if (calc.number) {
      setCalc({
        ...calc,
        res: !calc.number
          ? calc.res
          : toLocaleString(math(Number(removeSpaces(calc.number)), 0, "√")),
        number: 0,
      });
    }
  };

  const buttonClickHandler = (e, btn) => {
    btn === "C" || calc.res === zeroDivisionError
      ? resetClickHandler()
      : btn === "%"
      ? percentClickHandler()
      : btn === "="
      ? equalsClickHandler()
      : btn === "/" || btn === "X" || btn === "-" || btn === "+"
      ? symbClickHandler(e)
      : btn === "."
      ? comaClickHandler(e)
      : btn === "√"
      ? sqrtClickHandler()
      : numberClickHandler(e);
  };

  return (
    <div className="clac-container" data-testid="calculator-app">
      <Calculator datatestid="calculator">
        <Screen value={calc.number ? calc.number : calc.res} datatestid="screen" />
        <ButtonBox data-testid="button-box">
          {button_values.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={(e) => buttonClickHandler(e, btn)}
                datatestid={`button-${btn}`}
              />
            );
          })}
        </ButtonBox>
      </Calculator>
      {history.length > 0 && (
        <div className="history-container" data-testid="history-container">
          <button className="history-button" onClick={clearHistory} data-testid="clear-history-button">
            Clear History
          </button>
          <div className="history-details">
            <div className="history-label" data-testid="history-label">History</div>
            <ul data-testid="history-list">
              {history.map((entry, index) => (
                <li key={index} data-testid={`history-entry-${index}`}>{entry}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
