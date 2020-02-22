import _ from "underscore";
import {
  identity,
  LEFT,
  RIGHT,
  oppDir,
  BLACK,
  RED,
  CIRCLE_RADIUS,
  LINK_DELTA,
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} from "../config";
import RedBlackTree from "../algorithms/RedBlackTree";
import { initSvgEls, cleanSvgEls } from "../helpers";

export default class AnimatedRedBlackTree extends RedBlackTree {
  constructor(canvas, value, identifier, color) {
    super(value, identifier, color);
    this.canvas = canvas;

    this.coordinates = {
      level: 0,
      center: { x: 0, y: 0 },
      linkToParent: { x1: 0, y1: 0, x2: 0, y2: 0 },
      linkToLeftChild: { x1: 0, y1: 0, x2: 0, y2: 0 },
      linkToRightChild: { x1: 0, y1: 0, x2: 0, y2: 0 }
    };

    if (_.isFinite(value)) {
      this.svgEls = initSvgEls(canvas, value, this.color);
    }
  }

  updateCoordinates(parentCenter, currentCenter, level = 0) {
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

  async animateToCoordinates(start) {
    if (start) {
      // run transitions of all svgEls to new coordinates
      // await Promise.all[collection of promises from childs]
    } else if (this.parent) {
      this.parent.animateToCoordinates();
    } else {
      // it is root node
      // call elements animation to coordinates with start true for all childs
      // await Promise.all[collection of promises from childs]
    }
  }

  async _swapWithParent() {
    let replacement = new AnimatedRedBlackTree(
      this.canvas,
      this.value,
      this.identifier,
      this.color
    );
    replacement.parent = this.parent;
    replacement.children = this.children;
    cleanSvgEls(replacement.svgEls);
    replacement.svgEls = this.svgEls;

    if (this.parent !== undefined) {
      if (this.isRightChild) {
        this.parent.right = replacement;
      } else {
        this.parent.left = replacement;
      }
    }

    this.value = replacement.parent.value;
    this.children = replacement.parent.children;
    this.parent = replacement.parent.parent;
    this.color = replacement.parent.color;
    this.svgEls = replacement.parent.svgEls;

    this.children.forEach(child => {
      if (child) child.parent = this;
    });
    this.children.forEach(child => {
      if (child)
        child.children.forEach(kid => {
          if (kid) kid.parent = child;
        });
    });
  }

  async insert(value) {
    if (this.value === undefined) {
      this.value = value;
      this.paintBlack();
      this.svgEls = initSvgEls(this.canvas, value, this.color);
      return;
    }
    let dir;
    if (this.identifier(value) > this.identifier(this.value)) {
      dir = RIGHT;
    } else {
      dir = LEFT;
    }
    if (this.children[dir] !== undefined) {
      return this.children[dir].insert(value);
    } else {
      let child = new AnimatedRedBlackTree(
        this.canvas,
        value,
        this.identifier,
        RED
      );
      child.parent = this;
      this.children[dir] = child;
      child.paint();
      return child;
    }
  }
}
