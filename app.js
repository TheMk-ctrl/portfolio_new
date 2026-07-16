// Инициализация иконок Lucide
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Функция мгновенного скрытия экрана загрузки
let preloaderRemoved = false;
function removePreloader() {
    if (preloaderRemoved) return;
    preloaderRemoved = true;

    const loader = document.querySelector('.page-loader');
    if (loader) {
        // Плавно уводим прелоадер в прозрачность через CSS
        loader.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Полностью удаляем его из документа через 400мс
        setTimeout(() => {
            loader.remove();
        }, 400);
    }
}

// Убираем прелоадер при загрузке страницы или по резервному таймеру через 1 сек
window.addEventListener('load', removePreloader);
setTimeout(removePreloader, 1000);


/* ==========================================================================
   ⚓ ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ
   ========================================================================== */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});


/* ==========================================================================
   🌀 СИСТЕМА ЛОКАЛИЗАЦИИ
   ========================================================================== */
const langToggleBtn = document.getElementById('lang-toggle');
let currentLang = 'RU';

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'RU' ? 'EN' : 'RU';
        langToggleBtn.textContent = currentLang === 'RU' ? 'EN' : 'RU';
        
        // Переводим все элементы с data-ru и data-en
        document.querySelectorAll('[data-ru]').forEach(el => {
            el.textContent = currentLang === 'RU' ? el.getAttribute('data-ru') : el.getAttribute('data-en');
        });
    });
}

