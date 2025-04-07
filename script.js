document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.getElementById('project-list');

    // Choose the correct endpoint based on your backend
    const apiUrl = 'http://localhost:3000/projects'; // Node.js
    //const apiUrl = 'get_projects.php'; // PHP (if running on a web server)

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(projects => {
            projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');

                projectDiv.innerHTML = `
                    <h3>${project.title}</h3>
                    <img src="${project.image_url}" alt="${project.title}">
                    <p>${project.description}</p>
                    <p>Technologies: ${project.technologies}</p>
                    ${project.live_url ? `<p><a href="${project.live_url}" target="_blank">Live Demo</a></p>` : ''}
                    ${project.github_url ? `<p><a href="${project.github_url}" target="_blank">GitHub</a></p>` : ''}
                    <p>Completed: ${project.date_completed}</p>
                `;

                projectList.appendChild(projectDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            projectList.innerHTML = '<p>Error loading projects.</p>';
        });
});
