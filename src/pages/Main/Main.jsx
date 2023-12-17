import React from "react";
import MyButton from "../../components/MyButton/MyButton";
import axios from "../../axios";
import styles from "./Main.module.scss";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";

const Main = () => {
  const [employees, setEmployees] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(2);

  const getTeam = async () => {
    try {
      const { data } = await axios.get("/users", {
        params: {
          offset: (page - 1) * 6,
          count: 6,
        },
      });

      console.log(data);
      setEmployees((prev) => [...prev, ...data.users]);
      setPage(page + 1);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
    }
  };

  const onShowMore = () => {
    console.log("click");
    getTeam();
    console.log(page);
  };

  React.useEffect(() => {
    getTeam();
  }, []);

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
      <section className={styles.teamSection}>
        <h1>Working with GET request</h1>
        <div className={styles.employeeList}>
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              name={employee.name}
              photo={employee.photo}
              email={employee.email}
              position={employee.position}
              phone={employee.phone}
            />
          ))}
        </div>
        {page <= totalPages ? (
          <MyButton onClick={onShowMore}>Show more</MyButton>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default Main;
