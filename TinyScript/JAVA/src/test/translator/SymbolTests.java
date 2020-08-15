package translator;

import lexer.Token;
import lexer.TokenType;
import org.junit.jupiter.api.Test;
import translator.symbol.Symbol;
import translator.symbol.SymbolTable;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SymbolTests {
    @Test
    public void symbolTable() {
        var symbolTable = new SymbolTable();
        symbolTable.createLabel("L0", new Token(TokenType.VARIABLE, "foo"));
        symbolTable.createVariable();
        symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "a"));

        assertEquals(2, symbolTable.localSize());
    }

    @Test
    public void chain() {
        var symbolTable = new SymbolTable();
        symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "a"));

        var childTable = new SymbolTable();
        symbolTable.addChild(childTable);
        var childchildTable = new SymbolTable();
        childTable.addChild(childchildTable);

        assertEquals(true, childTable.exists(new Token(TokenType.VARIABLE, "a")));
        assertEquals(true, childchildTable.exists(new Token(TokenType.VARIABLE, "a")));
    }

    @Test
    public void symbolOffset() {
        var symbolTable = new SymbolTable();
        symbolTable.createSymbolByLexeme(new Token(TokenType.INTEGER, "100"));
        var symbolA = symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "a"));
        var symbolB = symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "b"));

        var childTable = new SymbolTable();
        symbolTable.addChild(childTable);

        var anotherSYmbolB = childTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "b"));
        var symbolC = childTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "c"));

        assertEquals(0, symbolA.getOffset());
        assertEquals(1, symbolB.getOffset());
        assertEquals(1, anotherSYmbolB.getOffset());
        assertEquals(1, anotherSYmbolB.getLayerOffset());
        assertEquals(0, symbolC.getOffset());
        assertEquals(0, symbolC.getLayerOffset());
    }
}
