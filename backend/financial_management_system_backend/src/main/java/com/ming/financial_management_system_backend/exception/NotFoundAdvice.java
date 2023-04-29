package com.ming.financial_management_system_backend.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class NotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> exceptionHandler(HttpServletRequest request, NotFoundException exception){
        Map<String, Object> errorMap = new HashMap<>();

//        {
//            "timestamp": "2023-04-29T07:37:05.597+00:00",
//                "status": 404,
//                "error": "Not Found",
//                "path": "/project/1"
//        }
        errorMap.put("timestamp", new Date());
        errorMap.put("status", HttpStatus.NOT_FOUND.value());
        errorMap.put("error", exception.getMessage());
        errorMap.put("path", request.getRequestURI().substring(request.getContextPath().length()));

        return errorMap;
    }
}
