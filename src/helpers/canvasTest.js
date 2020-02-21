import * as d3 from "d3";

export const canvasTest = canvas => {
  const t = d3.transition().duration(500);

  canvas
    .append("line")
    .attr("x1", 100)
    .attr("y1", 100)
    .attr("x2", 200)
    .attr("y2", 200)
    .attr("stroke-width", 1)
    .attr("stroke", "blue")
    .attr("opacity", 1)
    .attr("marker-end", "url(#blueTriangle)")
    .transition(t)
    .attr("x2", 500)
    .attr("y2", 100)
    .attr("opacity", 0.3);
};
