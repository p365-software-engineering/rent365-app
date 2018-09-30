# ---- Documentation
FROM nginx
LABEL author="tyler citrin <citrin.tyler@gmail.com>"
LABEL author="arun nekkalapudi <arun.nekkalapudi@gmail.com>"
COPY ./documentation /usr/share/nginx/html
EXPOSE 80 8088
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]