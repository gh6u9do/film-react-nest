FROM node:20-alpine

# крафтим рабочую директорию
WORKDIR /app

# копируем package.json для установки зависимостей
COPY package*.json ./

# устанавливаем зависимости
RUN npm ci

# копируем весь код
COPY . .

# собираем проект
RUN npm run build

# пишем команду которая будет срабатывать при каждом запуске контейнера
CMD ["npm", "run", "start:prod"]