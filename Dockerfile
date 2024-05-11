# FROM node:18-alpine AS build

# WORKDIR /app

# COPY package*.json .
# RUN npm install

# COPY . .
# RUN npm run build


# FROM nginx

# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d
# COPY --from=build /app/dist/top-solutions.processo-eletronico.client-app /usr/share/nginx/html

# EXPOSE 88


FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# # Use the node image from official Docker Hub
# FROM node:lts-alpine as build-stage
# # set the working directory
# WORKDIR /app
# # Copy the working directory in the container
# COPY package*.json ./
# # Install the project dependencies
# RUN npm install
# # Copy the rest of the project files to the container
# COPY . .
# # Build the Vue.js application to the production mode to dist folder
# RUN npm run build

# # Use the lightweight Nginx image from the previous stage for the nginx container
# FROM nginx:stable-alpine as production-stage
# # Copy the build application from the previous stage to the Nginx container
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# # Copy the nginx configuration file
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
# # Expose the port 80
# EXPOSE 82
# # Start Nginx to serve the application
# CMD ["nginx", "-g", "daemon off;"]



# FROM node:18-alpine AS build

# WORKDIR /app

# COPY package*.json .
# RUN npm install

# COPY . .
# RUN npm run build


# FROM nginx

# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d
# COPY --from=build-stage /app/dist /usr/share/nginx/html

# EXPOSE 88