# @alrale/cli

> 终端常用小工具集合



- <a href="#init">init</a> 下载模板
- <a href="#q">q</a> 字典查询
- <a href="#ts">ts</a> 时间戳
- <a href="#calc">calc</a> 计算器
- <a href="#remote">remote</a> 远程
  - <a href="#proverbs">-r|--proverbs</a> 一言数据
  - <a href="#bing">-b|--bing</a> 必应壁纸
- <a href="#os">os</a> 系统
  - <a href="#ipv4">-ip|--ipv4</a>
  - <a href="#ipv6">-ip6|--ipv6</a>
- <a href="#regular">regular</a> 正则
- <a href="#byte">byte</a> 字节转换
- <a href="#cmd">cmd</a> shell操作
  - <a href="cmd-l">-l [args]</a> 执行查询
- <a href="#pipe">pipe</a> 管道符
  - <a href="#pipe-table">-t</a> 表格查看
  - <a href="#pipe-list">-l</a> 列表查看
  - <a href="#pipe-execute">execute</a> 执行



## Install

```shell
$ npm install -g @alrale/cli
```



## Usage

```shell
shelUsage: al [options] [command]

Options:
  -v, -version          output the version number
  -h, --help            display help for command

Commands:
  help                  帮助
  init                  初始化模板
  q <word|expressions>  翻译,查询中|英文单词，词句
  ts [timestamp]        格式化时间戳,默认查询当前时间
  calc|c                计算器
  remote|r [options]    远程获取, default: 获取一言数据
  os [options]          获取系统参数
  regular|reg           获取常用正则表达式
  byte                  字节转换
  cmd [options]         shell 操作
  pipe|p [options]      管道符常用命令 (| xargs [options] <command>)
```



## <a id="init">Init</a> 下载模板

```shell
$ al init     
? 模板选择 koa2-basic-template
✔ 安装完成!
cd koa2-basic-services-template
yarn 或者 npm install 安装依赖
yarn dev 启动开发环境
```



## <a id="q">Q</a> 字典查询

```shell
$ al q word
┌──────┬──────────────────────────────────────┬────────────────┬─────────────────────────┐
│ word │ n. [语] 单词；话语；消息；诺言；命令 │ vt. 用言辞表达 │ n. (Word)人名；(英)沃德 │
└──────┴──────────────────────────────────────┴────────────────┴─────────────────────────┘
```



## <a id="ts">Ts</a> 时间戳

```shell
$ al ts 1577905445
┌────┬──────┬────┬────┬──────┬────┬────┬────┬──────┬─────────────────────┬────────────┐
│ \  │ 年   │ 月 │ 日 │ 星期 │ 时 │ 分 │ 秒 │ 毫秒 │ YMD Hms             │ timestamp  │
├────┼──────┼────┼────┼──────┼────┼────┼────┼──────┼─────────────────────┼────────────┤
│ 简 │ 2020 │ 1  │ 2  │ 4    │ 3  │ 4  │ 5  │ 0    │ 2020-1-2 3:4:5      │ 1577905445 │
├────┼──────┼────┼────┼──────┼────┼────┼────┼──────┼─────────────────────┼────────────┤
│ 繁 │ 2020 │ 01 │ 02 │ 4    │ 03 │ 04 │ 05 │ 0    │ 2020-01-02 03:04:05 │ 1577905445 │
└────┴──────┴────┴────┴──────┴────┴────┴────┴──────┴─────────────────────┴────────────┘
```



## <a id="calc">Calc</a> 计算器

```shell
$ al c
? operator: +
<number>|q:quit|s:select|c:clear
 target: 1
<number>|q:quit|s:select|c:clear
 target: 2
3
<number>|q:quit|s:select|c:clear
 target: q
quit!
```



## <a id="remote">Remote</a> 远程

```shell
$ al r -h
Usage: cli remote|r [options]

远程获取, default: 获取一言数据

Options:
  -p, --proverbs     箴言、言语、格言
  -b, --bing [page]  获取必应壁纸列表 [page]页数
  -h, --help         display help for command
```

### <a id="proverbs">-r|--proverbs</a>一言数据

```shell
$ al r
伯牙鼓琴，志在高山 ———— 伯牙绝弦
```

### <a id="bing">-b|--bing</a> 必应壁纸

