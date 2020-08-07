package parser;

public class Scalar extends Factor {
    public Scalar(ASTNode _parent) {
        super(_parent, ASTNodeTypes.SCALAR, null);
    }
}
