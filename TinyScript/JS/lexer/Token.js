const TokenType = require("./TokenType")

// 本项目的关键字词
const Keywords=new Set([
  "var",
  "if",
  "else",
  "for",
  "while",
  "break",
  "func",
  "return"
])


class Token {
  constructor(type, value) {
    this._type = type
    this._value = value
  }

  getType() {
    return this._type
  }

  isVariable() {
    return this._type === TokenType.VARIABLE
  }

  isScalar() {
    return this._type == TokenType.INTEGER ||
      this._type == TokenType.FLOAT ||
      this._type == TokenType.STRING ||
      this._type == TokenType.BOOLEAN
  }

  toString(){
    return `type ${this._type.type}, value ${this._value}`
  }

  static 
}

module.exports = Token