```shell
$ al r -b [limit] # 获取必应的图片列表 可分页
$ al r -b
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 1 德拉海滩Wakodahatchee湿地的大蓝鹭，佛罗里达州 (© Marie Hickman/Getty Images)                         │ https://www.bing.com/th?id=OHR.Wakodahatchee_ZH-CN3806840538_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ n 斯卡夫塔山中的传统农舍，冰岛瓦特纳冰川国家公园 (© Jarcosa/Getty Images)                              │ https://www.bing.com/th?id=OHR.TurfHouse_ZH-CN3250210711_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```



## <a id="os">Os</a> 系统

```shell
$ al os -h
Usage: cli os [options]

获取系统参数

Options:
  -ip, --ipv4   ipv4信息
  -ip6, --ipv6  ipv6信息
  -h, --help    display help for command
```

```shell
$ al os
┌──────────────────────────────────────────┬────────────┬──────┬──────────────┬─────────────────┬──────────────┬──────────────┬────────────┬──────────────┐
│ cpu                                      │ 处理器架构 │ 核数 │ 空闲内存字节 │ 主机名          │ 操作系统类型 │ 操作系统版本 │ 系统总内存 │ 操作系统名称 │
├──────────────────────────────────────────┼────────────┼──────┼──────────────┼─────────────────┼──────────────┼──────────────┼────────────┼──────────────┤
│ Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz │ x64        │ 4    │ 3.15         │ DESKTOP-EG96IHB │ win32        │ 10.0.18363   │ 7.89       │ Windows_NT   │
└──────────────────────────────────────────┴────────────┴──────┴──────────────┴─────────────────┴──────────────┴──────────────┴────────────┴──────────────┘
```

### <a id="ipv4">-ip|--ipv4</a>

```shell
$ al os -ip
┌──────────────────────────────┬──────┬───────────────────┐
│ VirtualBox Host-Only Network │ IPv4 │ 192.168.56.1/24   │
├──────────────────────────────┼──────┼───────────────────┤
│ WLAN                         │ IPv4 │ 192.168.10.121/24 │
├──────────────────────────────┼──────┼───────────────────┤
│ Loopback Pseudo-Interface 1  │ IPv4 │ 127.0.0.1/8       │
└──────────────────────────────┴──────┴───────────────────┘
```

### <a id="ipv6">-ip6|--ipv6</a>

```shell
$ al os -ip6
┌──────────────────────────────┬──────┬──────────────────────────────┐
│ VirtualBox Host-Only Network │ IPv6 │ fe80::78a7:8109:6abe:d9ae/64 │
├──────────────────────────────┼──────┼──────────────────────────────┤
│ WLAN                         │ IPv6 │ fe80::d877:6e9:67f0:d6eb/64  │
├──────────────────────────────┼──────┼──────────────────────────────┤
│ Loopback Pseudo-Interface 1  │ IPv6 │ ::1/128                      │
└──────────────────────────────┴──────┴──────────────────────────────┘
```



## <a id="regular">Regular</a> 正则

```shell
$ al reg
? 正则表达式 中文
/^[\u4e00-\u9fa5]+$/
```



## <a id="byte">Byte</a> 字节转换

```shell
$ al byte
? from: KB
? to: MB
? byte: 1024
1 MB
```



## <a id="cmd">Cmd</a> shell 操作

```shell
$ al cmd -h
Usage: cli cmd [options]

shell 操作

Options:
  -l, --ls [args]  查询
  -h, --help       display help for command
```

### <a id="#cmd-l">-l</a> 执行查询

```shell
$ al cmd -l npm
查询全局npm包
⠹ C:\Users\gongjie\AppData\Roaming\npm
+-- @alrale/cli@1.0.17
...
```



## <a id="pipe">Pipe</a> 管道符常用命令

```shell
$ al p -h
Usage: cli pipe|p [options]

管道符常用命令 (| xargs [options] <command>)

Options:
  -l, --list   查看所有命令 (| grep [option])
  -t, --table  表格查看所有命令
  -h, --help   display help for command
```

### <a id="pipe-table">-t</a> 表格查看

```shell
$ al p -t
┌────────┬──────────────────┬───────────┐
│ Option │ Command          │ Details   │
├────────┼──────────────────┼───────────┤
│ npm    │ list -g --dept 0 │ 全局npm包 │
└────────┴──────────────────┴───────────
```

### <a id="pipe-list">-l</a> 列表查看

```shell
$ al p -l
npm: list -g --dept 0
```

### <a id="pipe-execute">execute</a>

```shell
$ al p npm | xargs npm
C:\Users\gongjie\AppData\Roaming\npm
+-- @alrale/cli@1.0.17
...
```

