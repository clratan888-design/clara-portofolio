document.addEventListener('DOMContentLoaded', () => {
    // --- PARTICLE ANIMATION ON HERO CANVAS ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particlesArray;
        const particleColor = '#f1d4faff';
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x; this.y = y;
                this.directionX = directionX; this.directionY = directionY;
                this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }
        init();
        animate();
    }
    
    // --- SCROLL PROGRESS BAR ---
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const updateProgressBar = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        };
        window.addEventListener('scroll', updateProgressBar);
    }

    // --- STICKY NAVIGATION ---
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });
    }

    // --- MOBILE NAVIGATION ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

    // --- STAGGERED ANIMATIONS ---
    const revealParents = document.querySelectorAll('.reveal-parent');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealParents.forEach(parent => {
        const children = parent.querySelectorAll('.reveal-child');
        children.forEach((child, index) => {
            child.style.setProperty('--delay', `${index * 150}ms`);
        });
        observer.observe(parent);
    });
});

// === LOGIKA UNTUK ANIMASI GARIS TIMELINE ===
document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.querySelector('.timeline-progress');

    if (timeline && timelineProgress) {
        const firstIcon = document.querySelector('.timeline-icon');
        const lastItem = document.querySelector('.timeline-item:last-child');

        // Fungsi untuk mengupdate tinggi garis
        const updateLineHeight = () => {
            // Jarak scroll dari atas halaman
            const scrollTop = window.scrollY;
            // Jarak section timeline dari atas halaman
            const timelineTop = timeline.offsetTop;
            // Tinggi total dari section timeline
            const timelineHeight = lastItem.offsetTop + lastItem.offsetHeight - firstIcon.offsetTop;
            // Tinggi viewport (layar)
            const viewportHeight = window.innerHeight;

            // Hitung seberapa jauh user telah scroll di dalam section timeline
            let scrollPercent = (scrollTop - timelineTop + viewportHeight / 2) / timelineHeight;
            
            // Batasi persentase antara 0 dan 1
            scrollPercent = Math.max(0, Math.min(1, scrollPercent));
            
            // Atur tinggi garis progres berdasarkan persentase scroll
            const newHeight = scrollPercent * timelineHeight;
            timelineProgress.style.height = `${newHeight}px`;
        };
        
        // Panggil fungsi saat scroll
        window.addEventListener('scroll', updateLineHeight);
        // Panggil sekali saat load untuk inisialisasi
        updateLineHeight();
    }
});

////add
// Cek apakah elemen canvas ada sebelum menjalankan animasi
const particleCanvas = document.getElementById('particle-canvas');

if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let width, height;
    let sakuraParticles = [];
    const TOTAL_SAKURA = 25; // Jumlah bunga sakura yang jatuh, bisa diubah

    // Objek untuk satu partikel bunga sakura
    class Sakura {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height * 2 - height; // Mulai dari atas layar
            this.w = 20 + Math.random() * 15; // Lebar/ukuran
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 35;
            this.xSpeed = 1 + Math.random(); // Kecepatan gerak horizontal
            this.ySpeed = 1 + Math.random() * 0.5; // Kecepatan jatuh
            this.flip = Math.random();
            this.flipSpeed = Math.random() * 0.03;
        }

        draw() {
            if (this.y > height || this.x > width) {
                // Reset posisi jika sudah keluar layar
                this.x = -this.w;
                this.y = Math.random() * height * 2 - height;
                this.xSpeed = 1 + Math.random();
                this.ySpeed = 1 + Math.random() * 0.5;
                this.flip = Math.random();
            }
            
            ctx.globalAlpha = this.opacity;
            ctx.save();
            ctx.translate(this.x, this.y);
            // Membuat efek berputar saat jatuh
            ctx.scale(0.3 + Math.sin(this.flip) * 0.7, Math.cos(this.flip));
            ctx.font = `${this.w}px serif`;
            ctx.fillText('🌸', 0, 0); // Menggunakan emoji bunga sakura
            ctx.restore();
        }

        animate() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }
    }

    function init() {
        // Mengatur ukuran canvas sesuai jendela browser
        width = particleCanvas.width = window.innerWidth;
        height = particleCanvas.height = window.innerHeight;
        
        // Membuat partikel bunga sakura
        sakuraParticles = [];
        for (let i = 0; i < TOTAL_SAKURA; i++) {
            sakuraParticles.push(new Sakura());
        }
        
        render();
    }

    function render() {
        // Membersihkan canvas sebelum menggambar frame baru
        ctx.clearRect(0, 0, width, height);
        
        // Menganimasikan setiap partikel
        sakuraParticles.forEach(particle => {
            particle.animate();
        });
        
        // Melakukan loop animasi
        window.requestAnimationFrame(render);
    }

    // Panggil fungsi init saat halaman dimuat
    window.addEventListener('load', init);
    // Atur ulang canvas jika ukuran jendela berubah
    window.addEventListener('resize', init);
}