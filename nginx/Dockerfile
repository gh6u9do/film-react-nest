# указываем базовый образ nginx
FROM nginx:alpine

# меняем дефолтный конфиг на собственный
COPY nginx.conf /etc/nginx/conf.d/default.conf

# открываем 80 порт
EXPOSE 80

# запускаем nginx 
CMD ["nginx", "-g", "daemon off;"]
