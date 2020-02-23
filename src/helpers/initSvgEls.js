import { CIRCLE_RADIUS } from "../config";

const appendCircle = canvas => {
  return canvas
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", CIRCLE_RADIUS)
};

const appendLine = canvas => {
  return canvas
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", 0)
    .attr("stroke-width", 1)
};

export const initSvgEls = (canvas, value, color ) => {
  const circle = appendCircle(canvas)
    .attr("fill", color)
    .attr("opacity", 0);

  const topArrow = appendLine(canvas)
    .attr("stroke", "blue")
    .attr("marker-end", "url(#blueTriangle)")
    .attr("opacity", 0);

  const leftArrow = appendLine(canvas)
    .attr("stroke", "black")
    .attr("marker-end", "url(#blackTriangle)")
    .attr("opacity", 0);

  const rightArrow = appendLine(canvas)
    .attr("stroke", "black")
    .attr("marker-end", "url(#blackTriangle)")
    .attr("opacity", 0);

  const valueTxt = canvas
    .append("text")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr('x', 0)
    .attr('y', 5)
    .text(value);

  return {
    circle,
    valueTxt,
    topArrow,
    leftArrow,
    rightArrow
  };
};
