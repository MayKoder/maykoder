// Function to load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('img/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayFeaturedProjects(data.top);
        displayAllProjects(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('featured-projects').innerHTML = `<div class="col-12 text-center"><p>Error loading projects. Please try again later.</p></div>`;
        document.getElementById('all-projects').innerHTML = `<div class="col-12 text-center"><p>Error loading projects. Please try again later.</p></div>`;
    }
}

// Function to display featured projects
function displayFeaturedProjects(projects) {
    const featuredProjectsContainer = document.getElementById('featured-projects');
    
    if (!projects || projects.length === 0) {
        featuredProjectsContainer.innerHTML = `<div class="col-12 text-center"><p>No featured projects available.</p></div>`;
        return;
    }
    
    let projectsHTML = '';
    
    projects.forEach(project => {
        // Extract technology tags from description if available
        const techTags = extractTechTags(project.desc);
        
        projectsHTML += `
        <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-duration="500">
            <div class="card project-card h-100">
                <div class="project-image">
                    <img src="${project.background.replace('assets/project-media/', 'img/')}" class="card-img-top" alt="${project.name || 'Featured Project'}">
                    <div class="overlay">
                        <div class="overlay-content">
                            <a href="${project.link}" target="_blank" class="btn btn-light btn-sm"><i class="bi bi-link-45deg"></i> Visit Project</a>
                            ${project.link.includes('github') ? `<a href="${project.link}" target="_blank" class="btn btn-light btn-sm"><i class="bi bi-github"></i> Source Code</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${project.name || 'Ashes of the Empire'}</h5>
                    <p class="card-text">${formatDescription(project.desc)}</p>
                    <div class="tech-stack">
                        ${techTags}
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    
    featuredProjectsContainer.innerHTML = projectsHTML;
}

// Function to display all projects
function displayAllProjects(projects) {
    const allProjectsContainer = document.getElementById('all-projects');
    
    if (!projects || projects.length === 0) {
        allProjectsContainer.innerHTML = `<div class="col-12 text-center"><p>No projects available.</p></div>`;
        return;
    }
    
    let projectsHTML = '';
    
    projects.forEach((project, index) => {
        // Extract technology tags from description if available
        const techTags = extractTechTags(project.desc);
        
        projectsHTML += `
        <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-duration="500" data-aos-delay="${index % 3 * 100}">
            <div class="card project-card h-100">
                <div class="project-image">
                    <img src="${project.background.replace('assets/project-media/', 'img/')}" class="card-img-top" alt="${project.name}">
                    <div class="overlay">
                        <div class="overlay-content">
                            <a href="${project.link}" target="_blank" class="btn btn-light btn-sm"><i class="bi bi-link-45deg"></i> Visit Project</a>
                            ${project.link.includes('github') ? `<a href="${project.link}" target="_blank" class="btn btn-light btn-sm"><i class="bi bi-github"></i> Source Code</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${project.name}</h5>
                    <p class="card-text">${formatDescription(project.desc)}</p>
                    <div class="tech-stack">
                        ${techTags}
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    
    allProjectsContainer.innerHTML = projectsHTML;
}

// Function to extract tech tags from description
function extractTechTags(description) {
    if (!description) return '';
    
    const techKeywords = [
        'C++', 'OpenGL', 'C#', 'SDL2', 'Unity', 'MonoRuntime', 'GLSL', 'HLSL', 
        'AI', 'Physics', 'Bullet', 'Quaternion', 'CNN', 'ONNX', 'SDL', 'Neural Network',
        'Flutter', 'Dart', 'Matlab', 'Verlet'
    ];
    
    const foundTech = [];
    
    techKeywords.forEach(tech => {
        if (description.includes(tech)) {
            foundTech.push(tech);
        }
    });
    
    // If we couldn't find any tech, add some default ones
    if (foundTech.length === 0 && description.includes('Role:')) {
        foundTech.push('Game Dev');
    }
    
    return foundTech.map(tech => `<span class="badge bg-primary">${tech}</span>`).join(' ');
}

// Function to format the description
function formatDescription(description) {
    if (!description) return 'No description available.';
    
    // Remove HTML tags for safety
    const descWithoutTags = description.replace(/<br>/g, ' ').replace(/<\/br>/g, ' ').replace(/<br\/>/g, ' ');
    
    // Extract the main description (before the role)
    const mainDesc = descWithoutTags.split('Role:')[0].trim();
    
    // If description is short, return it all
    if (mainDesc.length < 100) return descWithoutTags;
    
    // Otherwise, return a truncated version
    return mainDesc.substring(0, 120) + '...';
}

// Load projects when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadProjects); 