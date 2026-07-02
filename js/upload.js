import { uploadVideoFile } from "./services/storageService.js";
import { uploadVideo } from "./services/videoService.js";
alert("upload.js loaded");
window.addEventListener("DOMContentLoaded", () => {

    const videoInput = document.getElementById("videoFile");
    const captionInput = document.getElementById("caption");
    const categoryInput = document.getElementById("category");
    const uploadBtn = document.getElementById("uploadBtn");

    console.log("🔥 SCRIPT LOADED");

    if (!videoInput || !uploadBtn) {
        console.error("❌ عناصر الصفحة غير موجودة");
        return;
    }

    uploadBtn.addEventListener("click", async () => {

        console.log("🚀 CLICK STARTED");

        const file = videoInput.files?.[0];

        if (!file) {
            alert("اختر فيديو أولاً");
            return;
        }

        try {

            uploadBtn.disabled = true;
            uploadBtn.textContent = "جاري الرفع 0%";

            console.log("⬆️ UPLOADING...");

            const videoURL = await uploadVideoFile(file, (progress) => {
                console.log("📊 PROGRESS:", progress);
                uploadBtn.textContent = `جاري الرفع ${progress}%`;
            });

            console.log("✅ UPLOADED:", videoURL);

            await uploadVideo({
                url: videoURL,
                caption: captionInput.value.trim(),
                category: categoryInput.value,
                createdAt: Date.now(),
                stage: "TESTING"
            });

            console.log("🎉 SAVED");

            alert("تم رفع الفيديو بنجاح ✅");

            videoInput.value = "";
            captionInput.value = "";
            categoryInput.selectedIndex = 0;

       } catch (error) {

    console.error("UPLOAD ERROR:", error);

    alert(
        error.message ||
        JSON.stringify(error) ||
        "حدث خطأ"
    );

} 

        uploadBtn.disabled = false;
        uploadBtn.textContent = "رفع الفيديو";
    });

});
