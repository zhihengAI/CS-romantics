package parser.ast;

public class FunctionDeclareStmt extends Stmt {
    public FunctionDeclareStmt(ASTNode _parent) {
        super(_parent, ASTNodeTypes.FUNCTION_DECLARE_STMT, "func");
    }
}