const translations = {
    ru: {
        nav_about: "О себе",
        nav_experience: "Опыт",
        nav_projects: "Проекты",
        nav_achievements: "Достижения",
        hero_title: "Создаю решения, которые масштабируются.",
        hero_subtitle: "Fullstack-разработчик на JavaScript, Python и C#.",
        hero_desc: "Проектирую архитектуру серверных систем, разрабатываю надежные API, создаю отзывчивые интерфейсы и десктопные приложения. Нацелен на чистоту кода и высокую производительность конечного продукта.",
        exp_title: "Опыт работы",
        exp_1_date: "сент. 2025 – н.в.",
        exp_1_org: "Частное лицо",
        exp_1_role: "Backend Python Разработчик",
        exp_1_desc: "Интеграция платежных систем (криптовалютные транзакции и фиатные шлюзы). Разработка REST API для вебхуков, ведение детального логирования для финансового аудита и автоматизация процессов.",
        exp_2_date: "июн. 2025 – авг. 2025",
        exp_2_org: "ВГКП №4",
        exp_2_role: "Backend Стажер-разработчик",
        exp_2_desc: "Проектирование и разработка крупной системы обратной связи на Python в экосистеме Telegram. Работа в команде над масштабируемой архитектурой в организации со штатом более 1500 сотрудников. Проект успешно запущен с высоким уровнем удовлетворенности пользователей (более 2000 отзывов).",
        exp_3_date: "февр. 2025 – май 2025",
        exp_3_org: "Частное лицо",
        exp_3_role: "Unity-разработчик",
        exp_3_desc: "Разработка полноценной инди-игры в жанре Tower Defence с использованием классов Unity и сторонних библиотек. Опыт работы в составе распределенной инди-команды из 10 специалистов.",
        projects_title: "Мои Проекты",
        project_fintech: "ФИНАНСОВЫЕ ТЕХНОЛОГИИ",
        project_security: "СЕТИ И БЕЗОПАСНОСТЬ",
        crackvpn_desc: "Красиво оформленный Telegram-бот с интегрированной системой оплаты CryptoPay и Telegram Stars, серверами со скоростью до 10 Гбит/с и полной автономностью работы.",
        p2p_name: "P2P-децентрализованный мессенджер",
        p2p_desc: "Платформа для обмена сообщениями, обеспечивающая прямое взаимодействие пользователей со сквозным шифрованием без участия централизованных серверов.",
        view_code: "Посмотреть код",
        try_demo: "Запустить демо",
        cert_title_main: "Сертификаты и образование",
        cert_1_title: "«Fullstack-разработчик»",
        cert_1_issuer: "Новосибирская академия дизайна и программирования",
        cert_1_tech: "Python, C#, Веб-дизайн",
        cert_1_date: "Сентябрь 2022 - Май 2025",
        cert_2_title: "«Основы программирования на Python»",
        cert_2_issuer: "Яндекс Лицей",
        cert_2_date: "Октябрь 2025 - Май 2026",
        cert_3_title: "«Python: шаг за шагом»",
        cert_3_issuer: "Яндекс Лицей",
        cert_3_date: "Апрель 2025 - Июнь 2026",
        cert_4_title: "Уровень английского B1+",
        cert_4_issuer: "Языковая школа «Мариоль»",
        cert_4_tech: "Английский язык",
        cert_4_date: "Сентябрь 2018 - Май 2026",
        cert_view_btn: "Посмотреть"
    },
    en: {
        nav_about: "About",
        nav_experience: "Experience",
        nav_projects: "Projects",
        nav_achievements: "Achievements",
        hero_title: "Building scalable software solutions.",
        hero_subtitle: "Fullstack Developer working with JavaScript, Python, and C#.",
        hero_desc: "Designing robust backend architectures, building reliable APIs, creating responsive interfaces, and desktop applications. Focused on clean code and high performance.",
        exp_title: "Work Experience",
        exp_1_date: "Sep 2025 – Present",
        exp_1_org: "Freelance / Contract",
        exp_1_role: "Backend Python Developer",
        exp_1_desc: "Integrated payment systems (cryptocurrency transactions and fiat gateways). Developed REST APIs for webhooks, detailed logging for financial auditing, and process automation.",
        exp_2_date: "Jun 2025 – Aug 2025",
        exp_2_org: "Voronezh Clinic №4",
        exp_2_role: "Backend Developer Intern",
        exp_2_desc: "Designed and developed a large-scale feedback system using Python within the Telegram ecosystem. Collaborated in a team of developers in an organization with over 1,500 employees. Successfully launched with 2,000+ positive user reviews.",
        exp_3_date: "Feb 2025 – May 2025",
        exp_3_org: "Freelance / Contract",
        exp_3_role: "Unity Game Developer",
        exp_3_desc: "Developed a full-fledged indie game in the Tower Defense genre utilizing Unity classes and third-party libraries. Gained team-working experience in a distributed indie-team of 10 people.",
        projects_title: "My Projects",
        project_fintech: "FINANCIAL TECHNOLOGIES",
        project_security: "NETWORKING & SECURITY",
        crackvpn_desc: "Beautifully styled Telegram bot with integrated CryptoPay and Telegram Stars payment systems, servers operating at up to 10 Gbps, and full autonomy.",
        p2p_name: "P2P Decentralized Messenger",
        p2p_desc: "A messaging platform that provides direct user interaction with end-to-end encryption without the involvement of centralized servers.",
        view_code: "View Code",
        try_demo: "Launch Demo",
        cert_title_main: "Certificates & Education",
        cert_1_title: "'Fullstack Developer'",
        cert_1_issuer: "Novosibirsk Academy of Design and Programming",
        cert_1_tech: "Python, C#, Web Design",
        cert_1_date: "September 2022 - May 2025",
        cert_2_title: "'Python Programming Basics'",
        cert_2_issuer: "Yandex Lyceum",
        cert_2_date: "October 2025 - May 2026",
        cert_3_title: "'Python: Step by Step'",
        cert_3_issuer: "Yandex Lyceum",
        cert_3_date: "April 2025 - June 2026",
        cert_4_title: "English Level B1+",
        cert_4_issuer: "Mariol Language School",
        cert_4_tech: "English Language",
        cert_4_date: "September 2018 - May 2026",
        cert_view_btn: "View"
    }
};


/* ==========================================================================
   📂 СИСТЕМА ДЕМО-ВЕРСИЙ (РАСКРЫТИЕ И ИНИЦИАЛИЗАЦИЯ)
   ========================================================================== */

// Исправленная и надежная функция переключения демо
function toggleProjectDemo(containerId, buttonElement) {
    const card = buttonElement 
        ? buttonElement.closest('.project-card-original') 
        : document.getElementById(containerId)?.closest('.project-card-original');
        
    if (!card) return;

    const isActive = card.classList.contains('demo-active');

    // Закрываем другие демо
    document.querySelectorAll('.project-card-original').forEach(otherCard => {
        if (otherCard !== card) otherCard.classList.remove('demo-active');
    });

    // Переключаем активность
    if (isActive) {
        card.classList.remove('demo-active');
    } else {
        card.classList.add('demo-active');
        
        // ВЫЗОВ ФУНКЦИЙ ИНИЦИАЛИЗАЦИИ
        // Проверяем, какой контейнер открыли, и вызываем соответствующую функцию
        if (containerId === 'crackvpn-demo-container' && typeof initCrackVpnDemo === 'function') {
            initCrackVpnDemo();
        } else if (containerId === 'p2p-demo-container' && typeof initP2pDemo === 'function') {
            initP2pDemo();
        }
    }
}