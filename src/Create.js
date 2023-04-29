import { getDatabase, ref, push } from "firebase/database";
import { db, auth } from "./firebaseConfig";

export function createTask(userId, projectTitle, task) {
  const taskRef = push(ref(db, 'users/'+ userId + '/projects/' + projectTitle + '/tasks'));
  taskRef.set({
    ...task,
    createdAt: new Date().getTime(),
    createdBy: auth.currentUser.uid,
    status: 'pending',
  });
  return taskRef.key;
}
