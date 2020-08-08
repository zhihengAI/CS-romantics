package parser.ast;

public class ForStmt extends Stmt {
    public ForStmt(ASTNode _parent) {
        super(_parent, ASTNodeTypes.FOR_STMT, "for");
    }
}
