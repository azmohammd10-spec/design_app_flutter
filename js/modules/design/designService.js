// =========================
// Design Service
// =========================

let currentDesign = null;

// إنشاء تصميم جديد
export function createDesign(type) {

    currentDesign = {

        id: crypto.randomUUID(),

        type: type.id,

        name: type.name,

        width: type.width,

        height: type.height,

        category: type.category,

        elements: [],

        createdAt: Date.now()

    };

    // حفظ التصميم مؤقتًا
    localStorage.setItem(
        "currentDesign",
        JSON.stringify(currentDesign)
    );

    return currentDesign;

}

// جلب التصميم الحالي
export function getCurrentDesign() {

    if (currentDesign) return currentDesign;

    const saved = localStorage.getItem("currentDesign");

    if (saved) {

        currentDesign = JSON.parse(saved);

    }

    return currentDesign;

}

// حذف التصميم الحالي
export function clearCurrentDesign() {

    currentDesign = null;

    localStorage.removeItem("currentDesign");

}
