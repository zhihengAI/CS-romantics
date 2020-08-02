package common;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

// 测试类别判断
public class AlphabetHelperTests {
    @Test
    public void test(){
        assertEquals(true,AlphabetHepler.isLetter('a'));
        assertEquals(false,AlphabetHepler.isLetter('*'));

        assertEquals(true,AlphabetHepler.isLiteral('a'));
        assertEquals(true,AlphabetHepler.isLiteral('_'));
        assertEquals(true,AlphabetHepler.isLiteral('7'));
        assertEquals(false,AlphabetHepler.isLiteral('@'));

        assertEquals(true,AlphabetHepler.isNumber('1'));
        assertEquals(true,AlphabetHepler.isNumber('9'));
        assertEquals(false,AlphabetHepler.isNumber('x'));
        assertEquals(false,AlphabetHepler.isNumber('='));
        assertEquals(true,AlphabetHepler.isOperator('+'));
        assertEquals(true,AlphabetHepler.isOperator('-'));
        assertEquals(true,AlphabetHepler.isOperator('*'));
        assertEquals(true,AlphabetHepler.isOperator('/'));
        assertEquals(false,AlphabetHepler.isOperator('a'));
    }
}
