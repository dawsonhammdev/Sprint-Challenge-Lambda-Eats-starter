import React from "react";
import Home from "./Home"
import Form from "./Form"
import { Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/pizza" component={Form}/>
      
    </div>
  );
}


export default App;
