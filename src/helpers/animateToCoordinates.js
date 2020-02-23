import { LEFT, RIGHT, TRANSITION_DURATION } from "../config";

const ownAnimations = (coordinates, svgEls, color, hasLeft, hasRight) => {
  const {
    center,
    linkToParent,
    linkToLeftChild,
    linkToRightChild
  } = coordinates;

  const { circle, valueTxt, topArrow, leftArrow, rightArrow } = svgEls;

  const circleAnimation = new Promise(resolve => {
    circle
      .transition()
      .duration(TRANSITION_DURATION)
      .attr("fill", color)
      .attr("opacity", 1)
      .attr("cx", center.x)
      .attr("cy", center.y)
      .on("end", resolve);
  });

  const textAnimation = new Promise(resolve => {
    valueTxt
      .transition()
      .duration(TRANSITION_DURATION)
      .attr("x", center.x)
      .attr("y", center.y + 5)
      .attr("opacity", 1)
      .on("end", resolve);
  });

  const topArrowAnimation = new Promise(resolve => {
    const { x1, y1, x2, y2 } = linkToParent
    topArrow
      .transition()
      .duration(TRANSITION_DURATION)
      .attr("opacity", y1 === y2 ? 0 : 1)
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .on("end", resolve);
  });

  const leftArrowAnimation = new Promise(resolve => {
    const { x1, y1, x2, y2 } = linkToLeftChild
    leftArrow
      .transition()
      .duration(TRANSITION_DURATION)
      .attr("opacity", hasLeft ? '1' : '0')
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", hasLeft ? y2 : y1)
      .on("end", resolve);
  });

  const rightArrowAnimation = new Promise(resolve => {
    const { x1, y1, x2, y2 } = linkToRightChild
    rightArrow
      .transition()
      .duration(TRANSITION_DURATION)
      .attr("opacity", hasRight ? 1 : 0)
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", hasRight ? y2 : y1)
      .on("end", resolve);
  });

  return Promise.all([
    circleAnimation,
    textAnimation,
    topArrowAnimation,
    leftArrowAnimation,
    rightArrowAnimation
  ]);
};

export function animateToCoordinates(start) {
  if (!start && this.parent) {
    return this.parent.animateToCoordinates();
  }

  const { coordinates, svgEls, color } = this;
  let leftAnimation, rightAnimation;

  if (this.children[LEFT] !== undefined) {
    leftAnimation = this.children[LEFT].animateToCoordinates(true);
  }

  if (this.children[RIGHT] !== undefined) {
    rightAnimation = this.children[RIGHT].animateToCoordinates(true);
  }

  return Promise.all([
    ownAnimations(coordinates, svgEls, color, leftAnimation, rightAnimation),
    leftAnimation,
    rightAnimation
  ]);
}
