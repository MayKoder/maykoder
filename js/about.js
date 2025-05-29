// Function to load resume data from JSON file
async function loadResumeData() {
    try {
        const response = await fetch('img/resume.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading resume data:', error);
        return null;
    }
}

// Function to create experience timeline items
function createExperienceTimeline(experiences) {
    const timelineContainer = document.getElementById('experience-timeline');
    if (!timelineContainer || !experiences) return;
    
    // Clear placeholder content
    timelineContainer.innerHTML = '';
    
    // Add experience items
    experiences.forEach(experience => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h4>${experience.title}</h4>
                <h5>${experience.company}</h5>
                <p class="timeline-date">${experience.period}</p>
                <p>${experience.description}</p>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Function to create education timeline items
function createEducationTimeline(educations) {
    const timelineContainer = document.getElementById('education-timeline');
    if (!timelineContainer || !educations) return;
    
    // Clear placeholder content
    timelineContainer.innerHTML = '';
    
    // Add education items
    educations.forEach(education => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h4>${education.degree}</h4>
                <h5>${education.institution}</h5>
                <p class="timeline-date">${education.period}</p>
                <p>${education.description}</p>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Function to create language cards
function createLanguageCards(languages) {
    const languagesContainer = document.getElementById('languages-container');
    if (!languagesContainer || !languages) return;
    
    // Clear placeholder content
    languagesContainer.innerHTML = '';
    
    // Add language cards
    languages.forEach(language => {
        const languageCol = document.createElement('div');
        languageCol.className = 'col-md-4 mb-3';
        
        languageCol.innerHTML = `
            <div class="language-card">
                <h4>${language.name}</h4>
                <p class="language-level">${language.level}</p>
            </div>
        `;
        
        languagesContainer.appendChild(languageCol);
    });
}

// Function to create volunteering timeline items
function createVolunteeringTimeline(volunteerings) {
    const timelineContainer = document.getElementById('volunteering-timeline');
    if (!timelineContainer || !volunteerings) return;
    
    // Clear placeholder content
    timelineContainer.innerHTML = '';
    
    // Add volunteering items
    volunteerings.forEach(volunteering => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h4>${volunteering.role}</h4>
                <h5>${volunteering.organization}</h5>
                <p class="timeline-date">${volunteering.period}</p>
                <p>${volunteering.description}</p>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Initialize About section
document.addEventListener('DOMContentLoaded', async function() {
    // Load resume data
    const resumeData = await loadResumeData();
    
    if (resumeData) {
        // Create timeline elements
        createExperienceTimeline(resumeData.experience);
        createEducationTimeline(resumeData.education);
        createLanguageCards(resumeData.languages);
        createVolunteeringTimeline(resumeData.volunteering);
    } else {
        // Use placeholder data if JSON loading fails
        console.log('Using placeholder data for resume section');
    }
    
    // Apply animations to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', (index * 100).toString());
    });
    
    // Apply animations to language cards
    const languageCards = document.querySelectorAll('.language-card');
    languageCards.forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());
    });
    
    // Match heights of timeline content in side-by-side layout
    function matchTimelineHeights() {
        if (window.innerWidth >= 992) { // Only on desktop
            const experienceItems = document.querySelectorAll('#experience-timeline .timeline-content');
            const educationItems = document.querySelectorAll('#education-timeline .timeline-content');
            
            // Reset heights first
            experienceItems.forEach(item => item.style.height = 'auto');
            educationItems.forEach(item => item.style.height = 'auto');
            
            // Match heights for each pair (if both exist)
            const maxPairs = Math.min(experienceItems.length, educationItems.length);
            
            for (let i = 0; i < maxPairs; i++) {
                const expHeight = experienceItems[i].offsetHeight;
                const eduHeight = educationItems[i].offsetHeight;
                const maxHeight = Math.max(expHeight, eduHeight);
                
                experienceItems[i].style.height = `${maxHeight}px`;
                educationItems[i].style.height = `${maxHeight}px`;
            }
        } else {
            // Reset all heights on mobile
            document.querySelectorAll('.timeline-content').forEach(item => {
                item.style.height = 'auto';
            });
        }
    }
    
    // Run on load and resize
    window.addEventListener('resize', matchTimelineHeights);
    window.addEventListener('load', matchTimelineHeights);
    
    // Also run after a slight delay to ensure all content is properly rendered
    setTimeout(matchTimelineHeights, 500);
}); 