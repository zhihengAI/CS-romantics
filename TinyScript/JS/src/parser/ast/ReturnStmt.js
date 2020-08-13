const Stmt = require('./Stmt')
const ASTNodeTypes = require('./ASTNodeTypes')
const {
  Expr
} = require('./index')


class ReturnStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.RETURN_STMT, "return")
  }
}

ReturnStmt.parse = (it) => {
  const lexeme = it.nextMatch("return")
  const expr = Expr.parse(it)
  const stmt = new ReturnStmt()
  stmt.setLexeme(lexeme)
  stmt.addChild(expr)
  return stmt
}

module.exports = ReturnStmt