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
                title.style.textShadow = "-1px -1px 0 #000";
                if (!slideshowPopped) {
                    populate();
                    slideshowPopped = true;
                }
            }
        } else {
            title.style.color = "var(--fg)";
            title.style.mixBlendMode = "normal";
            title.style.textShadow = "none";
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
    const baseStr = "TTO";
    const fullStr = "TTO (WORKS BY LUCAS SAKELL & MATTHEW FRANCIS)";
    const mobStr = "(WORKS BY LUCAS SAKELL & MATTHEW FRANCIS)";
    if (title && isMobile) {
        title.textContent = mobStr;
    } else if (title && !isMobile) {
        title.textContent = baseStr;
        const duration = 1100;
        let animationFrameId;

        const animateText = (targetStr) => {
            // Cancel any previous animation to prevent conflicts
            cancelAnimationFrame(animationFrameId);

            const startStr = title.textContent.replace('_', '');
            const startLength = startStr.length;
            const targetLength = targetStr.length;
            let startTime;

            const frame = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Calculate how many characters should be visible at this point in time
                const currentLength = Math.floor(startLength + (targetLength - startLength) * progress);
                let newText = fullStr.substring(0, currentLength);
                // Add the blinking cursor until the animation is complete
                if (progress < 1) {
                    newText += '_';
                }
                title.textContent = newText;
                // If the animation is not finished, request the next frame
                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(frame);
                }
            };
            animationFrameId = requestAnimationFrame(frame);
        };
        title.addEventListener('mouseover', () => animateText(fullStr));
        title.addEventListener('mouseout', () => animateText(baseStr));
    }

    // SLIDESHOW LOGIC HERE
    async function populate() {
        const requestPath = "ASSETS/projects.json";
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
        images[currentIndex].classList.add('active-slide');

        const nextSlide = () => {
            images[currentIndex].classList.remove('active-slide');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active-slide');
            // Check the type of the new image and set the interval accordingly
            const isImgGif = images[currentIndex].src.toLowerCase().includes('.gif');
            const intVal = isImgGif ? 3300 : 1000;
            // Schedule the next slide change
            setTimeout(nextSlide, intVal);
        };
        // Determine the interval for the first image
        const isFirstImgGif = images[currentIndex].src.toLowerCase().includes('.gif');
        const initialIntVal = isFirstImgGif ? 3300 : 1000;
        // Start the slideshow loop
        setTimeout(nextSlide, initialIntVal);
    }

    // TIME & FAMILY LOGIC HERE
    const family = document.getElementById('family');
    const dateTimeElement = document.querySelector('#date-time p');
    function updateDateTime() {
        const now = new Date();
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Australia/Sydney'
        };
        const rawStr = now.toLocaleTimeString('en-AU', timeOptions);
        const regex = /:/g;
        const edtStr = rawStr.replace(regex, "–");
        dateTimeElement.textContent = edtStr;
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