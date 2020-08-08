package parser.ast;

import parser.util.PeekTokenIterator;

public class Scalar extends Factor {
    public Scalar(ASTNode _parent, PeekTokenIterator it) {
        super(_parent, it);
    }
}
