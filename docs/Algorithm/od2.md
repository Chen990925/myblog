---
group: 大厂算法题
title: 华为算法题笔记2
order: 2
---


# 华为算法题笔记2

---

## 2.**字符串操作（6题）**

### **(1) HJ17.坐标移动**

开发一个坐标计算工具， A表示向左移动，D表示向右移动，W表示向上移动，S表示向下移动。从（0,0）点开始移动，从输入字符串里面读取一些坐标，并将最终输入结果输出到输出文件里面。

输入：

合法坐标为A(或者D或者W或者S) + 数字（两位以内）

坐标之间以;分隔。

非法坐标点需要进行丢弃。如AA10; A1A; $%$; YAD; 等。

下面是一个简单的例子 如：

A10;S20;W10;D30;X;A1A;B10A11;;A10;

处理过程：

起点（0,0）

\+  A10  = （-10,0）

\+  S20  = (-10,-20)

\+  W10 = (-10,-10)

\+  D30 = (20,-10)

\+  x  = 无效

\+  A1A  = 无效

\+  B10A11  = 无效

\+ 一个空 不影响

\+  A10 = (10,-10)

结果 （10， -10）

>  **没有使用正则表达式**

```java
import java.util.Scanner;

// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    public static void main(String[] args) {
         Scanner in = new Scanner(System.in);
        String str = in.nextLine();
        String[] list = str.split(";");
        int x = 0;
        int y = 0;
        //先检验是否有不正规的数据
        for (String string : list) {
            if(string == ""){
                continue;
            }
            // 校验字符串长度是否符合要求
            if (string.length() < 2 || string.length() > 3) {
                continue;
            }
            // 校验首字符是否是 A、D、W 或 S
            char firstChar = string.charAt(0);
            if (firstChar != 'A' && firstChar != 'D' && firstChar != 'W' && firstChar != 'S') {
                continue;
            }
            // 校验剩余部分是否是数字
            String numericPart = string.substring(1);
            try {
                int numericValue = Integer.parseInt(numericPart);
                // 校验数字范围是否在 0 到 99 之间
                if (numericValue < 0 || numericValue > 99) {
                    continue;
                }
            } catch (NumberFormatException e) {
                // 如果无法解析为数字，则返回 false
                continue;
            }
            //开始操作
            int numericPart1 = Integer.parseInt(string.substring(1));
            if (firstChar == 'A') {
                x = x - numericPart1;
            }
            if (firstChar == 'S') {
                y = y - numericPart1;
            }
            if (firstChar == 'D') {
                x = x + numericPart1;
            }
            if (firstChar == 'W') {
                y = y + numericPart1;
            }
        }
        System.out.println(  x + "," + y );

    }
}
```

### **(2) HJ20.密码验证合格程序**

密码要求:

1.长度超过8位

2.包括大小写字母.数字.其它符号,以上四种至少三种

3.不能有长度大于2的包含公共元素的子串重复 （注：其他符号不含空格或换行）

**输入描述：**

一组字符串。

**输出描述：**

如果符合要求输出：OK，否则输出NG

```java
import java.util.Scanner;

// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        while (in.hasNextLine()) {
            String password = in.nextLine();
            char[] chars = password.toCharArray();
            if (password.length() > 8) {
                //a表示数字存在，b表示小写，c表示大写，d表示特殊字符
                int a = 0, b = 0, c = 0, d = 0;
                boolean flag = true;
                for (char s : chars) {
                    //注意这里的 = 不要漏，不然边界的元素就变成特殊符号了(0，9,a,z。。。。）
                    if (s >= '0' && s <= '9') {
                        a = 1;
                    } else if (s >= 'a' && s <= 'z') {
                        b = 1;
                    } else if (s >= 'A' && s <= 'Z') {
                        c = 1;
                    } else if (s == ' ' || s == '\n') {
                        //出现空或换行时返回false
                        flag = false;
                        break;
                    } else {
                        d = 1;
                    }
                }
                if (flag) {
                    if (a + b + c + d > 2) {
                        if (check(password)) {
                            System.out.println("OK");
                        } else {
                            //有重复超过2
                            System.out.println("NG");
                        }
                    } else {
                        //没有到达三种字符类型
                        System.out.println("NG");
                    }
                } else {
                    //出现了空或换行
                    System.out.println("NG");
                }
            } else {
                //长度小于8
                System.out.println("NG");
            }
        }
    }


    // 校验是否有重复子串
    private static boolean check(String s) {
        for (int i = 3; i < s.length(); i++) {
            if (s.substring(i).contains(s.substring(i - 3, i))) {
                return false;
            }
        }

        return true;
    }


}
```



### **(3) *HJ23.删除字符串中出现次数最少的字符**

