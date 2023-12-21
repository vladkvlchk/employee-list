import React, { useState, useEffect } from "react";
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
} from "@mui/material";

const Main = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);
  const [phone, setPhone] = useState("");
  const [isValidPhone, setValidPhone] = useState(true);
  const [position, setPosition] = useState("");
  const [file, setFile] = useState(null);
  const [positions, setPositions] = useState([]);

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

  const getPositions = async () => {
    try {
      const { data } = await axios.get("/positions");
      setPositions(data.positions);
      setPosition(data.positions[0].name);
    } catch (e) {
      console.log(e);
    }
  };

  const onShowMore = () => {
    console.log("click");
    getTeam();
    console.log(page);
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePhone = (input) => {
    const phoneRegex = /^\+38 \(\d{3}\) \d{3} - \d{2} - \d{2}$/;
    return phoneRegex.test(input);
  };

  const onChangePhone = (e) => {
    const newValue = e.target.value;

    if (newValue.length < phone.length) {
      setPhone(newValue);
    } else if (newValue.length === 1) {
      setPhone("+38 (" + e.target.value);
    } else if (newValue.length === 8) {
      setPhone(e.target.value + ") ");
    } else if (newValue.length === 13 || newValue.length === 18) {
      setPhone(e.target.value + " - ");
    } else if (newValue.length < 24) {
      setPhone(newValue);
    }
    
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValidEmail(validateEmail(email));
    setValidPhone(validatePhone(phone));

    if (
      isValidEmail &&
      isValidPhone &&
      name.length > 1 &&
      name.length < 61 &&
      file
    ) {
      console.log("sending request...");
      const { data } = axios.post("/users", {
        body: { name, email, phone: phone.replace(" ", "").replace("-", "") },
      });
    }

    console.log({ name, email, phone, position });
  };

  useEffect(() => {
    getTeam();
    getPositions();
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
      <section className={styles.formSection}>
        <h1>Working with POST request</h1>
        <form onSubmit={onSubmit}>
          <TextField
            className={styles.inputText}
            id="outlined-basic"
            label="Your name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            className={styles.inputText}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            error={!isValidEmail}
            value={email}
            helperText={
              !isValidEmail ? "Please enter a valid email address" : ""
            }
          />
          <TextField
            className={styles.inputText}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            helperText="+38 (XXX) XXX - XX - XX"
            onChange={onChangePhone}
            value={phone}
            error={!isValidPhone}
          />
          <FormLabel id="demo-radio-buttons-group-label">
            Select your position
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={position}
          >
            {positions.map((position) => (
              <FormControlLabel
                key={position.id}
                value={position.name}
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "rgba(0, 189, 211, 1)",
                      },
                    }}
                  />
                }
                label={position.name}
                onChange={(e) => setPosition(e.target.value)}
              />
            ))}
          </RadioGroup>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <MyButton disabled={!name || !email || !phone || !file} type="submit">
            Sign Up
          </MyButton>
        </form>
      </section>
    </main>
  );
};

export default Main;
