const TAInstructionType = require('./TAInstructionType')

// 三地址指令
// TA = Three Address
class TAInstruction {
  constructor(type, result, op, arg1 = null, arg2 = null) {
    this.op = op
    this.type = type
    this.result = result
    this.arg1 = arg1
    this.arg2 = arg2
  }

  // toString 本来不是很重要的方法，但是我们自动化测试需要依赖它来判断结果，所以就变重要了
  toString() {
    switch (type) {
      case TAInstructionType.ASSIGN: {

        if (this.arg2 != null) {
          return `${this.result} = ${this.arg1} ${this.op} ${this.arg2}`
        } else {
          return `${this.result} = ${this.arg1}`
        }
      }
      case TAInstructionType.IF: {
        return `IF ${this.arg1} ELSE ${this.arg2}`
      }
      case TAInstructionType.GOTO: {
        return `GOTO ${this.arg1}`
      }
      case TAInstructionType.LABEL: {
        return `${this.arg1}`
      }
      case TAInstructionType.RETURN: {
        return `RETURN ${this.arg1}`
      }
      case TAInstructionType.PARAM: {
        return `PARAM ${this.arg1} ${this.arg2}`
      }
      case TAInstructionType.SP: {
        return `SP ${this.arg1}`
      }
      case TAInstructionType.CALL: {
        return `CALL ${this.arg1.getLabel()}`
      }
    }

    throw new Error("Unknown instruction type: " + this.type)
  }

  // 字段的 Setter Getter
  getResult() {
    return this.result
  }

  setArg1(arg) {
    this.arg1 = arg
  }

  getArg1() {
    return this.arg1
  }

  setArg2(arg) {
    this.arg2 = arg
  }

  getArg2() {
    return this.arg2
  }

  setResult(address) {
    this.result = address
  }

  getType() {
    return this.type
  }

  getOp() {
    return this.op
  }
}

module.exports = TAInstruction