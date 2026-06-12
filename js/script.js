loadComponent("header", "../components/header.html");




async function loadComponent(selector, path) {

    const response = await fetch(path);
    const html = await response.text();
    const element = document.querySelector(selector);
    element.innerHTML = html;
    
}