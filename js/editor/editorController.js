// =========================
// Editor Controller
// =========================
import {
    getCurrentDesign,
    updateDesign,
    addElement
} from "../modules/design/designService.js";

import {
    createRectangle
} from "./tools/shapeTool.js";

// عناصر الصفحة (سنربطها لاحقًا في editor.html)
let canvas = null;
// تشغيل المحرر تلقائياً بعد تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {

    const canvasElement = document.getElementById("designCanvas");

    if (canvasElement) {

        initEditor(canvasElement);
     const imageTool = document.getElementById("imageTool");
const imageInput = document.getElementById("imageInput");
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

    // إعادة رسم جميع العناصر
    if (design.elements && design.elements.length) {
        design.elements.forEach(element => {
            renderElement(element);
        });
    }
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
// رسم الصور
if (element.type === "image") {

    panel.innerHTML = `

        <h4>خصائص الصورة</h4>

        <label>العرض</label>

        <input
            id="imageWidth"
            type="number"
            value="${element.width}"
        >

        <label>الارتفاع</label>

        <input
            id="imageHeight"
            type="number"
            value="${element.height}"
        >

    `;

    document
    .getElementById("imageWidth")
    .addEventListener("input", (e) => {

        element.width = Number(e.target.value);

        updateDesign({
            elements: getCurrentDesign().elements
        });

        renderCanvas(getCurrentDesign());

    });

    document
    .getElementById("imageHeight")
    .addEventListener("input", (e) => {

        element.height = Number(e.target.value);

        updateDesign({
            elements: getCurrentDesign().elements
        });

        renderCanvas(getCurrentDesign());

    });

    return;

}
// =========================
// سحب الصورة
// =========================

let dragging = false;

let startX = 0;

let startY = 0;

img.addEventListener("mousedown", startDrag);
img.addEventListener("touchstart", startDrag);

function startDrag(e){

    dragging = true;

    const point = e.touches ? e.touches[0] : e;

    startX = point.clientX - img.offsetLeft;
    startY = point.clientY - img.offsetTop;

}


document.addEventListener("mousemove", moveDrag);
document.addEventListener("touchmove", moveDrag);


function moveDrag(e){

    if(!dragging) return;

    const point = e.touches ? e.touches[0] : e;

    const rect = canvas.getBoundingClientRect();

    element.x = point.clientX - rect.left - startX;

    element.y = point.clientY - rect.top - startY;


    img.style.left = element.x + "px";

    img.style.top = element.y + "px";

}


document.addEventListener("mouseup", endDrag);
document.addEventListener("touchend", endDrag);


function endDrag(){

    if(dragging){

        dragging = false;

        updateDesign({

            elements:getCurrentDesign().elements

        });

    }

}



    img.addEventListener("click",()=>{

        selectElement(element);

    });


    canvas.appendChild(img);

    return;

}
    const el = document.createElement("div");

    el.style.position = "absolute";
    el.style.left = element.x + "px";
    el.style.top = element.y + "px";
    el.style.fontSize = element.fontSize + "px";
    el.style.color = element.color;

    el.style.cursor = "pointer";
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
    el.innerText = element.content;
// رسم الأشكال

if(element.type === "shape"){

    el.style.width = element.width + "px";

    el.style.height = element.height + "px";

    el.style.background = element.background;

    if(element.shapeType === "circle"){

        el.style.borderRadius = "50%";

    }

}

    // تحديد العنصر
    el.addEventListener("click", () => {

        selectElement(element);

    });


    canvas.appendChild(el);

}

// =========================
// تحديد العنصر
// =========================
function selectElement(element) {

    const panel = document.getElementById("propertiesPanel");

    if (!panel) return;



    // =========================
    // خصائص النص
    // =========================
    if (element.type === "text") {

        panel.innerHTML = `

            <h4>خصائص النص</h4>

            <label>
                النص
            </label>

            <input
                id="textContentInput"
                value="${element.content}"
            >


            <label>
                حجم الخط
            </label>

            <input
                id="fontSizeInput"
                type="number"
                value="${element.fontSize}"
            >


            <label>
                اللون
            </label>

            <input
                id="colorInput"
                type="color"
                value="${element.color}"
            >

        `;


        document
        .getElementById("textContentInput")
        .addEventListener("input",(e)=>{

            element.content = e.target.value;

            renderCanvas(getCurrentDesign());

        });


        document
        .getElementById("fontSizeInput")
        .addEventListener("input",(e)=>{

            element.fontSize = Number(e.target.value);

            renderCanvas(getCurrentDesign());

        });


        document
        .getElementById("colorInput")
        .addEventListener("input",(e)=>{

            element.color = e.target.value;

            renderCanvas(getCurrentDesign());

        });


    }


    // =========================
    // خصائص الشكل
    // =========================
    if (element.type === "shape") {

        panel.innerHTML = `

            <h4>خصائص الشكل</h4>

            <label>
                اللون
            </label>

            <input
                id="shapeColor"
                type="color"
                value="${element.background}"
            >

        `;


        document
        .getElementById("shapeColor")
        .addEventListener("input",(e)=>{

            element.background = e.target.value;

            renderCanvas(getCurrentDesign());

        });

    }

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
// =========================
// Shape Tool Buttons
// =========================

const shapeTool = document.getElementById("shapeTool");


if(shapeTool){

    shapeTool.addEventListener("click", ()=>{

        const shape = createRectangle();

        renderElement(shape);

    });

}
