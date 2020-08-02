package lexer;

import common.PeekIterator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ToknTests {

    void assertToken(Token token, String value, TokenType type) {
        assertEquals(type, token.getType());
        assertEquals(value, token.getValue());
    }

    @Test
    public void test_varOrKeyword() {
        var it1 = new PeekIterator<Character>("if abc".chars().mapToObj(x -> (char) x));
        var it2 = new PeekIterator<Character>("true abc".chars().mapToObj(x -> (char) x));
        var token1 = Token.makeVarOrKeyword(it1);
        var token2 = Token.makeVarOrKeyword(it2);

        assertToken(token1, "if", TokenType.KEYWORD);
        assertToken(token2, "true", TokenType.BOOLEAN);
        it1.next();

        var token3 = Token.makeVarOrKeyword(it1);
        assertToken(token3, "abc", TokenType.VARIABLE);
    }

    @Test
    public void test_makeString() throws LexicalException {
        String[] tests={
                "\"123\"",
                "\'123\'",
        };

        for(String test:tests){
            var it = new PeekIterator<Character>(test.chars().mapToObj(x->(char)x));
            var token=Token.makeString(it);
            assertToken(token,test,TokenType.STRING);
        }
    }
}
