# JPA

[Spring Data JPA - Reference Documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)

## JPA 基本接口類型 (JPA Base interface type)

### 曾刪改接口 (Interface CrudRepository)

```java
public interface UserRepository extends CrudRepository<User, Long> {

    // 有主鍵就是修改 / 沒有就是新增
    // 獲得插入後的自增 ID, 獲得返回值
    <S extends T> S save(S entity);

    // 通過集合保存
    // 傳入 Lit 保存多個 
    <S extends T> Iterable<S> saveAll(Iterable<S> entities);

    // 根據 ID 獲取
    Optional<T> findById(ID id);

    // 根據 ID 查詢是否存在
    boolean existsById(ID id);

    // 查詢所有
    Iterable<T> findAll();

    // 根據 ID 查詢多個
    // 傳入 List<ID>
    Iterable<T> findAllById(Iterable<ID> ids);

    // 查詢表數據數量
    long count();

    // 根據 ID 刪除數據
    void deleteById(ID id);

    // 根據實體刪除
    void delete(T entity);

    // 根據ID刪除多條數據
    // 傳入 List<ID>
    void deleteAllById(Iterable<? extends ID> ids);

    // 根據實體刪除多條數據
    // 傳入 List<Entity>
    void deleteAll(Iterable<? extends T> entities);

    // 刪除表所有數據
    void deleteAll();

}
```

### 批量與排序接口 (Interface PagingAndSortingRepository)

```java
public interface PagingAndSortingRepository<T, ID>  {
    // 排序
  Iterable<T> findAll(Sort sort);
    // 分頁
  Page<T> findAll(Pageable pageable);
}
```

### 基本使用 (Base example)

#### 1.建立模型物件 (model class)

- src/{project_name}/model/Company.java 

```java
package com.backend.model;

import jakarta.persistence.*;

@Entity // 表示此為一個值類
@Table(name = "company") // 資料庫中對應的表名
@Data // 自動生成屬性 getset 方法
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "arrears", nullable = false)
    private Integer arrears;

    @Column(name = "remark")
    private String remark;

    public Company() {
    }

    public Company(String name, Integer arrears, String remark) {
        this.name = name;
        this.arrears = arrears;
        this.remark = remark;
    }
}
```

#### 2. 建立倉庫接口  (Repository interface)

- src/{project_name}/repository/CompanyRepository.java

```java
public interface CompanyRepository extends JpaRepository<Company, Long>{
}
```

#### 3. 使用 JAP 增刪改查 (Use JAP Query)

```java
@SpringBootTest
class BackendApplicationTests {

    @Autowired
    CompanyRepository companyRepository;

    // (新增/更新)數據
    @Test
    void testJpaSave(){
        // 新增數據, 未帶主鍵則創建新值
        // 更新數據, 帶主鍵則更新主鍵ID對應的值
        Company company = new Company();
//        company.setId(152L); // 帶主鍵則更新主鍵ID對應的值
        company.setName("test update");
        company.setArrears(100);
        company.setRemark("test remark");

        Company save = companyRepository.save(company);
        System.out.println(save); // Company{id=302, name='test', arrears=100, remark='test remark'}
    }

    // 查詢數據
    @Test
    void testJpaFindByID(){
        // 查詢,根據主鍵查詢
        Optional<Company> optional = companyRepository.findById(1L);
        System.out.println(optional.get());
    }

    // 刪除數據
    @Test
    void testJpaDelete(){
        // 根據實體刪除
        Company company = new Company();
        company.setName("test");

        companyRepository.delete(company);
    }

    // 批量查尋數據
    @Test
    void testJpaFindAllWithPage(){
        // 從第 0 條數據開始, 每 2 條數據1頁
        PageRequest pageRequest = PageRequest.of(0, 2);
        Page<Company> page = companyRepository.findAll(pageRequest);
        System.out.println("總頁數: " + page.getTotalPages());
        System.out.println("總數據數: " + page.getTotalElements());
        System.out.println("第幾頁: " + page.getNumber());
        System.out.println("此頁數據項: " + page.getContent());
        System.out.println("=====================================");

        Pageable nextPageable = page.nextPageable();
        Page<Company> nextPage = companyRepository.findAll(nextPageable);
        System.out.println("Next Page 第幾頁: " + nextPage.getNumber());
        System.out.println("Next Page 總數據數: " + nextPage.getContent());
    }

    // 查詢排序1
    @Test
    void testJpaFindAllWithSortByEntityType(){
        // 獲取類別的 sort type
        Sort.TypedSort<Company> sortType = Sort.sort(Company.class);

        // 根據 "Company.arrears" 降續
        Sort sort1 = sortType.by(Company::getArrears).descending();
        // 根據 "Company.id" 升續
        Sort sort2 = sortType.by(Company::getId).ascending();
        // 根據 "Company.arrears" 降續, 在根據 "Company.id" 升續
        Sort sort3 = sort1.and(sort2);

        List<Company> companyList = companyRepository.findAll(sort3);
        System.out.println(companyList);
    }

    // 查詢排序2
    @Test
    void testJpaFindAllWithSort(){
        // 根據 "Company.arrears" 降續
        Sort sort1 = Sort.by("arrears").descending();
        // 根據 "Company.id" 升續
        Sort sort2 = Sort.by("id").ascending();
        // 根據 "Company.arrears" 降續, 在根據 "Company.id" 升續
        Sort sort3 = sort1.and(sort2);

        List<Company> company
        List = companyRepository.findAll(sort3);
        System.out.println(companyList);
    }
}
```

