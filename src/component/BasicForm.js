import React from "react";
import Button from "./Button";

const BasicForm = ({ placeHolder, onSubmit }) => {
  const onsubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value.trim().length !== 0) {
      onSubmit(event.target[0].value);
    }
    event.target[0].value = "";
  };

  return (
    <form onSubmit={onsubmit}>
      <input type={"text"} placeholder={placeHolder} />
      <Button value={"submit"} />
    </form>
  );
};

export default BasicForm;
