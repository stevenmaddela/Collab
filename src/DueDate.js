import { getDatabase, ref, update } from "firebase/database";
import { db, auth } from "./firebaseConfig";

// Update the due date of the given task to the new value.
export function updateTaskDueDate(userId, projectTitle, taskId, newDueDate) {
  update(ref(db, 'users/' + userId + '/projects/' + projectTitle + '/tasks/' + taskId), {
    dueDate: newDueDate,
  });
}
