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


