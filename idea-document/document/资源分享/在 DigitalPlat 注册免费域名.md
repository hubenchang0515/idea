# 在 DigitalPlat 注册免费域名

## 注册

**注册链接：[DigitalPlat](https://dashboard.digitalplat.org/signup?ref=mPAgadbstY)**

点击上方链接打开注册页面，注册后可以获得 2 个免费域名额度。

![注册](/resource/digitalplat/register.png)

> * 姓名可以随便填写，满足格式即可（有一个空格），例如：`Doro Doro`
> * 电话可以随便填写，满足格式即可（有一个 `-`），例如：`+1-11111111111`

注册完成后登录，在左侧导航菜单中点击 `域名` -> `注册域名` 进入域名注册页面：

![导航](/resource/digitalplat/nav.png)

然后点击页面上方左侧的 `选择 DigitalPlat 后缀`，进入**免费**域名注册：

![按钮](/resource/digitalplat/button.png)

滚动到页面底部，找到域名注册表单，勾选 `我已认真阅读并同意上述所有适用政策和服务条款。`：

![表单](/resource/digitalplat/form.png)

![协议](/resource/digitalplat/license.png)

选择后缀为 `.dpdns.org`：

![后缀](/resource/digitalplat/suffix.png)

> * 其它后缀暂时不能注册

点击 `检查可用性`，如果可用，则会弹窗确认窗口：

![确认](/resource/digitalplat/dialog.png)

点击 `注册` 即可完成注册。

> **注意**，免费额度不能恢复，免费域名过期前 120 可以进行续期。

## 托管到 CloudFlare

[DigitalPlat](https://dashboard.digitalplat.org/signup?ref=mPAgadbstY) 上的免费域名可以托管到 CloudFlare。

首选进入 CloudFlare 的 `域名` -> `概览` 页面，点击右上角的 `添加域名` 按钮：

![添加域名](/resource/digitalplat/cf-add-domain.png)

点击 `链接域名` 选项：

![链接域名](/resource/digitalplat/cf-link-domain.png)

输入刚刚注册的域名，点击 `继续按钮`，然后选择 `免费计划`：

![免费计划](/resource/digitalplat/cf-free-plan.png)

点击底部的 `继续前往激活` 按钮：

![继续前往激活](/resource/digitalplat/cf-active.png)

在跳转到的页面中找到 CloudFlare 的 DNS 服务器：

![CloudFlare DNS](/resource/digitalplat/cf-dns.png)

回到 [DigitalPlat](https://dashboard.digitalplat.org/signup?ref=mPAgadbstY)，进入 `域名` -> `域名列表`，选择刚刚注册的域名。

在右下角的 DNS 配置表单中填入 CloudFlare 的 DNS 服务器：

![dns](/resource/digitalplat/dns.png)

最后点击 `更新名称服务器` 即可。

> DNS 同步有延迟，需要等待一段时间才会生效。