document.addEventListener('DOMContentLoaded', function () {
    const title = document.getElementById('title');
    const family = document.getElementById('family');
    const dateTimeElement = document.getElementById('date-time');

    // Live AEST time display
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
            timeZone: 'Australia/Sydney'
        };
        
        const dateStr = now.toLocaleDateString('en-AU', dateOptions);
        const timeStr = now.toLocaleTimeString('en-AU', timeOptions);
        
        dateTimeElement.innerHTML = `${dateStr}<br>${timeStr}`;
    }

    // Update time immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    title.addEventListener('click', function() {
        const displayStyle = window.getComputedStyle(family).display;
        if (displayStyle === 'none') {
            document.documentElement.style.setProperty('--fg', '#ffffff');
            family.style.display = 'block';
        } else {
            document.documentElement.style.setProperty('--fg', '#000000');
            family.style.display = 'none';
        }
    });

    title.addEventListener('mouseenter', function() {
        this.style.animation = 'typing 3.5s steps(150, end) forwards';
    });

    title.addEventListener('mouseleave', function() {
        this.style.animation = 'deleting 3.5s steps(150, end) forwards';
    });
});