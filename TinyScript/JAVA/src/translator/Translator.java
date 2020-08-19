package translator;

import org.apache.commons.lang3.NotImplementedException;
import parser.ast.ASTNode;
import parser.ast.ASTNodeTypes;
import parser.util.ParseException;
import translator.symbol.Symbol;
import translator.symbol.SymbolTable;

public class Translator {
    public TAProgram translate(ASTNode astNode) throws ParseException {
        var program = new TAProgram();

        var symbolTable = new SymbolTable();
        for (var child : astNode.getChildren()) {
            translateStmt(program, child, symbolTable);
        }

        return program;
    }

    public void translateStmt(TAProgram program, ASTNode node, SymbolTable symbolTable) throws ParseException {
        switch (node.getType()) {
            case ASSIGN_STMT:
                translateAssignStmt(program, node, symbolTable);
                return;
            case DECLARE_STMT:
                translateDeclareStmt(program, node, symbolTable);
                return;
        }
        throw new NotImplementedException("Translator not impl. for " + node.getType());
    }

    public void translateDeclareStmt(TAProgram program, ASTNode node, SymbolTable symbolTable) throws ParseException {
        var lexeme = node.getChild(0).getLexeme();
        if (symbolTable.exists(lexeme)) {
            throw new ParseException("Syntax Error, Identifier " + lexeme.getValue() + " is already defind");
        }

        var assigned = symbolTable.createSymbolByLexeme(node.getChild(0).getLexeme());
        var expr = node.getChild(1);
        var addr = translateExpr(program, expr, symbolTable);
        program.add(new TAInstruction(TAInstructionType.ASSIGN, assigned, "=", addr, null));
    }

    public void translateAssignStmt(TAProgram program, ASTNode node, SymbolTable symbolTable) {
        // 2 * 3 + 1
        // p0 = 2 * 3
        // p1 = p0 + 1
        // var a = expr
        var assigned = symbolTable.createSymbolByLexeme(node.getChild(0).getLexeme());
        var expr = node.getChild(1);
        var addr = translateExpr(program, expr, symbolTable);
        program.add(new TAInstruction(TAInstructionType.ASSIGN, assigned, "=", addr, null));
    }

    // SDD:
    //      E -> E1 op E2
    //      E -> F
    public Symbol translateExpr(TAProgram program, ASTNode node, SymbolTable symbolTable) {
        if (node.isValueType()) {
            var addr = symbolTable.createSymbolByLexeme((node.getLexeme()));
            node.setProp("addr", addr);
            return addr;
        } else if (node.getType() == ASTNodeTypes.CALL_EXPR) {
            throw new NotImplementedException("not impl.");
        }

        for (var child : node.getChildren()) {
            translateExpr(program, child, symbolTable);
        }

        if (node.getProp("addr") == null) {
            node.setProp("addr", symbolTable.createVariable());
        }

        var instruction = new TAInstruction(
                TAInstructionType.ASSIGN,
                (Symbol) node.getProp("addr"),
                node.getLexeme().getValue(),
                (Symbol) node.getChild(0).getProp("addr"),
                (Symbol) node.getChild(1).getProp("addr")
        );

        program.add(instruction);
        return instruction.getResult();
    }
}
