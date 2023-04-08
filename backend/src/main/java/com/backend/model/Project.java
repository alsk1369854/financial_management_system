package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "project")
@Data // 自動添加 get、set、toString、hashcode 操作
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "contact_person_name")
    private String ContactPersonName;

    @Column(name = "contact_telephone_number")
    private String ContactTelephoneNumber;

    @Column(name = "contact_fax_number")
    private String contactFaxNumber;

    @Column(name = "address")
    @Temporal(TemporalType.DATE)
    private String Address;

    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "close_data")
    private Date closeDate;

    @Column(name = "status")
    private String status;


    @Column(name = "remark")
    private String Remark;

    /**
     * 單向關聯 (一對一)
     * cascade 設置關聯操作
     * - ALL,      所有持久化操作
     * - PERSIST,  只有插入才會執行關聯操作
     * - MERGE,    只有修改才會執行關聯操作
     * - REMOVE,   只有刪除才會執行關聯操作
     * - REFRESH,	假设场景 有一个订单,订单里面关联了许多商品,这个订单可以被很多人操作,那么这个时候A对此订单和关联的商品进行了修改,与此同时,B也进行了相同的操作,但是B先一步比A保存了数据,那么当A保存数据的时候,就需要先刷新订单信息及关联的商品信息后,再将订单及商品保存。
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
