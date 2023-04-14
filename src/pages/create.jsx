import { useState } from "react";
import { getAuth } from "firebase/auth";
import { writeProjectData } from "@component/rtdb_write_new_project";

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
  //   const user = getAuth().currentUser;
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    setInputs((values) => ({ ...values, [name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (validateInput(inputs.username, inputs.email, inputs.password)) {
    // let user = new User(inputs.username, inputs.email, inputs.password);
    writeProjectData("jc", inputs.title, inputs.description); // TODO: change to user id
    alert(inputs.title + "\n" + inputs.description + "\n");
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Project Title:
        <input
          type="text"
          value={inputs.title || ""}
          aria-label="project title"
          placeholder="Enter Title"
          name="title"
          onChange={handleChange}
        />
      </label>
      <label>
        Enter a Brief Description:
        <input
          type="text"
          value={inputs.description || ""}
          aria-label="project description"
          placeholder="Enter Description"
          name="description"
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  );
}
