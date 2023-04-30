import { getDatabase, ref, set } from "firebase/database";
import { db, auth } from "./firebaseConfig";


export function createTaskWithTitle(userId, taskTitle) {
  const db = getDatabase();
  set(ref(db, 'users/'+ userId+ '/tasks/' + taskTitle), {
    task: taskTitle,
    members: [userId]
  });
}

