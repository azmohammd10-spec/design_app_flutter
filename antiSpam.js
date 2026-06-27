// =========================
// STAR Anti-Spam Engine
// =========================


// =========================
// كشف التفاعل الوهمي (Engagement Spam)
// =========================
export function detectFakeEngagement(video) {

    const views = video.views || 0;
    const likes = video.likes || 0;
    const comments = video.comments || 0;

    if (views === 0) return false;

    const likeRatio = likes / views;
    const commentRatio = comments / views;

    // إذا كانت النسب غير طبيعية
    if (likeRatio > 0.5) return true;      // 50% إعجابات = غير طبيعي
    if (commentRatio > 0.2) return true;  // 20% تعليقات = مشبوه

    return false;
}


// =========================
// اكتشاف القفزات المفاجئة في المشاهدات
// =========================
export function detectViewSpike(video) {

    const views = video.views || 0;
    const previousViews = video.previousViews || 0;

    if (previousViews === 0) return false;

    const growth = (views - previousViews) / previousViews;

    // إذا النمو أكثر من 300% فجأة
    return growth > 3;
}


// =========================
// تقليل تأثير الحسابات المشبوهة
// =========================
export function applySpamPenalty(video) {

    let penalty = 0;

    if (detectFakeEngagement(video)) {
        penalty += 30;
    }

    if (detectViewSpike(video)) {
        penalty += 20;
    }

    return {
        ...video,
        spamScore: penalty,
        score: Math.max(0, (video.score || 0) - penalty)
    };
}


// =========================
// هل الفيديو آمن؟
 // =========================
export function isSafeVideo(video) {

    return !detectFakeEngagement(video) && !detectViewSpike(video);
}
