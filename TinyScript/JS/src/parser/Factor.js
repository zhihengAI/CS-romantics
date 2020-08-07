const ASTNode = require("./ASTNode");

class Factor extends ASTNode {
  constructor(parent, type, label) {
    super(parent, type, label)
  }
}

module.exports = Factor