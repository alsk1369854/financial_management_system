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
class BackendApplicationTests {

	@Test
	void test(){

	}
}
