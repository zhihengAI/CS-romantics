package parser.ast;

import parser.util.PeekTokenIterator;

public class Variable extends Factor {
    public Variable(ASTNode _parent, PeekTokenIterator it) {
        super(_parent, it);
    }
}
