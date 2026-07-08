// ========================================
// editorController-test.js - اختبار الأزرار
// ========================================

console.log("🚀 تم تحميل ملف الاختبار");

// استيراد designService فقط
import { getCurrentDesign, createDesign } from "../modules/design/designService.js";

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ DOM جاهز");

    // 1. التأكد من وجود canvas
    const canvas = document.getElementById("designCanvas");
    if (canvas) {
        canvas.style.width = "800px";
        canvas.style.height = "600px";
        canvas.style.background = "#ffffff";
        canvas.style.border = "2px solid #ddd";
        canvas.style.margin = "0 auto";
        canvas.style.position = "relative";
        console.log("✅ canvas موجود");
    } else {
        console.error("❌ canvas غير موجود");
        return;
    }

    // 2. التأكد من وجود لوحة الخصائص
    const panel = document.getElementById("propertiesPanel");
    if (panel) {
        panel.innerHTML = "<p>✨ اختر عنصراً لعرض خصائصه</p>";
        console.log("✅ panel موجود");
    } else {
        console.error("❌ panel غير موجود");
    }

    // 3. التأكد من وجود تصميم
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

    // ========================================
    // ربط الأزرار
    // ========================================

    // زر النص
    const textBtn = document.getElementById("textTool");
    if (textBtn) {
        textBtn.addEventListener("click", function() {
            alert("✅ زر النص يعمل!");
            // نضيف نصاً بسيطاً في canvas للتأكد
            const textDiv = document.createElement("div");
            textDiv.textContent = "نص جديد";
            textDiv.style.position = "absolute";
            textDiv.style.left = "100px";
            textDiv.style.top = "100px";
            textDiv.style.fontSize = "24px";
            textDiv.style.color = "#000";
            textDiv.style.background = "#f0f0f0";
            textDiv.style.padding = "8px";
            textDiv.style.border = "1px solid #ccc";
            textDiv.style.cursor = "pointer";
            canvas.appendChild(textDiv);
            console.log("✅ تم إضافة نص تجريبي");
        });
        console.log("✅ زر النص مرتبط");
    } else {
        console.error("❌ زر النص غير موجود");
    }

    // زر الصورة
    const imageBtn = document.getElementById("imageTool");
    const imageInput = document.getElementById("imageInput");
    if (imageBtn && imageInput) {
        imageBtn.addEventListener("click", function() {
            imageInput.click();
        });
        imageInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                alert("✅ تم اختيار صورة: " + file.name);
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const img = document.createElement("img");
                    img.src = ev.target.result;
                    img.style.position = "absolute";
                    img.style.left = "200px";
                    img.style.top = "200px";
                    img.style.width = "200px";
                    img.style.height = "150px";
                    img.style.objectFit = "cover";
                    img.style.border = "2px solid #ccc";
                    canvas.appendChild(img);
                    console.log("✅ تم إضافة صورة تجريبية");
                };
                reader.readAsDataURL(file);
            }
            imageInput.value = "";
        });
        console.log("✅ زر الصورة مرتبط");
    } else {
        console.error("❌ زر الصورة أو input غير موجود");
    }

    // زر الشكل
    const shapeBtn = document.getElementById("shapeTool");
    if (shapeBtn) {
        shapeBtn.addEventListener("click", function() {
            alert("✅ زر الشكل يعمل!");
            const shapeDiv = document.createElement("div");
            shapeDiv.style.position = "absolute";
            shapeDiv.style.left = "300px";
            shapeDiv.style.top = "300px";
            shapeDiv.style.width = "120px";
            shapeDiv.style.height = "80px";
            shapeDiv.style.background = "#4CAF50";
            shapeDiv.style.border = "2px solid #333";
            canvas.appendChild(shapeDiv);
            console.log("✅ تم إضافة شكل تجريبي");
        });
        console.log("✅ زر الشكل مرتبط");
    } else {
        console.error("❌ زر الشكل غير موجود");
    }

    // زر اللون
    const colorBtn = document.getElementById("colorTool");
    if (colorBtn) {
        colorBtn.addEventListener("click", function() {
            alert("✅ زر اللون يعمل!");
        });
        console.log("✅ زر اللون مرتبط");
    } else {
        console.error("❌ زر اللون غير موجود");
    }

    // زر الحفظ
    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
        saveBtn.addEventListener("click", function() {
            alert("✅ تم حفظ التصميم (محلياً)");
            const design = getCurrentDesign();
            localStorage.setItem("savedDesign", JSON.stringify(design));
        });
        console.log("✅ زر الحفظ مرتبط");
    } else {
        console.error("❌ زر الحفظ غير موجود");
    }

    console.log("✅ جميع الأزرار جاهزة للاختبار!");
});
