# JPA properties config

```properties
# Spring Jpa config
## 自動維護模型物件與資料庫表的關聯 
spring.jpa.hibernate.ddl-auto=update
## 在 console 中顯示轉譯後的 sql 語句
spring.jpa.show-sql=true

# mysql config
spring.datasource.url=jdbc:mysql://localhost:3306/financial_management_system
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# log config
logging.level.root=ERROR

# date time format config
spring.mvc.format.date=yyyy-MM-dd
spring.mvc.format.date-time=yyyy-MM-dd HH:mm:ss
spring.mvc.format.time=HH:mm:ss
```
