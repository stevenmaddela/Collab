import { getDatabase, ref, push } from "firebase/database";
import { db, auth } from "./firebaseConfig";

// Add a list of task objects to the current project for the given user.
export function addTasksToCurrentProject(userId, taskList) {
  const currentProjectRef = ref(db, 'users/' + userId + '/currentProject');
  
  // Retrieve the current project for the user.
  get(currentProjectRef).then((snapshot) => {
    const currentProject = snapshot.val();
    
    if (currentProject) {
      // If the user has a current project, add the list of task objects to it.
      const taskRef = push(ref(db, 'users/' + userId + '/projects/' + currentProject + '/tasks'));
      set(taskRef, taskList);
    } else {
      // If the user does not have a current project, do nothing.
      console.log("User does not have a current project.");
    }
  }).catch((error) => {
    console.log("Error retrieving current project: ", error);
  });
}
