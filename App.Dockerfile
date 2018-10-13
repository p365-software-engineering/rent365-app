# ---- Web App
FROM nginx
LABEL author="tyler citrin <citrin.tyler@gmail.com>"
LABEL author="Arun Nekkalapudi <arun.nekkalapudi@gmail.com>"
COPY ./dist/rental-management-app /usr/share/nginx/html
COPY ./nginx-conf /etc/nginx/conf.d
EXPOSE 80 8088
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]