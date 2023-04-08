package com.backend;

import com.backend.model.Company;
import com.backend.repository.CompanyRepository;
import jakarta.persistence.criteria.*;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class JpaBaseUseTests {

    @Autowired
    CompanyRepository companyRepository;

    @Test
    void testJpaSave(){
        // 新增數據, 未帶主鍵則創建新值
        // 更新數據, 帶主鍵則更新主鍵ID對應的值
        Company company = new Company();
//		company.setId(152L); // 帶主鍵則更新主鍵ID對應的值
        company.setName("testdata");
        company.setArrears(100);
        company.setRemark("test remark");

        Company save = companyRepository.save(company);
        System.out.println(save); // Company{id=302, name='test', arrears=100, remark='test remark'}
    }

    @Test
    void testJpaFindByID(){
        // 查詢,根據主鍵查詢
        Optional<Company> optional = companyRepository.findById(1L);
        System.out.println(optional.get());
    }

    @Test
    void testJpaDelete(){
        // 根據實體刪除
        Company company = new Company();
        company.setName("test");

        companyRepository.delete(company);
    }

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

    @Test
    void testJpaFindAllWithSort(){
        // 根據 "Company.arrears" 降續
        Sort sort1 = Sort.by("arrears").descending();
        // 根據 "Company.id" 升續
        Sort sort2 = Sort.by("id").ascending();
        // 根據 "Company.arrears" 降續, 在根據 "Company.id" 升續
        Sort sort3 = sort1.and(sort2);

        List<Company> companyList = companyRepository.findAll(sort3);
        System.out.println(companyList);
    }


    @Test
    void testJpaUseJpalQueryRead(){
        List<Company> company = companyRepository.findByNameContainsText("company");
        System.out.println(company);
    }

    @Test
    @Transactional
        // 此邏輯是一個事務處理邏輯
    void testJpaUseJpalQueryUpdate(){
        int changeLine = companyRepository.updateNameById("update name", 252L);
        System.out.println(changeLine);
    }

    @Test
    void testJpaUseJpalQueryDelete(){
        int changeLine = companyRepository.deleteByName("test update");
        System.out.println(changeLine);
    }

    @Test
    void testJapUseJaplQueryInsert(){
        int changeLine = companyRepository.insertSelectDataById(252L);
        System.out.println(changeLine);
    }

    @Test
    void  testNativeQuery(){
        List<Company> companyList = companyRepository.findByArrearsUseSql(100);
        System.out.println(companyList);
    }

    @Test
    void testJpaQueryKeywordsQuery1(){
        Company com = companyRepository.findByName("han company");
        System.out.println(com);
    }

    @Test
    void testJpaQueryKeywordsQuery2(){
        List<Company> companyList = companyRepository.findAllByNameLike("%company%");
        System.out.println(companyList);
    }

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

    @Test
    void testJpaQueryByExampleWithExampleMatcher(){
        // 1. 查詢條件
        Company company = new Company();
//		company.setId(1L); // 給錯誤的 id
        company.setName("testdata");

        // 2. 建構條件匹配器，對條件行為進行設置
        ExampleMatcher matching = ExampleMatcher.matching()
                .withIgnorePaths("id") // 設置忽略列
//				.withIgnoreCase("name") // 設置列忽略大小寫匹配
//				.withStringMatcher(ExampleMatcher.StringMatcher.STARTING) // 對所有字串做開頭匹配
                .withMatcher("name", m -> m.contains().ignoreCase(true)); // (方法一) 對指定列做忽略大小寫匹配與包含匹配
//				.withMatcher("name", ExampleMatcher.GenericPropertyMatchers.endsWith().ignoreCase()); // (方法二) 對指定列做忽略大小寫匹配與結尾匹配

        // 3. 透過 Example.of() 建構查詢條件
        Example example = Example.of(company, matching);
        List<Company> companyList = (List<Company>) companyRepository.findAll(example);

        System.out.println(companyList);
    }

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
}
