package parser;

// 因子（等号两边那些东西）类，可以用来运算等
public abstract class Factor extends ASTNode {
    public Factor(ASTNode _parent, ASTNodeTypes _type, String _label) {
        super(_parent, _type, _label);
    }
}
