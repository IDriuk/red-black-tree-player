import React from "react";
import "./App.css";

import Description from './components/Description'
import Hierarhy from "./components/Hierarhy";
import Tree from './components/Tree'

function App() {
  return (
    <div className="App">
      <Description />
      <Hierarhy />
      <Tree />
    </div>
  );
}

export default App;
