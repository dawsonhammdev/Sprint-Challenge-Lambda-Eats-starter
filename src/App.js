import React from "react";
import Home from "./Home"
import { Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
    </div>
  );
}


export default App;
