import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
async function getTasks() {
  const tasksRef = collection(db, "projects", pid, "tasks");
  const tasksSnapshot = await getDocs(tasksRef);
  const tasks = tasksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return tasks;
}
