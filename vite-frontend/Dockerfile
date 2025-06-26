# Docker file del ejercicio de nginx + react compilado del 26Junio
# Step 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# copia de local al contenedor
COPY . .

RUN npm install && npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]