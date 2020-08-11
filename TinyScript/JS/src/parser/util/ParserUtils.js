const ASTNodeTypes = require('../ast/ASTNodeTypes')

class ParserUtils {
  // 把语法生成树以后序的形式处理
  static toPostfixExpression(astNode) {
    switch (astNode.type) {
      case ASTNodeTypes.BINARY_EXPR:
        return `${ParserUtils.toPostfixExpression(astNode.getChild(0))} ${ParserUtils.toPostfixExpression(astNode.getChild(1))} ${astNode.lexeme.getValue()}`
      case ASTNodeTypes.VARIABLE:
      case ASTNodeTypes.SCALAR:
        return astNode.lexeme.getValue()
    }

    throw "not impl."
  }
}

module.exports = ParserUtils