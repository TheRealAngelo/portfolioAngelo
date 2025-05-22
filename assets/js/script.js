document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-mode');
    const body = document.body;
    // Load mode from localStorage
    if (localStorage.getItem('mode') === 'dark') {
        body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.textContent = '☀️';
    } else {
        if (toggleBtn) toggleBtn.textContent = '🌙';
    }
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                toggleBtn.textContent = '☀️';
                localStorage.setItem('mode', 'dark');
            } else {
                toggleBtn.textContent = '🌙';
                localStorage.setItem('mode', 'light');
            }
        });
    }

    // Mouse spotlight effect for dark mode
    const spotlight = document.getElementById('spotlight-cursor');
    document.addEventListener('mousemove', function(e) {
        if (body.classList.contains('dark-mode')) {
            spotlight.style.left = e.clientX + 'px';
            spotlight.style.top = e.clientY + 'px';
        }
    });
});