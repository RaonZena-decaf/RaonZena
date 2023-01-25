import React from "react";
import './dropdown.css'

const Dropdown = (props) => {
  return (
    <article 
      className={ `${
        props.visibility ? "dropdown slide-fade-in-dropdown" : "dropdown slide-fade-out-dropdown"
      }`}
    >
      {props.visibility && props.children}
    </article>
  );
};

export default Dropdown;
