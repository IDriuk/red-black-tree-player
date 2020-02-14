import React, { useEffect } from "react";
import * as d3 from "d3";

// import { BinaryTree, RedBlackTree } from "../services/tree";

const buildTree = () => {
  const dims = { height: 500, width: 1100 };

  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", dims.width + 100)
    .attr("height", dims.height + 100);

  const graph = svg.append("g").attr("transform", "translate(50, 50)");

  const stratify = d3
    .stratify()
    .id(d => d.name)
    .parentId(d => d.parent);

  const tree = d3.tree().size([dims.width, dims.height]);

  var data = [
    { name: "grandparent" },
    { name: "parent", parent: "grandparent" },
    { name: "uncle", parent: "grandparent" },
    { name: "child1", parent: "parent" },
    { name: "child2", parent: "parent" },
    { name: "sibling1", parent: "uncle" },
    { name: "sibling2", parent: "uncle" }
  ];

  const update = data => {
    graph.selectAll(".node").remove();
    graph.selectAll(".link").remove();

    const rootNode = stratify(data);
    const treeData = tree(rootNode).descendants();

    const nodes = graph.selectAll(".node").data(treeData);

    const link = graph.selectAll(".link").data(tree(rootNode).links());

    link
      .enter()
      .append("path")
      .transition()
      .duration(300)
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .linkVertical()
          .x(d => d.x)
          .y(d => d.y)
      );

    const enterNodes = nodes
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    enterNodes
      .append("circle")
      .attr("fill", "orangered")
      .attr("stroke", "#555")
      .attr("stroke-width", 2)
      .attr("r", 20);
  };

  update(data);
};

function Hierarhy() {
  useEffect(() => {
    buildTree();
  }, []);

  return <div className="canvas"></div>;
}

export default Hierarhy;
