// ========================================
// editorController.js - لإصدار editor.html
// ========================================

import { 
    getCurrentDesign, 
    updateDesign, 
    deleteElement,
    createDesign 
} from "../modules/design/designService.js";
import { renderCanvas } from "./renderer.js";
import { showProperties } from "./propertiesPanel.js";
import { createText } from "../modules/tools/textTool.js";
import { createRectangle, createCircle } from "../modules/tools/shapeTool.js";
import { createImage } from "../modules/tools/imageTool.js";

let canvasElement;
let panelElement;
let selectedElement = null;

// ========================================
// التهيئة الرئيسية
// ========================================
export function initEditor(canvasId, panelId) {
    canvasElement = document.getElementById(canvasId);
    panelElement = document.getElementById(panelId);

    if (!canvasElement || !panelElement) {
        console.error("❌ canvas أو panel غير موجودين");
        return;
    }

    // التأكد من وجود تصميم
    let design = getCurrentDesign();
    if (!design) {
        console.log("🆕 إنشاء تصميم افتراضي");
        const defaultDesign = {
            id: "default-" + Date.now(),
            name: "تصميم جديد",
            width: 800,
            height: 600,
            category: "general",
            elements: [],
            createdAt: Date.now()
        };
        localStorage.setItem("currentDesign", JSON.stringify(defaultDesign));
        design = getCurrentDesign();
    }

    console.log("✅ التصميم الحالي:", design);
    renderCanvas(canvasElement);

    // استماع لحدث اختيار عنصر
    document.addEventListener("elementSelected", (e) => {
        selectedElement = e.detail;
        showProperties(selectedElement, panelElement);
    });

    // إلغاء التحديد عند النقر على canvas الفارغ
    canvasElement.addEventListener("click", (e) => {
        if (e.target === canvasElement) {
            selectedElement = null;
            panelElement.innerHTML = "<p>✨ اختر عنصراً لعرض خصائصه</p>";
        }
    });

    // ربط الأزرار
    bindButtons();

    console.log("✅ المحرر جاهز!");
}

// ========================================
// ربط الأزرار (حسب editor.html)
// ========================================
function bindButtons() {
    // ----- 1. زر النص -----
    const textBtn = document.getElementById("textTool");
    if (textBtn) {
        textBtn.addEventListener("click", () => {
            const el = createText("نص جديد");
            renderCanvas(canvasElement);
            selectedElement = el;
            showProperties(el, panelElement);
        });
    }

    // ----- 2. زر الصورة (يستخدم input المخفي) -----
    const imageBtn = document.getElementById("imageTool");
    const imageInput = document.getElementById("imageInput");
    if (imageBtn && imageInput) {
        imageBtn.addEventListener("click", () => {
            imageInput.click();
        });
        imageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const el = createImage(ev.target.result, {
                        x: 100,
                        y: 100,
                        width: 300,
                        height: 200
                    });
                    renderCanvas(canvasElement);
                    selectedElement = el;
                    showProperties(el, panelElement);
                };
                reader.readAsDataURL(file);
            }
            // إعادة تعيين input ليسمح برفع نفس الملف مرة أخرى
            imageInput.value = "";
        });
    }

    // ----- 3. زر الشكل (ينشئ مستطيلاً افتراضياً) -----
    const shapeBtn = document.getElementById("shapeTool");
    if (shapeBtn) {
        shapeBtn.addEventListener("click", () => {
            // يمكنك تغيير هذا لإنشاء دائرة أو مربع حسب اختيار المستخدم
            const el = createRectangle({ x: 150, y: 150, width: 150, height: 100 });
            renderCanvas(canvasElement);
            selectedElement = el;
            showProperties(el, panelElement);
        });
    }

    // ----- 4. زر الحذف (غير موجود في editor.html، لكن نضيفه احتياطياً) -----
    // يمكنك إضافة زر حذف في editor.html لاحقاً
    const deleteBtn = document.getElementById("deleteElementBtn");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            if (selectedElement) {
                deleteElement(selectedElement.id);
                selectedElement = null;
                renderCanvas(canvasElement);
                panelElement.innerHTML = "<p>🗑️ تم حذف العنصر</p>";
            } else {
                alert("⚠️ اختر عنصراً أولاً");
            }
        });
    }

    // ----- 5. زر الحفظ (يحفظ في localStorage) -----
    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const design = getCurrentDesign();
            localStorage.setItem("savedDesign", JSON.stringify(design));
            alert("✅ تم حفظ التصميم!");
        });
    }

    // ----- 6. زر التصدير (تنبيه فقط حالياً) -----
    const exportBtn = document.getElementById("exportBtn");
    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            alert("📥 سيتم إضافة خاصية التصدير لاحقاً");
        });
    }

    // ----- 7. زر التراجع (تنبيه فقط) -----
    const undoBtn = document.getElementById("undoBtn");
    if (undoBtn) {
        undoBtn.addEventListener("click", () => {
            alert("↶ سيتم إضافة خاصية التراجع لاحقاً");
        });
    }

    // ----- 8. زر الإعادة (تنبيه فقط) -----
    const redoBtn = document.getElementById("redoBtn");
    if (redoBtn) {
        redoBtn.addEventListener("click", () => {
            alert("↷ سيتم إضافة خاصية الإعادة لاحقاً");
        });
    }

    // ----- 9. زر اللون (يفتح منتقي الألوان للعنصر المحدد) -----
    const colorBtn = document.getElementById("colorTool");
    if (colorBtn) {
        colorBtn.addEventListener("click", () => {
            if (selectedElement) {
                const colorPicker = document.createElement("input");
                colorPicker.type = "color";
                colorPicker.value = selectedElement.color || selectedElement.background || "#000000";
                colorPicker.addEventListener("input", (e) => {
                    const newColor = e.target.value;
                    if (selectedElement.type === "text") {
                        selectedElement.color = newColor;
                    } else if (selectedElement.type === "shape") {
                        selectedElement.background = newColor;
                    }
                    updateDesign({ elements: getCurrentDesign().elements });
                    renderCanvas(canvasElement);
                    showProperties(selectedElement, panelElement);
                });
                colorPicker.click();
            } else {
                alert("⚠️ اختر عنصراً أولاً");
            }
        });
    }

    // ----- 10. زر الطبقات (تنبيه فقط) -----
    const layerBtn = document.getElementById("layerTool");
    if (layerBtn) {
        layerBtn.addEventListener("click", () => {
            alert("📚 سيتم إضافة لوحة الطبقات لاحقاً");
        });
    }
}

// ========================================
// بدء التشغيل التلقائي
// ========================================
window.addEventListener("DOMContentLoaded", () => {
    initEditor("designCanvas", "propertiesPanel");
});
