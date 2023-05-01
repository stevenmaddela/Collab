import dayjs from "dayjs"; // Add this import at the beginning of your file
import { useState, useEffect } from "react";
import { auth } from "@component/firebaseConfig";
import { writeScheduleData } from "@component/createSchedule";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import './styles.css';


export function validateTitle(inputName) {
  if (inputName == null || inputName.length == 0) {
    return false;
  }
  if (!inputName.replace(/\s/g, "").length) {
    return false;
  }

  return true;
}


export default function Schedule() {
  const user = auth.currentUser;
  useEffect(() => {
    if (user == null) router.push("/login");
  });

  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    datetime: dayjs()
});

  const handleChange = (event) => {
    const name = event.target.name;
    setInputs((values) => ({ ...values, [name]: event.target.value }));
  };
  const [value, onChange] = useState(new Date());
  const handleDateTimeChange = (datetime) => {
    setInputs((values) => ({ ...values, datetime }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateTitle(inputs.title)) {
      if (inputs.description == null) {
        inputs.description = "Scheduled Meeting";
      }
      const formattedDateTime = inputs.datetime.format('YYYY-MM-DD HH:mm:ss');
      writeScheduleData(user.uid, inputs.title, inputs.description, formattedDateTime);
      alert("meeting is scheduled");
      router.push("/home");
    } else {
      alert("Invalid Title");
    }
};

  return (
    <div>
      <Typography align="center" variant="h3" margin={"10px"} paddingTop={10}>
        Schedule a Meeting
      </Typography>

      <form onSubmit={handleSubmit} align="center" >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            className="picker"
            orientation="landscape"
            value={inputs.datetime || new Date()}
            onChange={handleDateTimeChange}
          />
        </LocalizationProvider>
        <br />
        <TextField
          style={{ margin: "10px" }}
          type="text"
          value={inputs.title || ""}
          aria-label="project title"
          placeholder="Enter Meeting Title"
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
          placeholder="Enter Meeting Description"
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

