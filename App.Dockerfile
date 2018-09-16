# ---- Web App
FROM nginx
LABEL author="tyler citrin <citrin.tyler@gmail.com>"
COPY ./dist/rental-management-app /usr/share/nginx/html
EXPOSE 80 8088
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]