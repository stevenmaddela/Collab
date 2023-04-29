import { getDatabase, ref, update } from "firebase/database";
import { db, auth } from "./firebaseConfig";

// Update the assigned user of the given task to the new value.
export function updateTaskAssignedTo(userId, projectTitle, taskId, newAssignedTo) {
  update(ref(db, `users/${userId}/projects/${projectTitle}/tasks/${taskId}`), {
    assignedTo: newAssignedTo,
  });
}
