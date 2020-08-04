const {
  assert
} = require('chai')
const Token = require('../lexer/Token')
const TokenType = require('../lexer/TokenType')
const PeekIterator = require('../common/PeekIterator')
const arrayToGenerator = require('../common/arrayToGenerator')

describe('Token', () => {
  function assertToken(token, value, type) {
    assert.equal(token.getValue(), value)
    assert.equal(token.getType(), type)
  }

  it('varOrKeyword', () => {
    var it1 = new PeekIterator(arrayToGenerator([...'if abc']))
    var it2 = new PeekIterator(arrayToGenerator([...'true hu787']))

    var token1 = Token.makeVarOrKeyword(it1)
    var token2 = Token.makeVarOrKeyword(it2)
    it1.next()
    var token3 = Token.makeVarOrKeyword(it1)

    assertToken(token1, 'if', TokenType.KEYWORD)
    assertToken(token2, 'true', TokenType.BOOLEAN)
    assertToken(token3, 'abc', TokenType.VARIABLE)
  })
})