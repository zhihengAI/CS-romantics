// JS 没有原生的枚举类型，所以我们自己些一个简单的枚举类型顶着先
class Enum {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  toString() {
    return this.type
  }
}

module.exports = Enum