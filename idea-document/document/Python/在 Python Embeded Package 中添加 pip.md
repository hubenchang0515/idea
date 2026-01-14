# 在 Python Embeded Package 中添加 pip

通过 [`get-pip.py`](https://bootstrap.pypa.io/get-pip.py) 获取 pip：

```shell
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
./python get-pip.py
```

如果使用早期的的 Python 版本，[`get-pip.py`](https://bootstrap.pypa.io/get-pip.py) 可能不兼容，则需要使用兼容的版本，例如：

```shell
curl https://bootstrap.pypa.io/pip/3.8/get-pip.py -o get-pip.py
./python get-pip.py
```
