// ================================
// STAR Recommendation Algorithm
// Version 1.0
// ================================

// عدد المشاهدات الأولية
export const FIRST_STAGE_VIEWS = 1500;

// حساب نقاط الفيديو
export function calculateScore(video){

    let score = 0;

    score += video.watchTime * 0.35;
    score += video.completionRate * 0.25;
    score += video.rewatchRate * 0.15;
    score += video.shareRate * 0.10;
    score += video.saveRate * 0.05;
    score += video.commentRate * 0.05;
    score += video.likeRate * 0.05;

    return score;

}

// المرحلة التالية
export function getNextStage(score){

    if(score >= 98) return 100000;

    if(score >= 95) return 50000;

    if(score >= 90) return 10000;

    if(score >= 80) return 5000;

    return 1500;

}

// هل يستحق الانتشار؟
export function shouldPromote(score){

    return score >= 80;

}
