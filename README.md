## oss unzip
> 阿里OSS zip解压服务

## quick start

> 1、 cp env.example .env <br/>
> 2、 修改oss账号配置<br/>
> 3、 构建镜像： docker build -t . {imageName}<br/>
> 4、 启动： docker run -d -p your_port:9100 {imageName}
> 5、 访问 http://ip:your_port/health

## Usage

## rest /unzip POST

 
# 参数

|参数名|描述|可选|
|----------|------------|---------|
|url|待解压压缩包url|必填|
|bucket|解压到指定的空间名称|必填|
|prefix|为解压后的文件名称添加一个前缀|可选，默认为空|

**备注**：

1. `url`参数必须使用UrlsafeBase64编码方式编码。
2. `bucket`参数必须使用UrlsafeBase64编码方式编码。
3. `prefix`参数必须使用UrlsafeBase64编码方式编码。
