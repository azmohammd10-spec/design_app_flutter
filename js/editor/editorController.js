// =========================
// Editor Controller
// =========================

import {
    getCurrentDesign,
    updateDesign,
    addElement
} from "../modules/design/designService.js";
import {
    createRectangle,
    createCircle
} from "./tools/shapeTool.js";
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
const imageTool = document.getElementById("imageTool");

const imageInput = document.getElementById("imageInput");
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
// رسم الصور

if(element.type === "image"){

    const img = document.createElement("img");

    img.src = element.src;

    img.style.position = "absolute";

    img.style.left = element.x + "px";

    img.style.top = element.y + "px";

    img.style.width = element.width + "px";

    img.style.height = element.height + "px";

    img.style.objectFit = "cover";

    img.style.cursor = "pointer";


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

// =========================
// خصائص الشكل
// =========================

if(element.type === "shape"){

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


        <label>
            العرض
        </label>

        <input
            id="shapeWidth"
            type="number"
            value="${element.width}"
        >


        <label>
            الارتفاع
        </label>

        <input
            id="shapeHeight"
            type="number"
            value="${element.height}"
        >

    `;


    document
    .getElementById("shapeColor")
    .addEventListener("input",(e)=>{

        element.background = e.target.value;

        renderCanvas(getCurrentDesign());

    });


    document
    .getElementById("shapeWidth")
    .addEventListener("input",(e)=>{

        element.width = Number(e.target.value);

        renderCanvas(getCurrentDesign());

    });


    document
    .getElementById("shapeHeight")
    .addEventListener("input",(e)=>{

        element.height = Number(e.target.value);

        renderCanvas(getCurrentDesign());

    });

}
    // تغيير النص

    document
    .getElementById("textContentInput")
    .addEventListener("input", (e)=>{

        element.content = e.target.value;

        renderCanvas(getCurrentDesign());

    });



    // تغيير الحجم

    document
    .getElementById("fontSizeInput")
    .addEventListener("input",(e)=>{

        element.fontSize = Number(e.target.value);

        renderCanvas(getCurrentDesign());

    });



    // تغيير اللون

    document
    .getElementById("colorInput")
    .addEventListener("input",(e)=>{

        element.color = e.target.value;

        renderCanvas(getCurrentDesign());

    });


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
// =========================
// Image Tool
// =========================

if(imageTool){

    imageTool.addEventListener("click",()=>{

        imageInput.click();

    });

}


if(imageInput){

    imageInput.addEventListener("change",(e)=>{


        const file = e.target.files[0];


        if(!file) return;


        const reader = new FileReader();


        reader.onload = ()=>{


            const imageElement = {

                id: crypto.randomUUID(),

                type:"image",

                src: reader.result,

                x:100,

                y:100,

                width:300,

                height:300

            };


            addElement(imageElement);


            renderElement(imageElement);


        };


        reader.readAsDataURL(file);


    });

}
