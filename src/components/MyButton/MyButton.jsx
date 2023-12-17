import styles from "./MyButton.module.scss";

const MyButton = ({ children, onClick }) => {
  return (
    <button className={styles.myButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default MyButton;
