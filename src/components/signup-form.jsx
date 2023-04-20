import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@component/firebaseConfig";

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export function validateName(inputName) {
  if (inputName == null || inputName.length == 0) {
    return "Enter a name\n";
  }
  if (!/^[a-zA-Z\s]*$/.test(inputName)) {
    return "Invalid Characters\n";
  }
  return "";
}

export function validateEmail(inputEmail) {
  if (inputEmail == null || inputEmail.length == 0) {
    return "Enter an email address\n";
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail)) {
    return "Invalid Email\n";
  }
  return "";
}

export function validatePassword(inputPassword) {
  if (inputPassword == null || inputPassword.length == 0) {
    return "Enter a password\n";
  }
  if (inputPassword.length < 6) {
    return "Password must be 6 characters long";
  }
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/.test(inputPassword)) {
    return "Ensure your password has 1 uppercase, lowercase, and number\n";
  }

  return "";
}

export default function SignupForm() {
  const [inputs, setInputs] = useState({});
  const router = useRouter();

  const handleChange = (event) => {
    const name = event.target.name;
    setInputs((values) => ({ ...values, [name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(inputs.username, inputs.email, inputs.password)) {
      createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // add display name to user
          updateProfile(user, {
            displayName: inputs.name,
          }).catch((error) => {
            alert("Error updating user's account : " + error);
          });
          router.push("/home");
        })
        .catch((error) => {
          alert("Error creating user: " + error);
        });
    }
  };

  function validateInput(inputName, inputEmail, inputPassword) {
    let alertMessage = "";
    alertMessage +=
      validateName(inputName) +
      validateEmail(inputEmail) +
      validatePassword(inputPassword);
    if (alertMessage.length != 0) {
      alert(alertMessage);
      return false;
    }
    return true;
  }

  return (
    <div align="center">
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ margin: "10px" }}
          type="text"
          value={inputs.username || ""}
          aria-label="user name"
          placeholder="Enter Name"
          name="username"
          fullWidth="true"
          onChange={handleChange}
        >
          Enter your name
        </TextField>
        <br />
        <TextField
          style={{ margin: "10px" }}
          type="text"
          value={inputs.email || ""}
          aria-label="user email"
          placeholder="Enter Email"
          name="email"
          fullWidth="true"
          onChange={handleChange}
        >
          Enter Email
        </TextField>
        <br />
        <TextField
          style={{ margin: "10px" }}
          type="password"
          value={inputs.password || ""}
          aria-label="user password"
          placeholder="Enter Password"
          name="password"
          fullWidth="true"
          onChange={handleChange}
        >
          Enter Password
        </TextField>
        <br />
        <Button
          style={{ margin: "10px" }}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="medium"
          fullWidth="true"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
