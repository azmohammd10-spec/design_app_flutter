// =========================
// STAR Storage Service
// =========================

import { storage } from "../firebase.js";

import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";


// =========================
// رفع فيديو مع متابعة نسبة الرفع
// =========================
export function uploadVideoFile(file, onProgress = null) {

    return new Promise((resolve, reject) => {

        // إنشاء اسم فريد
        const fileName =
            `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
// مسار الحفظ
const storageRef = ref(storage, `videos/${fileName}`);

console.log("Storage:", storage);
console.log("Storage Ref:", storageRef);

// بدء الرفع
const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on(

            "state_changed",

            (snapshot) => {

                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // إرسال نسبة الرفع للواجهة
                if (typeof onProgress === "function") {
                    onProgress(progress);
                }

            },

           (error) => {

    console.error("STORAGE ERROR:", error);

    alert(error.code + "\n" + error.message);

    reject(error);

}, 

            async () => {

                const downloadURL =
                    await getDownloadURL(uploadTask.snapshot.ref);

                resolve(downloadURL);

            }

        );

    });

}
