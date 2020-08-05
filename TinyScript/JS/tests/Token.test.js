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

  it('makeString', () => {
    const tests = ["'123'", '"456"']

    for (let test of tests) {
      const it = new PeekIterator(arrayToGenerator([...test]))
      const token = Token.makeString(it)

      assertToken(token, test, TokenType.STRING)
    }
  })

  it('makeOp', () => {
    const tests = [
      ['+ XXX', '+'],
      ['++mmm', '++'],
      ['/=g', '/='],
      ['==32', '=='],
      ['&=3982', '&='],
      ['&878', '&'],
      ['||xx', '||'],
      ['^=1234', '^='],
      ['%7', '%']
    ]

    for (let test of tests) {
      const [input, expected] = test
      const it = new PeekIterator(arrayToGenerator([...input]))
      const token = Token.makeOp(it)

      assertToken(token, expected, TokenType.OPERATOR)
    }
  })

  it('makeNumber', () => {
    const tests = [
      '+0 aa',
      '-0 bb',
      '.3 ccc',
      '.555 ddd',
      '763.345 eee',
      '-100 ggg',
      '-1000.34524*324523'
    ]

    for (let test of tests) {
      const it = new PeekIterator(arrayToGenerator([...test]))
      const token = Token.makeNumber(it)
      const [expected] = test.split(/[ *]/)
      const type = test.indexOf('.') === -1 ? TokenType.INTEGER : TokenType.FLOAT

      assertToken(token, expected, type)
    }
  })
})