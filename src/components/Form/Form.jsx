import React, { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import {
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import { validateEmail, validatePhone } from "../../helper/validation";
import axios from "../../axios";

import MyButton from "../../components/MyButton/MyButton";

const Form = ({ sendUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);
  const [phone, setPhone] = useState("");
  const [isValidPhone, setValidPhone] = useState(true);
  const [position, setPosition] = useState("");
  const [file, setFile] = useState(null);
  const [positions, setPositions] = useState([]);

  const getPositions = async () => {
    try {
      const { data } = await axios.get("/positions");
      setPositions(data.positions);
      setPosition(data.positions[0].id);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangePhone = (e) => {
    const newValue = e.target.value;

    if (newValue.length < phone.length) {
      setPhone(newValue);
    } else if (newValue.length === 1) {
      setPhone("+38 (" + newValue);
    } else if (newValue.length === 8) {
      setPhone(newValue + ") ");
    } else if (newValue.length === 13 || newValue.length === 18) {
      setPhone(newValue + " - ");
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
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone.replace(/[\s-()]/g, ""));
      formData.append("position_id", position);

      sendUser(formData);
    }
  };

  useEffect(() => {
    getPositions();
  }, []);

  return (
    <form onSubmit={onSubmit} className={styles.root}>
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
        helperText={!isValidEmail ? "Please enter a valid email address" : ""}
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
            value={position.id}
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
  );
};

export default Form;
