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
// =========================
// إضافة عنصر إلى التصميم
// =========================
export function addElement(element) {

    if (!currentDesign) return;

    currentDesign.elements.push(element);

    localStorage.setItem(
        "currentDesign",
        JSON.stringify(currentDesign)
    );

}

// =========================
// تحديث التصميم
// =========================
export function updateDesign(data) {

    if (!currentDesign) return;

    currentDesign = {

        ...currentDesign,

        ...data

    };

    localStorage.setItem(
        "currentDesign",
        JSON.stringify(currentDesign)
    );

}
// حذف التصميم الحالي
export function clearCurrentDesign() {

    currentDesign = null;

    localStorage.removeItem("currentDesign");

}
// =========================
// نظام الطبقات
// =========================

export function sendToBack(id) {

    if (!currentDesign) return;

    const index = currentDesign.elements.findIndex(
        el => el.id === id
    );

    if(index === -1) return;

    const element = currentDesign.elements.splice(index,1)[0];

    currentDesign.elements.unshift(element);

    updateDesign({
        elements: currentDesign.elements
    });

}


export function bringToFront(id) {

    if (!currentDesign) return;

    const index = currentDesign.elements.findIndex(
        el => el.id === id
    );

    if(index === -1) return;

    const element = currentDesign.elements.splice(index,1)[0];

    currentDesign.elements.push(element);

    updateDesign({
        elements: currentDesign.elements
    });

}
