document.addEventListener('DOMContentLoaded', function () {
    const tto = document.getElementById('tto');
    const about = document.getElementById('about');
    const aboutCnt = document.querySelectorAll('.about-content');
    const contact = document.getElementById('contact');
    const contactCnt = document.querySelectorAll('.contact-content');
    const title = document.getElementById('title');

    const slideshow = document.getElementById('slideshow');
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;

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
    }

    tto.addEventListener('click', () => toggleContent([slideshow], false));
    about.addEventListener('click', () => toggleContent(aboutCnt, true));
    contact.addEventListener('click', () => toggleContent(contactCnt, true));
    title.addEventListener('click', () => toggleContent([slideshow], false));

    // --- Title hover animation logic ---
    if (isMobile) {
        title.textContent = "BY LUCAS SAKELL & MATT PAPALEO";
    }

    // TIME & FAMILY LOGIC HERE
    const family = document.getElementById('family');
    const dateTimeElement = document.getElementById('date-time');
    function updateDateTime() {
        const now = new Date();
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Australia/Sydney'
        };
        dateTimeElement.innerHTML = now.toLocaleTimeString('en-AU', timeOptions);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
    dateTimeElement.addEventListener('click', function () {
        const displayStyle = window.getComputedStyle(family).display;
        if (displayStyle === 'none') {
            document.documentElement.style.setProperty('--fg', '#ffffff');
            family.style.display = 'block';
        } else {
            document.documentElement.style.setProperty('--fg', '#000000');
            family.style.display = 'none';
        }
    });
});