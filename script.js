function toggleMenu() {
    const nav = document.getElementById("nav-links");
    const burger = document.querySelector(".hamburger");
    nav.classList.toggle("active");
    burger.classList.toggle("active");
    burger.setAttribute("aria-expanded", nav.classList.contains("active"));
}

document.querySelectorAll('#nav-links > li > a[href="#"]').forEach(link => {
    link.classList.add("toggle-submenu");
    link.addEventListener("click", (e) => {
        if (window.matchMedia("(max-width: 768px)").matches) {
            e.preventDefault();
            const submenu = link.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle("active");
                link.classList.toggle("active");
            }
        }
    });
});

function setupFilterableCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const search = document.querySelector("[data-search]");
    const filter = document.querySelector("[data-filter]");
    const sort = document.querySelector("[data-sort]");
    const cards = Array.from(container.querySelectorAll("[data-card]"));

    function applyControls() {
        const query = (search?.value || "").trim().toLowerCase();
        const selected = filter?.value || "all";
        const sorted = [...cards].sort((a, b) => {
            const sortBy = sort?.value || "title";
            return (a.dataset[sortBy] || a.dataset.title || "").localeCompare(b.dataset[sortBy] || b.dataset.title || "");
        });

        sorted.forEach(card => container.appendChild(card));

        cards.forEach(card => {
            const searchable = card.textContent.toLowerCase();
            const matchesSearch = !query || searchable.includes(query);
            const matchesFilter = selected === "all" || card.dataset.category === selected || card.dataset.franchise === selected;
            card.hidden = !(matchesSearch && matchesFilter);
        });
    }

    [search, filter, sort].forEach(control => control?.addEventListener("input", applyControls));
    applyControls();
}

setupFilterableCards("character-list");
setupFilterableCards("project-list");

