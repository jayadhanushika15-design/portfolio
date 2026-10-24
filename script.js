
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const sections = document.querySelectorAll("main > section");

const navigationLinks = document.querySelectorAll(
    ".nav-links a, .logo"
);

const sectionButtons = document.querySelectorAll("[data-section]");

const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");

// Display the current year.
year.textContent = new Date().getFullYear();

// Display one section at a time.
function showSection(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (!targetSection || !targetSection.matches("main > section")) {
        return;
    }

    sections.forEach(function (section) {
        section.classList.remove("active");
    });

    targetSection.classList.add("active");

    // Highlight the selected navigation link.
    navigationLinks.forEach(function (link) {
        const selected =
            link.getAttribute("href") === "#" + sectionId;

        link.classList.toggle("selected", selected);

        if (selected) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    // Close the mobile menu after navigation.
    navLinks.classList.remove("open");

    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    // Update the URL without a scrolling jump.
    history.replaceState(null, "", "#" + sectionId);
}

// Handle navigation links.
navigationLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const sectionId = link.getAttribute("href").slice(1);

        showSection(sectionId);
    });
});

// Handle buttons that navigate to other sections.
sectionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        showSection(button.dataset.section);
    });
});

// Toggle the mobile navigation menu.
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Contact form demonstration.
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const status = document.getElementById("formStatus");

    if (!name) {
        status.textContent = "Please enter your name.";
        return;
    }

    status.textContent =
        "Thank you, " + name +
        "! The form is working, but message delivery has not been configured.";

    contactForm.reset();
});

// Display the requested section on initial page load.
const hashSection = window.location.hash.slice(1);

const validSection = Array.from(sections).some(function (section) {
    return section.id === hashSection;
});

showSection(validSection ? hashSection : "home");