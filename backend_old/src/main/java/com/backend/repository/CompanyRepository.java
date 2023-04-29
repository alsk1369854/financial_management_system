package com.backend.repository;

import com.backend.model.Company;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {

    // 根據名稱查詢數據 (不寫 SELECT *)
    @Query("FROM Company WHERE name LIKE %:text%")
    List<Company> findByNameContainsText(@Param("text") String text);

    @Modifying // 通知 spring data jpa 這是一個 (增|刪|改) 操作
    @Query("UPDATE Company as c set c.name=:name WHERE id=:id")
    int updateNameById(
            @Param("name") String name,
            @Param("id") Long id);

    @Transactional
    @Modifying
    @Query("DELETE From Company as c WHERE c.name = :name")
    int deleteByName(@Param("name") String name);

    @Transactional
    @Modifying
    @Query("INSERT into Company(name,arrears) select c.name, c.arrears from Company as c where c.id = :id") //
    int insertSelectDataById(@Param("id") Long id);

    // 使用原生的 SQL 語法
    @Query(value = "SELECT * FROM company as c where c.arrears = :arrears", nativeQuery = true)
    List<Company> findByArrearsUseSql(@Param("arrears") Integer arrears);


    Company findByName(String name);

    boolean existsByName(String name);

    @Transactional
    @Modifying
    int deleteById(String name);

    List<Company> findAllByNameLike(String text);
}
