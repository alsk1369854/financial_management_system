package com.ming.financial_management_system_backend;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;


@OpenAPIDefinition(info = @Info(title = "Financial Management System APIs", version = "1.0.0"))
@ServletComponentScan
@SpringBootApplication
public class FinancialManagementSystemBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinancialManagementSystemBackendApplication.class, args);
	}

}
