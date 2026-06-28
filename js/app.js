import { getVideos } from "./services/videoService.js";

const feed = document.getElementById("feed");

let currentVideoIndex = 0;
let videos = [];

// تحميل الفيديوهات
async function loadFeed() {

    videos = await getVideos();

    if (!videos || videos.length === 0) {
        feed.innerHTML = `
            <div style="color:#fff;text-align:center;margin-top:50%">
                لا توجد فيديوهات بعد
            </div>
        `;
        return;
    }

    renderVideos(videos);
    setupAutoPlay();
}

// عرض الفيديوهات
function renderVideos(videos) {

    feed.innerHTML = "";

    videos.forEach(video => {

        const div = document.createElement("div");
        div.className = "video";

        div.innerHTML = `
            <video 
                src="${video.url}" 
                muted 
                loop 
                playsinline
            ></video>

            <div class="overlay">
                ⭐ ${video.caption || ""} <br>
                👀 ${video.views || 0} مشاهدة <br>
                🔥 ${video.stage || "TESTING"}
            </div>
        `;

        feed.appendChild(div);
    });
}

// تشغيل الفيديو عند ظهوره (TikTok effect)
function setupAutoPlay() {

    const allVideos = document.querySelectorAll("video");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const video = entry.target;

            if (entry.isIntersecting) {
                video.play();
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
