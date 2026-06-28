import { db } from "../firebase.js";
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// زيادة مشاهدة واحدة
export async function addView(videoId){

    const ref = doc(db, "videos", videoId);

    await updateDoc(ref, {
        views: increment(1)
    });

}


// تسجيل وقت المشاهدة
export async function updateWatchTime(videoId, seconds){

    const ref = doc(db, "videos", videoId);

    await updateDoc(ref, {
        watchTime: increment(seconds)
    });

}


// تسجيل لايك
export async function likeVideo(videoId){

    const ref = doc(db, "videos", videoId);

    await updateDoc(ref, {
        likes: increment(1)
    });

}
