# 通过函数创建 Worker

> 参考：[PDF 转图片](https://misc.xplanc.org/pdf-to-png)

```js
function createWorker(fn) {
    const blob = new Blob(
        [`(${fn.toString()})()`],
        { type: 'application/javascript' }
    );
    return new Worker(URL.createObjectURL(blob));
}
```

## 在函数 worker 中进行导入

在函数 worker 中可以使用 `importScripts` 进行导入。例如：

```js
importScripts('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js');
```