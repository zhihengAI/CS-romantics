const ASTNodeTypes = require('./ASTNodeTypes')
const {
  Stmt
} = require('./index')
class Block extends Stmt {
  constructor() {
    super(ASTNodeTypes.BLOCK, 'block')
  }
}

Block.parse = (it) => {
  it.nextMatch("{")
  const block = new Block()
  let stmt = null

  while ((stmt = Stmt.parse(it)) != null) {
    block.addChild(stmt)
  }
  it.nextMatch("}")
  return block
}

module.exports = Block