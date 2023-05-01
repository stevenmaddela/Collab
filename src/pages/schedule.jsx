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

export default function Schedule() {
  const user = auth.currentUser;
  useEffect(() => {
    if (user == null) router.push("/login");
  });

  const router = useRouter();
  const [inputs, setInputs] = useState({
    datetime: dayjs(), // Initialize the datetime value as a Day.js object
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
      writeScheduleData(user.uid, inputs.title, inputs.description, inputs.date, inputs.time);
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
        </LocalizationProvider>
        
        <br />
        <TextField
          style={{ margin: "10px" }}
          type="text"
          value={inputs.title || ""}
          aria-label="project title"
          placeholder="Enter Meeting Title "
          name="title"
          onChange={handleChange}
        >
        </TextField>

        <br />
        <TextField
          style={{ margin: "10px" }}
          type="text"
          value={inputs.date || ""}
          aria-label="project date"
          placeholder="DD-MM-YYYY"
          name="date"
          onChange={handleChange}
        >
        </TextField>

        <TextField
          style={{ margin: "10px" }}
          type="text"
          value={inputs.time || ""}
          aria-label="Project time"
          placeholder="05:30pm"
          name="time"
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

