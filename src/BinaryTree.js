const identity = i => i;
const LEFT = 0;
const RIGHT = 1;
const oppDir = dir => (dir === RIGHT ? LEFT : RIGHT);

export class BinaryTree {
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

const BLACK = "b";
const RED = "r";

export class RedBlackTree extends BinaryTree {
  constructor(value, identifier = identity, color = BLACK) {
    super(value, identifier);
    this.color = color;
  }

  _swapWithParent() {
    let replacement = new RedBlackTree(this.value, this.identifier, this.color);
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
    this.color = replacement.parent.color;

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

  paintBlack() {
    this.color = BLACK;
  }

  paintRed() {
    this.color = RED;
  }

  get isBlack() {
    return this.color === BLACK;
  }

  get isRed() {
    return this.color === RED;
  }

  insert(value) {
    if (this.value === undefined) {
      this.value = value;
      this.paintBlack();
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
      let child = new RedBlackTree(value, this.identifier, RED);
      child.parent = this;
      this.children[dir] = child;
      child.paint();
      return child;
    }
  }

  paint() {
    return this._insert1();
  }

  _insert1() {
    if (this.parent === undefined) {
      this.paintBlack();
      return;
    } else {
      this._insert2();
    }
  }

  _insert2() {
    if (this.parent.isBlack) {
      return;
    } else {
      this._insert3();
    }
  }

  _insert3() {
    let uncle = this.uncle;
    if (uncle ? uncle.isRed : false) {
      this.parent.paintBlack();
      uncle.paintBlack();
      this.grandparent.paintRed();
      this.grandparent.paint();
      return;
    } else {
      this._insert4();
    }
  }

  _insert4() {
    if (this.isRightChild && this.parent.isLeftChild) {
      this.parent.rotateLeft();
      return;
    } else if (this.isLeftChild && this.parent.isRightChild) {
      this.parent.rotateRight();
      return;
    }
    this._insert5();
  }

  _insert5() {
    this.parent.paintBlack();
    this.grandparent.paintRed();
    if (this.isLeftChild) {
      this.grandparent.rotateRight();
    } else {
      this.grandparent.rotateLeft();
    }
    return;
  }

  remove(value) {
    let identifiedValue = this.identifier(value);
    let thisValue = this.identifier(this.value);
    if (thisValue === identifiedValue) {
      this.rmPaint(value);
      return;
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

  rmPaint(value) {
    if (!this.hasTwoChildren) {
      this._remove0();
    }
    this.standardRemove(value);
  }

  standardRemove(value) {
    if (this.isLeaf) {
      if (this.isRoot) {
        this.value = undefined;
        this.paintBlack();
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
      let replica = this.right._minimumChild();
      this.value = replica.value;
      this.right.remove(replica.value);
    }
  }

  _remove0() {
    let childIsRed = this.hasOneChild
      ? this.right
        ? this.right.isRed
        : this.left.isRed
      : false;
    if (this.isBlack) {
      if (childIsRed) {
        this.right ? this.right.paintBlack() : this.left.paintBlack();
      } else {
        if (this.parent ? this.parent.isBlack : false) {
          this._remove1();
        }
      }
    }
  }

  _remove1() {
    if (this.parent !== undefined) this._remove2();
  }

  _remove2() {
    let sib = this.sibling;
    if (sib && sib.isRed) {
      this.parent.paintRed();
      sib.paintBlack();
      if (this.isLeftChild) {
        this.parent.rotateLeft();
      } else if (this.isRightChild) {
        this.parent.rotateRight();
      }
    }
    this._remove3();
  }

  _remove3() {
    let sib = this.sibling;
    let sibIsBlack = sib ? sib.isBlack : true;
    let sibLeftBlack = sib ? (sib.left ? sib.left.isBlack : true) : true;
    let sibRightBlack = sib ? (sib.right ? sib.right.isBlack : true) : true;
    if (
      this.parent.isBlack &&
      sib &&
      sibIsBlack &&
      sibLeftBlack &&
      sibRightBlack
    ) {
      sib.paintRed();
      this.parent._remove1();
    } else {
      this._remove4();
    }
  }

  _remove4() {
    let sib = this.sibling;
    let sibIsBlack = sib ? sib.isBlack : true;
    let sibLeftBlack = sib ? (sib.left ? sib.left.isBlack : true) : true;
    let sibRightBlack = sib ? (sib.right ? sib.right.isBlack : true) : true;
    if (
      this.parent.isRed &&
      sib &&
      sibIsBlack &&
      sibLeftBlack &&
      sibRightBlack
    ) {
      sib.paintRed();
      this.parent.paintBlack();
    } else {
      this._remove5();
    }
  }

  _remove5() {
    let sib = this.sibling;
    if (
      this.isLeftChild &&
      (sib.right ? sib.right.isBlack : true) &&
      (sib.left ? sib.left.isRed : false)
    ) {
      sib.paintRed();
      sib.left.paintBlack();
      sib.rotateRight();
    } else if (
      this.isRightChild && (sib.left ? sib.left.isBlack : true) && sib.right
        ? sib.right.isRed
        : false
    ) {
      sib.paintRed();
      sib.right.paintBlack();
      sib.rotateLeft();
    }
    this._remove6();
  }

  _remove6() {
    let sib = this.sibling;
    if (sib) this.parent.isBlack ? sib.paintBlack() : sib.paintRed();
    this.parent.paintBlack();
    if (this.isLeftChild) {
      sib.right.paintBlack();
      this.parent.rotateLeft();
    } else {
      sib.left.paintBlack();
      this.parent.rotateRight();
    }
  }

  countBlackToRoot(count = 0) {
    if (this.parent === undefined) {
      return count;
    } else {
      return this.isBlack
        ? this.parent.countBlackToRoot(count + 1)
        : this.parent.countBlackToRoot(count);
    }
  }
}
