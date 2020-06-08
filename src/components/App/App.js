import React, { Component } from "react";

import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";

import "./App.css";

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
  };
  createTodoItem(label) {
    return {
      label: label,
      important: false,
      id: this.maxId++,
      done: false,
    };
  }
  toggleProperty(id, propName) {
    this.setState(({ todoData }) => {
      const newData = todoData.map((item) => {
        return item.id === id ? { ...item, [propName]: !item[propName] } : item;
      });
      return {
        todoData: newData,
      };
    });
  }
  deletaItem = (id) => {
    this.setState(({ todoData }) => {
      const newData = todoData.filter((el) => el.id !== id);
      return { todoData: newData };
    });
  };
  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem("New Item");
      const newData = [...todoData, newItem];
      return { todoData: newData };
    });
  };
  onToggleImportant = (id) => {
    this.toggleProperty(id, "important");
    //this.setState(({ todoData }) => {
    //  const newData = todoData.map((item) => {
    //    return item.id === id ? { ...item, important: !item.important } : item;
    //  });
    //  return {
    //    todoData: newData,
    //  };
    //});
  };
  onToggleDone = (id) => {
    this.toggleProperty(id, "done");
    //this.setState(({ todoData }) => {
    //  const newData = todoData.map((item) => {
    //    return item.id === id ? { ...item, done: !item.done } : item;
    //  });
    //  return {
    //    todoData: newData,
    //  };
    //});
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={todoData}
          onDeleted={this.deletaItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
