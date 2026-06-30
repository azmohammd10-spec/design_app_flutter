import { getForYouVideos } from "./videoFeed.js";

async function loadFeed() {
    const videos = await getForYouVideos();

    const container = document.getElementById("feed");

    container.innerHTML = "";

    videos.forEach(video => {
        const div = document.createElement("div");

        div.innerHTML = `
            <video src="${video.video_url}" autoplay muted loop></video>
            <p>${video.caption || ""}</p>
        `;

        container.appendChild(div);
    });
}

loadFeed();
