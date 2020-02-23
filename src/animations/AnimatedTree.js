import _ from "underscore";
import { identity, LEFT, RIGHT, oppDir, BLACK, RED } from "../config";
import RedBlackTree from "../algorithms/RedBlackTree";
import { initSvgEls, cleanSvgEls, updateCoordinates } from "../helpers";

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

    this.updateCoordinates = updateCoordinates.bind(this);
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
