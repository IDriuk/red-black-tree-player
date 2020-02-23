import { LEFT, RIGHT, TRANSITION_DURATION } from "../config";

const ownAnimations = (coordinates, svgEls, color) => {
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
      .on("end", resolve);
  });

  const topArrowAnimation = new Promise(resolve => {
    topArrow
      .transition()
      .duration(TRANSITION_DURATION)
      .attr("opacity", 1)
      .attr("x1", linkToParent.x1)
      .attr("y1", linkToParent.y1)
      .attr("x2", linkToParent.x2)
      .attr("y2", linkToParent.y2)
      .on("end", resolve);
  });

  const leftArrowAnimation = new Promise(resolve => {
    leftArrow
      .transition()
      .duration(TRANSITION_DURATION)
      .attr("opacity", 1)
      .attr("x1", linkToLeftChild.x1)
      .attr("y1", linkToLeftChild.y1)
      .attr("x2", linkToLeftChild.x2)
      .attr("y2", linkToLeftChild.y2)
      .on("end", resolve);
  });

  const rightArrowAnimation = new Promise(resolve => {
    rightArrow
      .transition()
      .duration(TRANSITION_DURATION)
      .attr("opacity", 1)
      .attr("x1", linkToRightChild.x1)
      .attr("y1", linkToRightChild.y1)
      .attr("x2", linkToRightChild.x2)
      .attr("y2", linkToRightChild.y2)
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
    rightAnimation = this.children[RIGHT].updateCoordinates(true);
  }

  return Promise.all([
    ownAnimations(coordinates, svgEls, color),
    leftAnimation,
    rightAnimation
  ]);
}
