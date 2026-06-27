// =========================
// STAR Fairness Engine
// =========================


// =========================
// المرحلة الأولى (فرصة عادلة)
// =========================
export const FIRST_STAGE_VIEWS = 1500;


// =========================
// تحديد عدد المشاهدات حسب الأداء
// =========================
export function getNextViews(score) {

    if (score >= 95) return 100000;
    if (score >= 90) return 50000;
    if (score >= 85) return 25000;
    if (score >= 80) return 10000;
    if (score >= 70) return 5000;
    if (score >= 50) return 2000;

    return FIRST_STAGE_VIEWS;

}


// =========================
// هل الفيديو مؤهل للانتشار؟
/// =========================
export function isEligible(videoScore) {

    return videoScore >= 50;

}


// =========================
// تحديد حالة الفيديو
// =========================
export function getVideoStage(score) {

    if (score >= 95) return "VIRAL";
    if (score >= 85) return "GROWING";
    if (score >= 70) return "ACTIVE";
    if (score >= 50) return "TESTING";

    return "LIMITED";

}


// =========================
// تحديث حالة الفيديو
// =========================
export function updateFairness(video, score) {

    return {
        ...video,
        viewsTarget: getNextViews(score),
        stage: getVideoStage(score),
        eligible: isEligible(score)
    };

}
