import React from 'react';
import './SVGButton.css';

const SVGButton : React.FC<{ onClickHandler: () => void, title?: string }> = ({ children, onClickHandler, title, ...props }) => {
  return (
    <button className="svgbutton" onClick={onClickHandler} {...props}>
      {children}
      <span className="svgbutton--visually-hidden">{title}</span>
    </button>
  );
};

export default SVGButton;