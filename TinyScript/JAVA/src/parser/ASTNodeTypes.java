package parser;

/**
 * 给 parser 定义的 ASTNodeType，来识别当前流数据是 if 语句还是 switch等
 */
public enum ASTNodeTypes {
    BLOCK,
    BINARY_EXPR, // 1+1
    UNARY_EXPR,  // ++i 这种类型
    VARIABLE,    // 变量
    SCALAR,      // 标量，如：1.0 true 这些
    IF_STMT,     // if 语句
    WHILE_STMT,  // while 语句
    FOR_STMT,    // for 语句
    ASSIGN_STMT, // 赋值语句
    FUNCTION_DECLARE_STMT, // 函数声明
    DECLARE_STMT
}