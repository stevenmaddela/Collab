import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { createTaskWithTitle } from "@component/CreateTask";
import { auth } from "@component/firebaseConfig";

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

export default function Task() {
  const router = useRouter();
  const projectTitle = useSearchParams().get("projectTitle");
  console.log("projectTitle: " + projectTitle);
  const redirectHome = () => {
    router.push("/home");
  };
  const signoutUser = () => {
    router.push("/login");
  };
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");
  const user = auth.currentUser;
  const handleChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateTitle(newItem)) {
      const newItemId = await createTaskWithTitle(
        user.uid,
        newItem,
        projectTitle
      );
      const newItemData = {
        id: newItemId,
        value: newItem,
      };
      setItems((prevState) => [...prevState, newItemData]);
      setNewItem("");
    } else {
      alert("Invalid Title");
    }
  };

  // Helper Functions

  /* Adds a new item to the list array*/
  function addItem() {
    // ! Check for empty item
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    // Add new item to items array
    setItems((oldList) => [...oldList, item]);

    // Reset newItem back to original state
    setNewItem("");
  }

  /* Deletes an item based on the `item.id` key */
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  /* Edit an item text after creating it. */
  function editItem(id, newText) {
    // Get the current item
    const currentItem = items.filter((item) => item.id === id);

    // Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  // Main part of app
  return (
    <div className="app">
      {/* 1. Header  */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
              Collab
            </Typography>
            <Button color="inherit" onClick={signoutUser}>
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <h1>Task List</h1>

      {/* 2. Add new item (input) */}
      <input
        type="text"
        placeholder="Add a task..."
        value={newItem}
        onChange={handleChange}
      />

      {/* Add (button) */}
      <button onClick={(e) => handleSubmit(e)}>Add</button>

      {/* 3. List of todos (unordered list) */}
      <ul>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <li onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  ❌
                </button>
              </li>

              {showEdit == item.id && (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button onClick={() => editItem(item.id, updatedText)}>
                    Update
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </ul>

      <Typography align="center" variant="h2" margin={"px10"} paddingTop={50}>
        <Button
          style={{ margin: "10px" }}
          onClick={redirectHome}
          variant="contained"
          color="primary"
        >
          Home
        </Button>
      </Typography>
    </div>
  );
}
