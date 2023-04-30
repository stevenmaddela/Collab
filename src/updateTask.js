import { getDatabase, ref, update } from "firebase/database";
import { db } from "./firebaseConfig";

export function updateTask(taskId, newTitle) {
  const taskRef = ref(db, `tasks/${taskId}`);
  update(taskRef, { title: newTitle }, (error) => {
    if (error) {
      console.log("Error updating task title:", error);
    } else {
      console.log("Task title updated successfully");
    }
  });
}
