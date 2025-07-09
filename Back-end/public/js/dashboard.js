document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const cardGlow = document.querySelectorAll('.more-links');

    function changePage(pageId) {
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');

        cardGlow.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
            if (document.querySelector('.sidebar')?.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    cardGlow.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
            if (document.querySelector('.sidebar')?.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    // ✅ Detectar el hash inicial (#pedido, #dashboard, etc.)
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
        changePage(initialHash);
    } else {
        changePage('dashboard'); // por defecto
    }

    window.toggleSidebar = function() {
        document.querySelector('.sidebar')?.classList.toggle('active');
        document.querySelector('.hamburger')?.classList.toggle('active');
    };
});
