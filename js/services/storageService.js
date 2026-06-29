// =========================
// STAR - Supabase Storage Service
// =========================

const SUPABASE_URL = "https://nhrwbmbejscdkjlwsbtp.supabase.co";
const SUPABASE_KEY = "sb_publishable_WgOtBrrTfkMk1HWstBHlqw_HDxlmz_9";
const BUCKET = "videos";


// رفع فيديو
export async function uploadVideoFile(file, onProgress = null) {

    return new Promise(async (resolve, reject) => {

        try {

            const fileName = `${Date.now()}_${file.name}`;

            const formData = new FormData();
            formData.append("file", file);

            const xhr = new XMLHttpRequest();

            xhr.open(
                "POST",
                `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`
            );

            xhr.setRequestHeader("Authorization", `Bearer ${SUPABASE_KEY}`);
            xhr.setRequestHeader("apikey", SUPABASE_KEY);

            // progress
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable && onProgress) {
                    const percent = Math.round(
                        (event.loaded / event.total) * 100
                    );
                    onProgress(percent);
                }
            };

            // success
            xhr.onload = () => {
                if (xhr.status === 200) {

                    const videoURL =
                        `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fileName}`;

                    resolve(videoURL);

                } else {
                    reject(xhr.responseText);
                }
            };

            // error
            xhr.onerror = () => {
                reject("Upload failed");
            };

            xhr.send(file);

        } catch (err) {
            reject(err);
        }

    });

}
