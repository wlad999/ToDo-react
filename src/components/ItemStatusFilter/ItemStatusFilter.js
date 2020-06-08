import React, { Component } from "react";

import "./ItemStatusFilter.css";

export default class ItemStatusFilter extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" },
  ];
  render() {
    const { filter, onFilterChange } = this.props;
    const buttonts = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const activeClass = isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <button
          type="button"
          className={`btn ${activeClass}`}
          key={name}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      );
    });
    return <div className="btn-group">{buttonts}</div>;
  }
}
