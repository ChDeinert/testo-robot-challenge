import React from 'react';
import './SVGButton.css';

const SVGButton : React.FC<{ onClickHandler: () => void, title?: string }> = ({ children, onClickHandler, title, ...props }) => (
  <button className="svgbutton" onClick={onClickHandler} title={title} {...props}>
    {children}
    <span className="svgbutton--visually-hidden">{title}</span>
  </button>
);

export default SVGButton;