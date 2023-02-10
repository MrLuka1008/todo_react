import "./App.css";
import React, { useState, useEffect } from "react";
// import { Calendar } from "./Calendar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const localList = () => {
  const list = localStorage.getItem("todoList");

  if (list) {
    return JSON.parse(localStorage.getItem("todoList"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoObj, setTodoObj] = useState({});
  const [listtodo, setListTodo] = useState(localList());

  const [selectedDate, setSelectedDate] = useState(null);

  function handleDateChange(date) {
    console.log(date.getDate());

    setSelectedDate(date);
  }

  function handleTodo(event) {
    setTodo(event.target.value);
  }

  function handleTodoEdit(todoItem) {
    setTodoObj(todoItem);
    setTodo(todoItem.todoitem);
  }

  function saveTodo() {
    if (Object.keys(todoObj).length === 0) {
      const newTodo = {
        id: Date.now(),
        todoitem: todo,
        done: false,
        day: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1,
      };
      setListTodo((prev) => [...prev, newTodo]);
    } else {
      const newListTodo = [...listtodo];
      const index = newListTodo.findIndex((item) => item.id === todoObj.id);
      newListTodo[index].todoitem = todo;
      newListTodo[index].day = selectedDate.getDate();
      newListTodo[index].month = selectedDate.getMonth() + 1;
      setListTodo(newListTodo);
    }
    setTodoObj({});
    setTodo("");
  }

  function deleteTodo(itemId) {
    const newTodoArry = listtodo.filter((item) => item.id !== itemId);
    setListTodo(newTodoArry);
  }

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(listtodo));
  }, [todo, listtodo]);

  function doneTodo(index) {
    const newListTodo = [...listtodo];
    newListTodo[index].done = !newListTodo[index].done;
    setListTodo(newListTodo);
  }

  const TodoItem = () =>
    listtodo.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <div>
            <h2 style={{ textDecoration: item.done ? "line-through" : "none" }}>
              {item.todoitem} |{item.day}/{item.month}
            </h2>
            <button onClick={() => deleteTodo(item.id)}>Delete</button>
            <button onClick={() => handleTodoEdit(item)}>Change</button>
            <button onClick={() => doneTodo(index)}>{item.done ? "Undo" : "Done"}</button>
          </div>
        </React.Fragment>
      );
    });

  return (
    <div>
      <div className="fullContainer">
        <h1>Todo List </h1>
        <input type="text" name="todo" onChange={handleTodo} value={todo} />
        <button onClick={saveTodo}>Save</button> <br />
        <Calendar onChange={handleDateChange} selectedDate={selectedDate} />
      </div>
      <TodoItem />
    </div>
  );
};

export { Todo };
