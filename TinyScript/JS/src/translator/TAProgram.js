const SymbolType = require('./symbol/SymbolType')
const StaticSymbolTalbe = require('./symbol/StaticSymbolTable')
const TAInstruction = require('./TAInstruction')
const TAInstructionType = require('./TAInstructionType')

// 三地址代码的程序构成
class TAProgram {
  constructor() {
    this.instructions = []
    // 用户写的 标签计数器
    this.labelCounter = 0
    this.staticSymbolTalbe = new StaticSymbolTalbe()
  }

  add(instruction) {
    this.instructions.push(instruction)
  }

  toString() {
    // JS 的优势就是可以写的很清爽
    // 但问题就是类型检查不强，很难一次跑通代码
    return this.instructions
      .map(x => x.toString())
      .join("\n")
  }

  addLabel() {
    const label = "L" + this.labelCounter++;
    const instruction = new TAInstruction(TAInstructionType.LABEL, null, null, label, null)

    this.instructions.push(instruction)
    return instruction
  }

  setStaticSymbols(symbolTable) {
    for (const symbol of symbolTable.getSymbols()) {
      if (symbol.getType() == SymbolType.IMMEDIATE_SYMBOL) {
        this.staticSymbolTalbe.add(symbol)
      }
    }

    for (const child of symbolTable.getChildren()) {
      this.setStaticSymbols(child)
    }
  }
}

module.exports = TAProgram