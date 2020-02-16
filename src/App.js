import React from "react";
import "./App.css";

import Description from './components/Description'
import Hierarhy from "./components/Hierarhy";
import Tree from './components/Tree'

function App() {
  console.log('Description, Hierarhy ========', Description, Hierarhy)
  return (
    <div className="App">
      {/* <Description />
      <Hierarhy /> */}
      <Tree />
    </div>
  );
}

export default App;
