import { supabase } from "./storageService.js";
import { rankForYouVideos } from "./fypAlgorithm.js";

// جلب فيديوهات For You
export async function getForYouVideos() {

    let { data, error } = await supabase
        .from("videos")
        .select("*");

    if (error) {
        console.error("Error fetching videos:", error);
        return [];
    }

    // ترتيب الفيديوهات بخوارزمية FYP
    const rankedVideos = rankForYouVideos(data);

    return rankedVideos;
}
