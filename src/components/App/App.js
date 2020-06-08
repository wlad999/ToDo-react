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
    term: "",
    filter: "all",
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
      const newItem = this.createTodoItem(text);
      const newData = [...todoData, newItem];
      return { todoData: newData };
    });
  };
  onToggleImportant = (id) => {
    this.toggleProperty(id, "important");
  };
  onToggleDone = (id) => {
    this.toggleProperty(id, "done");
  };
  onSearchChange = (term) => {
    this.setState({ term });
  };
  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter(
      (item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };
  filter = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);

      default:
        return items;
    }
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deletaItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
