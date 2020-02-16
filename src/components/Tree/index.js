import React, { useEffect } from "react";
import * as d3 from "d3";

import AnimatedTree from "./AnimatedTree";

function draw() {
  const w = 600;
  const h = 600;
  const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg.append("defs").append("marker")
    .attr("id", "triangle")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("markerUnits", "userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");

  // svg.append("path")
  //   .attr("marker-end", "url(#triangle)")
  //   .attr("d", "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80")
  //   .attr("stroke", "grey")
  //   .attr("stroke-width", "1.5")
  //   .attr("fill", "transparent")
  //   .attr("class", "edges");

  const t = d3.transition().duration(500);
  
  debugger
  svg.append("line")
    .attr("x1", 100)
    .attr("y1", 100)
    .attr("x2", 200)
    .attr("y2", 200)
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr('opacity', 1)
    .attr("marker-end", "url(#triangle)").transition(t)
    .attr("x2", 500)
    .attr('y2', 100)
    .attr('opacity', 0.3);

}

function Tree() {
  console.log( AnimatedTree );
  useEffect(draw, [])

  return <div></div>;
}

export default Tree;
