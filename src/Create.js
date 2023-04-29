import { getDatabase, ref, push } from "firebase/database";
import { db, auth } from "./firebaseConfig";

export function createTaskWithTitle(userId, projectTitle, title, dueDate, assignedTo) {
  const taskRef = push(ref(db, 'users/' + userId '/projects/' +  projectTitle '/tasks'));
  taskRef.set({
    title,
    dueDate,
    assignedTo,
    progress: 'Not started',
    createdAt: new Date().getTime(),
    createdBy: auth.currentUser.uid,
  });
  return taskRef.key;
}
