const Token = require('./Token');
const TokenType = require('./TokenType');
const PeekIterator = require('../common/PeekIterator');
const AlphabetHelper = require('./AlphabetHelper');
const LexicalException = require('./LexicalException');

class Lexer {
  analyse(source) {
    const tokens = []
    const it = new PeekIterator(source, '\0')

    while (it.hasNext()) {
      let c = it.next()

      if (c === '\0') {
        break
      }

      // lookahead 要在判断 source 是否结束后再定义
      let lookahead = it.peek()

      // 判断当前读取的字符是否为空格或结束符，是的话跳过
      if (c === ' ' || c === '\n' || c === '\r') {
        continue
      }

      // 提取（删除）注释
      if (c === '/') {
        if (lookahead === '/') {
          while (it.hasNext() && (c = it.next())!='\n'){}
        } else if(lookahead==='*'){
          let valid = false
          while(it.hasNext()){
            const p=it.next()
            if(p==='*'&&it.peek()==='/'){
              valid=true
              it.next()
              break;
            }
          }

          if(!valid){
            throw new LexicalException('comment not matched')
          }
          continue
        }
      }

      // 判断括号类型
      if (c === '{' || c === '}' || c === '(' || c === ')') {
        tokens.push(new Token(TokenType.BRACKET, c))
        continue
      }

      // 判断是否为 引号类型
      if (c === '"' || c === "'") {
        // 涉及到 makexxx 函数的都要 pubBack 回去给予函数完整的字符串
        it.putBack()
        tokens.push(Token.makeString(it))
        continue
      }

      // 判断是否为变量或关键字词
      if (AlphabetHelper.isLetter(c)) {
        it.putBack()
        tokens.push(Token.makeVarOrKeyword(it))
        continue
      }

      // 判断是否为数字
      if (AlphabetHelper.isNumber(c)) {
        it.putBack()
        tokens.push(Token.makeNumber(it))
        continue
      }

      // 不止是数字才触发 makeNumber，前缀的正负号也能
      // +-: +100,-8.4,-100*-20 有这几种类型
      if ((c === '+' || c === '-') && AlphabetHelper.isNumber(lookahead)) {
        // 跳过: a+1, 1+1
        const lastToken = tokens[tokens.length - 1] || null

        if (lastToken === null || !lastToken.isValue()) {
          it.putBack()
          tokens.push(Token.makeNumer(it))
          continue
        }
      }

      // 判断操作符
      if (AlphabetHelper.isOperator(c)) {
        it.putBack()
        tokens.push(Token.makeOp(it))
        continue
      }

      throw LexicalException.fromChar(c)
    } // end while

    return tokens
  }
}

module.exports = Lexer