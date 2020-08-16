const Enum = require('../../common/Enum')

module.exports = {
  ADDRESS_SYMBOL: new Enum("ADDRESS_SYMBOL", 1), // 地址
  IMMEDIATE_SYMBOL: new Enum("IMMEDIATE_SYMBOL", 2), // 常量，例如数字
  LABEL_SYMBOL: new Enum("LABEL_SYMBOL", 3) // 如函数的label，for循环的label，用来做跳转的
}