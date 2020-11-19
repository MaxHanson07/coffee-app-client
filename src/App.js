import React from "react";
import GoogleMapsElement from "./components/GoogleMaps/GoogleMaps";
import "./App.scss";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <GoogleMapsElement />
    </div>
  );
}

export default App;
