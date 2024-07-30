// Scroll nav bar e links
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.nav a, .secti');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                smoothScrollTo(targetSection.offsetTop - navHeight);
            }
        });
    });

    function smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500; // Tempo de duração da animação em milissegundos
        const increments = 20;
        let currentTime = 0;

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        function animateScroll() {
            currentTime += increments;
            const newPosition = easeInOutQuad(currentTime, startPosition, distance, duration);
            window.scrollTo(0, newPosition);

            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        animateScroll();
    }
});



// Adicionar classe a Nav ao scrollar
window.addEventListener('scroll', function () {
    var nav = document.querySelector('.nav');
    if (window.scrollY >= 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});



// Hamburguer Menu
document.addEventListener('DOMContentLoaded', function () {
    const hamburgers = document.querySelectorAll('.hamburger');
    const menu = document.querySelector('.menu');
    const galeriaExibition = document.querySelector(".galery-exibition");

    function toggleOverflowClass() {
        // Verifica se a largura da tela é maior que 768px e se a galeria não está ativa
        if (window.innerWidth > 768 && !galeriaExibition.classList.contains('visible')) {
            hamburgers.forEach(hamburger => {
                hamburger.classList.remove('active');
            });
            if (menu) {
                menu.classList.remove('active');
                document.documentElement.classList.remove('overflow-hidden');
            }
        }
    }

    // Adiciona um ouvinte de evento de redimensionamento para verificar automaticamente a largura da tela
    window.addEventListener('resize', toggleOverflowClass);

    // Adiciona o ouvinte de evento de clique para cada hamburguer
    hamburgers.forEach(hamburger => {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            if (menu) {
                menu.classList.toggle('active');
                document.documentElement.classList.toggle('overflow-hidden');
            }
        });
    });
});

// Contador
document.addEventListener('DOMContentLoaded', function () {
    // Defina a data de início aqui
    const dataInicio = new Date("2024-07-14T00:00:00");

    function atualizarContador() {
        const agora = new Date();
        let anos = agora.getFullYear() - dataInicio.getFullYear();
        let meses = agora.getMonth() - dataInicio.getMonth();
        let dias = agora.getDate() - dataInicio.getDate();
        let horas = agora.getHours() - dataInicio.getHours();
        let minutos = agora.getMinutes() - dataInicio.getMinutes();
        let segundos = agora.getSeconds() - dataInicio.getSeconds();

        // Ajuste para meses negativos e dias negativos
        if (segundos < 0) {
            segundos += 60;
            minutos--;
        }
        if (minutos < 0) {
            minutos += 60;
            horas--;
        }
        if (horas < 0) {
            horas += 24;
            dias--;
        }
        if (dias < 0) {
            const ultimoDiaDoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
            dias += ultimoDiaDoMesAnterior;
            meses--;
        }
        if (meses < 0) {
            meses += 12;
            anos--;
        }

        document.getElementById("contador").innerText =
            `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
    }

    // Atualiza o contador a cada segundo
    setInterval(atualizarContador, 1000);

});