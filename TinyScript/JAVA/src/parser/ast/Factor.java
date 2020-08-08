package parser.ast;

import lexer.TokenType;
import parser.util.PeekTokenIterator;

// 因子（等号两边那些东西）类，可以用来运算等
public abstract class Factor extends ASTNode {
    public Factor(ASTNode _parent, PeekTokenIterator it) {
        super(_parent);
        var token = it.next();
        var type = token.getType();

        // 凭借下个流数据判断类型
        if (type == TokenType.VARIABLE) {
            this.type = ASTNodeTypes.VARIABLE;
        } else {
            this.type = ASTNodeTypes.SCALAR;
        }

        this.label = token.getValue();
        this.lexeme = token;
    }
}
