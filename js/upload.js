/// =========================
/// STAR Upload Manager
/// =========================

import { uploadVideoFile } from "./services/storageService.js";
import { uploadVideo } from "./services/videoService.js";

// عناصر الصفحة
const videoInput = document.getElementById("videoFile");
const captionInput = document.getElementById("caption");
const categoryInput = document.getElementById("category");
const uploadBtn = document.getElementById("uploadBtn");

// تأكد أن العناصر موجودة
if (!uploadBtn || !videoInput) {
    console.error("Upload elements not found in HTML");
}

// رفع الفيديو
uploadBtn?.addEventListener("click", async () => {

    console.log("UPLOAD CLICKED");

    const file = videoInput.files?.[0];

    console.log("FILE:", file);

    if (!file) {
        alert("اختر فيديو أولاً");
        return;
    }

    uploadBtn.disabled = true;
    uploadBtn.textContent = "جاري الرفع...";

    try {

        // رفع الفيديو إلى Firebase Storage
        const videoURL = await uploadVideoFile(file, (progress) => {

            console.log("Progress:", progress);

            uploadBtn.textContent = `جاري الرفع ${progress}%`;

        });

        // حفظ البيانات في Firestore
        await uploadVideo({

            url: videoURL,
            caption: captionInput.value.trim(),
            category: categoryInput.value,
            createdAt: Date.now(),

            // خوارزمية STAR
            stage: "TESTING",
            viewsTarget: 1500,
            score: 0,

            views: 0,
            likes: 0,
            comments: 0,
            shares: 0,
            saves: 0,

            watchTime: 0,
            completionRate: 0,
            rewatchRate: 0,
            reportRate: 0,

            trending: false

        });

        alert("✅ تم رفع الفيديو بنجاح");

        // إعادة ضبط الحقول
        videoInput.value = "";
        captionInput.value = "";
        categoryInput.selectedIndex = 0;

    } catch (error) {

        console.error("UPLOAD ERROR:", error);
        alert("حدث خطأ أثناء رفع الفيديو");

    }

    uploadBtn.disabled = false;
    uploadBtn.textContent = "رفع الفيديو";

});
