const {
  assert
} = require('chai')
const AlphabetHelper = require('../lexer/AlphaBetHelper')


describe("AlphabetHelper", () => {
  it('charCheck', () => {
    // Letter check
    assert.equal(true, AlphabetHelper.isLetter('a'));
    assert.equal(true, AlphabetHelper.isLetter('b'));
    assert.equal(true, AlphabetHelper.isLetter('C'));
    assert.equal(false, AlphabetHelper.isLetter('1'));

    // Operator check
    assert.equal(true, AlphabetHelper.isOperator('+'));
    assert.equal(true, AlphabetHelper.isOperator('-'));
    assert.equal(true, AlphabetHelper.isOperator('*'));
    assert.equal(true, AlphabetHelper.isOperator('/'));
    assert.equal(true, AlphabetHelper.isOperator('&'));
    assert.equal(true, AlphabetHelper.isOperator('='));
    assert.equal(true, AlphabetHelper.isOperator('>'));
    assert.equal(false, AlphabetHelper.isOperator(' '));

    // Number check
    assert.equal(true, AlphabetHelper.isNumber('1'));
    assert.equal(true, AlphabetHelper.isNumber('7'));
    assert.equal(true, AlphabetHelper.isNumber('9'));
    assert.equal(false, AlphabetHelper.isNumber('x'));

    // Literal check
    assert.equal(true, AlphabetHelper.isLeteral('_'));
    assert.equal(true, AlphabetHelper.isLeteral('5'));
    assert.equal(true, AlphabetHelper.isLeteral('M'));
    assert.equal(true, AlphabetHelper.isLeteral('k'));
    assert.equal(false, AlphabetHelper.isLeteral('@'));
  })
})