import React from 'react';


const ggID = () => {
  let id = 0;
  return function genId() {
    return id++;
  };
};
export default { ggID }
const getMovePosition = (
  x,
  y,
  dragX,
  dragY,
  width,
  height,
  pageWidth,
  pageHeight
) => {
  const newPositionTop = y + dragY;
  const newPositionLeft = x + dragX;
  const newPositionRight = newPositionLeft + width;
  const newPositionBottom = newPositionTop + height;

  const top =
    newPositionTop < 0
      ? 0
      : newPositionBottom > pageHeight
        ? pageHeight - height
        : newPositionTop;
  const left =
    newPositionLeft < 0
      ? 0
      : newPositionRight > pageWidth
        ? pageWidth - width
        : newPositionLeft;

  return {
    top,
    left,
  };
};

const normalize = (value) => parseFloat((value / 255).toFixed(1));

// You can use the functions in this component
return <div>Example Component</div>;



