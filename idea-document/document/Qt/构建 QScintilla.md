# 构建 QScintilla

从 [QScintilla 官网](https://riverbankcomputing.com/software/qscintilla/download) 下载 QScintilla 的源码：

* [QScintilla_src-2.14.1.tar.gz](https://www.riverbankcomputing.com/static/Downloads/QScintilla/2.14.1/QScintilla_src-2.14.1.tar.gz)
* [QScintilla_src-2.14.1.zip](https://www.riverbankcomputing.com/static/Downloads/QScintilla/2.14.1/QScintilla_src-2.14.1.zip)

下载后解压，进入 `QScintilla_src-2.14.1/src` 目录，打开终端，执行 `qmake`，然后进行构建并安装：

```shell
# Linux
qmake
make    
make install

# Windows 使用 MSVC
qmake
nmake
nmake install

# Windows 使用 MinGW
qmake
mingw32-make
mingw32-make install      
```

> 路径中最好不要有非 ASCII 字符。

![](/resource/qt/qscintilla-include.png)
![](/resource/qt/qscintilla-lib.png)