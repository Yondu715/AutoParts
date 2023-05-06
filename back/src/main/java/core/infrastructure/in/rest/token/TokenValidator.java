package core.infrastructure.in.rest.token;

import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class TokenValidator {

    private static final Key key = TokenKey.getInstance().getKey();

    public static Boolean validate(String token) throws Exception {
        try {
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
        } catch (JwtException e) {
            throw new Exception("Invalid JWT");
        }
    }
}
