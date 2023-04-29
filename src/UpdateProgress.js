import { getDatabase, ref, update } from "firebase/database";
import { db, auth } from "./firebaseConfig";

// Update the progress of the given task to the new value.
export function updateTaskProgress(userId, projectTitle, taskRef, newProgress) {
  update(ref(db, 'users/' + userId + '/projects/' + projectTitle+ '/tasks/' + taskRef), {
    progress: newProgress,
  });
}
