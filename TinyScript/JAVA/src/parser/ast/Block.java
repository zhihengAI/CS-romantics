package parser.ast;

public class Block extends Stmt {
    public Block(ASTNode _parent) {
        super(_parent, ASTNodeTypes.BLOCK, "block");
    }
}
