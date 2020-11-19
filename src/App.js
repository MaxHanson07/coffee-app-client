import React from "react";
import GoogleMapsElement from "./components/GoogleMaps/GoogleMaps";
import "./App.scss";
import Header from "./components/Header/Header";
import Request from "./components/Request/Request";

function App() {
  return (
    <div className="App">
      <Header />
      <GoogleMapsElement />
      <Request />
    </div>
  );
}

export default App;
