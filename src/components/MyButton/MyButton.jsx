import styles from "./MyButton.module.scss";

const MyButton = ({ children, onClick, disabled = false }) => {
  return (
    <button 
    className={disabled ? styles.myButton_disabled : styles.myButton}
    onClick={onClick}
    disabled={disabled}>
      {children}
    </button>
  );
};

export default MyButton;
