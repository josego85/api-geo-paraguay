CREATE USER 'api_geo' @'%' IDENTIFIED WITH mysql_native_password BY '123456';

GRANT ALL PRIVILEGES ON *.* TO 'api_geo' @'%';

FLUSH PRIVILEGES;