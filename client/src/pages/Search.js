import React from "react";
import API from "../utils/API";
import "./bookPages.css";
import Form from "../components/SearchBar";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      booksFound: [],
      search: "",
      mostRecentSearch: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // componentDidMount() {
  //   console.log(this.state.mostRecentSearch);
  //   API.getGoogleBooks().then(data => {
  //     this.setState({
  //       booksFound: data.data.items
  //     });
  //     console.log(this.state.booksFound);
  //   });
  // }

  handleInputChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    API.getGoogleBooks(this.state.search).then(data => {
      this.setState({
        booksFound: data.data.items,
        mostRecentSearch: this.state.search
      });
      console.log(this.state.mostRecentSearch, this.state.booksFound);
    });
  };

  addToFavorites = bookData => {
    API.saveBook(bookData)
      .then(data => {})
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div
        style={{ border: "2px solid black", margin: "20px", padding: "20px" }}
      >
        <h1 style={{ textAlign: "center" }}>Search for Books</h1>
        <Form
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          search={this.state.search}
        />
        {this.state.booksFound.map((x, i) => (
          <div className="bookInfo" key={i}>
            <h2>{x.volumeInfo.title}</h2>
            <h3>By: </h3>
            {x.volumeInfo.authors === undefined ? (
              <h3>No Author listed</h3>
            ) : (
              x.volumeInfo.authors.map((x, i) => <h3 key={i}>{x}</h3>)
            )}
            <div className="bookInfo-block">
              <img
                className="bookInfo-img"
                src={
                  x.volumeInfo.imageLinks === undefined
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1lke3azgBL-EoPLiEEy3uyuWaN8zFR5X7cJDtTPNC2e1vvsSG&s"
                    : x.volumeInfo.imageLinks.thumbnail
                }
                alt="bookImg"
              ></img>
              <h4>{x.volumeInfo.description}</h4>
            </div>
            <div>
              {x.saleInfo.buyLink ? (
                <React.Fragment>
                  <button>
                    <a href={x.saleInfo.buyLink}> Buy Here</a>
                  </button>
                  <button
                    onClick={() =>
                      this.addToFavorites({
                        title: x.volumeInfo.title,
                        link: x.saleInfo.buyLink,
                        description: x.volumeInfo.description,
                        authors: [...x.volumeInfo.authors],
                        image:
                          x.volumeInfo.imageLinks.thumbnail === undefined
                            ? "No Image"
                            : x.volumeInfo.imageLinks.thumbnail
                      })
                    }
                    style={{ marginLeft: "10px" }}
                    button
                  >
                    Add to Favorites
                  </button>
                </React.Fragment>
              ) : (
                <button
                  onClick={() =>
                    this.addToFavorites({
                      title: x.volumeInfo.title,
                      description: x.volumeInfo.description,
                      authors: [...x.volumeInfo.authors],
                      image:
                        x.volumeInfo.imageLinks === undefined
                          ? "No Image"
                          : x.volumeInfo.imageLinks.thumbnail
                    })
                  }
                >
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
