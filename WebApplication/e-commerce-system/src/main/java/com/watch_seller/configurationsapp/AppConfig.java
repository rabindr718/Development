//package com.watch_seller.configurationsapp;
//
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//
//import java.util.Arrays;
//import java.util.Collections;
//
//@Configuration
//public class AppConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        // Configure CORS
//        http.cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
//                    @Override
//                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//                        CorsConfiguration cfg = new CorsConfiguration();
//                        cfg.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:4200")); // Allowed origins
//                        cfg.setAllowedMethods(Collections.singletonList("*")); // Allow all methods
//                        cfg.setAllowCredentials(true); // Allow credentials
//                        cfg.setAllowedHeaders(Collections.singletonList("*")); // Allow all headers
//                        cfg.setExposedHeaders(Arrays.asList("Authorization")); // Expose specific headers
//                        cfg.setMaxAge(3600L); // Cache duration for CORS preflight requests
//                        return cfg;
//                    }
//                }))
//                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers("/api/**").authenticated() // Require authentication for /api/** endpoints
//                        .anyRequest().permitAll() // Allow all other requests
//                )
//                .sessionManagement(sessionManagement ->
//                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Set session policy to stateless
//                )
//                .httpBasic() // Enable HTTP Basic Authentication
//                .and()
//                .formLogin() // Enable form login
//                .and()
//                .csrf(csrf -> csrf.disable()); // Disable CSRF protection for stateless APIs
//
//        return http.build(); // Return the built SecurityFilterChain
//    }
//}



//Below code for Previous Versions till 6.1


package com.watch_seller.configurationsapp;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collections;

@Configuration
public class AppConfig {
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        //HERE FOR DiABLE Inbuilt SessionPolicy we will  own policy
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeHttpRequests(Authorize->Authorize.requestMatchers("/api/**").authenticated().anyRequest().permitAll())
                .addFilterBefore(new JWTValidator(), BasicAuthenticationFilter.class).csrf().disable()
                .cors().configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration cfg=new CorsConfiguration();
                        cfg.addAllowedOrigin(Array.asList(
                                "http://localhost:3000",
                                "http://localhost:4200"
                        ));
                        cfg.setAllowedMethods(Collections.singletonList("*"));
                        cfg.setAllowCredentials(true);
                        cfg.setAllowedHeaders(Collections.singletonList("*"));
                        cfg.setExposedHeaders(Arrays.asList("Authoriazation"));
                        cfg.setMaxAge(3600L);

                        return null;
                    }
                }).and().httpBasic().and().formLogin();
                return http.build();
    }
    // Encode Password for Databases;
    @Bean
public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
}
}
