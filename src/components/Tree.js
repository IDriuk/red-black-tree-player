import { useEffect } from "react";
import AnimatedTree from "../animations/AnimatedTree";
import { canvasTest, initSvg } from "../helpers";

const runVisualization = async () => {
  const canvas = initSvg();
  // canvasTest(canvas);

  const animatedTree = new AnimatedTree(canvas);

  for (let i = 0; i <= 10; i++) {
    await animatedTree.insert(i);
  }

  animatedTree.updateCoordinates()
  console.log(animatedTree)

  // for (let i = 50; i >= 20; i--) {
  //   await animatedTree.remove(i);
  // }

};

function Tree() {
  useEffect(() => {
    runVisualization();
  }, []);

  return null;
}

export default Tree;
