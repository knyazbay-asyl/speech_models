# Speech Models Management System

## Описание проекта
Система управления моделями речи с веб-интерфейсом. Проект состоит из трех основных компонентов:
- Backend (Spring Boot)
- Frontend (React)
- База данных (PostgreSQL)

## Технологии
### Backend
- Java 17
- Spring Boot 3.4.5
- Spring Security
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React 18
- Material-UI
- Axios
- Node.js 18

### Инфраструктура
- Docker
- Docker Compose
- Nginx

## Требования
- Docker и Docker Compose
- JDK 17
- Node.js 18 (для локальной разработки frontend)
- Maven (для локальной разработки backend)

## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Запуск через Docker Compose
```bash
# Сборка и запуск всех сервисов
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up -d

# Остановка всех сервисов
docker-compose down
```

### 3. Локальная разработка

#### Backend
```bash
# Сборка проекта
mvn clean package

# Запуск приложения
java -jar target/AdminWork1-0.0.1-SNAPSHOT.jar
```

#### Frontend
```bash
cd frontend

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start
```

## Структура проекта
```
├── src/                    # Backend исходный код
│   ├── main/
│   │   ├── java/
│   │   │   └── service/work/adminwork1/
│   │   │       ├── config/        # Конфигурации
│   │   │       ├── controller/    # REST контроллеры
│   │   │       ├── model/         # Модели данных
│   │   │       ├── repository/    # Репозитории
│   │   │       └── service/       # Бизнес-логика
│   │   └── resources/
│   │       └── application.properties
│   └── test/              # Тесты
├── frontend/              # Frontend приложение
│   ├── public/
│   ├── src/
│   │   ├── components/   # React компоненты
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── Dockerfile
├── Dockerfile            # Backend Dockerfile
├── docker-compose.yml    # Docker Compose конфигурация
└── pom.xml              # Maven конфигурация
```

## Доступ к сервисам
- Frontend: http://localhost:80
- Backend API: http://localhost:8085
- PostgreSQL: localhost:5432
  - База данных: speech_models_db
  - Пользователь: postgres
  - Пароль: 12345

## API Endpoints

### Аутентификация
- POST /api/auth/login - Вход в систему

### Модели речи
- GET /api/speech-models - Получение списка моделей
- POST /api/speech-models - Создание новой модели
- GET /api/speech-models/{id} - Получение модели по ID
- PUT /api/speech-models/{id} - Обновление модели
- DELETE /api/speech-models/{id} - Удаление модели

## Безопасность
- Используется Spring Security для аутентификации
- Пароли хешируются с использованием BCrypt
- JWT токены для авторизации

## Мониторинг и логирование
- Логирование через Logback
- SQL запросы логируются в режиме разработки

## Разработка

### Добавление новых зависимостей
#### Backend
```bash
# Добавьте зависимость в pom.xml
mvn clean install
```

#### Frontend
```bash
cd frontend
npm install <package-name>
```

### Создание новой фичи
1. Создайте новую ветку
2. Внесите изменения
3. Напишите тесты
4. Создайте pull request

## Устранение неполадок

### Проблемы с Docker
```bash
# Очистка Docker
docker system prune -f

# Пересборка контейнеров
docker-compose down
docker-compose up --build
```

### Проблемы с базой данных
```bash
# Проверка подключения
docker-compose exec postgres psql -U postgres -d speech_models_db
```

### Проблемы с frontend
```bash
# Очистка node_modules
cd frontend
rm -rf node_modules
npm install
```

