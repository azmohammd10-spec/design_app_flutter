// =========================
// Editor Controller
// =========================

import {
    getCurrentDesign,
    updateDesign,
    addElement
} from "../modules/design/designService.js";
// عناصر الصفحة (سنربطها لاحقًا في editor.html)
let canvas = null;
// تشغيل المحرر تلقائياً بعد تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {

    const canvasElement = document.getElementById("designCanvas");

    if (canvasElement) {

        initEditor(canvasElement);

    } else {

        console.error("❌ designCanvas not found");

    }

});
// =========================
// تهيئة المحرر
// =========================
export function initEditor(canvasElement) {

    canvas = canvasElement;

    const design = getCurrentDesign();

    if (!design) {
        console.error("❌ No design selected");
        return;
    }

    renderCanvas(design);

    console.log("✅ Editor initialized:", design);

}

// =========================
// رسم التصميم على الشاشة
// =========================
function renderCanvas(design) {

    canvas.innerHTML = "";

    canvas.style.width = design.width + "px";
    canvas.style.height = design.height + "px";

    canvas.style.position = "relative";
    canvas.style.background = "#fff";
    canvas.style.margin = "0 auto";

}

// =========================
// إضافة نص
// =========================
export function addText(text) {

    const element = {
        id: crypto.randomUUID(),
        type: "text",
        content: text,
        x: 50,
        y: 50,
        fontSize: 24,
        color: "#000"
    };

    addElement(element);

    renderElement(element);

}

// =========================
// رسم عنصر على الكانفاس
// =========================
function renderElement(element) {

    const el = document.createElement("div");

    el.style.position = "absolute";
    el.style.left = element.x + "px";
    el.style.top = element.y + "px";
    el.style.fontSize = element.fontSize + "px";
    el.style.color = element.color;

    el.style.cursor = "pointer";

    el.innerText = element.content;


    // تحديد العنصر
    el.addEventListener("click", () => {

        selectElement(element);

    });


    canvas.appendChild(el);

}
// =========================
// سحب العنصر
// =========================

let isDragging = false;

let offsetX = 0;

let offsetY = 0;


el.addEventListener("mousedown", (e) => {

    isDragging = true;

    offsetX = e.offsetX;

    offsetY = e.offsetY;

});


document.addEventListener("mousemove", (e) => {

    if (!isDragging) return;


    const rect = canvas.getBoundingClientRect();


    element.x = e.clientX - rect.left - offsetX;

    element.y = e.clientY - rect.top - offsetY;


    el.style.left = element.x + "px";

    el.style.top = element.y + "px";

});


document.addEventListener("mouseup", () => {

    if (isDragging) {

        isDragging = false;

        updateDesign({
            elements: getCurrentDesign().elements
        });

    }

});

// =========================
// تحديد العنصر
// =========================

function selectElement(element) {

    const panel = document.getElementById("propertiesPanel");

    if (!panel) return;


    panel.innerHTML = `

        <h4>النص</h4>

        <p>${element.content}</p>

        <p>الحجم: ${element.fontSize}px</p>

        <p>اللون: ${element.color}</p>

    `;

}
// =========================
// Text Tool
// =========================

export function createText() {

    const textElement = {

        id: crypto.randomUUID(),

        type: "text",

        content: "نص جديد",

        x: 100,

        y: 100,

        fontSize: 32,

        color: "#000000"

    };


    addElement(textElement);

    renderElement(textElement);

}
// زر إضافة النص

const textTool = document.getElementById("textTool");

if (textTool) {

    textTool.addEventListener("click", () => {

        createText();

    });

}
