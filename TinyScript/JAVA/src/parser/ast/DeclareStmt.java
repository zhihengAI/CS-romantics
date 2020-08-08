package parser.ast;

public class DeclareStmt extends Stmt {
    public DeclareStmt(ASTNode _parent) {
        super(_parent, ASTNodeTypes.DECLARE_STMT, "declare");
    }
}
