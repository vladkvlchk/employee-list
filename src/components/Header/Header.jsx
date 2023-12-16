import MyButton from "../MyButton/MyButton";
import logo from "../../assents/logo";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <picture>
          {logo}
          </picture>
          <p>TESTTASK</p>
        </div>
        <div>
          <MyButton>Users</MyButton>
          <MyButton>Sing Up</MyButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
