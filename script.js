// ==================== INITIALIZE AOS ====================
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60
    });

    // ==================== NAVBAR ====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);

    // Mobile toggle
    navToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    var sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        var scrollY = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-link[href="#' + id + '"]');
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach(function (l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // ==================== BACK TO TOP ====================
    var backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== SMOOTH SCROLL FOR ALL ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== STAR RATING ====================
    var starRating = document.getElementById('starRating');
    var ratingInput = document.getElementById('reviewRating');
    if (starRating) {
        var stars = starRating.querySelectorAll('i');
        // Set default to 5 stars
        stars.forEach(function (s) { s.classList.add('active'); });

        stars.forEach(function (star) {
            star.addEventListener('click', function () {
                var rating = parseInt(this.getAttribute('data-rating'));
                ratingInput.value = rating;
                stars.forEach(function (s, i) {
                    s.classList.toggle('active', i < rating);
                });
            });

            star.addEventListener('mouseenter', function () {
                var rating = parseInt(this.getAttribute('data-rating'));
                stars.forEach(function (s, i) {
                    s.classList.toggle('active', i < rating);
                });
            });

            star.addEventListener('mouseleave', function () {
                var current = parseInt(ratingInput.value);
                stars.forEach(function (s, i) {
                    s.classList.toggle('active', i < current);
                });
            });
        });
    }

    // ==================== REVIEW FORM SUBMISSION ====================
    var reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = document.getElementById('reviewName').value.trim();
            var condition = document.getElementById('reviewCondition').value.trim();
            var rating = document.getElementById('reviewRating').value;
            var text = document.getElementById('reviewText').value.trim();

            if (!name || !condition || !text) return;

            var ratingStars = '';
            for (var i = 0; i < parseInt(rating); i++) ratingStars += '⭐';

            var message = '📝 *New Patient Review*\n\n'
                + '👤 *Name:* ' + name + '\n'
                + '🏥 *Treatment:* ' + condition + '\n'
                + ratingStars + ' *Rating:* ' + rating + '/5\n\n'
                + '💬 *Review:*\n' + text;

            var encoded = encodeURIComponent(message);
            window.open('https://wa.me/923468918745?text=' + encoded, '_blank');
            reviewForm.reset();
            // Reset stars to 5
            ratingInput.value = 5;
            stars.forEach(function (s) { s.classList.add('active'); });
        });
    }
});
