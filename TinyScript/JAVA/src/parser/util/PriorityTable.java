package parser.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// （专门处理二项表达式的）运算符号优先级表
public class PriorityTable {
    private List<List<String>> table = new ArrayList();

    // 因为是练习，所以不可能做全部的符号
    public PriorityTable() {
        // 第 1 级
        table.add(Arrays.asList(new String[]{"&", "|", "^"}));
        table.add(Arrays.asList(new String[]{"==", "!=", ">", ">=", "<", "<="}));
        table.add(Arrays.asList(new String[]{"+", "-"}));
        table.add(Arrays.asList(new String[]{"*", "/"}));
        table.add(Arrays.asList(new String[]{"<<", ">>"}));
    }

    // 返回优先级的数量
    public int size() {
        return table.size();
    }

    // 根据 level 获取优先级表
    public List<String> get(int level) {
        return table.get(level);
    }
}
