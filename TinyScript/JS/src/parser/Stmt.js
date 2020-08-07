const ASTNode = require("./ASTNode");

class Stmt extends ASTNode {
  constructor(parent, type, label) {
    super(parent, type, label)
  }
}

module.exports = Stmt