import { getDatabase, ref, set } from "firebase/database";
import { db, auth } from "./firebaseConfig";

export function writeProjectData(userId, title, description) {
    // const db = getDatabase();
    set(ref(db, 'projects/' + userId + '/' + title), {
        title: title,
        description: description,
        tasks:{},
        members: [userId],
        projectLeader: userId
    });
}

// export function writeProjectData(userId, title, description) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId + '/projects'), {
//         title: title,
//         description: description,
//         tasks:[],
//         members: [userId],
//         projectLeader: userId
//     });
// }