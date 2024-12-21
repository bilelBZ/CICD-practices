# Stage 1: Build the React app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built app with Nginx (or another web server)
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html 
#COPY nginx.conf /etc/nginx/conf.d/default.conf # If you have custom nginx config

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]