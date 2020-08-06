package lexer;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LexerTests {
    // 为啥这个函数不单独提取出来复用呢？因为在软件开发领域有个原则叫 principle three
    // 即一个函数复用超过三次才单独提取出来，加上我们自己评估以后也不会用这个函数了，所以不单独提取了
    void assertToken(Token token, String value, TokenType type) {
        assertEquals(type, token.getType());
        assertEquals(value, token.getValue());
    }

    // 测试表达式
    @Test
    public void test_expression() throws LexicalException {
        // new 一个词法分析器
        var lexer = new Lexer();
        // 这是待分析的字符串
        var source = "(a+b)^100.12==+100-20";
        var tokens = lexer.analyse(source.chars().mapToObj(x -> (char) x));

        assertEquals(11, tokens.size());
        assertToken(tokens.get(0), "(", TokenType.BRACKET);
        assertToken(tokens.get(1), "a", TokenType.VARIABLE);
        assertToken(tokens.get(2), "+", TokenType.OPERATOR);
        assertToken(tokens.get(3), "b", TokenType.VARIABLE);
        assertToken(tokens.get(4), ")", TokenType.BRACKET);
        assertToken(tokens.get(5), "^", TokenType.OPERATOR);
        assertToken(tokens.get(6), "100.12", TokenType.FLOAT);
        assertToken(tokens.get(7), "==", TokenType.OPERATOR);
        assertToken(tokens.get(8), "+100", TokenType.INTEGER);
        assertToken(tokens.get(9), "-", TokenType.OPERATOR);
        assertToken(tokens.get(10), "20", TokenType.INTEGER);
    }

    // 测试简单函数
    @Test
    public void test_function() throws LexicalException {
        var lexer = new Lexer();
        var source = "func foo(a, b) {\n" +
                "print(a+b)\n" +
                "}\n" +
                "foo(-100.0, 100)";
        var tokens = lexer.analyse(source.chars().mapToObj(x -> (char) x));

        assertToken(tokens.get(0), "func", TokenType.KEYWORD);
        assertToken(tokens.get(1), "foo", TokenType.VARIABLE);
        assertToken(tokens.get(2), "(", TokenType.BRACKET);
        assertToken(tokens.get(3), "a", TokenType.VARIABLE);
        assertToken(tokens.get(4), ",", TokenType.OPERATOR);
        assertToken(tokens.get(5), "b", TokenType.VARIABLE);
        assertToken(tokens.get(6), ")", TokenType.BRACKET);
        assertToken(tokens.get(7), "{", TokenType.BRACKET);
        assertToken(tokens.get(8), "print", TokenType.VARIABLE);
        assertToken(tokens.get(9), "(", TokenType.BRACKET);
        assertToken(tokens.get(10), "a", TokenType.VARIABLE);
        assertToken(tokens.get(11), "+", TokenType.OPERATOR);
        assertToken(tokens.get(12), "b", TokenType.VARIABLE);
        assertToken(tokens.get(13), ")", TokenType.BRACKET);
        assertToken(tokens.get(14), "}", TokenType.BRACKET);
        assertToken(tokens.get(15), "foo", TokenType.VARIABLE);
        assertToken(tokens.get(16), "(", TokenType.BRACKET);
        assertToken(tokens.get(17), "-100.0", TokenType.FLOAT);
        assertToken(tokens.get(18), ",", TokenType.OPERATOR);
        assertToken(tokens.get(19), "100", TokenType.INTEGER);
        assertToken(tokens.get(20), ")", TokenType.BRACKET);
    }

    // 测试删除注释
    @Test
    public void test_deleteComment() throws LexicalException {
        var source = "/*123123123\n123123123*/a=1";
        var lexer = new Lexer();
        var tokens=lexer.analyse(source.chars().mapToObj(x->(char)x));

        // 如果我们的功能编写对了，那么注释内容会被删除
        // 即有效内容只有 a=1，对应的是 VARIABLE,OPERATOR,NUMBER
        assertEquals(3,tokens.size());
    }
}
