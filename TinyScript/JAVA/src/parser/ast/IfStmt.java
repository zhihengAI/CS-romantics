package parser.ast;

public class IfStmt extends Stmt {
    public IfStmt(ASTNode _parent) {
        super(_parent, ASTNodeTypes.IF_STMT, "if");
    }
}
