package common;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

// 测试类别判断
public class AlphabetHelperTests {
    @Test
    public void test(){
        assertEquals(true, AlphabetHelper.isLetter('a'));
        assertEquals(false, AlphabetHelper.isLetter('*'));
        assertEquals(false, AlphabetHelper.isLetter('^'));

        assertEquals(true, AlphabetHelper.isLiteral('a'));
        assertEquals(true, AlphabetHelper.isLiteral('_'));
        assertEquals(true, AlphabetHelper.isLiteral('7'));
        assertEquals(false, AlphabetHelper.isLiteral('@'));

        assertEquals(true, AlphabetHelper.isNumber('1'));
        assertEquals(true, AlphabetHelper.isNumber('9'));
        assertEquals(false, AlphabetHelper.isNumber('x'));
        assertEquals(false, AlphabetHelper.isNumber('='));
        assertEquals(true, AlphabetHelper.isOperator('+'));
        assertEquals(true, AlphabetHelper.isOperator('-'));
        assertEquals(true, AlphabetHelper.isOperator('*'));
        assertEquals(true, AlphabetHelper.isOperator('/'));
        assertEquals(false, AlphabetHelper.isOperator('a'));
    }
}