## 自訂義查詢

### 1. JPA SQL (JPAL)

1. @Query("{SQL}")
   
   1. 查詢單個直接返回Entity類型，多個則返回List<Entity>類型
   
   2. 參數設置方式
      
      1. 索引: ?{數字}
      
      2. 具名: :{參數名} 結合@Param("{參數名}") 指定參數名字
   
   3. 增刪改:
      
      1. 要加上事務支持註解:
      
      2. ```java
         @Transactional // 通常放在業務邏輯層上聲明
         @Modifying // 通知jpa此查詢是增刪改操作，與@Query放一起
         ```
      
      3. 如果是插入方法:  一定只能在 hibernate 下材支持 (Insert into ... select ...)  

#### Example use

```java
public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {

    // 根據名稱查詢數據 (不寫 SELECT *)
    @Query("FROM Company WHERE name LIKE %:text%")
    List<Company> findByNameContainsText(@Param("text") String text);

    @Modifying // 通知 spring data jpa 這是一個 (增|刪|改) 操作
    @Query("UPDATE Company as c set c.name=:name WHERE id=:id")
    int updateNameById(
            @Param("name") String name,
            @Param("id") Long id);

    @Transactional // 通常放在業務邏輯層上聲明
    @Modifying
    @Query("DELETE From Company as c WHERE c.name = :name")
    int deleteByName(@Param("name") String name);

    @Transactional // 通常放在業務邏輯層上聲明
    @Modifying
    @Query("INSERT into Company(name,arrears) select c.name, c.arrears from Company as c where c.id = :id") //
    int insertSelectDataById(@Param("id") Long id);

    // 使用原生的 SQL 語法
    @Query(value = "SELECT * FROM company as c where c.arrears = :arrears", nativeQuery = true)
    List<Company> findByArrearsUseSql(@Param("arrears") Integer arrears);
```

### 2. 關鍵字查詢方法 (Repository query keywords)

