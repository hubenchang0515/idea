# npm audit 报 404 错误

现象:

```shell
$ npm audit fix
npm WARN audit 404 Not Found - POST https://registry.npmmirror.com/-/npm/v1/security/audits/quick - [NOT_IMPLEMENTED] /-/npm/v1/security/* not implemented yet
{ error: '[NOT_IMPLEMENTED] /-/npm/v1/security/* not implemented yet' }
npm ERR! audit endpoint returned an error
```

出现这个问题是因为配置了阿里云的 NPM 镜像，而镜像没有实现 audit 接口。

解决办法是临时指定官方源：

```shell
$ npm audit --registry=https://registry.npmjs.org/ fix
```