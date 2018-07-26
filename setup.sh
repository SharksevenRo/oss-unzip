docker build -t oss-zip . 
docker run -d oss-zip -p 9101:9100 -v/etc/oss-unzip/.env:/root/.env oss-zip