[Spring query method doc](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#appendix.query.method.subject)

#### 查詢主題關鍵字 (Query subject keywords)

- 查詢方法 **主題關鍵字(前綴)**
  
  - 決定當前方法作用
  
  - 只支持查詢和刪除  

| Keyword                                                  | Description                                                                                                                   |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| find…By, read…By, get…By, query…By, search…By, stream…By | 一般查詢方法通常返回存儲庫類型、aCollection或Streamable子類型或結果包裝器（例如Page）GeoResults或任何其他特定於存儲的結果包裝器。可以用作findBy…，findMyDomainTypeBy…或與其他關鍵字結合使用。 |
| exists…By                                                | 存在投影，通常返回boolean結果。                                                                                                           |
| count…By                                                 | 返回數字結果的計數投影。                                                                                                                  |
| delete…By,remove…By                                      | 刪除查詢方法不返回任何結果 ( void) 或刪除計數。                                                                                                  |
| …First<number>…,…Top<number>…                            | 將查詢結果限制為第一個<number>結果。此關鍵字可以出現在主題中介於find（和其他關鍵字）和之間的任何位置by。                                                                   |
| …Distinct…                                               | 使用不同的查詢只返回唯一的結果。請查閱特定於商店的文檔是否支持該功能。此關鍵字可以出現在主題中介於find（和其他關鍵字）和之間的任何位置by。                                                      |

#### 查詢修飾關鍵字 (Keywords inside method names)

- 查詢方法 **謂詞關鍵字和修飾符**
  
  - 決定查詢條件

[Spring query inside method name doc](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation)

| Keyword            | Sample                                                  | JPQL snippet                                                   |
| ------------------ | ------------------------------------------------------- | -------------------------------------------------------------- |
| Distinct           | findDistinctByLastnameAndFirstname                      | select distinct …​ where x.lastname = ?1 and x.firstname = ?2  |
| And                | findByLastnameAndFirstname                              | … where x.lastname = ?1 and x.firstname = ?2                   |
| Or                 | findByLastnameOrFirstname                               | … where x.lastname = ?1 or x.firstname = ?2                    |
| Is, Equals         | findByFirstname,findByFirstnameIs,findByFirstnameEquals | … where x.firstname = ?1                                       |
| Between            | findByStartDateBetween                                  | … where x.startDate between ?1 and ?2                          |
| LessThan           | findByAgeLessThan                                       | … where x.age < ?1                                             |
| LessThanEqual      | findByAgeLessThanEqual                                  | … where x.age <= ?1                                            |
| GreaterThan        | findByAgeGreaterThan                                    | … where x.age > ?1                                             |
| GreaterThanEqual   | findByAgeGreaterThanEqual                               | … where x.age >= ?1                                            |
| After              | findByStartDateAfter                                    | … where x.startDate > ?1                                       |
| Before             | findByStartDateBefore                                   | … where x.startDate < ?1                                       |
| IsNull, Null       | findByAge(Is)Null                                       | … where x.age is null                                          |
| IsNotNull, NotNull | findByAge(Is)NotNull                                    | … where x.age not null                                         |
| Like               | findByFirstnameLike                                     | … where x.firstname like ?1                                    |
| NotLike            | findByFirstnameNotLike                                  | … where x.firstname not like ?1                                |
| StartingWith       | findByFirstnameStartingWith                             | … where x.firstname like ?1 (parameter bound with appended %)  |
| EndingWith         | findByFirstnameEndingWith                               | … where x.firstname like ?1 (parameter bound with prepended %) |
| Containing         | findByFirstnameContaining                               | … where x.firstname like ?1 (parameter bound wrapped in %)     |
| OrderBy            | findByAgeOrderByLastnameDesc                            | … where x.age = ?1 order by x.lastname desc                    |
| Not                | findByLastnameNot                                       | … where x.lastname <> ?1                                       |
| In                 | findByAgeIn(Collection<Age> ages)                       | … where x.age in ?1                                            |
| NotIn              | findByAgeNotIn(Collection<Age> ages)                    | … where x.age not in ?1                                        |
| True               | findByActiveTrue()                                      | … where x.active = true                                        |
| False              | findByActiveFalse()                                     | … where x.active = false                                       |
| IgnoreCase         | findByFirstnameIgnoreCase                               | … where UPPER(x.firstname) = UPPER(?1)                         |

#### 關鍵字查詢方法定義範例 (Query keywords example)

```java
public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {

    // 根據名稱 查詢數據
    // 會轉換成 
    // select * from company c where c.name = ?1
    Company findByName(String name);

    // 檢查名稱是否存在
    boolean existsByName(String name);

    // 根據名稱刪除數據
    @Transactional // 通常會加在業務邏輯上
    @Modifying
    int deleteByName(String name);

    // 根據名稱 查詢數據
    // … where x.firstname like ?1
    List<Company> findAllByNameLike(String text);
}
```

### 3. 根據模型類查詢 (Query by Example)

[Spring query by example doc](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#query-by-example)

1. 只支持插查詢
   
   1. 不支持嵌套或分組的屬性約束，如 firstname=?0 or (firstanme=?1 and lastname=?2)
   
   2. 只支持字串 start/contanis/ends/regex 匹配和其他屬性類型的精準匹配。

#### 根據模型類查詢接口 (Interface QueryByExampleExecutor)

```java
public interface QueryByExampleExecutor<T> {

  <S extends T> S findOne(Example<S> example);

  <S extends T> Iterable<S> findAll(Example<S> example);

  // … more functionality omitted.
}
```

#### Example use

[StringMatcher options](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#query-by-example.running)

```java
    // 查詢符合模型類條件的所有數據
    @Test
    void testJpaQueryByExampleBase(){
        // 1. 查詢條件
        Company company = new Company();
        company.setName("han company");
        company.setArrears(5000);

        // 2. 透過 Example.of() 建構查詢條件
        Example example = Example.of(company);
        List<Company> companyList = (List<Company>) companyRepository.findAll(example);

        System.out.println(companyList);
    }

    // 定義查詢條件
    @Test
    void testJpaQueryByExampleWithExampleMatcher(){
        // 1. 查詢條件
        Company company = new Company();
//        company.setId(1L); // 給錯誤的 id
        company.setName("testdata");

        // 2. 建構條件匹配器，對條件行為進行設置
        ExampleMatcher matching = ExampleMatcher.matching()
                .withIgnorePaths("id") // 設置忽略列
//                .withIgnoreCase("name") // 設置列忽略大小寫匹配
//                .withStringMatcher(ExampleMatcher.StringMatcher.STARTING) // 對所有字串做開頭匹配
                .withMatcher("name", m -> m.contains().ignoreCase(true)); // (方法一) 對指定列做忽略大小寫匹配與包含匹配
//                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.endsWith().ignoreCase()); // (方法二) 對指定列做忽略大小寫匹配與結尾匹配

        // 3. 透過 Example.of() 建構查詢條件
        Example example = Example.of(company, matching);
        List<Company> companyList = (List<Company>) companyRepository.findAll(example);

        System.out.println(companyList);
    }
```

### 4. 規範查詢(Specifications)

- 在之前使用 Query by Example 只能對字串進行條件設置，那如果希望對所有類型支持，可以使用 Specifications

#### Example use

```java
    /**
     * 使用 Specifications 查詢
     * 單個 where 條件
     */
    @Test
    void testJpaQuerySpecificationsSingleWhere(){
        List<Company> companyList = companyRepository.findAll(new Specification<Company>() {
            @Override
            public Predicate toPredicate(Root<Company> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                // root, from Company, 獲取列
                // criteriaBuilder, where, 設定各種條件 (>, <, in, ...)
                // query, 組合(order by, where)

                // 1. 獲取列名
                Path<String> name = root.get("name");
                Path<Integer> arrears = root.get("arrears");
                Path<String> remark = root.get("remark");

                // 2. 設定 where 條件
                Predicate nameP = criteriaBuilder.equal(name, "testdata"); // 等於名稱

                // 3. 回傳條件
                return nameP;
            }
        });

        System.out.println(companyList);
    }

    /**
     * 使用 Specifications 查詢
     * 多個 where 條件
     */
    @Test
    void testJpaQuerySpecificationsMultipleWhere(){
        List<Company> companyList = companyRepository.findAll(new Specification<Company>() {
            @Override
            public Predicate toPredicate(Root<Company> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                // root, from Company, 獲取列
                // criteriaBuilder, where, 設定各種條件 (>, <, in, ...)
                // query, 組合(order by, where)

                // 1. 獲取列名
                Path<Long> id = root.get("id");
                Path<String> name = root.get("name");
                Path<Integer> arrears = root.get("arrears");
                Path<String> remark = root.get("remark");

                // 2. 設定 where 條件
                Predicate idP = criteriaBuilder.greaterThan(id, 1L); // id > ?
                CriteriaBuilder.In<String> nameP = criteriaBuilder.in(name).value("ming company").value("han company"); // name in (?,?)
                Predicate arrearsP = criteriaBuilder.between(arrears, 50, 10000); // arrears between ? and ?

                // 3. 組合 where 條件
                Predicate and = criteriaBuilder.and(idP, nameP, arrearsP);

                // 4. 回傳條件
                return and;
            }
        });

        System.out.println(companyList);
    }

    /**
     * 使用 Specifications 查詢
     * 排序 order by
     */
    @Test
    void testJpaQuerySpecificationsWhitSort(){
        List<Company> companyList = companyRepository.findAll(new Specification<Company>() {
            @Override
            public Predicate toPredicate(Root<Company> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                // root, from Company, 獲取列
                // criteriaBuilder, where, 設定各種條件 (>, <, in, ...)
                // query, 組合(order by, where)

                // 1. 獲取列名
                Path<Long> id = root.get("id");
                Path<String> name = root.get("name");
                Path<Integer> arrears = root.get("arrears");
                Path<String> remark = root.get("remark");

                // 2. 設定 where 條件
                Predicate idP = criteriaBuilder.greaterThan(id, 50L); // id > ?

                // 3. 設定 order 條件
                Order idO = criteriaBuilder.desc(id); // ORDER BY ? DESC

                // 4. 回傳條件
                return query.where(idP).orderBy(idO).getRestriction();
            }
        });

        System.out.println(companyList);
    }

    /**
     * 使用 Specifications 查詢
     * 動態使用範例
     */
    @Test
    void testJpaQuerySpecificationsDynamic(){

        // 模擬動態請求數據
        Company requestBody = new Company();
        requestBody.setName("ming");
        requestBody.setArrears(100);

        List<Company> companyList = companyRepository.findAll(new Specification<Company>() {
            @Override
            public Predicate toPredicate(Root<Company> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                // root, from Company, 獲取列
                // criteriaBuilder, where, 設定各種條件 (>, <, in, ...)
                // query, 組合(order by, where)

                // 1. 獲取列名
                Path<Long> id = root.get("id");
                Path<String> name = root.get("name");
                Path<Integer> arrears = root.get("arrears");
                Path<String> remark = root.get("remark");

                // 2. 建立條件參數清單
                List<Predicate> list = new ArrayList<>();
                if(requestBody.getId() != null){
                    list.add(criteriaBuilder.greaterThan(id, requestBody.getId()));
                }
                if(requestBody.getName() != null){
                    list.add(criteriaBuilder.like(name, requestBody.getName()));
                }
                if(requestBody.getArrears() != null){
                    list.add(criteriaBuilder.equal(arrears, requestBody.getArrears()));
                }
                Predicate and = criteriaBuilder.and(list.toArray(new Predicate[list.size()]));

                // 3. 設定 order 條件
                Order idO = criteriaBuilder.desc(id); // ORDER BY ? DESC

                // 4. 回傳條件
                return query.where(and).orderBy(idO).getRestriction();
            }
        });

        System.out.println(companyList);
    }
```

## IntellJ JPA Plugins (相關插件)

1. JPA Buddy : @Query sql 撰寫提示

# Hibernate

## 樂觀鎖

- 如果同一個實體被兩個對話更新，最後提交更改的通知會發生衝突，並且不會覆蓋另一個對話的工作. *這種方法保證了一定程度的隔離，但可以很好地擴展，並且在經常讀取有時寫入的*情況下效果特別好。

- 防止併發修改

```java
@Entity(name = "Person")
public static class Person {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "`name`")
    private String name;

    // 樂觀鎖，在每次數據更新時會+1，若下次要更新的版本不是依照當前版本跟新則會拋出異常
    @Version
    private long version;

    //Getters and setters are omitted for brevity

}
```
