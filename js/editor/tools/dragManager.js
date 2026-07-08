// js/editor/dragManager.js
import { updateDesign, getCurrentDesign } from "../modules/design/designService.js";

export function enableDrag(elementRef, elementData, canvasElement) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    const startDrag = (e) => {
        const point = e.touches ? e.touches[0] : e;
        const rect = canvasElement.getBoundingClientRect();
        offsetX = point.clientX - rect.left - elementData.x;
        offsetY = point.clientY - rect.top - elementData.y;
        isDragging = true;
        e.preventDefault();
        elementRef.style.cursor = "grabbing";
    };

    const moveDrag = (e) => {
        if (!isDragging) return;
        const point = e.touches ? e.touches[0] : e;
        const rect = canvasElement.getBoundingClientRect();
        elementData.x = Math.max(0, point.clientX - rect.left - offsetX);
        elementData.y = Math.max(0, point.clientY - rect.top - offsetY);
        elementRef.style.left = elementData.x + "px";
        elementRef.style.top = elementData.y + "px";
        e.preventDefault();
    };

    const endDrag = () => {
        if (isDragging) {
            isDragging = false;
            elementRef.style.cursor = "pointer";
            updateDesign({ elements: getCurrentDesign().elements });
        }
    };

    elementRef.addEventListener("mousedown", startDrag);
    elementRef.addEventListener("touchstart", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
}
