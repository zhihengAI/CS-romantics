const Factor = require("./Factor");
const ASTNodeTypes = require("./ASTNodeTypes");

class Scalar extends Factor {
  constructor(parent) {
    super(parent, ASTNodeTypes.SCALAR, 'scalar')
  }
}

module.exports = Scalar