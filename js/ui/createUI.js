// =========================
// Create UI
// =========================
import { createDesign } from "../modules/design/designService.js";
const grid = document.getElementById("designTypesGrid");

// تحميل أنواع التصاميم
async function loadDesignTypes() {

    try {

        const response = await fetch("../data/designTypes.json");

        const types = await response.json();

        renderTypes(types);

    } catch (error) {

        console.error("Failed to load design types:", error);

    }

}

// عرض البطاقات
function renderTypes(types) {

    grid.innerHTML = "";

    types.forEach(type => {

        const card = document.createElement("div");

        card.className = "design-card";

        card.innerHTML = `
            <div class="icon">🎨</div>
            <h3>${type.name}</h3>
            <p>${type.width} × ${type.height}</p>
        `;

        card.addEventListener("click", () => {

    // إنشاء التصميم
    createDesign(type);

    // فتح المحرر
    window.location.href = "editor.html";

});

        grid.appendChild(card);

    });

}

loadDesignTypes();
