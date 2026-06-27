import { db } from "../firebase.js";
import { collection, addDoc, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// رفع فيديو جديد
export async function uploadVideo(video) {

    return await addDoc(collection(db, "videos"), {
        ...video,
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        createdAt: Date.now(),
        stage: 0,
        score: 0
    });

}

// جلب الفيديوهات
export async function getVideos() {

    const snap = await getDocs(collection(db, "videos"));

    return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}

// تحديث فيديو (مهم للخوارزمية)
export async function updateVideo(videoId, data) {

    const ref = doc(db, "videos", videoId);

    await updateDoc(ref, data);

}
