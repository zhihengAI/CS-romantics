const Token = require('../../lexer/Token')
const TokenType = require('../../lexer/TokenType')
const Symbol = require('./Symbol')

class SymbolTable {
  constructor() {
    this.parent = null
    this.symbols = []
    this.children = []

    // 用来生成分配常量的三地址码临时变量的 ID 的
    this.tempIndex = 0
    this.offsetIndex = 0
    this.level = 0
  }

  addSymbol(symbol) {
    this.symbols.push(symbol)
    symbol.setParent(this)
  }

  addChild(child) {
    child.parent = this
    child.level = this.level + 1
    this.children.push(child)
  }

  getSymbols() {
    return this.symbols
  }

  getChildren() {
    return this.children
  }


  // 在一个符号表里创造一个标签
  createLabel(label, lexeme) {
    const labelSymbol = Symbol.createLabelSymbol(label, lexeme)
    this.addSymbol(labelSymbol)
  }

  // 创建临时变量
  createVariable() {
    const lexeme = new Token(TokenType.VARIABLE, "p" + this.tempIndex++)
    const symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++)
    this.addSymbol(symbol)
    return symbol
  }

  // 判断当前符号表里是否存在 指定 的符号
  exists(lexeme) {
    const symbol = this.symbols.find(x => x.lexeme.getValue() == lexeme.getValue())

    if (symbol) {
      return true
    }

    if (this.parent != null) {
      return this.parent.exists(lexeme)
    }

    return false
  }

  // 把（父层）变量 symbol 拷贝到当前层级，并重新维护它的 layerOffset
  cloneFromSymbolTree(lexeme, layerOffset) {
    let symbol = this.symbols
      .find(x => x.lexeme.getValue() == lexeme.getValue())

    if (symbol) {
      symbol = symbol.copy()
      symbol.setLayerOffset(layerOffset)
      return symbol
    }

    if (this.parent != null) {
      return this.parent.cloneFromSymbolTree(lexeme, layerOffset + 1)
    }

    return null
  }

  // 通过 lexeme 创建一个 Symbol
  createSymbolByLexeme(lexeme) {
    let symbol = null

    if (lexeme.isScalar()) {
      symbol = Symbol.createImmediateSymbol(lexeme)
    } else {
      symbol = this.cloneFromSymbolTree(lexeme, 0)
      if (symbol == null) {
        symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++)
      }
    }

    this.addSymbol(symbol)
    return symbol
  }

  createVariable() {
    var lexeme = new Token(TokenType.VARIABLE, "p" + this.tempIndex++)
    var symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++)
    this.addSymbol(symbol)
    return symbol
  }

  // 当前的栈有几个占地址的元素（即我们 push和add 进去的元素）
  localSize() {
    return this.offsetIndex
  }
}

module.exports = SymbolTable