import MyButton from "../../components/MyButton/MyButton";
import styles from "./Main.module.scss";

const Main = () => {
  return (
    <main>
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContainer}>
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <MyButton>Sign Up</MyButton>
        </div>
      </section>
      <section>section 2</section>
    </main>
  );
};

export default Main;
