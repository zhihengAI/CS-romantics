package lexer;

import common.AlphabetHelper;
import common.PeekIterator;

import java.security.AlgorithmParameterGenerator;
import java.util.ArrayList;
import java.util.stream.Stream;

public class Lexer {
    /**
     * 把词法分析器的各个功能联立起来
     *
     * @param source
     * @return
     */
    public ArrayList<Token> analyse(Stream source) throws LexicalException {
        var tokens = new ArrayList<Token>();
        var it = new PeekIterator<Character>(source, (char) 0);

        while (it.hasNext()) {
            char c = it.next();

            // 0 就是我们的结尾
            if (c == 0) {
                break;
            }

            char lookahead = it.peek();
            // System.out.println("c: " + c + " |||||  look: " + lookahead);

            if (c == ' ' || c == '\n') {
                continue;
            }

            // 删除注释
            if (c == '/') {
                if (lookahead == '/') {
                    while (it.hasNext() && (c = it.next()) != '\n') {
                    }
                    continue;
                } else if (lookahead == '*') {
                    it.next(); // 多读一个 *，避免 /*/ 通过
                    boolean vaild = false;
                    while (it.hasNext()) {
                        char p = it.next();
                        if (p == '*' && it.peek() == '/') {
                            it.next();
                            vaild = true;
                            break;
                        }
                    }
                    if (!vaild) {
                        throw new LexicalException("comments not match");
                    }
                    continue;
                }
            }

            if (c == '{' || c == '}' || c == '(' || c == ')') {
                tokens.add(new Token(TokenType.BRACKET, c + ""));
                continue;
            }

            // 如果读取到了 单/双引号，就把从读取的引号的位置传给 makeString 来创建字符串
            if (c == '"' || c == '\'') {
                it.putBack();
                tokens.add(Token.makeString(it));
                continue;
            }

            // 处理字母情况（变量或关键字词）
            if (AlphabetHelper.isLetter(c)) {
                it.putBack();
                tokens.add(Token.makeVarOrKeyword(it));
                continue;
            }

            // 数字情况
            if (AlphabetHelper.isNumber(c)) {
                it.putBack();
                tokens.add(Token.makeNumber(it));
                continue;
            }

            // 不只是读取到数字才会触发 makeNumber，正负号也会
            // +: 3+5, +5, 3 * -5, 3.5 有这几种情况
            if (c == '+' || c == '-' || c == '.' && AlphabetHelper.isNumber(lookahead)) {
                // 拿到上一个入 tokens 的字符
                var lastToken = tokens.size() == 0 ? null : tokens.get(tokens.size() - 1);

                if (lastToken == null || !lastToken.isValue() || lastToken.isOperator()) {
                    it.putBack();
                    tokens.add(Token.makeNumber(it));
                    continue;
                }

            }

            if (AlphabetHelper.isOperator(c)) {
                it.putBack();
                tokens.add(Token.makeOp(it));
                continue;
            }

            throw new LexicalException(c);
        } // end while

        return tokens;
    }
}
