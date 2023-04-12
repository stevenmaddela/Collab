import { useState } from "react";

export default function Create() {
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    setInputs((values) => ({ ...values, [name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (validateInput(inputs.username, inputs.email, inputs.password)) {
    // let user = new User(inputs.username, inputs.email, inputs.password);
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
