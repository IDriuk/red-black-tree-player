import { TRANSITION_DURATION } from "../config";

export const cleanSvgEls = svgEls => {
  const { circle, valueTxt, topArrow, leftArrow, rightArrow } = svgEls;

  circle
    .transition()
    .duration(TRANSITION_DURATION)
    .remove();

  valueTxt
    .transition()
    .duration(TRANSITION_DURATION)
    .remove();

  topArrow
    .transition()
    .duration(TRANSITION_DURATION)
    .remove();

  leftArrow
    .transition()
    .duration(TRANSITION_DURATION)
    .remove();

  rightArrow
    .transition()
    .duration(TRANSITION_DURATION)
    .remove();
};
