# AngularTodoList

Этот проект создан с помощью [Angular CLI](https://github.com/angular/angular-cli) версии 19.1.5.

## Установка зависимостей

Перед началом работы установите зависимости:

```bash
yarn install
```

## Запуск сервера данных

Для работы с локальной базой данных необходимо запустить `json-server`:

```bash
yarn server:json
```

Сервер будет работать по адресу [http://localhost:3000/](http://localhost:3000/).

## Запуск проекта

Чтобы запустить приложение в режиме разработки, выполните команду:

```bash
yarn start
```

После успешного запуска откройте браузер и перейдите по адресу [http://localhost:4200/](http://localhost:4200/).  
Приложение автоматически перезапустится при внесении изменений в код.

## Генерация компонентов

Angular CLI позволяет быстро создавать компоненты, директивы и пайпы.  
Чтобы создать новый компонент, выполните:

```bash
ng generate component имя-компонента
```

Чтобы посмотреть список доступных схем (например, для директив и пайпов), выполните:

```bash
ng generate --help
```

## Сборка проекта

Чтобы собрать проект, используйте команду:

```bash
ng build
```

Готовый код будет сохранен в папке `dist/`.  
По умолчанию сборка выполняется с оптимизацией для лучшей производительности.

## Тестирование

### Юнит-тесты

Для запуска юнит-тестов с [Karma](https://karma-runner.github.io) выполните:

```bash
ng test
```

### End-to-end (e2e) тестирование

Для запуска e2e-тестов выполните:

```bash
ng e2e
```

По умолчанию Angular CLI не включает e2e-фреймворк, выберите тот, который лучше всего подходит для вашего проекта.

## Дополнительные ресурсы

Для получения дополнительной информации по Angular CLI посетите [официальную документацию](https://angular.dev/tools/cli).
