document.addEventListener("DOMContentLoaded", function () {
    const showcaseProjectsRoot = document.getElementById("Showcase-Projects");
    const professionalProjectsRoot = document.getElementById("Professional-Projects");
    const personalProjectsRoot = document.getElementById("Personal-Projects");
    const gameJamProjectsRoot = document.getElementById("Game-Jam-Projects");
    const classProjectsRoot = document.getElementById("Class-Work-Projects")

    fetch("https://raw.githubusercontent.com/Sacred-Sticks/Portfolio-Project-Lists/main/ShowcaseProjects.json")
        .then(response => response.json())
        .then(projects =>
            projects.forEach(project => AddProject(showcaseProjectsRoot, project)));
    fetch("https://raw.githubusercontent.com/Sacred-Sticks/Portfolio-Project-Lists/main/ProfessionalProjects.json")
        .then(response => response.json())
        .then(projects =>
            projects.forEach(project => AddProject(professionalProjectsRoot, project)));
    fetch("https://raw.githubusercontent.com/Sacred-Sticks/Portfolio-Project-Lists/main/PersonalProjects.json")
        .then(response => response.json())
        .then(projects =>
            projects.forEach(project => AddProject(personalProjectsRoot, project)));
    fetch("https://raw.githubusercontent.com/Sacred-Sticks/Portfolio-Project-Lists/main/GameJamProjects.json")
        .then(response => response.json())
        .then(projects =>
            projects.forEach(project => AddProject(gameJamProjectsRoot, project)));
    fetch("https://raw.githubusercontent.com/Sacred-Sticks/Portfolio-Project-Lists/main/ClassWorkProjects.json")
        .then(response => response.json())
        .then(projects =>
            projects.forEach(project => AddProject(classProjectsRoot, project)));
});

document.querySelectorAll('a[data-scroll-to]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-scroll-to');
        var target = document.querySelector(targetId);
        if (target) {
            var offset = target.getBoundingClientRect().top + 70; // Adjust the offset based on your navbar height
            window.scrollBy({
                top: offset,
                behavior: 'smooth'
            });
        }
    });
});

function AddProject(rootElement, project) {
    const container = document.createElement("div");
    const card = document.createElement("div");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const body = document.createElement("div");
    const title = document.createElement("h5");
    const description = document.createElement("p");

    container.classList.add("col-lg-4", "col-md-6", "text-primary", "mb-3");

    card.classList.add("card", "bg-secondary", "m-2", "d-md-block", "height-95");

    link.href = project.linkAddress;

    image.src = project.imageLocation;
    image.classList.add("card-img-top");
    image.alt = project.imageAlt;

    body.classList.add("card-body");

    title.classList.add("card-title");
    title.textContent = project.name;

    description.classList.add("card-text");
    description.textContent = project.description;

    rootElement.appendChild(container);
    container.appendChild(card);
    card.appendChild(link);
    link.appendChild(image);
    link.appendChild(body);
    body.appendChild(title);
    body.appendChild(description);
}
