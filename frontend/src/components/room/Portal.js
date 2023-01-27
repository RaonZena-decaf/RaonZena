import reactDom from "react-dom";

const MenuPortal = ({ children }) => {
  const el = document.getElementById("menu");
  return reactDom.createPortal(children, el);
};

export default MenuPortal;