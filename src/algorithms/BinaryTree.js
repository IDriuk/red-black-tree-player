import { identity, LEFT, RIGHT, oppDir } from "../config";

export default class BinaryTree {
  constructor(value, identifier = identity) {
    this.value = value;
    this.children = [];
    this.identifier = identifier;
    this.parent = undefined;
  }

  get left() {
    return this.children[LEFT];
  }

  get right() {
    return this.children[RIGHT];
  }

  set left(value) {
    this.children[LEFT] = value;
  }

  set right(value) {
    this.children[RIGHT] = value;
  }

  get isRoot() {
    return this.parent === undefined;
  }

  get isLeftChild() {
    return this.parent ? this.parent.left === this : false;
  }

  get isRightChild() {
    return this.parent ? this.parent.right === this : false;
  }

  get isLeaf() {
    return this.children.every(child => child === undefined);
  }

  get grandparent() {
    return this.parent ? this.parent.parent : undefined;
  }

  get uncle() {
    return this.grandparent
      ? this.parent.isRightChild
        ? this.grandparent.left
        : this.grandparent.right
      : undefined;
  }

  get sibling() {
    return this.parent
      ? this.isRightChild
        ? this.parent.left
        : this.parent.right
      : undefined;
  }

  get hasOneChild() {
    return (
      (this.right !== undefined && this.left === undefined) ||
      (this.right === undefined && this.left !== undefined)
    );
  }

  get hasTwoChildren() {
    return this.right !== undefined && this.left !== undefined;
  }

  rotateLeft() {
    this._rotate(LEFT);
    this._swapWithParent();
  }

  rotateRight() {
    this._rotate(RIGHT);
    this._swapWithParent();
  }

  _rotate(dir) {
    let opposite = oppDir(dir);
    let pivot = this.children[opposite];
    this.children[opposite] = pivot.children[dir];
    pivot.children[dir] = this;
    pivot.parent = this.parent;
    pivot.children.forEach(child => {
      if (child) child.parent = pivot;
    });
    this.children.forEach(child => {
      if (child) child.parent = this;
    });
  }

  _swapWithParent() {
    let replacement = new BinaryTree(this.value, this.identifier);
    replacement.parent = this.parent;
    replacement.children = this.children;
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

    this.children.forEach(child => {
      if (child) child.parent = this;
    });
    this.children.forEach(child => {
      if (child)
        // point children to replacement
        child.children.forEach(kid => {
          if (kid) kid.parent = child;
        });
    });
  }

  insert(value) {
    if (this.value === undefined) {
      this.value = value;
      return this;
    } else {
      let dir;
      if (this.identifier(value) > this.identifier(this.value)) {
        dir = RIGHT;
      } else {
        dir = LEFT;
      }
      if (this.children[dir] === undefined) {
        let newTree = new BinaryTree(value, this.identifier);
        newTree.parent = this;
        this.children[dir] = newTree;
        return newTree;
      } else {
        return this.children[dir].insert(value);
      }
    }
  }

  // return this.value which is is equal to value through identifier. why?
  find(value) {
    let identifiedValue = this.identifier(value);
    let thisValue = this.identifier(this.value);
    if (thisValue === identifiedValue) {
      return this.value;
    } else {
      let dir;
      if (thisValue < identifiedValue) {
        dir = RIGHT;
      } else {
        dir = LEFT;
      }
      if (this.children[dir] === undefined) {
        return undefined;
      } else {
        return this.children[dir].find(value);
      }
    }
  }

  contains(value) {
    return this.find(value) !== undefined;
  }

  _minimumChild() {
    let current = this;
    while (current.left !== undefined) {
      current = current.left;
    }
    return current;
  }

  minimum() {
    return this._minimumChild().value;
  }

  _maximumChild() {
    let current = this;
    while (current.right !== undefined) {
      current = current.right;
    }
    return current;
  }

  maximum() {
    return this._maximumChild().value;
  }

  remove(value) {
    let identifiedValue = this.identifier(value);
    let thisValue = this.identifier(this.value);
    if (thisValue === identifiedValue) {
      if (this.isLeaf) {
        if (this.isRoot) {
          this.value = undefined;
        } else if (this.isRightChild) {
          this.parent.right = undefined;
        } else if (this.isLeftChild) {
          this.parent.left = undefined;
        }
      } else if (this.hasOneChild) {
        let rmDir = this.right ? LEFT : RIGHT;
        this.right ? this.rotateLeft() : this.rotateRight();
        this.children[rmDir] = undefined;
      } else if (this.hasTwoChildren) {
        let replacement = this.right._minimumChild();
        this.value = replacement.value;
        this.right.remove(replacement.value);
      }
    } else {
      let dir;
      if (thisValue < identifiedValue) {
        dir = RIGHT;
      } else {
        dir = LEFT;
      }
      if (this.children[dir] === undefined) {
        return undefined;
      } else {
        return this.children[dir].remove(value);
      }
    }
  }
}
