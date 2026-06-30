import {
    getVideos,
    incrementViews
} from "./services/videoService.js";

const feed = document.getElementById("feed");

let videos = [];
let observer = null;

// =========================
// تحميل الفيديوهات
// =========================
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

        Align(
  alignment: Alignment.bottomLeft, // تغيير المحاذاة لليسار
  child: Padding(
    padding: const EdgeInsets.only(left: 15.0, bottom: 30.0), // إضافة مساحة من اليسار
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // زر صورة البروفايل (دائري)
        CircleAvatar(radius: 25, backgroundImage: AssetImage('assets/profile.jpg')),
        SizedBox(height: 20),
        
        // الأزرار
        SocialButton(icon: Icons.favorite, count: "923"),
        SocialButton(icon: Icons.comment, count: "75"),
        SocialButton(icon: Icons.bookmark, count: "292"),
        SocialButton(icon: Icons.share, count: "1093"),
      ],
    ),
  ),
)


    return div;
}

// =========================
// عرض الفيديوهات
// =========================
function renderVideos(videos) {
    feed.innerHTML = "";

    const fragment = document.createDocumentFragment();

    videos.forEach(video => {
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

// =========================
// تشغيل أولي
// =========================
loadFeed();
