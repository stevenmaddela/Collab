import { getDatabase, ref, push } from "firebase/database";
import { db, auth } from "./firebaseConfig";

export function createTaskWithTitle(taskTitle) {
  const userId = auth.currentUser.uid;
  const taskRef = push(ref(db, 'users/'+ userId+ '/tasks'));
  taskRef.set({
    title: taskTitle,
    //createdAt: new Date().getTime(),
    createdBy: userId,
  });
  return taskRef.key;
}
