class ASTNode {
  constructor(_parent, _type = null, _label = null) {
    /* 树结构 */
    this.children = []
    this.parent = _parent

    /* 关键信息 */
    this.lexeme = null
    this.type = _type
    this.label = _label
  }

  getChild(index) {
    return this.children[index]
  }

  addChild(node) {
    this.children.push(node)
  }

  getLexeme() {
    return this.lexeme
  }

  // 危险方法
  getChildren() {
    return this.children
  }
}

module.exports = ASTNode