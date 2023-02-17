package rest.controller.token;

import java.security.Key;

import javax.crypto.spec.SecretKeySpec;

public class TokenKey {
    private Key key;
    private static TokenKey instance;

    private TokenKey() {
        String secretKey = "uvHhxTkFZcZSh64LTupgxu1ABRtgjbGg84oiJaTH25UnWsHhncYJnHDv4nPMPtG5Nn2VHzgdSm0lcvRqiF7Qn9FLyG2OrTu5BqGIZ0E55l0N53FmghwgyaSuSvttzLFDmTxN95EM49y46o1bxw4L2rt8JgLSSpoA6GyvPIsMBVYhcxqKy7q1Yn29C0tw4K1WpoqgbnA7ztLfFMr76iityPnfZqZ7B3VwzViJ0kVldixEJhHbDhqbcvPfAbOseiSL";
        byte[] keyBytes = secretKey.getBytes();
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public static TokenKey getInstance() {
        if (instance == null) {
            instance = new TokenKey();
        }
        return instance;
    }

    public Key getKey() {
        return this.key;
    }
}
