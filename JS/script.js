// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Page Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        
        // Update active nav link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
        
        // Hide all pages and show selected
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        // Close mobile menu if open
        navMenu.classList.remove('show');
        
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        const isOpen = answer.classList.contains('open');
        
        // Close all answers and reset icons
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('open');
        });
        document.querySelectorAll('.faq-question i').forEach(item => {
            item.className = 'fas fa-chevron-down';
        });
        
        // Toggle current answer
        if (!isOpen) {
            answer.classList.add('open');
            icon.className = 'fas fa-chevron-up';
        }
    });
});

// Diagnostic Tool
const problemOptions = document.querySelectorAll('.problem-option');
const analyzeBtn = document.getElementById('analyzeBtn');
const diagnosticResult = document.getElementById('diagnosticResult');
const resultText = document.getElementById('resultText');
const recommendations = document.getElementById('recommendations');
const resetDiagnosticBtn = document.getElementById('resetDiagnostic');

let selectedProblem = null;
let selectedFrequency = null;
let selectedDust = null;

// Problem selection
problemOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove selection from all options in the same step
        const parent = option.parentElement;
        parent.querySelectorAll('.problem-option').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Select clicked option
        option.classList.add('selected');
        
        // Store selection based on data attribute
        if (option.hasAttribute('data-problem')) {
            selectedProblem = option.getAttribute('data-problem');
        } else if (option.hasAttribute('data-frequency')) {
            selectedFrequency = option.getAttribute('data-frequency');
        } else if (option.hasAttribute('data-dust')) {
            selectedDust = option.getAttribute('data-dust');
        }
    });
});

// Analyze button
analyzeBtn.addEventListener('click', () => {
    if (!selectedProblem || !selectedFrequency || !selectedDust) {
        alert('Пожалуйста, ответьте на все вопросы');
        return;
    }
    
    // Generate result based on selections
    let result = '';
    let recommendationList = '';
    
    // Problem-specific analysis
    switch(selectedProblem) {
        case 'slow':
            result = 'Ваш компьютер работает медленно.';
            recommendationList = `
                <ul>
                    <li><strong>Очистите компьютер от пыли</strong> (особенно кулеры и радиаторы)</li>
                    <li><strong>Удалите неиспользуемые программы</strong> и временные файлы</li>
                    <li><strong>Проверьте систему на вирусы</strong> и вредоносное ПО</li>
                    <li><strong>Добавьте оперативной памяти</strong>, если ее менее 8 ГБ</li>
                    <li><strong>Рассмотрите возможность замены HDD на SSD</strong> для значительного ускорения</li>
                </ul>
            `;
            break;
        case 'crash':
            result = 'Система зависает или вылетает.';
            recommendationList = `
                <ul>
                    <li><strong>Обновите драйверы устройств</strong>, особенно видеокарты</li>
                    <li><strong>Проверьте температуру компонентов</strong> (процессор, видеокарта)</li>
                    <li><strong>Протестируйте оперативную память</strong> на ошибки с помощью MemTest86</li>
                    <li><strong>Проверьте жесткий диск</strong> на наличие битых секторов</li>
                    <li><strong>Восстановите системные файлы</strong> через команду sfc /scannow в командной строке</li>
                </ul>
            `;
            break;
        case 'virus':
            result = 'Подозрение на вирусы или вредоносное ПО.';
            recommendationList = `
                <ul>
                    <li><strong>Установите антивирусную программу</strong> (если нет) и обновите базы</li>
                    <li><strong>Выполните полное сканирование системы</strong> в безопасном режиме</li>
                    <li><strong>Используйте антивирусные утилиты</strong> (Malwarebytes, AdwCleaner) для дополнительной проверки</li>
                    <li><strong>Очистите кэш браузеров</strong> и проверьте расширения на вредоносность</li>
                    <li><strong>Создайте точку восстановления системы</strong> перед чисткой на случай отката</li>
                </ul>
            `;
            break;
        case 'boot':
            result = 'Проблемы с загрузкой операционной системы.';
            recommendationList = `
                <ul>
                    <li><strong>Проверьте подключение кабелей</strong> к жесткому диску</li>
                    <li><strong>Используйте загрузочную флешку</strong> для восстановления загрузчика</li>
                    <li><strong>Проверьте приоритет загрузки</strong> в BIOS/UEFI</li>
                    <li><strong>Протестируйте жесткий диск</strong> на работоспособность</li>
                    <li><strong>Попробуйте загрузиться в безопасном режиме</strong> для диагностики</li>
                </ul>
            `;
            break;
        case 'internet':
            result = 'Проблемы с интернетом или сетью.';
            recommendationList = `
                <ul>
                    <li><strong>Перезагрузите роутер и компьютер</strong></li>
                    <li><strong>Проверьте настройки сетевого адаптера</strong></li>
                    <li><strong>Обновите драйверы сетевой карты</strong> и Wi-Fi адаптера</li>
                    <li><strong>Сбросьте настройки сети</strong> через команду netsh winsock reset</li>
                    <li><strong>Проверьте антивирус и фаервол</strong> на блокировку соединений</li>
                </ul>
            `;
            break;
        default:
            result = 'Неопределенная проблема с компьютером.';
            recommendationList = `
                <ul>
                    <li><strong>Опишите проблему подробнее</strong> в нашей форме обратной связи</li>
                    <li><strong>Проверьте журнал событий Windows</strong> для поиска ошибок</li>
                    <li><strong>Вызовите специалиста</strong> для комплексной диагностики</li>
                </ul>
            `;
    }
    
    // Add frequency info
    if (selectedFrequency === 'always' || selectedFrequency === 'often') {
        result += ' Проблема возникает часто, что указывает на серьезную неисправность.';
        recommendationList += '<p class="warning"><i class="fas fa-exclamation-circle"></i> Частое возникновение проблемы говорит о необходимости скорейшего ремонта.</p>';
    } else {
        result += ' Проблема возникает редко, возможно, это временный сбой.';
    }
    
    // Add dust info
    if (selectedDust === 'long' || selectedDust === 'never') {
        result += ' Рекомендуется срочно почистить компьютер от пыли, так как это может вызывать перегрев и нестабильную работу.';
        recommendationList += '<p class="warning"><i class="fas fa-temperature-high"></i> Перегрев из-за пыли может привести к повреждению компонентов!</p>';
    }
    
    resultText.innerHTML = result;
    recommendations.innerHTML = '<h4>Рекомендации по решению:</h4>' + recommendationList;
    
    // Show result
    diagnosticResult.classList.add('show');
    
    // Scroll to result
    diagnosticResult.scrollIntoView({ behavior: 'smooth' });
});

