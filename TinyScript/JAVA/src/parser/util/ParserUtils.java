package parser.util;

import jdk.jshell.spi.ExecutionControl;
import parser.ast.ASTNode;

// 为 Parser 提供的静态的方法
public class ParserUtils {
    // 树的后序遍历，来遍历语法树表达式
    public static String toPostfixExpression(ASTNode node) throws ExecutionControl.NotImplementedException {
        // left op right -> left right op
        String leftStr = "";
        String rightStr = "";

        switch (node.getType()) {
            case BINARY_EXPR:
                leftStr = toPostfixExpression(node.getChild(0));
                rightStr = toPostfixExpression(node.getChild(1));
                return leftStr + " " + rightStr + " " + node.getLexeme().getValue();
            case VARIABLE:
            case SCALAR:
                return node.getLexeme().getValue();
        }

        throw new ExecutionControl.NotImplementedException("not impl.");
    }
}
