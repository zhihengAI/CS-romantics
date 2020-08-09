const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")

class FunctionDeclareStmt extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeTypes.FUNCTION_DECLARE_STMT, 'func')
  }
}

module.exports = FunctionDeclareStmt