// Reset diagnostic
resetDiagnosticBtn.addEventListener('click', () => {
    // Clear selections
    selectedProblem = null;
    selectedFrequency = null;
    selectedDust = null;
    
    // Clear all selections
    problemOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Hide result
    diagnosticResult.classList.remove('show');
    
    // Scroll to top of diagnostic
    document.querySelector('.diagnostic-container').scrollIntoView({ behavior: 'smooth' });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const problem = document.getElementById('problem').value;
    
    // Basic validation
    if (!name || !phone || !email || !problem) {
        alert('Пожалуйста, заполните все поля формы');
        return;
    }
    
    // Phone number validation (basic)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this example, we'll show a success message and simulate sending
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами по телефону ${phone} в ближайшее время.`);
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Redirect to home page
        navLinks.forEach(item => item.classList.remove('active'));
        document.querySelector('.nav-link[data-page="home"]').classList.add('active');
        
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById('home').classList.add('active');
    }, 1500);
});

// Footer navigation
const footerLinks = document.querySelectorAll('.footer-section a');
footerLinks.forEach(link => {
    if (link.hasAttribute('data-page')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(item => item.classList.remove('active'));
            document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('active');
            
            // Hide all pages and show selected
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            
            // Scroll to top of page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Button navigation (for buttons with data-page attribute)
document.querySelectorAll('[data-page]').forEach(btn => {
    if (btn.tagName === 'A' || btn.tagName === 'BUTTON') {
        btn.addEventListener('click', (e) => {
            if (btn.hasAttribute('data-page')) {
                e.preventDefault();
                const pageId = btn.getAttribute('data-page');
                
                // Update active nav link
                navLinks.forEach(item => item.classList.remove('active'));
                document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('active');
                
                // Hide all pages and show selected
                pages.forEach(page => page.classList.remove('active'));
                document.getElementById(pageId).classList.add('active');
                
                // Scroll to top of page
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
});

// Initialize the page on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт "Компьютерный Доктор" загружен успешно!');
});