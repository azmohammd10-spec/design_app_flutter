// =========================
// STAR Video Service
// =========================

import { db } from "../firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc,
    getDoc,
    query,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// =========================
// رفع فيديو جديد
// =========================
export async function uploadVideo(video) {

    return await addDoc(collection(db, "videos"), {

        ...video,

        createdAt: Date.now(),

        // إحصائيات
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
        reports: 0,

        // الخوارزمية
        score: 0,
        stage: "TESTING",
        viewsTarget: 1500,

        watchTime: 0,
        completionRate: 0,
        rewatchRate: 0,
        reportRate: 0,

        trending: false

    });

}


// =========================
// جلب الفيديوهات
// =========================
export async function getVideos(max = 100) {

    const q = query(
        collection(db, "videos"),
        orderBy("createdAt", "desc"),
        limit(max)
    );

    const snap = await getDocs(q);

    return snap.docs.map(item => ({
        id: item.id,
        ...item.data()
    }));

}


// =========================
// جلب فيديو واحد
// =========================
export async function getVideo(videoId) {

    const ref = doc(db, "videos", videoId);

    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return {
        id: snap.id,
        ...snap.data()
    };

}


// =========================
// تحديث بيانات الفيديو
// =========================
export async function updateVideo(videoId, data) {

    const ref = doc(db, "videos", videoId);

    await updateDoc(ref, data);

}
