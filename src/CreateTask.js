import { getDatabase, ref, set } from "firebase/database";
import { db, auth } from "./firebaseConfig";


export function createTaskWithTitle(userId, taskTitle, projectTitle) {
  const db = getDatabase();
  set(ref(db, 'users/'+ userId+ '/projects/' + projectTitle + '/tasks/' + taskTitle), {
    task: taskTitle,
    members: [userId]
  });
}

