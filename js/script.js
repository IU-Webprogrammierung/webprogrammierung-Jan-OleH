loadComponent("header", "../components/header.html");
loadComponent("footer", "../components/footer.html");


//Komponenten laden

async function loadComponent(selector, path) {
    const element = document.querySelector(selector);

    if (!element) {
        return;
    }

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Komponente konnte nicht geladen werden: ${path}`);
        }

        element.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}


// Navigation initialisieren

function initializeNavigation() {
    const burgerButton = document.querySelector(".burger-button");
    const mainNavigation = document.querySelector(".main-navigation");

    if (!burgerButton || !mainNavigation) {
        return;
    }

    burgerButton.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("is-open");

        burgerButton.setAttribute("aria-expanded", String(isOpen));
        burgerButton.setAttribute(
            "aria-label",
            isOpen
                ? "Hauptnavigation schließen"
                : "Hauptnavigation öffnen"
        );

        burgerButton.classList.toggle("is-open", isOpen);
    });
}

// Initialisierung

document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("header", "../components/header.html");
    await loadComponent("footer", "../components/footer.html");

    initializeNavigation();
});
