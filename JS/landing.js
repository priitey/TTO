document.addEventListener('DOMContentLoaded', function (event) {
    const title = document.getElementById('title');
    const slideshow = document.getElementById('slideshow');
    const projects = document.querySelectorAll('.project-container');
    const family = document.getElementById('family');
    const dateTimeElement = document.getElementById('date-time');

    // TIME LOGIC HERE
    function updateDateTime() {
        const now = new Date();

        const dateOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Australia/Sydney'
        };

        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Australia/Sydney'
        };

        const dateStr = now.toLocaleDateString('en-AU', dateOptions);
        const timeStrRaw = now.toLocaleTimeString('en-AU', timeOptions);
        const timeStr = timeStrRaw.replace(/:/g, ' : ');

        dateTimeElement.innerHTML = `${timeStr}`;
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

    // TITLE LOGIC HERE
    // Toggle slideshow element
    title.addEventListener('click', (event) => {
        // Get the actual, final style of the element
        const computedStyle = window.getComputedStyle(slideshow);

        // Toggle the entire slideshow container based on the computed style
        if (computedStyle.display !== 'none') {
            slideshow.style.display = 'none';
            title.style.mixBlendMode = 'normal';
            title.style.color = 'var(--fg)';
        } else {
            slideshow.style.display = 'flex';
            title.style.mixBlendMode = 'difference';
            title.style.color = 'var(--bg)';
        }
    });
});