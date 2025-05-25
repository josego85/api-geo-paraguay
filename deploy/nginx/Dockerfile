ARG NGINX_VERSION=1.28.0
ARG HEADERS_MORE_VERSION=v0.38

FROM alpine:3.20 AS build

ARG NGINX_VERSION
ARG HEADERS_MORE_VERSION

RUN apk add --no-cache \
    gcc \
    g++ \
    make \
    libc-dev \
    openssl-dev \
    pcre-dev \
    zlib-dev \
    linux-headers \
    libtool \
    automake \
    autoconf \
    git \
    wget \
    tar

RUN mkdir -p /opt && cd /opt && \
    git clone --depth 1 -b ${HEADERS_MORE_VERSION} --single-branch https://github.com/openresty/headers-more-nginx-module.git && \
    cd /opt/headers-more-nginx-module && \
    git submodule update --init && \
    cd /opt && \
    wget --max-redirect=0 -q -O - https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz | tar zxvf - && \
    mv nginx-${NGINX_VERSION} nginx && \
    cd /opt/nginx && \
    ./configure --with-compat --add-dynamic-module=/opt/headers-more-nginx-module && \
    make modules

FROM nginx:${NGINX_VERSION}-alpine

RUN rm -f /etc/nginx/conf.d/*.conf

COPY --from=build /opt/nginx/objs/ngx_http_headers_more_filter_module.so /usr/lib/nginx/modules/

RUN chmod 644 /usr/lib/nginx/modules/ngx_http_headers_more_filter_module.so && \
    sed -i '1iload_module /usr/lib/nginx/modules/ngx_http_headers_more_filter_module.so;' /etc/nginx/nginx.conf