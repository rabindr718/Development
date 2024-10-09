package com.journalist.journalist.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {
    @GetMapping("/test-java")
    public String devteeofLord(){
        return "Shree Dwarkadhish";
    }

}
