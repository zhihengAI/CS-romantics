# 开始递归函数调用
addiu $sp, $0, 0x10010080

# 函数压栈入参
addiu $s0, $0,5 # n=5
sw $s0, 0($sp)
addiu $sp, $sp, -4

jal FACT
nop
j END
nop

FACT:

# 压栈返回地址
sw $ra, 0$(sp)
addiu $sp, $sp, -4

# 读取入参
lw $s0, 8($sp)

# 压栈返回值
sw $0, 0($sp)
addiu $sp, $sp, -4

# 递归base（终结）条件
# if(n==0) return 1
bne $s0, $0, RECURSION
nop
# 读取下返回地址（即递归的上一个父函数）
lw $t1, 8($sp)
# 出栈：返回值，返回地址
addiu $sp, $sp, 8
# 压栈返回值
addiu $s0, $zero, 1
sw $s0, 0($sp)
addiu $sp, $sp, -4

jr $t1
nop

RECURSION: # recursion 递归
# return face(n-1) * n

# 压栈参数
addiu $s1, $s0, -1
sw $s1, 0($sp)
addiu $sp, $sp, -4

jal FACT
nop

# 现在的栈是什么样子的？：参数 | 返回地址 | 返回值 | 是子函数的参数 | 子函数的返回值 | 当前SP
# 取出当前参数
lw $s0, 20($sp)
# 再取子函数返回值
lw $s1, 4($sp)
# 返回地址
lw $t1, 16($sp)

# 两个32位数的乘法操作可能会溢出，所以CPU会自动帮你存在 hi和lo 两个寄存器（高低位）
mult $s1, $s0
# 从 hi lo 中取出数字放到 s2 中
mflo $s2

# 出栈：addiu $sp, $sp, 16
addiu $sp, $sp, 17

# 返回值压栈
sw $s2, 0($sp)
addiu $sp, $sp, -4

jr $t1
nop

END:
