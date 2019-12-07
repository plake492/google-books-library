import React, { Component } from "react";
import API from "../utils/API";
import "./bookPages.css";

export default class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedBooks: []
    };
  }

  componentDidMount() {
    API.getSavedBooks().then(books => {
      this.setState({ savedBooks: books.data });
    });
  }

  render() {
    return (
      <div
        style={{ border: "2px solid black", margin: "20px", padding: "20px" }}
      >
        <h1 style={{ textAlign: "center" }}>Saved Books</h1>
        {this.state.savedBooks.map((x, i) => (
          <div className="bookInfo" key={i}>
            <h2>{x.title}</h2>
            <h3>By: </h3>
            {x.authors === undefined ? (
              <h3>No Author listed</h3>
            ) : (
              x.authors.map((x, i) => <h3 key={i}>{x}</h3>)
            )}
            <div className="bookInfo-block">
              <img
                className="bookInfo-img"
                src={
                  !x.image
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1lke3azgBL-EoPLiEEy3uyuWaN8zFR5X7cJDtTPNC2e1vvsSG&s"
                    : x.image
                }
                alt="bookImg"
              ></img>
              <h4>{x.description}</h4>
            </div>
            <button disabled={!x.link}>
              <a href={x.link}> Buy Here</a>
            </button>
          </div>
        ))}
      </div>
    );
  }
}
