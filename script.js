function toggleMenu() {
    const nav = document.getElementById("nav-links");
    const burger = document.querySelector(".hamburger");
    nav.classList.toggle("active");
    burger.classList.toggle("active");
}

// Submenu toggles
document.querySelectorAll('#nav-links > li > a[href="#"]').forEach(link => {
    link.classList.add("toggle-submenu"); // add arrow

    link.addEventListener("click", (e) => {
        e.preventDefault(); // prevent # jump
        const submenu = link.nextElementSibling;

        if (submenu) {
            submenu.classList.toggle("active");
            link.classList.toggle("active");
        }
    });
});