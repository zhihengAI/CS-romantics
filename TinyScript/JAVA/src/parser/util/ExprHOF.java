package parser.util;

import parser.ast.ASTNode;

// HOF : High order function 高阶函数（即函数参数传到函数里面的函数当参数）
@FunctionalInterface // java 提供的 函数式编程 的接口
public interface ExprHOF {
    ASTNode hoc() throws ParseException;
}
