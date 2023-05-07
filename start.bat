docker build -f Dockerfile -t alsk1369854/FMS . 
docker build -f Dockerfile -t fms_app .

docker network create --driver bridge fms_network

docker run -p 3306:3306 --name fmsmysql --network fms_network -v C:/fms_app/mysql/backup:/etc/mysql/backup -v C:/fms_app/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.33

docker run -it fms_app -p 8080:8080 --name fms_app -v C:/fms_app/app:/usr/local/app --link fmsmysql:fmsmysql
docker run -it fms_app -p 8080:8080 --name fms_app --network fms_network

mvn clean install -DskipTests

mysql -uroot -proot
create database fms;
show databases;