import { getVideos } from "./services/videoService.js";

const feed = document.getElementById("feed");

let videos = [];

// تحميل الفيديوهات
async function loadFeed() {

    try {

        videos = await getVideos();

        console.log("VIDEOS FROM DB:", videos);

        if (!Array.isArray(videos) || videos.length === 0) {
            feed.innerHTML = `
                <div style="color:#fff;text-align:center;margin-top:50%">
                    لا توجد فيديوهات بعد
                </div>
            `;
            return;
        }

        renderVideos(videos);
        setupAutoPlay();

    } catch (error) {

        console.error("ERROR loading videos:", error);

        feed.innerHTML = `
            <div style="color:red;text-align:center;margin-top:50%">
                خطأ في تحميل الفيديوهات
            </div>
        `;
    }
}

// عرض الفيديوهات
function renderVideos(videos) {

    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    videos.forEach(video => {

        const videoUrl = video.url || video.videoUrl || video.fileUrl;

        const div = document.createElement("div");
        div.className = "video";

        div.innerHTML = `
            <video 
                src="${videoUrl}"
                muted 
                loop 
                playsinline
            ></video>

            <!-- ⭐ معلومات الفيديو -->
            <div class="overlay">
                ⭐ ${video.caption || "بدون وصف"} <br>
                👁${video.views || 0} مشاهدة <br>
                🔥 ${video.stage || "TESTING"}
            </div>

            <!-- ❤️ أزرار جانبية (TikTok Style) -->
            <div class="side-actions">

                <!-- بروفايل -->
                <div class="action">
                    <div class="icon">👤</div>
                </div>

                <!-- لايك -->
                <div class="action">
                    <div class="icon">❤</div>
                    <small>${video.likes_count || 0}</small>
                </div>

                <!-- تعليق -->
                <div class="action">
                    <div class="icon">💬</div>
                    <small>${video.comments_count || 0}</small>
                </div>

                <!-- حفظ -->
                <div class="action">
                    <div class="icon">🔖</div>
                </div>

                <!-- مشاركة -->
                <div class="action">
                    <div class="icon">🔗</div>
                </div>

            </div>
        `;

        feed.appendChild(div);
    });
}

// تشغيل الفيديو عند الظهور
function setupAutoPlay() {

    const allVideos = document.querySelectorAll("video");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }

        });

    }, {
        threshold: 0.7
    });

    allVideos.forEach(video => observer.observe(video));
}

loadFeed();
