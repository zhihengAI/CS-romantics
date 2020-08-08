package parser.ast;

import lexer.Token;

import java.util.ArrayList;
import java.util.List;

public abstract class ASTNode {
    /* 树 */
    protected ArrayList<ASTNode> children = new ArrayList<>();
    protected ASTNode parent;

    /* 关键信息 */
    protected Token lexeme; // 词法单元
    protected String label; // 备注（标签）
    protected ASTNodeTypes type; // 当前 ASTNode 的类型

    public ASTNode(ASTNode _parent) {
        this.parent = _parent;
    }

    public ASTNode(ASTNode _parent, ASTNodeTypes _type, String _label) {
        this.parent = _parent;
        this.type = _type;
        this.label = _label;
    }

    public ASTNode getChild(int index) {
        return this.children.get(index);
    }

    public void addChild(ASTNode node) {
        children.add(node);
    }

    public Token getLexeme() {
        return lexeme;
    }

    public void setLexeme(Token token) {
        this.lexeme = token;
    }

    public String getLabel() {
        return this.label;
    }

    public void setLabel(String s) {
        this.label = s;
    }

    public ASTNodeTypes getType() {
        return this.type;
    }

    public void setType(ASTNodeTypes type) {
        this.type = type;
    }

    // 这个方法有点危险
    public List<ASTNode> getChildren() {
        return children;
    }

    public void print(int indent) {
        if (indent == 0) {
            System.out.println("print:" + this);
        }

        for (int i = 0; i < indent * 2; i++) {
            System.out.print(" ");
        }
        System.out.println(label);
        for (var child : children) {
            child.print(indent + 1);
        }
    }
}
