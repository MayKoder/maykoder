// skills.js - Handles loading and displaying skills from skills.json

document.addEventListener('DOMContentLoaded', function() {
    // Fetch skills data from skills.json
    fetch('img/skills.json')
        .then(response => response.json())
        .then(data => {
            // Initialize the skills grid and table
            initSkillsGrid(data.skills);
            initSkillsTable(data.tableSkills);
        })
        .catch(error => {
            console.error('Error loading skills data:', error);
            document.getElementById('skills-grid').innerHTML = '<div class="col-12 text-center"><p>Failed to load skills data.</p></div>';
            document.getElementById('skills-table').innerHTML = '<p>Failed to load skills data.</p>';
        });
});

/**
 * Initialize the skills grid with SVG icons
 * @param {Array} skills - Array of skill objects from skills.json
 */
function initSkillsGrid(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    
    // Clear loading spinner
    skillsGrid.innerHTML = '';
    
    // Create grid items for each skill (4 columns)
    skills.forEach((skill, index) => {
        const delay = (index % 4) * 50 + 50; // Stagger animation delays
        
        const skillItem = document.createElement('div');
        skillItem.className = 'col-6 col-md-3 text-center mb-4';
        skillItem.setAttribute('data-aos', 'fade-up');
        skillItem.setAttribute('data-aos-delay', delay.toString());
        
        // Add years of experience if available
        const yearsText = skill.years ? `<span class="skill-years">${skill.years}+ years</span>` : '';
        
        skillItem.innerHTML = `
            <div class="skill-icon-container">
                <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
                <p>${skill.name}</p>
                ${yearsText}
            </div>
        `;
        
        skillsGrid.appendChild(skillItem);
    });
}

/**
 * Initialize the skills table
 * @param {Array} tableData - Array of skill category objects for the table
 */
function initSkillsTable(tableData) {
    const table = document.getElementById('skills-table');
    
    // Set table style explicitly
    table.style.backgroundColor = 'var(--secondary-color)';
    
    // Create table header
    const thead = table.querySelector('thead');
    let headerRow = '<tr>';
    tableData.forEach(category => {
        headerRow += `<th style="background-color: var(--primary-color); color: white; text-align: center;">${category.name}</th>`;
    });
    headerRow += '</tr>';
    thead.innerHTML = headerRow;
    
    // Create table body
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Find maximum number of skills in any category
    const maxRows = Math.max(...tableData.map(category => category.data.length));
    
    // Create rows for each skill
    for (let i = 0; i < maxRows; i++) {
        let row = document.createElement('tr');
        
        tableData.forEach(category => {
            const cell = document.createElement('td');
            cell.style.backgroundColor = 'var(--secondary-color)';
            cell.style.color = 'var(--dark-color)';
            
            if (i < category.data.length) {
                cell.textContent = category.data[i];
            } else {
                cell.innerHTML = '&nbsp;'; // Empty cell
            }
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    }
} 