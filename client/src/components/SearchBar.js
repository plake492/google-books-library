import React from "react";

export default function form(props) {
  return (
    <div style={style}>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="search">Search for a book</label>
        <div className="row-player-inputs">
          <input
            type="text"
            id="search"
            placeholder="book title here"
            autoComplete="off"
            value={props.search}
            onChange={props.handleInputChange}
          />
          <button type="submit" disabled={!props.search}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

const style = {
  margin: "20px",
  padding: " 20px",
  border: " 2px solid black"
};
