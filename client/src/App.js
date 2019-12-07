import React, { Component } from "react";
import "./App.css";
import Search from "./pages/Search";
import Header from "./components/Header";
import Saved from "./pages/Saved";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Header /> */}
        <Search />
        <Saved />
      </React.Fragment>
    );
  }
}

export default App;
