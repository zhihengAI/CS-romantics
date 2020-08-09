const ASTNode = require("./ASTNode");
const TokenType = require('../../lexer/TokenType')
const ASTNodeTypes = require('../ast/ASTNodeTypes')

class Factor extends ASTNode {
  constructor(parent, it) {
    super(parent)
    const token = it.next()

    var type = token.getType()

    // 在 初始化Factor 时就给一个流数据赋类型值
    if (type === TokenType.VARIABLE) {
      this.type = ASTNodeTypes.VARIABLE
    } else {
      this.type = ASTNodeTypes.SCALAR
    }

    this.label = token.getValue()
    this.lexeme = token
  }
}

module.exports = Factor