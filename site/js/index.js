const spotlight = document.getElementById("spotlight");
const headline = document.getElementById("headline-text");

const fitHeadline = () => {
    if (!headline) {
        return;
    }

    headline.style.fontSize = "";

    const minSize = 12;
    let fontSize = parseFloat(getComputedStyle(headline).fontSize);

    while (headline.scrollWidth > headline.clientWidth && fontSize > minSize) {
        fontSize = Math.max(minSize, fontSize - 0.25);
        headline.style.fontSize = `${fontSize}px`;
    }
};

document.addEventListener("mousemove", (event) => {
    if (!spotlight) {
        return;
    }

    spotlight.style.setProperty("--mx", `${event.clientX}px`);
    spotlight.style.setProperty("--my", `${event.clientY}px`);
});

fitHeadline();
window.addEventListener("load", fitHeadline);
window.addEventListener("resize", fitHeadline);
