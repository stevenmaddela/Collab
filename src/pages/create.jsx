import { useState } from "react";
import { getAuth } from "firebase/auth";
import { writeProjectData } from "@component/rtdb_write_new_project";
import { useRouter } from "next/router";

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
  const router = useRouter();

  // const redirect = () => {
  //   router.push("projects/" + inputs.title);
  //   return null;
  // };

  //   const user = getAuth().currentUser;
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
      writeProjectData("jc", inputs.title, inputs.description); // TODO: change to user id
      router.push("/projects/" + inputs.title); // navigate to project page
    } else {
      alert("Invalid Title");
    }
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
