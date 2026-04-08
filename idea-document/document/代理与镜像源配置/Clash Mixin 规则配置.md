# Clash Mixin 规则配置

很多代理商的原生配置对墙内墙外的识别都不太好，可以通过 **Mixin** 配置进行增强。

以 Clash For Windows 为例：

1. 首先在 **General** 界面打开 **Mixin** 功能
2. 然后点击 **Mixin** 后面的设置图标按钮，打开 **Mixin** 的配置文件
3. 参考 [clash-rules](https://github.com/Loyalsoldier/clash-rules) 仓库。写入如下配置：

    > 注意，末尾 `rules` 配置的 `DIRECT`，`REJECT` 和 `Proxies` 要根据你原生配置的代理名称进行修改。
    > `DIRECT` 和 `REJECT` 通常都是一样的，而 `Proxies` 往往有很多不同的名字。

    ```yaml
    mixin:
        rule-providers:
            reject:
                type: http
                behavior: domain
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt"
                path: ./ruleset/reject.yaml
                interval: 86400

            icloud:
                type: http
                behavior: domain
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt"
                path: ./ruleset/icloud.yaml
                interval: 86400

            apple:
                type: http
                behavior: domain
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt"
                path: ./ruleset/apple.yaml
                interval: 86400

            google:
                type: http
                behavior: domain
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt"
                path: ./ruleset/google.yaml
                interval: 86400

            proxy:
                type: http
                behavior: domain
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt"
                path: ./ruleset/proxy.yaml
                interval: 86400

            direct:
                type: http
                behavior: domain
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt"
                path: ./ruleset/direct.yaml
                interval: 86400

            private:
                type: http
                behavior: domain
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt"
                path: ./ruleset/private.yaml
                interval: 86400

            gfw:
                type: http
                behavior: domain
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt"
                path: ./ruleset/gfw.yaml
                interval: 86400

            tld-not-cn:
                type: http
                behavior: domain
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt"
                path: ./ruleset/tld-not-cn.yaml
                interval: 86400

            telegramcidr:
                type: http
                behavior: ipcidr
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt"
                path: ./ruleset/telegramcidr.yaml
                interval: 86400

            cncidr:
                type: http
                behavior: ipcidr
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt"
                path: ./ruleset/cncidr.yaml
                interval: 86400

            lancidr:
                type: http
                behavior: ipcidr
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt"
                path: ./ruleset/lancidr.yaml
                interval: 86400

            applications:
                type: http
                behavior: classical
                url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt"
                path: ./ruleset/applications.yaml
                interval: 86400

        rules:
            - RULE-SET,applications,DIRECT
            - DOMAIN,clash.razord.top,DIRECT
            - DOMAIN,yacd.haishan.me,DIRECT
            - RULE-SET,private,DIRECT
            - RULE-SET,reject,REJECT
            - RULE-SET,tld-not-cn,Proxies
            - RULE-SET,gfw,Proxies
            - RULE-SET,telegramcidr,Proxies
            - MATCH,DIRECT
    ```