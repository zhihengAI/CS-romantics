package translator.symbol;

import lexer.Token;

public class Symbol {
    // union 联合设置
    SymbolTable parent;
    Token lexeme;
    String label;
    int offset;
    int layerOffset = 0; // 用来记录层级关系的 offset
    SymbolType type;

    public Symbol(SymbolType type) {
        this.type = type;
    }

    // 三个工厂构造函数
    public static Symbol createAddressSymbol(Token lexeme, int offset) {
        var symbol = new Symbol(SymbolType.ADDRESS_SYMBOL);
        symbol.lexeme = lexeme;
        symbol.offset = offset;
        return symbol;
    }

    public static Symbol createImmediateSymbol(Token lexeme) {
        var symbol = new Symbol(SymbolType.IMMEDIATE_SYMBOL);
        symbol.lexeme = lexeme;
        return symbol;
    }

    public static Symbol createLabelSymbol(String label, Token lexeme) {
        var symbol = new Symbol(SymbolType.LABEL_SYMBOL);
        symbol.lexeme = lexeme;
        symbol.label = label;
        return symbol;
    }

    // 把（上面构造函数的）符号彻底的复制一份
    public Symbol copy() {
        var symbol = new Symbol(this.type);
        symbol.lexeme = this.lexeme;
        symbol.label = this.label;
        symbol.offset = this.offset;
        symbol.layerOffset = this.layerOffset;
        symbol.type = this.type;
        return symbol;
    }

    // 一些常规的方法
    // 设置 parent
    public void serParent(SymbolTable parent) {
        this.parent = parent;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getOffset() {
        return this.offset;
    }

    public SymbolType getType() {
        return this.type;
    }

    @Override
    public String toString() {
        switch (this.type) {
            case ADDRESS_SYMBOL:
            case LABEL_SYMBOL:
                return lexeme.getValue();
            case IMMEDIATE_SYMBOL:
                return label;
        }
        return "";
    }

    public void setLexeme(Token lexeme) {
        this.lexeme = lexeme;
    }


    public Token getLexeme() {
        return this.lexeme;
    }

    public void setLayerOffset(int offset) {
        this.layerOffset = offset;
    }

    public int getLayerOffset() {
        return this.layerOffset;
    }

    public String getLabel() {
        return this.label;
    }
}
