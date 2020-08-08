package parser.ast;

public abstract class Stmt extends ASTNode {
    public Stmt(ASTNode _parent, ASTNodeTypes _type, String _label) {
        super(_parent, _type, _label);
    }
}
