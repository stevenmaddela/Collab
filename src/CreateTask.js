import { getDatabase, ref, set } from "firebase/database";
import { db, auth } from "./firebaseConfig";

export function createTaskWithTitle(userId, taskTitle) {
  set(ref(db, 'users/'+ userId+ '/tasks' + taskTitle), {
    title: taskTitle,
    members: [userId]
  });
}


