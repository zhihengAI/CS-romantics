package lexer;

import common.PeekIterator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ToknTests {

    void assertToken(Token token, String value, TokenType type) {
        assertEquals(type, token.getType());
        assertEquals(value, token.getValue());
    }

    /**
     * 测试 判断变量或关键字词 功能函数是否编码正确
     */
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

    /**
     * 测试 make字符串 功能函数是否编码正确
     */
    @Test
    public void test_makeString() throws LexicalException {
        String[] tests = {
                "\"123\"",
                "\'123\'",
        };

        for (String test : tests) {
            var it = new PeekIterator<Character>(test.chars().mapToObj(x -> (char) x));
            var token = Token.makeString(it);
            assertToken(token, test, TokenType.STRING);
        }
    }

    /**
     * 测试 make操作符 功能函数是否编码正确
     */
    @Test
    public void test_makeOperator() throws LexicalException {
        String[] tests = {
                "+ xxx",
                "++mmm",
                "/=g",
                "==1",
                "&=3982",
                "&777",
                "||xxx",
                "^=111",
                "%7"
        };

        String[] results = {"+", "++", "/=", "==", "&=", "&", "||", "^=", "%"};

        int i = 0;
        for (String test : tests) {
            var it = new PeekIterator<Character>(test.chars().mapToObj(x -> (char) x));
            var token = Token.makeOp(it);
            assertToken(token, results[i++], TokenType.OPERATOR);
        }
    }

    /**
     * 测试 make数值类型 功能函数是否编码正确
     */
    @Test
    public void test_makeNumber() throws LexicalException {
        String[] tests = {
                "+0 aa",
                "-0 bb",
                ".3 ccc ",
                ".555 ddd",
                "789.8812 eee",
                "-1000.134234*2344"
        };

        for (String test : tests) {
            var it = new PeekIterator<Character>(test.chars().mapToObj(x -> (char) x));
            var token = Token.makeNumber(it);
            var splitValue = test.split("[* ]+");

            assertToken(token, splitValue[0],
                    (test.indexOf('.') != -1) ? TokenType.FLOAT : TokenType.INTEGER
            );
        }
    }
}
