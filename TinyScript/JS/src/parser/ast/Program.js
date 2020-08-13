const ASTNodeTypes = require('./ASTNodeTypes')
const ASTNode = require('./ASTNode')
const {
  Stmt
} = require('./index')

class Program extends ASTNode {
  constructor() {
    super(ASTNodeTypes.PROGRAM, "program")
  }
}

Program.parse = (it) => {
  const program = new Program()
  let stmt = null
  while ((stmt = Stmt.parse(it)) != null) {
    program.addChild(stmt)
  }
  return program
}

module.exports = Program