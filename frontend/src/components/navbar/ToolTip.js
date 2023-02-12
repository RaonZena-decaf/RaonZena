import styles from "./ToolTip.module.css"


const Tooltip = ({children, message})=> {
	return (
	  <div className={styles.container}>
	    {children}
	    <div className={styles.tooltip}>{message}</div>
	  </div>
	);
}

export default Tooltip;