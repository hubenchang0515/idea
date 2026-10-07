# 配置 Docker 的代理或镜像源

## 配置代理

创建或编辑 `/etc/systemd/system/docker.service.d/http-proxy.conf` 文件，写入以下内容:  

```conf
[Service]
Environment="ALL_PROXY=http://192.168.1.100:7890"
Environment="HTTP_PROXY=http://192.168.1.100:7890"
Environment="HTTPS_PROXY=http://192.168.1.100:7890"
```

然后重启 Docker 服务：

```shell
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```

## 配置镜像源

编辑或创建 `/etc/docker/daemon.json` 文件，写入以下内容：

```json
{
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://dockerproxy.net",
    "https://proxy.vvvv.ee",
    "https://dockerproxy.link"
  ]
}
```

然后重启 Docker 服务：

```shell
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```