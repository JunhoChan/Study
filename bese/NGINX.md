## nginx常见命令

```shell
# 启动nginx服务
$: start nginx

# 停止nginx服务
$: nginx -s stop 

# 重载配置
$: nginx -s reload

# 运行命令
taskkill /f /t /im nginx.exe

# netstat -aon|findstr "8081"
# taskkill /T /F /PID 14548
```


```md
#user  nobody;
worker_processes  6;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  127.0.0.1;

        charset utf-8;

        location / {
            root   html;
            index  index.html index.htm;
        }


        # error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        location /flow{
            root D:/AiProject/static;
            autoindex off;
            proxy_store on;
            try_files $uri $uri/ $uri.html;
        }
    }
}

```