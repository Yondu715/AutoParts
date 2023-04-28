package infrastructure.rest.token;

import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;

public class TokenValidator {

    public static Boolean validate(String token) throws Exception {
        try {
            TokenKey tokenKey = TokenKey.getInstance();
            Key key = tokenKey.getKey();
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            String compactJws = Jwts.builder()
                    .setClaims(claims)
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();
            return token.equals(compactJws);
        } catch (ExpiredJwtException | MalformedJwtException | SecurityException | UnsupportedJwtException
                | IllegalArgumentException e) {
            throw new Exception("Invalid JWT");
        }
    }
}
