// =========================
// STAR Trending Engine
// =========================


// =========================
// حساب معدل النمو السريع للفيديو
// =========================
export function calculateGrowthRate(video) {

    const views = video.views || 0;
    const likes = video.likes || 0;
    const comments = video.comments || 0;
    const shares = video.shares || 0;

    // معادلة بسيطة لقياس السرعة
    const engagement = (likes + comments * 2 + shares * 3);

    if (views === 0) return 0;

    return engagement / views;
}


// =========================
// هل الفيديو ترند؟
// =========================
export function isTrending(video) {

    const growth = calculateGrowthRate(video);

    // إذا التفاعل عالي مقارنة بالمشاهدات
    return growth >= 0.15;
}


// =========================
// رفع أولوية الفيديو في الصفحة الرئيسية
// =========================
export function boostTrendingVideos(videos) {

    return videos.map(video => {

        if (isTrending(video)) {

            return {
                ...video,
                trending: true,
                boost: 2.0, // مضاعفة الظهور
                score: (video.score || 0) + 20
            };
        }

        return video;
    });
}


// =========================
// استخراج الفيديوهات الرائجة
// =========================
export function getTrendingVideos(videos) {

    return videos
        .filter(video => isTrending(video))
        .sort((a, b) => {

            const scoreA = calculateGrowthRate(a);
            const scoreB = calculateGrowthRate(b);

            return scoreB - scoreA;
        });
}
