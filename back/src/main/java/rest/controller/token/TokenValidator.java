package rest.controller.token;

import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;

public class TokenValidator {
    
    public static Boolean validate(String token) throws Exception {
        if (token.equals("null")) return false;
        try {
            TokenKey tokenKey = TokenKey.getInstance();
            Key key = tokenKey.getKey();
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            Claims body = claims.getBody();
            String compactJws = Jwts.builder()
                    .setClaims(body)
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();
            if (token.equals(compactJws)) return true;
            return false;
        } catch (ExpiredJwtException | MalformedJwtException | SecurityException | UnsupportedJwtException
                | IllegalArgumentException e) {
            throw new Exception("Invalid JWT");
        }
    }
}
