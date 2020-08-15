package translator.symbol;

import lexer.Token;
import lexer.TokenType;

import java.util.ArrayList;

public class SymbolTable {
    public SymbolTable parent = null;
    // ArrayList 可以自动扩容
    private ArrayList<SymbolTable> children;
    private ArrayList<Symbol> symbols;

    /**
     * 为三地址码临时创建的变量分配记录 id 的
     * 如：var a = 1+2*3
     * p0=2*3，这时 temIndex 就给 p0 分配个id
     */
    private int temIndex = 0;

    /**
     * 为创建的变量记录 offset 索引，如：
     * var a = 1;
     * var b = 1;
     * var c = 3;
     * 此时 offsetInde 就记录他们的 offset index，写入内存时就参照这个index
     */
    private int offsetIndex = 0;

    // 当前节点距离根结点的距离
    private int level = 0;

    public SymbolTable() {
        this.children = new ArrayList<>();
        this.symbols = new ArrayList<>();
    }

    // 为当前结点添加子结点
    public void addSymbol(Symbol symbol) {
        this.symbols.add(symbol);
        symbol.parent = this;
    }

    public boolean exists(Token lexeme) {
        var _symbol = this.symbols.stream()
                .filter(x -> x.lexeme.getValue().equals(lexeme.getValue()))
                .findFirst();
        if (!_symbol.isEmpty()) {
            return true;
        }

        if (this.parent != null) {
            return this.parent.exists(lexeme);
        }

        return false;
    }

    public Symbol cloneFromSymbolTree(Token lexeme, int layoutOffset) {
        var _symbol = this.symbols.stream()
                .filter(x -> x.lexeme.getValue().equals(lexeme.getValue()))
                .findFirst();

        if (!_symbol.isEmpty()) {
            var symbol = _symbol.get().copy();
            symbol.setLayerOffset(layoutOffset);
            return symbol;
        }

        if (this.parent != null) {
            return this.parent.cloneFromSymbolTree(lexeme, layoutOffset + 1);
        }

        return null;
    }

    public Symbol createSymbolByLexeme(Token lexeme) {
        Symbol symbol = null;

        // 如果是个标量
        if (lexeme.isScalar()) {
            symbol = Symbol.createImmediateSymbol(lexeme);
        } else {
            // 如果是变量之类的要先克隆，以便记录 layerOffset 层数
            symbol = cloneFromSymbolTree(lexeme, 0);

            if (symbol == null) {
                symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++);
            }
        }
        this.symbols.add(symbol);
        return symbol;
    }

    // 创建临时变量
    public Symbol createVariable() {
        var lexeme = new Token(TokenType.VARIABLE, "p" + this.temIndex++);
        var symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++);
        this.addSymbol(symbol);
        return symbol;
    }

    // 为它增加一个子符号表
    public void addChild(SymbolTable child) {
        child.parent = this;
        child.level = this.level + 1;
        this.children.add(child);
    }

    // 查看当前符号表占据了多大的空间
    public int localSize() {
        return this.offsetIndex;
    }

    public ArrayList<SymbolTable> getChildren() {
        return this.children;
    }

    public void createLabel(String label, Token lexeme) {
        var labelSymbol = Symbol.createLabelSymbol(label, lexeme);
        this.addSymbol(labelSymbol);
    }
}
