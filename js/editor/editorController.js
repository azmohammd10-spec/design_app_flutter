// =========================
// Editor Controller
// =========================

import { getCurrentDesign, updateDesign, addElement } from "../modules/design/designService.js";

// عناصر الصفحة (سنربطها لاحقًا في editor.html)
let canvas = null;

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

    el.innerText = element.content;

    canvas.appendChild(el);

}
