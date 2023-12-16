import styles from './MyButton.module.scss'

const MyButton = ({children}) => {
  return <button className={styles.myButton}>
    {children}
  </button>;
};

export default MyButton;
