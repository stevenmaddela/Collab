import { validateEmail } from "./signup-form";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@component/firebaseConfig";
import { redirect } from "next/dist/server/api-utils";

export default function LoginForm() {
  const [inputs, setInputs] = useState({});
  const router = useRouter();

  const handleChange = (event) => {
    const name = event.target.name;
    setInputs((values) => ({ ...values, [name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then((userCredential) => {
        router.push("/home");
      })
      .catch((error) => {
        alert("Invalid login credentials: " + error.message);
      });
  };
  return (
    <div align="center">
      <form onSubmit={handleSubmit}>
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
          Log In
        </Button>
      </form>
    </div>
  );
}
