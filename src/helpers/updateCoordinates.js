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
  const radiusWithDelta = CIRCLE_RADIUS + LINK_DELTA

  if (parentCenter && currentCenter) {

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
      x1: center.x ,
      y1: center.y - radiusWithDelta,
      x2: parentCenter.x ,
      y2: parentCenter.y + radiusWithDelta
    };
    const linkToLeftChild = {
      x1: center.x,
      y1: center.y + radiusWithDelta,
      x2: leftCenter.x,
      y2: leftCenter.y - radiusWithDelta
    };
    const linkToRightChild = {
      x1: center.x,
      y1: center.y + radiusWithDelta,
      x2: rightCenter.x,
      y2: rightCenter.y - radiusWithDelta
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
      x1: center.x,
      y1: center.y + radiusWithDelta,
      x2: leftCenter.x,
      y2: leftCenter.y - radiusWithDelta
    };
    const linkToRightChild = {
      x1: center.x,
      y1: center.y + radiusWithDelta,
      x2: rightCenter.x,
      y2: rightCenter.y - radiusWithDelta
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