ARG NGINX_VERSION=1.27.4

FROM nginx:$NGINX_VERSION-alpine

ARG NGINX_VERSION=1.27.4
ARG HEADERS_MORE_VERSION=v0.38

RUN apk --update --no-cache add \
    gcc \
    make \
    libc-dev \
    g++ \
    openssl-dev \
    linux-headers \
    pcre-dev \
    zlib-dev \
    libtool \
    automake \
    autoconf \
    git

RUN cd /opt \
    && git clone --depth 1 -b $HEADERS_MORE_VERSION --single-branch https://github.com/openresty/headers-more-nginx-module.git \
    && cd /opt/headers-more-nginx-module \
    && git submodule update --init \
    && cd /opt \
    && wget --secure-protocol=TLSv1_2 --max-redirect=0 -q -O - https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz | tar zxfv - \
    && mv /opt/nginx-$NGINX_VERSION /opt/nginx \
    && cd /opt/nginx \
    && ./configure --with-compat --add-dynamic-module=/opt/headers-more-nginx-module \
    && make modules 

FROM nginx:$NGINX_VERSION-alpine

COPY --from=0 /opt/nginx/objs/ngx_http_headers_more_filter_module.so /usr/lib/nginx/modules

RUN chmod -R 644 \
    /usr/lib/nginx/modules/ngx_http_headers_more_filter_module.so \
    && sed -i '1iload_module \/usr\/lib\/nginx\/modules\/ngx_http_headers_more_filter_module.so;' /etc/nginx/nginx.conf 