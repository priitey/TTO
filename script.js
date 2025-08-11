document.addEventListener('DOMContentLoaded', function (event) {
    const title = document.getElementById('title');
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
        const timeStr = timeStrRaw.replace(/:/g, ' - ');

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
    const fullTxt = "TTO BY LUCAS SAKELL & MATT PAPALEO";
    const shortTxt = "TTO";
    let animationTimeout;
    title.textContent = shortTxt;
    function typeWriter(text, i, isDeleting) {
        clearTimeout(animationTimeout);

        title.textContent = text.substring(0, i);

        if (isDeleting) {
            if (i > shortTxt.length) {
                animationTimeout = setTimeout(() => {
                    typeWriter(text, i -1, true);
                }, 30);
            }
        } else {
            if (i < text.length) {
                animationTimeout = setTimeout(() => {
                    typeWriter(text, i + 1, false);
                }, 50);
            }
        }
    }
    title.addEventListener('pointerenter', (event) => {
        typeWriter(fullTxt, title.textContent.length + 1, false);
    });
    title.addEventListener('pointerleave', (event) => {
        typeWriter(fullTxt, title.textContent.length - 1, true);
    });
});