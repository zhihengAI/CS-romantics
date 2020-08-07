const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")

class IfStmt extends Stmt{
  constructor(parent){
    super(parent, ASTNodeTypes.IF_STMT, 'if')
  }
}

module.exports = IfStmt