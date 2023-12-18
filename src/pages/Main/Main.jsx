import React from "react";
import MyButton from "../../components/MyButton/MyButton";
import axios from "../../axios";
import styles from "./Main.module.scss";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import {
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
} from "@mui/material";

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

  // React.useEffect(() => {
  //   getTeam();
  // }, []);

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
      <section className={styles.formSection}>
        <h1>Working with POST request</h1>
        <form>
          <TextField
            className={styles.inputText}
            id="outlined-basic"
            label="Your name"
            variant="outlined"
          />
          <TextField
            className={styles.inputText}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            className={styles.inputText}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            helperText="+38 (XXX) XXX - XX - XX"
          />
          <FormLabel id="demo-radio-buttons-group-label">
            Select your position
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Frontend developer"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "rgba(0, 189, 211, 1)",
                    },
                  }}
                />
              }
              label="Frontend developer"
            />
            <FormControlLabel
              value="Backend developer"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "rgba(0, 189, 211, 1)",
                    },
                  }}
                />
              }
              label="Backend developer"
            />
            <FormControlLabel
              value="Designer"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "rgba(0, 189, 211, 1)",
                    },
                  }}
                />
              }
              label="Designer"
            />
            <FormControlLabel
              value="QA"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "rgba(0, 189, 211, 1)",
                    },
                  }}
                />
              }
              label="QA"
            />
          </RadioGroup>
          <input type="file" />
          <MyButton disabled>Sign Up</MyButton>
        </form>
      </section>
    </main>
  );
};

export default Main;
