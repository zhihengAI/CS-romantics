const SymbolType = require('./SymbolType')

class Symbol {
  // 本来这是应该要做3个类的，但是这样太麻烦了，所以就合并成一个类了
  // 这种就是 union
  // 类型少时才推荐使用，不然字段会变得很多，很臃肿
  constructor(type) {
    this.type = type
    this.label = null
    this.offset = 0
    this.layerOffset = 0 // 用于记录层级作用域
    this.lexeme = null
    this.parent = null
  }

  // 创建三种 symbol 工厂方法
  // 加了 static 声明的作用是：在别的文件里，可通过通过 Symbol.函数名 直接使用
  // 因为 static 就是指在编译后所分配的内存会一直存在，直到程序退出内存才会释放这个空间，也就是只要程序在运行，那么这块内存就会一直存在。
  static createAddressSymbol(lexeme, offset) {
    var symbol = new Symbol(SymbolType.ADDRESS_SYMBOL)
    symbol.lexeme = lexeme
    symbol.offset = offset
    return symbol
  }

  static createImmediateSymbol(lexeme) {
    var symbol = new Symbol(SymbolType.IMMEDIATE_SYMBOL)
    symbol.lexeme = lexeme
    return symbol
  }

  static createLabelSymbol(label, lexeme) {
    var symbol = new Symbol(SymbolType.ADDRESS_SYMBOL)
    symbol.label = label
    symbol.lexeme = lexeme
    return symbol
  }

  // 拷贝一份 symbol 函数
  copy() {
    var symbol = new Symbol(this.type)
    symbol.lexeme = this.lexeme
    symbol.label = this.label
    symbol.offset = this.offset
    symbol.layerOffset = this.layerOffset
    symbol.type = this.type
    return symbol
  }

  // 下面就是一些 设置/获取 基础字段属性函数
  setParent(parent) {
    this.parent = parent
  }

  setOffset(offset) {
    this.offset = offset
  }

  getOffset() {
    return this.offset
  }

  getType() {
    return this.type
  }

  toString() {
    if (this.type === SymbolType.LABEL_SYMBOL) {
      return this.label;
    }
    return this.lexeme.getValue()
  }

  setLexeme(lexeme) {
    this.lexeme = lexeme
  }

  getLexeme() {
    return this.lexeme
  }

  setLayerOffset(offset) {
    this.layerOffset = offset
  }

  getLayerOffset() {
    return this.layerOffset
  }

  getLabel() {
    return this.label
  }
}

module.exports = Symbol