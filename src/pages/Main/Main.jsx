import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

import axios from "../../axios";
import styles from "./Main.module.scss";
import successImage from "../../assets/success-image";

import MyButton from "../../components/MyButton/MyButton";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Form from "../../components/Form/Form";

import image from "./../../assets/welcome-picture.png";

const Main = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isRegistered, setRegistered] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const getToken = async () => {
    try {
      const { data } = await axios.get("/token");
      window.localStorage.setItem("token", data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const getTeam = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/users", {
        params: {
          offset: (page - 1) * 6,
          count: 6,
        },
      });

      setEmployees((prev) => [...prev, ...data.users]);
      setPage(page + 1);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const sendUser = async (formData) => {
    try {
      await axios.post("/users", formData);

      setRegistered(true);
      setLoading(true);

      const response = await axios.get("/users", {
        params: {
          offset: 0,
          count: 6,
        },
      });

      setEmployees(response.data.users);
      setPage(2);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getToken();
    getTeam();
  }, []);

  return (
    <main>
      <section className={styles.welcomeSection}>
        <img src={image} alt="welcome background" loading="lazy" className={styles.background}/>
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                name={employee.name}
                photo={employee.photo}
                email={employee.email}
                position={employee.position}
                phone={employee.phone}
              />
            ))
          )}
        </div>
        {!isLoading && page <= totalPages ? (
          <MyButton onClick={getTeam}>Show more</MyButton>
        ) : (
          <></>
        )}
      </section>
      <section className={styles.formSection}>
        {isRegistered ? (
          <>
            <h1>User successfully registered</h1>
            <picture>{successImage}</picture>
          </>
        ) : (
          <>
            <h1>Working with POST request</h1>
            <Form sendUser={sendUser} />
          </>
        )}
      </section>
    </main>
  );
};

export default Main;
