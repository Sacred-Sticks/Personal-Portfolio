document.addEventListener("DOMContentLoaded", function () {
    const highlightedProjectsRoot = document.getElementById("Highlighted-Projects");
    
    fetch("https://raw.githubusercontent.com/Sacred-Sticks/sacred-sticks.github.io/main/Scripts/HighlightedProjects.json")
        .then(response => response.json())
        .then(projects => 
            projects.forEach(project => AddProject(highlightedProjectsRoot, project)));
});

function AddProject(rootElement, project) {
    const container = document.createElement("div");
    const card = document.createElement("div");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const body = document.createElement("div");
    const title = document.createElement("h5");
    const description = document.createElement("p");

    container.classList.add("col-lg-4", "col-md-6");

    card.classList.add("card", "bg-secondary", "m-2");

    link.href = "#";

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
