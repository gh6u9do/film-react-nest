# даем первому образу имя builder чтобы потом к нему обратиться
FROM node:20 AS builder

# устанавливаем рабочую директорию
WORKDIR /app

# копируем package.json чтобы установить зависимости
COPY package.json ./

# Удаляем package-lock.json и ставим зависимости заново для Linux
RUN rm -f package-lock.json && npm install

# копируем весь исходный код
COPY . .

# передаём env-переменные для сборки 
ENV VITE_API_URL=/api/afisha
ENV VITE_CDN_URL=/content/afisha
ENV ROLLUP_SKIP_NODE_NATIVE=1
# собираем приложение
RUN npm run build



# собираем финальный образ, ничего билдить не надо, поэтому выбираем самый легкий образ alpine
FROM alpine:latest

# устанавливаем рабочую директорию
WORKDIR /app

#  копируем из образа-сборщика директорию с собранным проектом для отсечения всего лишнего
COPY --from=builder /app/dist ./dist
