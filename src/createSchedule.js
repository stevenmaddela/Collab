import { getDatabase, ref, set } from "firebase/database";
import { db, auth } from "./firebaseConfig";

export function writeScheduleData(userId, title, description, date,time ) {
    // const db = getDatabase();
    set(ref(db, 'schedule/' + userId + '/' + title), {
        title: title,
        description: description,
        date: date,
        time: time
    });
}
