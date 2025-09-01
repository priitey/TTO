document.addEventListener('DOMContentLoaded', function () {
    const tto = document.getElementById('tto');
    const about = document.getElementById('about');
    const aboutCnt = document.querySelectorAll('.about-content');
    const contact = document.getElementById('contact');
    const contactCnt = document.querySelectorAll('.contact-content');
    const title = document.getElementById('title');

    const slideshow = document.getElementById('slideshow');
    const projectsContainer = document.getElementById('projects-container')
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    let slideshowPopped = false;

    // Group all content panes for easier management
    const allContent = [
        { trigger: tto, content: [slideshow] },
        { trigger: about, content: aboutCnt },
        { trigger: contact, content: contactCnt }
    ];

    function toggleContent(contentToShow, hideTitleOnVisible) {
        // Check if the content we're about to show is already visible
        const isAlreadyVisible = contentToShow.length > 0 && contentToShow[0].classList.contains('visible');

        // First, hide ALL content panes
        allContent.forEach(group => {
            group.content.forEach(element => element.classList.remove('visible'));
        });

        // If the clicked content was not already visible, show it.
        if (!isAlreadyVisible) {
            contentToShow.forEach(element => element.classList.add('visible'));
            // If the content we just made visible is the slideshow, apply special styles
            if (contentToShow[0] === slideshow) {
                title.style.color = "var(--bg)";
                title.style.mixBlendMode = "difference";
                if (!slideshowPopped) {
                    populate();
                    slideshowPopped = true;
                }
            }
        } else {
            title.style.color = "var(--fg)";
            title.style.mixBlendMode = "normal";
        }

        // Determine if any content is visible now
        const anyContentVisible = !isAlreadyVisible;

        // Hide the main title ONLY if the specific trigger requires it
        if (anyContentVisible && hideTitleOnVisible) {
            title.classList.add('hidden');
        } else {
            title.classList.remove('hidden');
        }

        // Add underlines to "tto" "about" & "contact" if their respective content is visible
        about.querySelector('p').style.textDecoration = aboutCnt[0].classList.contains('visible') ? 'underline' : 'none';
        contact.querySelector('p').style.textDecoration = contactCnt[0].classList.contains('visible') ? 'underline' : 'none';
        tto.querySelector('p').style.textDecoration = slideshow.classList.contains('visible') ? 'underline' : 'none';
    }
    tto.addEventListener('click', () => toggleContent([slideshow], false));
    about.addEventListener('click', () => toggleContent(aboutCnt, true));
    contact.addEventListener('click', () => toggleContent(contactCnt, true));
    title.addEventListener('click', () => toggleContent([slideshow], false));

    // ABOUT IMAGES ROTATION LOGIC HERE
    const lucas = document.getElementById('lucas');
    const matt = document.getElementById('matt');
    function rotateImage(img) {
        img.classList.toggle('is-rotated');
    }
    lucas.addEventListener('click', () => rotateImage(lucas));
    matt.addEventListener('click', () => rotateImage(matt));

    // TITLE HOVER ANIMATION LOGIC HERE
    if (isMobile) {
        title.textContent = "(WORKS BY LUCAS SAKELL & MATTHEW FRANCIS)";
    }

    // SLIDESHOW LOGIC HERE
    async function populate() {
        const requestPath =
            "ASSETS/projects.json";
        const request = new Request(requestPath);

        const response = await fetch(request);
        const projects = await response.json();

        populateSlideshow(projects);
    }
    function populateSlideshow(obj) {
        for (const projectKey in obj) {
            const projectData = obj[projectKey];

            projectData.images.forEach(imageData => {
                const projectImg = document.createElement("img");
                projectImg.className = "showcase-img";
                projectImg.src = imageData.path;
                projectImg.alt = imageData.alt;
                projectsContainer.appendChild(projectImg);
            });
        }
        startAutomaticSlideshow();
    }
    function startAutomaticSlideshow() {
        const images = projectsContainer.querySelectorAll('.showcase-img');
        if (images.length <= 1) return;

        let currentIndex = 0;
        images[currentIndex].classList.add('active-slide'); // Show the first image

        setInterval(() => {
            // Hide the current image
            images[currentIndex].classList.remove('active-slide');
            // Move to the next image, looping back to the start
            currentIndex = (currentIndex + 1) % images.length;
            // Show the new image
            images[currentIndex].classList.add('active-slide');
        }, 3000); // Change image every 3 seconds
    }

    // TIME & FAMILY LOGIC HERE
    const family = document.getElementById('family');
    const dateTimeElement = document.querySelector('#date-time p');
    // const dateTimeContainer = document.getElementById('date-time');
    function updateDateTime() {
        const now = new Date();
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Australia/Sydney'
        };
        dateTimeElement.textContent = now.toLocaleTimeString('en-AU', timeOptions);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
    dateTimeElement.addEventListener('click', function () {
        const familyIsVisible = window.getComputedStyle(family).display !== 'none';

        if (familyIsVisible) {
            document.documentElement.style.setProperty('--fg', '#000000');
            family.style.display = 'none';
        } else {
            const slideshowIsVisible = slideshow.classList.contains('visible');
            const aboutIsVisible = aboutCnt[0].classList.contains('visible');
            const contactIsVisible = contactCnt[0].classList.contains('visible');

            if (!slideshowIsVisible && !aboutIsVisible && !contactIsVisible) {
                document.documentElement.style.setProperty('--fg', '#ffffff');
                family.style.display = 'block';
            }
        }
    });
});