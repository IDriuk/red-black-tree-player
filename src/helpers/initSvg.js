import * as d3 from "d3";
import { CANVAS_WIDTH, CANVAS_HEIGHT, CIRCLE_RADIUS } from "../config";
import { defineArrowMarkers } from "./defineArrowMarkers";

export const initSvg = () => {
  const svg = d3
    .select("#root")
    .append("svg")
    .attr("width", CANVAS_WIDTH + CIRCLE_RADIUS * 2)
    .attr("height", CANVAS_HEIGHT + CIRCLE_RADIUS * 2);

  defineArrowMarkers(svg);

  const canvas = svg
    .append("g")
    .attr("transform", `translate(${CIRCLE_RADIUS}, ${CIRCLE_RADIUS})`);

  return canvas;
};
