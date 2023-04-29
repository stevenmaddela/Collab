import { getDatabase, ref, set } from "firebase/database";
import { db, auth } from "./firebaseConfig";

export function writeProjectData(userId, title, description) {
    // const db = getDatabase();
    set(ref(db, 'schedule/' + userId + '/' + title), {
        title: title,
        description: description,
    });
}
