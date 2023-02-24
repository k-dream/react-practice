import React from "react";
import CountingTitle from "./CouningTitle";
import BasicForm from "./BasicForm";

const TodoList = () => {
  const [todoList, setTodoList] = React.useState([]);

  const onSubmit = (value) => {
    setTodoList((prevList) => [...prevList, value]);
  };
  return (
    <div>
      <CountingTitle name="Todo List" value={todoList.length} />
      <BasicForm placeHolder={"add your to do"} onSubmit={onSubmit} />
      <ul>
        {todoList.map((elem, index) => (
          <li key={index}>{elem}</li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
