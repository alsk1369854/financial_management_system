# Jpa Relational Tabes (表關聯操作)

## 關聯相關註解

[Hibernate ORM Docs](https://docs.jboss.org/hibernate/orm/)

[Hibernate ORM 6.1.7.Final User Guide 2.8 Associations](https://docs.jboss.org/hibernate/orm/6.1/userguide/html_single/Hibernate_User_Guide.html#associations-many-to-one)

### 單元測試

- 在@Test 中 @Transation 相關操作，需要搭配 @Commit 註解來進行提交。

### 類註解

- @Entity // 表示此類為一個模型類

- @Table(name="person") // 表示資料庫對應的表名  

- @Data // 自動為類的成員變數加上 get、set 方法 

### 列註解

- 主鍵級註解
  
  - @Id // 指定此列為表主鍵 id
  
  - @GeneratedValue(strategy = GenerationType.AUTO) // 指定主鍵的生成策略
    
    - TABLE：使用一个特定的数据库表格来保存主键。   
    - SEQUENCE：根据底层数据库的序列来生成主键，条件是数据库支持序列。   
    - IDENTITY：主键由数据库自动生成（主要是自动增长型）   
    - AUTO(default)：主键由程序控制。

- 列級註解
  
  - @Column(name = "person_name") // 指定列名 

- 外鍵級註解
  
  - @JoinColumn(name = "person_id") // 指定關聯列名
    
    - foreignKey = @ForeignKey(name = "PERSON_ID_FK") // 添加外鍵約束，防止外鍵指向不存在的主鍵
  
  - @JoinTable(name = "table_person_address") // 指定多對多中間中間表名
    
    - joinColumns = {@JoinColumn(name = "p_id")} // 設置本表的外鍵名稱
    - inverseJoinColumns = {@JoinColumn(name = "a_id")} // 設置關聯表的外鍵名稱

### 關聯類型註解

- @OneToOne // 預設非延遲加載

- @OneToMany // 預設延遲加載

- @ManyToOne // 預設非延遲加載

- @ManyToMany // 預設延遲加載

### 關聯類型註解參數

```java
@Entity(name = "project") // 指定在資料庫中的表名
@Data // 自動添加 get、set、toString、hashcode 操作
public class Project {

    /**
     * cascade 設置關聯操作
     * - ALL,      所有持久化操作
     * - PERSIST,  只有插入才會執行關聯操作
     * - MERGE,    只有修改才會執行關聯操作
     * - REMOVE,   只有刪除才會執行關聯操作
     * - REFRESH,    假设场景 有一个订单,订单里面关联了许多商品,这个订单可以被很多人操作,那么这个时候A对此订单和关联的商品进行了修改,与此同时,B也进行了相同的操作,但是B先一步比A保存了数据,那么当A保存数据的时候,就需要先刷新订单信息及关联的商品信息后,再将订单及商品保存。
     * - DETACH,   如果你要删除一个实体，但是它有外键无法删除，你就需要这个级联权限了。它会撤销所有相关的外键关联。
     * <p>
     * fetch 設置是否懶加載
     * - EAGER 立即加載 (default)
     * - LAZY 懶加載 (直到用到才會進行查詢, 需要為邏輯加入 @Transactional 避免 session 提前被銷毀)
     * <p>
     * orphanRemoval 關聯移除 (通常在修改的時候會用到)
     * - 一旦關聯的數據設置為 null，或者修改為其他關聯數據，如果想刪除原關臉數據，就可以設置為 true
     * - 預設關閉
     * <p>
     * options 限制關聯對象不能為 null
     * - true (default) 可以為 null
     * - false 不能為 null
     * <p>
     * mappedBy 將外鍵約束執行交給另一方維護(通常在雙向關聯關係中，會放棄一方的外鍵約束)
     * - 值 = 另一方關聯屬性名
     */
    @OneToOne(
//            mappedBy = "customer",
            cascade = {CascadeType.PERSIST},
            fetch = FetchType.LAZY,
            orphanRemoval = true,
            optional = false)
    // 設定外鍵列名
    @JoinColumn(name = "customer_id")
    private Customer customer;

}
```

## 一對一 [@OneToOne]

```java
// 一個手機對應一個手機細節訊息
@Entity(name = "Phone")
public static class Phone {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "`number`")
    private String number;

    @OneToOne
    @JoinColumn(name = "details_id")
    private PhoneDetails details;

    //Getters and setters are omitted for brevity

}

@Entity(name = "PhoneDetails")
public static class PhoneDetails {

    @Id
    @GeneratedValue
    private Long id;

    private String provider;

    private String technology;

    //Getters and setters are omitted for brevity

}
```

## 多對一 [@ManyToOne]

- 將依賴關係維護在，多

```java
// 一個人有多台手機
@Entity(name = "Person")
public static class Person {

    @Id
    @GeneratedValue
    private Long id;

    //Getters and setters are omitted for brevity

}

@Entity(name = "Phone")
public static class Phone {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "`number`")
    private String number;

    @ManyToOne
    @JoinColumn(name = "person_id",
            foreignKey = @ForeignKey(name = "PERSON_ID_FK") // 添加外鍵約束，防止外鍵指向不存在的主鍵
    )
    private Person person;

    //Getters and setters are omitted for brevity

}
```

## 一對多 [@OneToMany]

- 將依賴關係維護在，單

```java
@Entity(name = "Person")
public static class Person {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Phone> phones = new ArrayList<>();

    //Getters and setters are omitted for brevity

}

@Entity(name = "Phone")
public static class Phone {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "`number`")
    private String number;

    //Getters and setters are omitted for brevity

}
```

## 多對多 [@ManyToMany]

- 會自動建立一個中間表來維護多對多的關係

```java
// 一個人會住在多個地址，每個地址也會住多個人
@Entity(name = "Person")
public static class Person {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name="tb_person_address", // 指定中間表名
        joinColumns = {@JoinColumn(name = "p_id")}, // 設置本表的外鍵名稱
        inverseJoinColumns = {@JoinColumn(name = "a_id")} // 設置關聯表的外鍵名稱
    )
    private List<Address> addresses = new ArrayList<>();

    //Getters and setters are omitted for brevity

}

@Entity(name = "Address")
public static class Address {

    @Id
    @GeneratedValue
    private Long id;

    private String street;

    @Column(name = "`number`")
    private String number;

    //Getters and setters are omitted for brevity

}
```
