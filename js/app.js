import {
    getVideos,
    incrementViews
} from "./services/videoService.js";

const feed = document.getElementById("feed");

let videos = [];
let observer = null;

// =========================
// إنشاء كرت فيديو واحد
// =========================
function createVideoElement(video) {
    const videoUrl = video.url || video.videoUrl || video.fileUrl;

    const div = document.createElement("div");
    div.className = "video";

    div.innerHTML = `
        <video
            src="${videoUrl || ''}"
            muted
            loop
            playsinline
            data-id="${video.id || ''}"
        ></video>

        <div class="overlay">
            ⭐ ${video.caption || "بدون وصف"} <br>
            👁 ${video.views || 0} مشاهدة <br>
            🔥 ${video.stage || "TESTING"}
        </div>

        <div class="side-actions">

            <div class="action profile">
                <img src="assets/profile.jpg" />
            </div>

            <div class="action">
                <div class="circle">❤️</div>
                <small>${video.likes_count || 0}</small>
            </div>

            <div class="action">
                <div class="circle">💬</div>
                <small>${video.comments_count || 0}</small>
            </div>

            <div class="action save-btn" onclick="toggleSave(this)">
    <div class="circle">
        <span class="save-icon">✦</span>
    </div>
    <small>حفظ</small>
</div>

            <div class="action">
                <div class="circle">♻️</div>
                <small>مشاركة</small>
            </div>

        </div>
    `;

    return div;
}

// =========================
// عرض الفيديوهات
// =========================
function renderVideos(videos) {

    feed.innerHTML = "";

    // 🔥 ترتيب حسب الخوارزمية
    const sorted = videos.sort((a, b) => {
        return (b.score || 0) - (a.score || 0);
    });

    const fragment = document.createDocumentFragment();

    sorted.forEach(video => {
        fragment.appendChild(createVideoElement(video));
    });

    feed.appendChild(fragment);
}
// =========================
// تشغيل الفيديو + المشاهدات
// =========================
function setupAutoPlay() {

    // إيقاف observer القديم (مهم جداً)
    if (observer) {
        observer.disconnect();
    }

    const counted = new Set();
    const videosEl = document.querySelectorAll("video");

    observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            const video = entry.target;
            const id = video.dataset.id;

            if (!id) return;

            if (entry.isIntersecting) {

                // إيقاف باقي الفيديوهات
                document.querySelectorAll("video").forEach(v => {
                    if (v !== video) v.pause();
                });

                video.play().catch(() => {});

                if (!counted.has(id)) {
                    counted.add(id);

                    setTimeout(async () => {
                        if (!video.paused) {
                            try {
                                await incrementViews(id);
                                console.log("View +1:", id);
                            } catch (err) {
                                console.error("View error:", err);
                            }
                        }
                    }, 3000);
                }

            } else {
                video.pause();
            }
        });

    }, {
        threshold: 0.7
    });

    videosEl.forEach(video => observer.observe(video));
}
window.toggleSave = function(el) {
    const icon = el.querySelector(".save-icon");

    el.classList.toggle("saved");

    if (el.classList.contains("saved")) {
        icon.textContent = "★";
    } else {
        icon.textContent = "★";
    }
};


   const btn = document.querySelector(".tiktok-plus-btn");

btn.addEventListener("click", function () {

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";

    input.onchange = async function () {
        const file = input.files[0];
        if (!file) return;

        // 🟡 UI حالة تحميل
        btn.style.opacity = "0.6";
        btn.style.pointerEvents = "none";

        // (اختياري) نص داخل الزر
        const oldHTML = btn.innerHTML;
        btn.innerHTML = "⏳";

        try {
            await uploadVideo(file, (progress) => {
                console.log("Upload:", progress + "%");
            });

            console.log("Upload done");

            await loadFeed();

        } catch (err) {
            console.error(err);

        } finally {
            // 🔵 رجّع الزر طبيعي
            btn.style.opacity = "1";
            btn.style.pointerEvents = "auto";
            btn.innerHTML = oldHTML;
        }
    };

    input.click();
}); 
// =========================
// تشغيل أولي
// =========================
loadFeed();
