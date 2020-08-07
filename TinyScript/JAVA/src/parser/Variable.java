package parser;

public class Variable extends Factor {
    public Variable(ASTNode _parent) {
        super(_parent, ASTNodeTypes.VARIABLE, "");
    }
}
