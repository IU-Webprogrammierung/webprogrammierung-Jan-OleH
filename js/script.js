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
    const recipeMenuButton = document.querySelector(".recipe-menu-button");
    const recipeSubmenu = document.querySelector(".recipe-submenu");

    if (!burgerButton || !mainNavigation) {
        return;
    }

    if(burgerButton && mainNavigation) {

    burgerButton.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("is-open");

        burgerButton.classList.toggle("is-open", isOpen);
        burgerButton.setAttribute("aria-expanded", String(isOpen));
        burgerButton.setAttribute(
            "aria-label",
            isOpen
                ? "Hauptnavigation schließen"
                : "Hauptnavigation öffnen"
        );

        if(!isOpen && recipeMenuButton && recipeSubmenu) {
            recipeSubmenu.classList.remove("is-open");
            recipeMenuButton.setAttribute("aria-expanded", "false");
        }
        
    });
}

    if(recipeMenuButton && recipeSubmenu) {
        recipeMenuButton.addEventListener("click", () => {
            const isOpen = recipeSubmenu.classList.toggle("is-open");
            recipeMenuButton.setAttribute("aria-expanded", String(isOpen));
        });
    }
}

// Portionsrechner

function initializePortionCalculator() {
    const decreaseButton = document.querySelector(".decrease-portions");
    const increaseButton = document.querySelector(".increase-portions");
    const portionCount = document.querySelector("#portion-count");
    const ingredientAmounts = document.querySelectorAll(".ingredient-amount");

    if (
        !decreaseButton ||
        !increaseButton ||
        !portionCount ||
        ingredientAmounts.length === 0
    ) {
        return;
    }

    const basePortions = 2;
    let currentPortions = basePortions;

    function updateAmounts() {
        portionCount.textContent = String(currentPortions);

        ingredientAmounts.forEach((amountElement) => {
            const baseAmount = Number(amountElement.dataset.baseAmount);
            const calculatedAmount =
                baseAmount * (currentPortions / basePortions);

            amountElement.textContent = formatAmount(calculatedAmount);
        });

        decreaseButton.disabled = currentPortions <= 1;
    }

    increaseButton.addEventListener("click", () => {
        currentPortions += 1;
        updateAmounts();
    });

    decreaseButton.addEventListener("click", () => {
        if (currentPortions > 1) {
            currentPortions -= 1;
            updateAmounts();
        }
    });

    updateAmounts();
}

function formatAmount(amount) {
    return Number.isInteger(amount)
        ? String(amount)
        : amount.toFixed(1).replace(".", ",");
}

// Initialisierung

document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("header", "../components/header.html");
    await loadComponent("footer", "../components/footer.html");

    initializeNavigation();
    initializePortionCalculator();
});
