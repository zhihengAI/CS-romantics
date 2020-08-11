const ASTNode = require("./ASTNode")
const ASTNodeTypes = require('./ASTNodeTypes')
const Scalar = require('./Scalar')
const Variable = require('./Variable')
const table = require('../util/PriorityTalbe')

class Expr extends ASTNode {
  constructor(parent) {
    super(parent)
  }

  static fromToken(parent, type, token) {
    const expr = new Expr(parent)
    expr.label = token.getValue()
    expr.lexeme = token
    expr.type = type
    return expr
  }

  /**
   * left: E(k) -> E(k) op(k) E(k+1) | E(k+1)
   * right:
   *   E(k) -> E(k+1) E_(k)
   *     // const e = new Expr() e.left = E(k+1) e.right = E_(k).child(0)
   *     // combine
   *   E_(k) -> op(k) E(k+1) E_(k) | ε
   *     // race
   *
   *   // U -> (E) | ++E | --E
   *   E(t) -> F E_(t) | U E_(t)
   * 
   * @param {*} parent 
   * @param {*} it 
   */
  static parseExpr(parent, it) {
    return Expr.E(parent, it, 0)
  }


  static E(parent, it, k) {
    if (k < table.length - 1) {
      return Expr.combine(
        parent,
        it,
        () => Expr.E(parent, it, k + 1),
        () => Expr.E_(parent, it, k)
      )
    } else {
      return Expr.race(
        it,
        () => Expr.combine(
          parent,
          it,
          () => Expr.F(parent, it),
          () => Expr.E_(parent, it, k)
        ),
        () => Expr.combine(
          parent,
          it,
          () => Expr.U(parent, it),
          () => Expr.E_(parent, it, k)
        )
      )
    }
  }

  // E_(k) -> op(k) E(k+1) E_(k) | ε
  static E_(parent, it, k) {
    const token = it.peek()
    const value = token.getValue()

    if (table[k].indexOf(value) !== -1) {
      it.nextMatch(value)
      const expr = Expr.fromToken(parent, ASTNodeTypes.BINARY_EXPR, token)
      expr.addChild(
        Expr.combine(
          parent,
          it,
          () => Expr.E(parent, it, k + 1),
          () => Expr.E_(parent, it, k)
        )
      )

      return expr
    }

    return null
  }

  static U(parent, it) {
    const token = it.peek()
    const value = token.getValue()

    if (value === "(") {
      it.nextMatch("(")
      const expr = Expr.parseExpr(parent, it)
      it.nextMatch(")")
      return expr
    } else if (value === "++" || value === "--" || value === "!") {
      const t = it.peek()
      it.nextMatch(value)

      const expr = Expr.fromToken(ASTNodeTypes.UNARY_EXPR, t)
      expr.addChild(Expr.parseExpr(parent, it))
      return expr
    }
    return null
  }

  static F(parent, it) {
    const token = it.peek()
    if (token.isVariable()) {
      return new Variable(parent, it)
    } else {
      return new Scalar(parent, it)
    }
  }

  static combine(parent, it, funcA, funcB) {
    if (!it.hasNext()) {
      return null
    }

    // a b 为 null 的情况
    const a = funcA()
    if (a == null) {
      return it.hasNext() ? funcB() : null
    }
    const b = it.hasNext() ? funcB() : null
    if (b == null) {
      return a
    }

    // a b 不为 null 的情况
    const expr = Expr.fromToken(parent, ASTNodeTypes.BINARY_EXPR, b.lexeme)
    expr.addChild(a)
    expr.addChild(b.getChild(0))
    return expr
  }

  static race(it, funcA, funcB) {
    if (!it.hasNext()) {
      return null
    }

    const a = funcA()
    if (a == null) {
      return funcB()
    }
    return a
  }
}

module.exports = Expr