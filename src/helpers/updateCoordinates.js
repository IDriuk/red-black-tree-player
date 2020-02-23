import {
  LEFT,
  RIGHT,
  CIRCLE_RADIUS,
  LINK_DELTA,
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} from "../config";

export function updateCoordinates(parentCenter, currentCenter, level = 0) {
  const levelHeight = CANVAS_HEIGHT / 5;
  const levelWidth = CANVAS_WIDTH / Math.pow(2, level + 1);

  if (parentCenter && currentCenter) {
    this.svgEls.topArrow.attr("opacity", 1);

    const center = currentCenter;
    const leftCenter = {
      x: center.x - levelWidth / 2,
      y: center.y + levelHeight
    };
    const rightCenter = {
      x: center.x + levelWidth / 2,
      y: center.y + levelHeight
    };

    const linkToParent = {
      x1: center.x + LINK_DELTA,
      y1: center.y - CIRCLE_RADIUS,
      x2: parentCenter.x + LINK_DELTA,
      y2: parentCenter.y + CIRCLE_RADIUS
    };
    const linkToLeftChild = {
      x1: center.x - LINK_DELTA,
      y1: center.y + CIRCLE_RADIUS,
      x2: leftCenter.x - LINK_DELTA,
      y2: leftCenter.y - CIRCLE_RADIUS
    };
    const linkToRightChild = {
      x1: center.x - LINK_DELTA,
      y1: center.y + CIRCLE_RADIUS,
      x2: rightCenter.x - LINK_DELTA,
      y2: rightCenter.y - CIRCLE_RADIUS
    };

    this.coordinates = {
      level,
      center,
      linkToParent,
      linkToLeftChild,
      linkToRightChild
    };

    if (this.children[LEFT] !== undefined) {
      this.children[LEFT].updateCoordinates(center, leftCenter, level + 1);
    }

    if (this.children[RIGHT] !== undefined) {
      this.children[RIGHT].updateCoordinates(center, rightCenter, level + 1);
    }
  } else if (this.parent) {
    this.parent.updateCoordinates();
  } else {
    this.svgEls.topArrow.attr("opacity", 0);

    const center = { x: levelWidth, y: levelHeight * level };
    const leftCenter = {
      x: center.x - levelWidth / 2,
      y: center.y + levelHeight
    };
    const rightCenter = {
      x: center.x + levelWidth / 2,
      y: center.y + levelHeight
    };

    const linkToParent = {
      x1: center.x,
      y1: center.y,
      x2: center.x,
      y2: center.y
    };
    const linkToLeftChild = {
      x1: center.x - LINK_DELTA,
      y1: center.y + CIRCLE_RADIUS,
      x2: leftCenter.x -LINK_DELTA,
      y2: leftCenter.y - CIRCLE_RADIUS
    };
    const linkToRightChild = {
      x1: center.x - LINK_DELTA,
      y1: center.y + CIRCLE_RADIUS,
      x2: rightCenter.x -LINK_DELTA,
      y2: rightCenter.y - CIRCLE_RADIUS
    };

    this.coordinates = {
      level,
      center,
      linkToParent,
      linkToLeftChild,
      linkToRightChild
    };

    if (this.children[LEFT] !== undefined) {
      this.children[LEFT].updateCoordinates(center, leftCenter, level + 1);
    }

    if (this.children[RIGHT] !== undefined) {
      this.children[RIGHT].updateCoordinates(center, rightCenter, level + 1);
    }
  }
}