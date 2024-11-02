package com.watch_seller.configurationsapp;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;

public class JWTValidator extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt=request.getHeader(JWTConstant.JWT_HEADER);
        if(jwt!=null){
            jwt=jwt.substring(7);
            try{
                SecretKey key=Keys.hmacShaKeyFor(JWTConstant.SECTRET_KEY.getBytes());
                Claims claims=Jwts.parseBuilder().setSigningKey(key).build().parseClaimsJwt(jwt).getBody();
            }
        }

    }
}
