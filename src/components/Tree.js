import { useEffect } from "react";
import AnimatedTree from "../animations/AnimatedTree";
import { initSvg } from "../helpers";

const runVisualization = async () => {
  const canvas = initSvg();

  const animatedTree = new AnimatedTree(canvas);

  for (let i = 0; i <= 20; i++) {
    animatedTree.insert(i);
    animatedTree.updateCoordinates();
    await animatedTree.animateToCoordinates();
  }

  for (let i = 20; i > 0; i--) {
    animatedTree.remove(i);
    animatedTree.updateCoordinates();
    await animatedTree.animateToCoordinates();
  }
};

function Tree() {
  useEffect(() => {
    runVisualization();
  }, []);

  return null;
}

export default Tree;
