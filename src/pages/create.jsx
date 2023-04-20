import { useState, useEffect } from "react";
import { auth } from "@component/firebaseConfig";
import { writeProjectData } from "@component/rtdb_write_new_project";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";

export function validateTitle(inputName) {
  if (inputName == null || inputName.length == 0) {
    return false;
  }
  // check for string of only spaces, tabs, or line breaks
  if (!inputName.replace(/\s/g, "").length) {
    return false;
  }

  // check for no special characters
  if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(inputName)) {
    return false;
  }

  return true;
}

export default function Create() {
  const user = auth.currentUser;
  useEffect(() => {
    if (user == null) router.push("/login");
  });

  const router = useRouter();
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    setInputs((values) => ({ ...values, [name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateTitle(inputs.title)) {
      if (inputs.description == null) {
        inputs.description = "A new project.";
      }
      writeProjectData("users/", inputs.title, inputs.description);
      router.push("/projects/" + inputs.title); // navigate to project page
    } else {
      alert("Invalid Title");
    }
  };

  return (
    <div>
      <Typography align="center" variant="h3" margin={"10px"} paddingTop={25}>
        Create a New Project
      </Typography>

      <form onSubmit={handleSubmit} align="center">
        <TextField
          style={{ margin: "10px" }}
          type="text"
          value={inputs.title || ""}
          aria-label="project title"
          placeholder="Enter Title"
          name="title"
          onChange={handleChange}
        >
          Enter Project Title:
        </TextField>
        <br />
        <TextField
          style={{ margin: "10px" }}
          type="text"
          value={inputs.description || ""}
          aria-label="project description"
          placeholder="Enter Description"
          name="description"
          onChange={handleChange}
        >
          Enter a Brief Description:
          <input
            type="text"
            value={inputs.description || ""}
            aria-label="project description"
            placeholder="Enter Description"
            name="description"
            onChange={handleChange}
          />
        </TextField>
        <br />
        <Button
          style={{ margin: "10px" }}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
