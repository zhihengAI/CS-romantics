const TokenType = require('./TokenType')
const AlphabetHelper = require('./AlphabetHelper')
const LexicalException = require('./LexicalException')

// 本项目的关键字词
const Keywords = new Set([
  'var',
  'if',
  'else',
  'for',
  'while',
  'break',
  'func',
  'return'
])

class Token {
  constructor(type, value) {
    this._type = type
    this._value = value
  }

  getType() {
    return this._type
  }

  getValue() {
    return this._value
  }

  isVariable() {
    return this._type == TokenType.VARIABLE
  }

  isScalar() {
    return this._type === TokenType.INTEGER ||
      this._type === TokenType.FLOAT ||
      this._type === TokenType.STRING ||
      this._type === TokenType.BOOLEAN
  }

  toString() {
    return `type ${this._type.type}, value ${this._value}`
  }

  /**
   * 判定变量或关键字词
   * @param {PeekIterator} it 
   */
  static makeVarOrKeyword(it) {
    let s = ''

    while (it.hasNext()) {
      const c = it.peek()

      if (AlphabetHelper.isLeteral(c)) {
        s += c
      } else {
        break
      }
      // 不变式
      it.next()
    }

    if (Keywords.has(s)) {
      return new Token(TokenType.KEYWORD, s)
    }
    if (s == 'true' || s == 'false') {
      return new Token(TokenType.BOOLEAN, s)
    }

    return new Token(TokenType.VARIABLE, s)
  }

  // 创建字符串
  static makeString(it) {
    let s = ''
    let state = 0

    while (it.hasNext()) {
      let c = it.next()

      switch (state) {
        case 0:
          if (c == '"') {
            // 双引号到状态 1
            state = 1
          } else {
            // 单引号到状态 2
            state = 2
          }
          s += c
          break
        case 1:
          if (c == '"') {
            return new Token(TokenType.STRING, s + c)
          } else {
            s += c
          }
          break
        case 2:
          if (c == "'") {
            return new Token(TokenType.STRING, s + c)
          } else {
            s += c
          }
          break
      }
    } // end while

    throw new LexicalException('Unexpected error')
  }

  // 判断创建操作符
  static makeOp(it) {
    let state = 0
    while (it.hasNext()) {
      let lookahead = it.next()

      switch (state) {
        case 0:
          switch (lookahead) {
            case '+':
              state = 1
              break
            case '-':
              state = 2
              break
            case '*':
              state = 3
              break
            case '/':
              state = 4
              break
            case '>':
              state = 5
              break
            case '<':
              state = 6
              break
            case '=':
              state = 7
              break
            case '!':
              state = 8
              break
            case '&':
              state = 9
              break
            case '|':
              state = 10
              break
            case '^':
              state = 11
              break
            case '%':
              state = 12
              break
            case ',':
              return new Token(TokenType.OPERATOR, ',')
            case '':
              return new Token(TokenType.OPERATOR, '')
          }
          break
        case 1: {
          if (lookahead == '+') {
            return new Token(TokenType.OPERATOR, '++')
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '+=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '+')
          }
        }
        case 2: {
          if (lookahead == '-') {
            return new Token(TokenType.OPERATOR, '--')
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '-=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '-')
          }
        }
        case 3: {
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '*=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '*')
          }
        }
        case 4: {
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '/=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '/')
          }
        }
        case 5: {
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '>=')
          } else if (lookahead == '>') {
            return new Token(TokenType.OPERATOR, '>>')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '>')
          }
        }
        case 6: {
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '<=')
          } else if (lookahead == '>') {
            return new Token(TokenType.OPERATOR, '<<')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '<')
          }
        }
        case 7: {
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '==')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '=')
          }
        }
        case 8: {
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '!=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '!')
          }
        }
        case 9: {
          if (lookahead == '&') {
            return new Token(TokenType.OPERATOR, '&&')
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '&=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '&')
          }
        }
        case 10: {
          if (lookahead == '|') {
            return new Token(TokenType.OPERATOR, '||')
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '|=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '|')
          }
        }
        case 11: {
          if (lookahead == '^') {
            return new Token(TokenType.OPERATOR, '^^')
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '^=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '^')
          }
        }
        case 12: {
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '%=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '%')
          }
        }
      }
    } // end while

    throw new LexicalException('Uncepected error')
  }

  static makeNumber(it) {
    let s = ''
    let state = 0

    while (it.hasNext()) {
      let lookahead = it.peek()

      switch (state) {
        case 0:
          if (lookahead == '0') {
            state = 1
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead == '+' || lookahead == '-') {
            state = 3
          } else if (lookahead == '.') {
            state = 5
          }
          break
        case 1: {
          if (lookahead == '0') {
            state = 1
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead == '.') {
            state = 4
          } else {
            return new Token(TokenType.INTEGER, s)
          }
          break
        }
        case 2: {
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead == '.') {
            state = 4
          } else {
            return new Token(TokenType.INTEGER, s)
          }
          break
        }
        case 3: {
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead == '.') {
            state = 5
          } else {
            throw LexicalException.fromChar(lookahead)
          }
          break
        }
        case 4: {
          if (lookahead == '.') {
            throw LexicalException.fromChar(lookahead)
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 20
          } else {
            return new Token(TokenType.FLOAT, s)
          }
          break
        }
        case 5: {
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 20
          } else {
            return new Token(TokenType.FLOAT, s)
          }
          break
        }
        case 20: {
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 20
          } else if (lookahead == '.') {
            throw LexicalException.fromChar(lookahead)
          } else {
            return new Token(TokenType.FLOAT, s)
          }
        }
      } // end switch
      it.next()
      s += lookahead
    } // end while

    throw new LexicalException('Unexcepted error')
  }
}

module.exports = Token