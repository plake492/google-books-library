import React from "react";
import API from "../utils/API";
import "./search.css";
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

  componentDidMount() {
    console.log(this.state.mostRecentSearch);
    API.getGoogleBooks("the odyssey").then(data => {
      this.setState({
        booksFound: data.data.items
      });
      console.log(this.state.booksFound);
    });
  }

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

  render() {
    return (
      <div>
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
            <div>
              {x.saleInfo.buyLink ? (
                <React.Fragment>
                  <button>
                    <a href={x.saleInfo.buyLink}> Buy Here</a>
                  </button>
                  <button style={{ marginLeft: "10px" }} button>
                    Add to Favorites
                  </button>
                </React.Fragment>
              ) : (
                <button onClick={this.addToFavorites}>Add to Favorites</button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
