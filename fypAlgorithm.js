export function calculateScore(video) {
    const likes = video.likes_count || 0;
    const comments = video.comments_count || 0;

    // حساب عمر الفيديو (بالساعات)
    const createdAt = new Date(video.created_at);
    const now = new Date();
    const hoursOld = (now - createdAt) / (1000 * 60 * 60);

    // تقليل النقاط مع الوقت (كلما كان أقدم ينخفض)
    const timeDecay = Math.max(0, 100 - hoursOld);

    const score =
        (likes * 2) +
        (comments * 3) +
        timeDecay;

    return score;
}


// ترتيب الفيديوهات حسب For You
export function rankForYouVideos(videos) {
    return videos
        .map(video => ({
            ...video,
            score: calculateScore(video)
        }))
        .sort((a, b) => b.score - a.score);
}
