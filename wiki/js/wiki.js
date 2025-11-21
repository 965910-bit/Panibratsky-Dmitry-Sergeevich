// База данных статей
const articles = {
    'Введение': {
        title: 'Введение в базу знаний',
        content: `
            <h2>Введение</h2>
            <p>Это база знаний нашей организации. Здесь собрана вся важная информация о наших процессах и стандартах.</p>
            <h3>Основные разделы:</h3>
            <ul>
                <li>Техническая документация</li>
                <li>Процедуры и регламенты</li>
                <li>Часто задаваемые вопросы</li>
            </ul>
        `
    },
    'Установка': {
        title: 'Установка необходимого ПО',
        content: `
            <h2>Процесс установки</h2>
            <p>Для начала работы необходимо установить следующее программное обеспечение:</p>
            <ol>
                <li>Visual Studio Code</li>
                <li>Git клиент</li>
                <li>Node.js версии 16+</li>
            </ol>
            <p><strong>Важно:</strong> Все компоненты должны быть установлены в рекомендуемых версиях.</p>
        `
    },
    'Использование': {
        title: 'Использование системы',
        content: `
            <h2>Работа с системой</h2>
            <p>После установки выполните следующие действия:</p>
            <ol>
                <li>Настройте рабочее окружение</li>
                <li>Запустите сервер разработки</li>
                <li>Проверьте работу всех модулей</li>
            </ol>
            <div class="warning">
                <p>При возникновении проблем обратитесь к техническому специалисту.</p>
            </div>
        `
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const articlesList = document.getElementById('articles-list');
    const articleContent = document.getElementById('article-content');

    // Заполняем навигацию
    for (const articleName in articles) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = articleName;
        a.addEventListener('click', function(e) {
            e.preventDefault();
            loadArticle(articleName);
        });
        li.appendChild(a);
        articlesList.appendChild(li);
    }

    // Функция загрузки статьи
    function loadArticle(articleName) {
        const article = articles[articleName];
        if (article) {
            articleContent.innerHTML = article.content;
            
            // Добавляем кнопку редактирования
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Редактировать';
            editBtn.className = 'edit-btn';
            editBtn.onclick = () => editArticle(articleName);
            articleContent.appendChild(editBtn);
        }
    }

    // Функция редактирования
    function editArticle(articleName) {
        const article = articles[articleName];
        const newContent = prompt('Введите новый контент статьи (HTML):', article.content);
        if (newContent !== null) {
            article.content = newContent;
            loadArticle(articleName);
        }
    }

    // Загружаем первую статью по умолчанию
    loadArticle('Введение');
});
