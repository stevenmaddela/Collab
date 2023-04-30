import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { auth } from "@component/firebaseConfig";
import { createTaskWithTitle } from "@component/CreateTask";

export default function Task() {
  const router = useRouter();
  const redirectHome = () => {
    router.push("home");
  };
  const signoutUser = () => {
    router.push("login");
  };
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;

    // Create the task with the new title
    const taskRef = await createTaskWithTitle(userId, newItem);

    console.log("New task created with ID:", taskRef.key);

    // Add the task to the items list
    const task = {
      id: taskRef.key,
      value: newItem,
    };
    setItems((oldList) => [...oldList, task]);

    // Reset newItem back to original state
    setNewItem("");
  };

  // Helper Functions
  /* Deletes an item based on the `item.id` key */
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  /* Edit an item text after creating it. */
  function editItem(id, newText) {
    // Get the current item
    const currentItem = items.filter((item) => item.id === id)[0];

    // Update the task title in the firebase database
    currentItem.ref.update({ title: newText }).then(() => {
      console.log("Task title updated successfully");

      // Update the task title in the local state
      const newItem = {
        id: id,
        value: newText,
        ref: currentItem.ref,
      };

      // Replace item in the item list
      const newArray = items.map((item) =>
        item.id === id ? newItem : item
      );
      setItems(newArray);

      setUpdatedText("");
      setShowEdit(-1);
    });
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
          placeholder="Add an item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
  
        {/* Add (button) */}
        <button onClick={() => addItem()}>Add</button>
  
        {/* 3. List of todos (unordered list) */}
        <ul>
          {items.map((item) => {
            return (
              <div>
                <li key={item.id} onClick={() => setShowEdit(item.id)}>
                  {item.value}
                  <button
                    className="delete-button"
                    onClick={() => deleteItem(item.id)}
                  >
                    ❌
                  </button>
                </li>
  
                {showEdit == item.id ? (
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
                ) : null}
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
  )
}
