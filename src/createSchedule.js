import { getDatabase, ref, set } from "firebase/database";
import { db, auth } from "./firebaseConfig";

export function writeScheduleData(userId, title, description, formattedDateTime) {
    set(ref(db, 'schedule/' + userId + '/' + title), {
      title: title,
      description: description,
      datetime: formattedDateTime
    });
  }