实现删除字符串中出现次数最少的字符，若出现次数最少的字符有多个，则把出现次数最少的字符都删除。输出删除这些单词后的字符串，字符串中其它字符保持原来的顺序。

输入描述：字符串只包含小写英文字母, 不考虑非法输入，输入的字符串长度小于等于20个字节。

输出描述：删除字符串中出现次数最少的字符后的字符串。

**示例1**

输入：aabcddd

输出：aaddd

> 主要要对String,map等类型的常用方法要很熟悉，譬如.toCharArray(),.charAt(i),.containsValue(min)等

```java
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String str = in.nextLine();
        int min = str.length();
        Map<Character, Integer> map = new HashMap<>();
        for (char s : str.toCharArray()) {
            if (!map.containsKey(s)) {
                map.put(s, 1);
                min = 1;
            } else {
                int num = map.get(s) + 1;
                map.put(s, num);
                if (!map.containsValue(min)) {
                    min = num;
                }
            }
        }
        for (int i = 0; i < str.length(); i++) {
            if (min != map.get(str.charAt(i))) {
                System.out.print(str.charAt(i));
            }
        }
    }
```



### **(4) *HJ33.整数与IP地址间的转换**

原理：ip地址的每段可以看成是一个0-255的整数，把每段拆分成一个二进制形式组合起来，然后把这个二进制数转变成
一个长整数。
举例：一个ip地址为10.0.3.193
每段数字       相对应的二进制数
10          00001010
0          00000000
3          00000011
193         11000001

组合起来即为：00001010 00000000 00000011 11000001,转换为10进制数就是：167773121，即该IP地址转换后的数字就是它了。

输入：

10.0.3.193
167969729

输出：167773121
10.3.3.193

> 重点关注是怎么转化进制的
>
> 假设地址是1.1.1.1,从第一位开始要逐一乘以256的三次方，二次方，一次方，0次方
>
> 那么就先把第一位乘以256，加上后面的乘以256，再加第三位的乘以256也能达到相同目的
>
> 至于10进制转ip地址
>
> 就是字符取余256然后拼接

```java
public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNextLine()) {
            String str = in.nextLine();
            //true代表iP,false代表10进制
            boolean flag = false;
            //输入的十进制字符转化后的long
            long ipv4 = 0;
            //检测输入正常是否
            boolean check = false;
            //首先判断是10进制还是ip地址
            String[] split = str.split("\\.");
            if (split.length == 4) {
                for (String s : split) {
                    if (Integer.parseInt(s) > 255 || Integer.parseInt(s) < 0) {
                        System.out.println("非法输入");
                        break;
                    }
                    flag = true;
                    check=true;
                }
            } else if (split.length == 1) {
                try {
                    ipv4 = Long.parseLong(split[0]);
                    check=true;
                } catch (Exception e) {
                    System.out.println("非法输入！");

                }
            } else {
                System.out.println("非法输入！");
            }

            //正常执行业务代码
            if(check){
                if(flag){
                    long result = 0;
                    for (int i = 0; i < 4; i++) {
                        result = result * 256 + Integer.parseInt(split[i]);
                    }
                    System.out.println("" + result);
                }else {
                    String result = "";
                    for (int i = 0; i < 4; i++) {
                        result = ipv4 % 256 + "." + result;
                        ipv4 /= 256;
                    }
                    System.out.println(result.substring(0, result.length() - 1));
                }
            }
        }
    }
```

### **(5) HJ101.输入整型数组和排序标识**

输入描述：第一行输入数组元素个数
第二行输入待排序的数组，每个数用空格隔开
第三行输入一个整数0或1。0代表升序排序，1代表降序排序

输出描述：输出排好序的数字

**示例1**

输入：

8
1 2 4 9 3 55 64 25
0

输出：1 2 3 4 9 25 55 64

**示例2**

输入：5
1 2 3 4 5
1

输出：5 4 3 2 1

```java
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        //用n接收数字的个数
        int n = scanner.nextInt();
        int[] arr = new int[n];
        //将之后的n个数字放入arr
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }
        Arrays.sort(arr);
        int sort = scanner.nextInt();
        String result = "";
        //由高到低
        if (sort == 1) {
            for (int i = arr.length - 1; i >= 0; i--) {
                result = result + arr[i] + " ";
            }
            System.out.println(result);
        } else if (sort == 0) {
            for (int j : arr) {
                result = result + j + " ";
            }
            System.out.println(result);
        } else {
            System.out.println("输入不正确");
        }
    }
```

### **(6) *HJ106.字符串逆序**

输入描述：输入一个字符串，可以有空格

输出描述：输出逆序的字符串

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String str = scanner.nextLine();
    StringBuilder builder = new StringBuilder(str);
    String reverStr = builder.reverse().toString();
    System.out.println(reverStr);
}
```
