# Stage 1: Build the Angular app
FROM node:latest as node
WORKDIR /app
COPY . .

# Run chmod to set permissions (755) for your project directory
RUN chmod -R 755 /app

# Continue with your build steps
RUN npm install
RUN npm run build --prod

# Stage 2: Create a lightweight image with Nginx to serve the Angular app
FROM nginx:alpine

# Copy the Nginx configuration to handle client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app to the Nginx public directory
COPY --from=node /app/dist/twitter-ui /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
