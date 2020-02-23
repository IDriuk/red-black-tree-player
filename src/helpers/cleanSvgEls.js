export const cleanSvgEls = svgEls => {
  const { circle, valueTxt, topArrow, leftArrow, rightArrow } = svgEls;

  circle.remove();

  valueTxt.remove();

  topArrow.remove();

  leftArrow.remove();

  rightArrow.remove();
};
