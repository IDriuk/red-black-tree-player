import React from "react";
import "./App.css";

import {BinaryTree, RedBlackTree } from "./RedBlackTree";

/* const tree = new RedBlackTree(0);

  const children = [];
  for (let i = 1; i < 500; i++) {
    let child = tree.insert(i);
    children.push(child);
  }

  for (let i = 499; i > 100; i--) {
    tree.remove(i);
  }

  for (let i = 0; i < 100; i++) {
    console.log(children[i].countBlackToRoot());
  } */

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Red Black Tree Player</h1>
        <p>render tree with d3, after each change</p>
        <p>render each change step without animation</p>
        <p>add change animation </p>
        <p>add play changes back without animation</p>
        <p>play forward and back, each step with animations</p> 
      </header>
      
    </div>
  );
}

export default App;
