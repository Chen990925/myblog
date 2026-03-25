"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7248],{87248:function(d,a,n){n.r(a),n.d(a,{texts:function(){return e}});const e=[{value:"\u65E0\u91CD\u590D\u5B57\u7B26\u7684\u6700\u957F\u5B50\u4E32",paraId:0},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u5B57\u7B26\u4E32 ",paraId:1,tocIndex:2},{value:"s",paraId:1,tocIndex:2},{value:" \uFF0C\u8BF7\u4F60\u627E\u51FA\u5176\u4E2D\u4E0D\u542B\u6709\u91CD\u590D\u5B57\u7B26\u7684 ",paraId:1,tocIndex:2},{value:"\u6700\u957F\u5B50\u4E32",paraId:1,tocIndex:2},{value:" \u7684\u957F\u5EA6\u3002",paraId:1,tocIndex:2},{value:"\u793A\u4F8B 1:",paraId:2,tocIndex:2},{value:`\u8F93\u5165: s = "abcabcbb"
\u8F93\u51FA: 3 
\u89E3\u91CA: \u56E0\u4E3A\u65E0\u91CD\u590D\u5B57\u7B26\u7684\u6700\u957F\u5B50\u4E32\u662F "abc"\uFF0C\u6240\u4EE5\u5176\u957F\u5EA6\u4E3A 3\u3002
`,paraId:3,tocIndex:2},{value:"\u793A\u4F8B 2:",paraId:4,tocIndex:2},{value:`\u8F93\u5165: s = "bbbbb"
\u8F93\u51FA: 1
\u89E3\u91CA: \u56E0\u4E3A\u65E0\u91CD\u590D\u5B57\u7B26\u7684\u6700\u957F\u5B50\u4E32\u662F "b"\uFF0C\u6240\u4EE5\u5176\u957F\u5EA6\u4E3A 1\u3002
`,paraId:5,tocIndex:2},{value:"\u793A\u4F8B 3:",paraId:6,tocIndex:2},{value:`\u8F93\u5165: s = "pwwkew"
\u8F93\u51FA: 3
\u89E3\u91CA: \u56E0\u4E3A\u65E0\u91CD\u590D\u5B57\u7B26\u7684\u6700\u957F\u5B50\u4E32\u662F "wke"\uFF0C\u6240\u4EE5\u5176\u957F\u5EA6\u4E3A 3\u3002
`,paraId:7,tocIndex:2},{value:"\u4F7F\u7528\u6ED1\u52A8\u7A97\u53E3",paraId:8,tocIndex:2},{value:`public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int max = 0, i = -1, len = s.length();
    for (int j = 0; j < len; j++) {
        if (map.containsKey(s.charAt(j))) {
            i = Math.max(i, map.get(s.charAt(j)));
        }
        map.put(s.charAt(j), j);
        max = Math.max(max, j - i);
    }
    return max;
}
`,paraId:9,tocIndex:2},{value:"209. \u957F\u5EA6\u6700\u5C0F\u7684\u5B50\u6570\u7EC4",paraId:0},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u542B\u6709 ",paraId:10,tocIndex:3},{value:"n",paraId:10,tocIndex:3},{value:" \u4E2A\u6B63\u6574\u6570\u7684\u6570\u7EC4\u548C\u4E00\u4E2A\u6B63\u6574\u6570 ",paraId:10,tocIndex:3},{value:"target",paraId:10,tocIndex:3},{value:" ",paraId:10,tocIndex:3},{value:"\u3002",paraId:10,tocIndex:3},{value:"\u627E\u51FA\u8BE5\u6570\u7EC4\u4E2D\u6EE1\u8DB3\u5176\u603B\u548C\u5927\u4E8E\u7B49\u4E8E ",paraId:11,tocIndex:3},{value:"target",paraId:11,tocIndex:3},{value:" \u7684\u957F\u5EA6\u6700\u5C0F\u7684",paraId:11,tocIndex:3},{value:"\u5B50\u6570\u7EC4",paraId:12,tocIndex:3},{value:"[numsl, numsl+1, ..., numsr-1, numsr]",paraId:13,tocIndex:3},{value:" \uFF0C\u5E76\u8FD4\u56DE\u5176\u957F\u5EA6**\u3002**\u5982\u679C\u4E0D\u5B58\u5728\u7B26\u5408\u6761\u4EF6\u7684\u5B50\u6570\u7EC4\uFF0C\u8FD4\u56DE ",paraId:13,tocIndex:3},{value:"0",paraId:13,tocIndex:3},{value:" \u3002",paraId:13,tocIndex:3},{value:"\u793A\u4F8B 1\uFF1A",paraId:14,tocIndex:3},{value:`\u8F93\u5165\uFF1Atarget = 7, nums = [2,3,1,2,4,3]
\u8F93\u51FA\uFF1A2
\u89E3\u91CA\uFF1A\u5B50\u6570\u7EC4 [4,3] \u662F\u8BE5\u6761\u4EF6\u4E0B\u7684\u957F\u5EA6\u6700\u5C0F\u7684\u5B50\u6570\u7EC4\u3002
`,paraId:15,tocIndex:3},{value:"\u793A\u4F8B 2\uFF1A",paraId:16,tocIndex:3},{value:`\u8F93\u5165\uFF1Atarget = 4, nums = [1,4,4]
\u8F93\u51FA\uFF1A1
`,paraId:17,tocIndex:3},{value:"\u793A\u4F8B 3\uFF1A",paraId:18,tocIndex:3},{value:`\u8F93\u5165\uFF1Atarget = 11, nums = [1,1,1,1,1,1,1,1]
\u8F93\u51FA\uFF1A0
`,paraId:19,tocIndex:3},{value:"150. \u9006\u6CE2\u5170\u8868\u8FBE\u5F0F\u6C42\u503C",paraId:0},{value:"\u7ED9\u4F60\u4E00\u4E2A\u5B57\u7B26\u4E32\u6570\u7EC4 ",paraId:20,tocIndex:5},{value:"tokens",paraId:20,tocIndex:5},{value:" \uFF0C\u8868\u793A\u4E00\u4E2A\u6839\u636E ",paraId:20,tocIndex:5},{value:"\u9006\u6CE2\u5170\u8868\u793A\u6CD5",paraId:20,tocIndex:5},{value:" \u8868\u793A\u7684\u7B97\u672F\u8868\u8FBE\u5F0F\u3002",paraId:20,tocIndex:5},{value:"\u8BF7\u4F60\u8BA1\u7B97\u8BE5\u8868\u8FBE\u5F0F\u3002\u8FD4\u56DE\u4E00\u4E2A\u8868\u793A\u8868\u8FBE\u5F0F\u503C\u7684\u6574\u6570\u3002",paraId:21,tocIndex:5},{value:"\u6CE8\u610F\uFF1A",paraId:22,tocIndex:5},{value:"\u6709\u6548\u7684\u7B97\u7B26\u4E3A ",paraId:23,tocIndex:5},{value:"'+'",paraId:23,tocIndex:5},{value:"\u3001",paraId:23,tocIndex:5},{value:"'-'",paraId:23,tocIndex:5},{value:"\u3001",paraId:23,tocIndex:5},{value:"'*'",paraId:23,tocIndex:5},{value:" \u548C ",paraId:23,tocIndex:5},{value:"'/'",paraId:23,tocIndex:5},{value:" \u3002",paraId:23,tocIndex:5},{value:"\u6BCF\u4E2A\u64CD\u4F5C\u6570\uFF08\u8FD0\u7B97\u5BF9\u8C61\uFF09\u90FD\u53EF\u4EE5\u662F\u4E00\u4E2A\u6574\u6570\u6216\u8005\u53E6\u4E00\u4E2A\u8868\u8FBE\u5F0F\u3002",paraId:23,tocIndex:5},{value:"\u4E24\u4E2A\u6574\u6570\u4E4B\u95F4\u7684\u9664\u6CD5\u603B\u662F ",paraId:23,tocIndex:5},{value:"\u5411\u96F6\u622A\u65AD",paraId:23,tocIndex:5},{value:" \u3002",paraId:23,tocIndex:5},{value:"\u8868\u8FBE\u5F0F\u4E2D\u4E0D\u542B\u9664\u96F6\u8FD0\u7B97\u3002",paraId:23,tocIndex:5},{value:"\u8F93\u5165\u662F\u4E00\u4E2A\u6839\u636E\u9006\u6CE2\u5170\u8868\u793A\u6CD5\u8868\u793A\u7684\u7B97\u672F\u8868\u8FBE\u5F0F\u3002",paraId:23,tocIndex:5},{value:"\u7B54\u6848\u53CA\u6240\u6709\u4E2D\u95F4\u8BA1\u7B97\u7ED3\u679C\u53EF\u4EE5\u7528 ",paraId:23,tocIndex:5},{value:"32 \u4F4D",paraId:23,tocIndex:5},{value:" \u6574\u6570\u8868\u793A\u3002",paraId:23,tocIndex:5},{value:"\u793A\u4F8B 1\uFF1A",paraId:24,tocIndex:5},{value:`\u8F93\u5165\uFF1Atokens = ["2","1","+","3","*"]
\u8F93\u51FA\uFF1A9
\u89E3\u91CA\uFF1A\u8BE5\u7B97\u5F0F\u8F6C\u5316\u4E3A\u5E38\u89C1\u7684\u4E2D\u7F00\u7B97\u672F\u8868\u8FBE\u5F0F\u4E3A\uFF1A((2 + 1) * 3) = 9
`,paraId:25,tocIndex:5},{value:"\u793A\u4F8B 2\uFF1A",paraId:26,tocIndex:5},{value:`\u8F93\u5165\uFF1Atokens = ["4","13","5","/","+"]
\u8F93\u51FA\uFF1A6
\u89E3\u91CA\uFF1A\u8BE5\u7B97\u5F0F\u8F6C\u5316\u4E3A\u5E38\u89C1\u7684\u4E2D\u7F00\u7B97\u672F\u8868\u8FBE\u5F0F\u4E3A\uFF1A(4 + (13 / 5)) = 6
`,paraId:27,tocIndex:5},{value:"\u793A\u4F8B 3\uFF1A",paraId:28,tocIndex:5},{value:`\u8F93\u5165\uFF1Atokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
\u8F93\u51FA\uFF1A22
\u89E3\u91CA\uFF1A\u8BE5\u7B97\u5F0F\u8F6C\u5316\u4E3A\u5E38\u89C1\u7684\u4E2D\u7F00\u7B97\u672F\u8868\u8FBE\u5F0F\u4E3A\uFF1A
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
`,paraId:29,tocIndex:5},{value:"\u6BD4\u8F83\u7B80\u5355\uFF0C\u7565",paraId:30,tocIndex:5},{value:`class Solution {
    public int evalRPN(String[] tokens) {
        List<String> signs = Arrays.asList("+", "-", "*", "/");
        Stack<String> stack = new Stack<>();

        for (int i = 0; i < tokens.length; i++) {
            if (!signs.contains(tokens[i])) {
                stack.push(tokens[i]);
            } else {
                long num1 = Long.parseLong(stack.pop());
                long num2 = Long.parseLong(stack.pop());
                long result = 0;
                if (tokens[i].equals("+")) {
                    result = num1 + num2;
                }
                if (tokens[i].equals("-")) {
                    result = num2 - num1;
                }
                if (tokens[i].equals("*")) {
                    result = num1 * num2;
                }
                if (tokens[i].equals("/")) {
                    result = num2 / num1;
                }
                stack.push(String.valueOf(result));
            }
        }
        return Integer.parseInt(stack.pop());
    }
}
`,paraId:31,tocIndex:5},{value:"394. \u5B57\u7B26\u4E32\u89E3\u7801",paraId:0},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u7ECF\u8FC7\u7F16\u7801\u7684\u5B57\u7B26\u4E32\uFF0C\u8FD4\u56DE\u5B83\u89E3\u7801\u540E\u7684\u5B57\u7B26\u4E32\u3002",paraId:32,tocIndex:6},{value:"\u7F16\u7801\u89C4\u5219\u4E3A: ",paraId:33,tocIndex:6},{value:"k[encoded_string]",paraId:33,tocIndex:6},{value:"\uFF0C\u8868\u793A\u5176\u4E2D\u65B9\u62EC\u53F7\u5185\u90E8\u7684 ",paraId:33,tocIndex:6},{value:"encoded_string",paraId:33,tocIndex:6},{value:" \u6B63\u597D\u91CD\u590D ",paraId:33,tocIndex:6},{value:"k",paraId:33,tocIndex:6},{value:" \u6B21\u3002\u6CE8\u610F ",paraId:33,tocIndex:6},{value:"k",paraId:33,tocIndex:6},{value:" \u4FDD\u8BC1\u4E3A\u6B63\u6574\u6570\u3002",paraId:33,tocIndex:6},{value:"\u4F60\u53EF\u4EE5\u8BA4\u4E3A\u8F93\u5165\u5B57\u7B26\u4E32\u603B\u662F\u6709\u6548\u7684\uFF1B\u8F93\u5165\u5B57\u7B26\u4E32\u4E2D\u6CA1\u6709\u989D\u5916\u7684\u7A7A\u683C\uFF0C\u4E14\u8F93\u5165\u7684\u65B9\u62EC\u53F7\u603B\u662F\u7B26\u5408\u683C\u5F0F\u8981\u6C42\u7684\u3002",paraId:34,tocIndex:6},{value:"\u6B64\u5916\uFF0C\u4F60\u53EF\u4EE5\u8BA4\u4E3A\u539F\u59CB\u6570\u636E\u4E0D\u5305\u542B\u6570\u5B57\uFF0C\u6240\u6709\u7684\u6570\u5B57\u53EA\u8868\u793A\u91CD\u590D\u7684\u6B21\u6570 ",paraId:35,tocIndex:6},{value:"k",paraId:35,tocIndex:6},{value:" \uFF0C\u4F8B\u5982\u4E0D\u4F1A\u51FA\u73B0\u50CF ",paraId:35,tocIndex:6},{value:"3a",paraId:35,tocIndex:6},{value:" \u6216 ",paraId:35,tocIndex:6},{value:"2[4]",paraId:35,tocIndex:6},{value:" \u7684\u8F93\u5165\u3002",paraId:35,tocIndex:6},{value:"\u793A\u4F8B 1\uFF1A",paraId:36,tocIndex:6},{value:`\u8F93\u5165\uFF1As = "3[a]2[bc]"
\u8F93\u51FA\uFF1A"aaabcbc"
`,paraId:37,tocIndex:6},{value:"\u793A\u4F8B 2\uFF1A",paraId:38,tocIndex:6},{value:`\u8F93\u5165\uFF1As = "3[a2[c]]"
\u8F93\u51FA\uFF1A"accaccacc"
`,paraId:39,tocIndex:6},{value:"\u793A\u4F8B 3\uFF1A",paraId:40,tocIndex:6},{value:`\u8F93\u5165\uFF1As = "2[abc]3[cd]ef"
\u8F93\u51FA\uFF1A"abcabccdcdcdef"
`,paraId:41,tocIndex:6},{value:"\u793A\u4F8B 4\uFF1A",paraId:42,tocIndex:6},{value:`\u8F93\u5165\uFF1As = "abc3[cd]xyz"
\u8F93\u51FA\uFF1A"abccdcdcdxyz"
`,paraId:43,tocIndex:6},{value:"\u6BCF\u6B21\u9047\u5230\u5DE6\u62EC\u53F7 ",paraId:44,tocIndex:6},{value:"[",paraId:44,tocIndex:6},{value:" \u65F6\uFF0C\u5C06\u5F53\u524D\u7684\u500D\u6570\u548C\u5B57\u7B26\u4E32\u538B\u6808\uFF0C\u9047\u5230\u53F3\u62EC\u53F7 ",paraId:44,tocIndex:6},{value:"]",paraId:44,tocIndex:6},{value:" \u65F6\uFF0C\u5C06\u6808\u4E2D\u7684\u5B57\u7B26\u4E32\u548C\u500D\u6570\u5F39\u51FA\uFF0C\u8FDB\u884C\u91CD\u590D\u62FC\u63A5",paraId:44,tocIndex:6},{value:`class Solution {
    public String decodeString(String s) {
        Stack<String> strStack = new Stack<>();
        Stack<Integer> numStack = new Stack<>();
        String curr = "";
        int temp = 0;
        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) {
                temp = temp * 10 + (ch - '0');
            } else if (ch == '[') {
                numStack.push(temp);
                strStack.push(curr);
                curr = "";
                temp = 0;
            } else if (ch == ']') {
                int times = numStack.pop();
                StringBuilder builder = new StringBuilder(strStack.pop());
                for (int i = 0; i < times; i++) {
                    builder.append(curr);
                }
                curr = builder.toString();
            } else {
                curr = curr + ch;
            }
        }
        return curr;
    }
}
`,paraId:45,tocIndex:6},{value:"71. \u7B80\u5316\u8DEF\u5F84",paraId:0},{value:"\u7ED9\u4F60\u4E00\u4E2A\u5B57\u7B26\u4E32 ",paraId:46,tocIndex:7},{value:"path",paraId:46,tocIndex:7},{value:" \uFF0C\u8868\u793A\u6307\u5411\u67D0\u4E00\u6587\u4EF6\u6216\u76EE\u5F55\u7684 Unix \u98CE\u683C ",paraId:46,tocIndex:7},{value:"\u7EDD\u5BF9\u8DEF\u5F84",paraId:46,tocIndex:7},{value:" \uFF08\u4EE5 ",paraId:46,tocIndex:7},{value:"'/'",paraId:46,tocIndex:7},{value:" \u5F00\u5934\uFF09\uFF0C\u8BF7\u4F60\u5C06\u5176\u8F6C\u5316\u4E3A\u66F4\u52A0\u7B80\u6D01\u7684\u89C4\u8303\u8DEF\u5F84\u3002",paraId:46,tocIndex:7},{value:"\u5728 Unix \u98CE\u683C\u7684\u6587\u4EF6\u7CFB\u7EDF\u4E2D\uFF0C\u4E00\u4E2A\u70B9\uFF08",paraId:47,tocIndex:7},{value:".",paraId:47,tocIndex:7},{value:"\uFF09\u8868\u793A\u5F53\u524D\u76EE\u5F55\u672C\u8EAB\uFF1B\u6B64\u5916\uFF0C\u4E24\u4E2A\u70B9 \uFF08",paraId:47,tocIndex:7},{value:"..",paraId:47,tocIndex:7},{value:"\uFF09 \u8868\u793A\u5C06\u76EE\u5F55\u5207\u6362\u5230\u4E0A\u4E00\u7EA7\uFF08\u6307\u5411\u7236\u76EE\u5F55\uFF09\uFF1B\u4E24\u8005\u90FD\u53EF\u4EE5\u662F\u590D\u6742\u76F8\u5BF9\u8DEF\u5F84\u7684\u7EC4\u6210\u90E8\u5206\u3002\u4EFB\u610F\u591A\u4E2A\u8FDE\u7EED\u7684\u659C\u6760\uFF08\u5373\uFF0C",paraId:47,tocIndex:7},{value:"'//'",paraId:47,tocIndex:7},{value:"\uFF09\u90FD\u88AB\u89C6\u4E3A\u5355\u4E2A\u659C\u6760 ",paraId:47,tocIndex:7},{value:"'/'",paraId:47,tocIndex:7},{value:" \u3002 \u5BF9\u4E8E\u6B64\u95EE\u9898\uFF0C\u4EFB\u4F55\u5176\u4ED6\u683C\u5F0F\u7684\u70B9\uFF08\u4F8B\u5982\uFF0C",paraId:47,tocIndex:7},{value:"'...'",paraId:47,tocIndex:7},{value:"\uFF09\u5747\u88AB\u89C6\u4E3A\u6587\u4EF6 / \u76EE\u5F55\u540D\u79F0\u3002",paraId:47,tocIndex:7},{value:"\u8BF7\u6CE8\u610F\uFF0C\u8FD4\u56DE\u7684 ",paraId:48,tocIndex:7},{value:"\u89C4\u8303\u8DEF\u5F84",paraId:48,tocIndex:7},{value:" \u5FC5\u987B\u9075\u5FAA\u4E0B\u8FF0\u683C\u5F0F\uFF1A",paraId:48,tocIndex:7},{value:"\u59CB\u7EC8\u4EE5\u659C\u6760 ",paraId:49,tocIndex:7},{value:"'/'",paraId:49,tocIndex:7},{value:" \u5F00\u5934\u3002",paraId:49,tocIndex:7},{value:"\u4E24\u4E2A\u76EE\u5F55\u540D\u4E4B\u95F4\u5FC5\u987B\u53EA\u6709\u4E00\u4E2A\u659C\u6760 ",paraId:49,tocIndex:7},{value:"'/'",paraId:49,tocIndex:7},{value:" \u3002",paraId:49,tocIndex:7},{value:"\u6700\u540E\u4E00\u4E2A\u76EE\u5F55\u540D\uFF08\u5982\u679C\u5B58\u5728\uFF09",paraId:49,tocIndex:7},{value:"\u4E0D\u80FD",paraId:49,tocIndex:7},{value:" \u4EE5 ",paraId:49,tocIndex:7},{value:"'/'",paraId:49,tocIndex:7},{value:" \u7ED3\u5C3E\u3002",paraId:49,tocIndex:7},{value:"\u6B64\u5916\uFF0C\u8DEF\u5F84\u4EC5\u5305\u542B\u4ECE\u6839\u76EE\u5F55\u5230\u76EE\u6807\u6587\u4EF6\u6216\u76EE\u5F55\u7684\u8DEF\u5F84\u4E0A\u7684\u76EE\u5F55\uFF08\u5373\uFF0C\u4E0D\u542B ",paraId:49,tocIndex:7},{value:"'.'",paraId:49,tocIndex:7},{value:" \u6216 ",paraId:49,tocIndex:7},{value:"'..'",paraId:49,tocIndex:7},{value:"\uFF09\u3002",paraId:49,tocIndex:7},{value:"\u8FD4\u56DE\u7B80\u5316\u540E\u5F97\u5230\u7684 ",paraId:50,tocIndex:7},{value:"\u89C4\u8303\u8DEF\u5F84",paraId:50,tocIndex:7},{value:" \u3002",paraId:50,tocIndex:7},{value:"\u793A\u4F8B 1\uFF1A",paraId:51,tocIndex:7},{value:`\u8F93\u5165\uFF1Apath = "/home/"
\u8F93\u51FA\uFF1A"/home"
\u89E3\u91CA\uFF1A\u6CE8\u610F\uFF0C\u6700\u540E\u4E00\u4E2A\u76EE\u5F55\u540D\u540E\u9762\u6CA1\u6709\u659C\u6760\u3002 
`,paraId:52,tocIndex:7},{value:"\u793A\u4F8B 2\uFF1A",paraId:53,tocIndex:7},{value:`\u8F93\u5165\uFF1Apath = "/../"
\u8F93\u51FA\uFF1A"/"
\u89E3\u91CA\uFF1A\u4ECE\u6839\u76EE\u5F55\u5411\u4E0A\u4E00\u7EA7\u662F\u4E0D\u53EF\u884C\u7684\uFF0C\u56E0\u4E3A\u6839\u76EE\u5F55\u662F\u4F60\u53EF\u4EE5\u5230\u8FBE\u7684\u6700\u9AD8\u7EA7\u3002
`,paraId:54,tocIndex:7},{value:"\u793A\u4F8B 3\uFF1A",paraId:55,tocIndex:7},{value:`\u8F93\u5165\uFF1Apath = "/home//foo/"
\u8F93\u51FA\uFF1A"/home/foo"
\u89E3\u91CA\uFF1A\u5728\u89C4\u8303\u8DEF\u5F84\u4E2D\uFF0C\u591A\u4E2A\u8FDE\u7EED\u659C\u6760\u9700\u8981\u7528\u4E00\u4E2A\u659C\u6760\u66FF\u6362\u3002
`,paraId:56,tocIndex:7},{value:"\u793A\u4F8B 4\uFF1A",paraId:57,tocIndex:7},{value:`\u8F93\u5165\uFF1Apath = "/a/./b/../../c/"
\u8F93\u51FA\uFF1A"/c"
`,paraId:58,tocIndex:7},{value:'\u5C06\u5B57\u7B26\u6309"/"\u5206\u5272\uFF0C\u7136\u540E\u904D\u5386\u5904\u7406\uFF0C\u9047\u5230".."\u5C31\u4ECE\u6808\u91CC\u5F39\u51FA\u4E00\u4E2A\u5143\u7D20\uFF0C\u6700\u540E\u6839\u636E\u6808\u5185\u5143\u7D20\u7528"/"\u4F9D\u6B21\u62FC\u63A5',paraId:59,tocIndex:7},{value:`public String simplifyPath(String path) {
    String[] names = path.split("/");
    Deque<String> stack = new ArrayDeque<String>();
    for (String name : names) {
        if ("..".equals(name)) {
            if (!stack.isEmpty()) {
                stack.pollLast();
            }
        } else if (!name.isEmpty() && !".".equals(name)) {
            stack.offerLast(name);
        }
    }
    StringBuilder ans = new StringBuilder();
    if (stack.isEmpty()) {
        ans.append('/');
    } else {
        while (!stack.isEmpty()) {
            ans.append('/');
            ans.append(stack.pollFirst());
        }
    }
    return ans.toString();
}
`,paraId:60,tocIndex:7},{value:"739. \u6BCF\u65E5\u6E29\u5EA6",paraId:0},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u6574\u6570\u6570\u7EC4 ",paraId:61,tocIndex:9},{value:"temperatures",paraId:61,tocIndex:9},{value:" \uFF0C\u8868\u793A\u6BCF\u5929\u7684\u6E29\u5EA6\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4 ",paraId:61,tocIndex:9},{value:"answer",paraId:61,tocIndex:9},{value:" \uFF0C\u5176\u4E2D ",paraId:61,tocIndex:9},{value:"answer[i]",paraId:61,tocIndex:9},{value:" \u662F\u6307\u5BF9\u4E8E\u7B2C ",paraId:61,tocIndex:9},{value:"i",paraId:61,tocIndex:9},{value:" \u5929\uFF0C\u4E0B\u4E00\u4E2A\u66F4\u9AD8\u6E29\u5EA6\u51FA\u73B0\u5728\u51E0\u5929\u540E\u3002\u5982\u679C\u6C14\u6E29\u5728\u8FD9\u4E4B\u540E\u90FD\u4E0D\u4F1A\u5347\u9AD8\uFF0C\u8BF7\u5728\u8BE5\u4F4D\u7F6E\u7528 ",paraId:61,tocIndex:9},{value:"0",paraId:61,tocIndex:9},{value:" \u6765\u4EE3\u66FF\u3002",paraId:61,tocIndex:9},{value:"\u793A\u4F8B 1:",paraId:62,tocIndex:9},{value:`\u8F93\u5165: temperatures = [73,74,75,71,69,72,76,73]
\u8F93\u51FA: [1,1,4,2,1,1,0,0]
`,paraId:63,tocIndex:9},{value:"\u793A\u4F8B 2:",paraId:64,tocIndex:9},{value:`\u8F93\u5165: temperatures = [30,40,50,60]
\u8F93\u51FA: [1,1,1,0]
`,paraId:65,tocIndex:9},{value:"\u793A\u4F8B 3:",paraId:66,tocIndex:9},{value:`\u8F93\u5165: temperatures = [30,60,90]
\u8F93\u51FA: [1,1,0]
`,paraId:67,tocIndex:9},{value:"\u901A\u8FC7\u5B58\u50A8\u4E0B\u6807\u7684\u6808\u6765\u6BD4\u8F83\u6E29\u5EA6\uFF0C\u5982\u679C\u5F53\u524D\u6E29\u5EA6\u5927\u4E8E\u6808\u9876\u5219\u4E0D\u65AD\u5F39\u51FA\u6808\u9876\u5143\u7D20\u5E76\u8BA1\u7B97\u4E0B\u6807\u5DEE\u503C\uFF0C\u76F4\u5230\u5F53\u524D\u6E29\u5EA6\u5C0F\u4E8E\u6808\u9876\u5143\u7D20\uFF0C\u624D\u5C06\u5F53\u524D\u4E0B\u6807\u63D2\u5165",paraId:68,tocIndex:9},{value:`public int[] dailyTemperatures(int[] temperatures) {
    Stack<Integer> stack = new Stack<>();
    int[] result = new int[temperatures.length];
    boolean flag = true;
    for (int i = 0; i < temperatures.length; i++) {
        if (stack.isEmpty()) {
            stack.push(i);
            continue;
        }
        while (!stack.isEmpty() && flag) {
            int topNum = stack.peek();
            if (temperatures[i] > temperatures[topNum]) {
                result[topNum] = i - topNum;
                stack.pop();
            }else {
                flag=false;
            }
        }
        stack.push(i);
        flag = true;
    }
    return result;
}
`,paraId:69,tocIndex:9},{value:"349. \u4E24\u4E2A\u6570\u7EC4\u7684\u4EA4\u96C6",paraId:0},{value:"\u7ED9\u5B9A\u4E24\u4E2A\u6570\u7EC4 ",paraId:70,tocIndex:11},{value:"nums1",paraId:70,tocIndex:11},{value:" \u548C ",paraId:70,tocIndex:11},{value:"nums2",paraId:70,tocIndex:11},{value:" \uFF0C\u8FD4\u56DE \u5B83\u4EEC\u7684 \u4EA4\u96C6 \u3002\u8F93\u51FA\u7ED3\u679C\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u4E00\u5B9A\u662F ",paraId:70,tocIndex:11},{value:"\u552F\u4E00",paraId:70,tocIndex:11},{value:" \u7684\u3002\u6211\u4EEC\u53EF\u4EE5 ",paraId:70,tocIndex:11},{value:"\u4E0D\u8003\u8651\u8F93\u51FA\u7ED3\u679C\u7684\u987A\u5E8F",paraId:70,tocIndex:11},{value:" \u3002",paraId:70,tocIndex:11},{value:"\u793A\u4F8B 1\uFF1A",paraId:71,tocIndex:11},{value:`\u8F93\u5165\uFF1Anums1 = [1,2,2,1], nums2 = [2,2]
\u8F93\u51FA\uFF1A[2]
`,paraId:72,tocIndex:11},{value:"\u793A\u4F8B 2\uFF1A",paraId:73,tocIndex:11},{value:`\u8F93\u5165\uFF1Anums1 = [4,9,5], nums2 = [9,4,9,8,4]
\u8F93\u51FA\uFF1A[9,4]
\u89E3\u91CA\uFF1A[4,9] \u4E5F\u662F\u53EF\u901A\u8FC7\u7684
`,paraId:74,tocIndex:11},{value:"\u4F7F\u7528HashSet\u66B4\u529B\u89E3\u51B3",paraId:75,tocIndex:11},{value:`class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        HashSet<Integer> set1=new HashSet<>();
        for (int j : nums1) {
            set1.add(j);
        }
        HashSet<Integer> resultSet=new HashSet<>();
        for (int j : nums2) {
            if (set1.contains(j)) {
                resultSet.add(j);
            }
        }
        return resultSet.stream().mapToInt(Integer::valueOf).toArray();
    }
}
`,paraId:76,tocIndex:11},{value:"219. \u5B58\u5728\u91CD\u590D\u5143\u7D20 II",paraId:0},{value:"\u7ED9\u4F60\u4E00\u4E2A\u6574\u6570\u6570\u7EC4 ",paraId:77,tocIndex:12},{value:"nums",paraId:77,tocIndex:12},{value:" \u548C\u4E00\u4E2A\u6574\u6570 ",paraId:77,tocIndex:12},{value:"k",paraId:77,tocIndex:12},{value:" \uFF0C\u5224\u65AD\u6570\u7EC4\u4E2D\u662F\u5426\u5B58\u5728\u4E24\u4E2A ",paraId:77,tocIndex:12},{value:"\u4E0D\u540C\u7684\u7D22\u5F15",paraId:77,tocIndex:12},{value:" ",paraId:77,tocIndex:12},{value:"i",paraId:77,tocIndex:12},{value:" \u548C ",paraId:77,tocIndex:12},{value:"j",paraId:77,tocIndex:12},{value:" \uFF0C\u6EE1\u8DB3 ",paraId:77,tocIndex:12},{value:"nums[i] == nums[j]",paraId:77,tocIndex:12},{value:" \u4E14 ",paraId:77,tocIndex:12},{value:"abs(i - j) <= k",paraId:77,tocIndex:12},{value:" \u3002\u5982\u679C\u5B58\u5728\uFF0C\u8FD4\u56DE ",paraId:77,tocIndex:12},{value:"true",paraId:77,tocIndex:12},{value:" \uFF1B\u5426\u5219\uFF0C\u8FD4\u56DE ",paraId:77,tocIndex:12},{value:"false",paraId:77,tocIndex:12},{value:" \u3002",paraId:77,tocIndex:12},{value:"\u793A\u4F8B 1\uFF1A",paraId:78,tocIndex:12},{value:`\u8F93\u5165\uFF1Anums = [1,2,3,1], k = 3
\u8F93\u51FA\uFF1Atrue
`,paraId:79,tocIndex:12},{value:"\u793A\u4F8B 2\uFF1A",paraId:80,tocIndex:12},{value:`\u8F93\u5165\uFF1Anums = [1,0,1,1], k = 1
\u8F93\u51FA\uFF1Atrue
`,paraId:81,tocIndex:12},{value:"\u793A\u4F8B 3\uFF1A",paraId:82,tocIndex:12},{value:`\u8F93\u5165\uFF1Anums = [1,2,3,1,2,3], k = 2
\u8F93\u51FA\uFF1Afalse
`,paraId:83,tocIndex:12},{value:`class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        int diff = Integer.MAX_VALUE;
        for (int i = 0; i < nums.length; i++) {
            if (!map.containsKey(nums[i])) {
                map.put(nums[i], i);
            } else {
                int pre = map.get(nums[i]);
                diff = Math.min(Math.abs(i-pre),diff);
                map.put(nums[i], i);
            }
        }
        return diff <= k;
    }
}
`,paraId:84,tocIndex:12},{value:"88. \u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u6570\u7EC4",paraId:0},{value:"\u7ED9\u4F60\u4E24\u4E2A\u6309 ",paraId:85,tocIndex:14},{value:"\u975E\u9012\u51CF\u987A\u5E8F",paraId:85,tocIndex:14},{value:" \u6392\u5217\u7684\u6574\u6570\u6570\u7EC4 ",paraId:85,tocIndex:14},{value:"nums1",paraId:85,tocIndex:14},{value:" \u548C ",paraId:85,tocIndex:14},{value:"nums2",paraId:85,tocIndex:14},{value:"\uFF0C\u53E6\u6709\u4E24\u4E2A\u6574\u6570 ",paraId:85,tocIndex:14},{value:"m",paraId:85,tocIndex:14},{value:" \u548C ",paraId:85,tocIndex:14},{value:"n",paraId:85,tocIndex:14},{value:" \uFF0C\u5206\u522B\u8868\u793A ",paraId:85,tocIndex:14},{value:"nums1",paraId:85,tocIndex:14},{value:" \u548C ",paraId:85,tocIndex:14},{value:"nums2",paraId:85,tocIndex:14},{value:" \u4E2D\u7684\u5143\u7D20\u6570\u76EE\u3002",paraId:85,tocIndex:14},{value:"\u8BF7\u4F60 ",paraId:86,tocIndex:14},{value:"\u5408\u5E76",paraId:86,tocIndex:14},{value:" ",paraId:86,tocIndex:14},{value:"nums2",paraId:86,tocIndex:14},{value:" \u5230 ",paraId:86,tocIndex:14},{value:"nums1",paraId:86,tocIndex:14},{value:" \u4E2D\uFF0C\u4F7F\u5408\u5E76\u540E\u7684\u6570\u7EC4\u540C\u6837\u6309 ",paraId:86,tocIndex:14},{value:"\u975E\u9012\u51CF\u987A\u5E8F",paraId:86,tocIndex:14},{value:" \u6392\u5217\u3002",paraId:86,tocIndex:14},{value:"**\u6CE8\u610F\uFF1A**\u6700\u7EC8\uFF0C\u5408\u5E76\u540E\u6570\u7EC4\u4E0D\u5E94\u7531\u51FD\u6570\u8FD4\u56DE\uFF0C\u800C\u662F\u5B58\u50A8\u5728\u6570\u7EC4 ",paraId:87,tocIndex:14},{value:"nums1",paraId:87,tocIndex:14},{value:" \u4E2D\u3002\u4E3A\u4E86\u5E94\u5BF9\u8FD9\u79CD\u60C5\u51B5\uFF0C",paraId:87,tocIndex:14},{value:"nums1",paraId:87,tocIndex:14},{value:" \u7684\u521D\u59CB\u957F\u5EA6\u4E3A ",paraId:87,tocIndex:14},{value:"m + n",paraId:87,tocIndex:14},{value:"\uFF0C\u5176\u4E2D\u524D ",paraId:87,tocIndex:14},{value:"m",paraId:87,tocIndex:14},{value:" \u4E2A\u5143\u7D20\u8868\u793A\u5E94\u5408\u5E76\u7684\u5143\u7D20\uFF0C\u540E ",paraId:87,tocIndex:14},{value:"n",paraId:87,tocIndex:14},{value:" \u4E2A\u5143\u7D20\u4E3A ",paraId:87,tocIndex:14},{value:"0",paraId:87,tocIndex:14},{value:" \uFF0C\u5E94\u5FFD\u7565\u3002",paraId:87,tocIndex:14},{value:"nums2",paraId:87,tocIndex:14},{value:" \u7684\u957F\u5EA6\u4E3A ",paraId:87,tocIndex:14},{value:"n",paraId:87,tocIndex:14},{value:" \u3002",paraId:87,tocIndex:14},{value:"\u793A\u4F8B 1\uFF1A",paraId:88,tocIndex:14},{value:`\u8F93\u5165\uFF1Anums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
\u8F93\u51FA\uFF1A[1,2,2,3,5,6]
\u89E3\u91CA\uFF1A\u9700\u8981\u5408\u5E76 [1,2,3] \u548C [2,5,6] \u3002
\u5408\u5E76\u7ED3\u679C\u662F [1,2,2,3,5,6] \uFF0C\u5176\u4E2D\u659C\u4F53\u52A0\u7C97\u6807\u6CE8\u7684\u4E3A nums1 \u4E2D\u7684\u5143\u7D20\u3002
`,paraId:89,tocIndex:14},{value:"\u793A\u4F8B 2\uFF1A",paraId:90,tocIndex:14},{value:`\u8F93\u5165\uFF1Anums1 = [1], m = 1, nums2 = [], n = 0
\u8F93\u51FA\uFF1A[1]
\u89E3\u91CA\uFF1A\u9700\u8981\u5408\u5E76 [1] \u548C [] \u3002
\u5408\u5E76\u7ED3\u679C\u662F [1] \u3002
`,paraId:91,tocIndex:14},{value:"\u793A\u4F8B 3\uFF1A",paraId:92,tocIndex:14},{value:`\u8F93\u5165\uFF1Anums1 = [0], m = 0, nums2 = [1], n = 1
\u8F93\u51FA\uFF1A[1]
\u89E3\u91CA\uFF1A\u9700\u8981\u5408\u5E76\u7684\u6570\u7EC4\u662F [] \u548C [1] \u3002
\u5408\u5E76\u7ED3\u679C\u662F [1] \u3002
\u6CE8\u610F\uFF0C\u56E0\u4E3A m = 0 \uFF0C\u6240\u4EE5 nums1 \u4E2D\u6CA1\u6709\u5143\u7D20\u3002nums1 \u4E2D\u4EC5\u5B58\u7684 0 \u4EC5\u4EC5\u662F\u4E3A\u4E86\u786E\u4FDD\u5408\u5E76\u7ED3\u679C\u53EF\u4EE5\u987A\u5229\u5B58\u653E\u5230 nums1 \u4E2D\u3002
`,paraId:93,tocIndex:14},{value:`class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        for (int i = 0; i != n; ++i) {
            nums1[m + i] = nums2[i];
        }
        Arrays.sort(nums1);
    }
}
`,paraId:94,tocIndex:14},{value:"15. \u4E09\u6570\u4E4B\u548C",paraId:0},{value:"\u7ED9\u4F60\u4E00\u4E2A\u6574\u6570\u6570\u7EC4 ",paraId:95,tocIndex:15},{value:"nums",paraId:95,tocIndex:15},{value:" \uFF0C\u5224\u65AD\u662F\u5426\u5B58\u5728\u4E09\u5143\u7EC4 ",paraId:95,tocIndex:15},{value:"[nums[i], nums[j], nums[k]]",paraId:95,tocIndex:15},{value:" \u6EE1\u8DB3 ",paraId:95,tocIndex:15},{value:"i != j",paraId:95,tocIndex:15},{value:"\u3001",paraId:95,tocIndex:15},{value:"i != k",paraId:95,tocIndex:15},{value:" \u4E14 ",paraId:95,tocIndex:15},{value:"j != k",paraId:95,tocIndex:15},{value:" \uFF0C\u540C\u65F6\u8FD8\u6EE1\u8DB3 ",paraId:95,tocIndex:15},{value:"nums[i] + nums[j] + nums[k] == 0",paraId:95,tocIndex:15},{value:" \u3002\u8BF7",paraId:95,tocIndex:15},{value:"\u4F60\u8FD4\u56DE\u6240\u6709\u548C\u4E3A ",paraId:96,tocIndex:15},{value:"0",paraId:96,tocIndex:15},{value:" \u4E14\u4E0D\u91CD\u590D\u7684\u4E09\u5143\u7EC4\u3002",paraId:96,tocIndex:15},{value:"**\u6CE8\u610F\uFF1A**\u7B54\u6848\u4E2D\u4E0D\u53EF\u4EE5\u5305\u542B\u91CD\u590D\u7684\u4E09\u5143\u7EC4\u3002",paraId:97,tocIndex:15},{value:"\u793A\u4F8B 1\uFF1A",paraId:98,tocIndex:15},{value:`\u8F93\u5165\uFF1Anums = [-1,0,1,2,-1,-4]
\u8F93\u51FA\uFF1A[[-1,-1,2],[-1,0,1]]
\u89E3\u91CA\uFF1A
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 \u3002
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 \u3002
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 \u3002
\u4E0D\u540C\u7684\u4E09\u5143\u7EC4\u662F [-1,0,1] \u548C [-1,-1,2] \u3002
\u6CE8\u610F\uFF0C\u8F93\u51FA\u7684\u987A\u5E8F\u548C\u4E09\u5143\u7EC4\u7684\u987A\u5E8F\u5E76\u4E0D\u91CD\u8981\u3002
`,paraId:99,tocIndex:15},{value:"\u793A\u4F8B 2\uFF1A",paraId:100,tocIndex:15},{value:`\u8F93\u5165\uFF1Anums = [0,1,1]
\u8F93\u51FA\uFF1A[]
\u89E3\u91CA\uFF1A\u552F\u4E00\u53EF\u80FD\u7684\u4E09\u5143\u7EC4\u548C\u4E0D\u4E3A 0 \u3002
`,paraId:101,tocIndex:15},{value:"\u793A\u4F8B 3\uFF1A",paraId:102,tocIndex:15},{value:`\u8F93\u5165\uFF1Anums = [0,0,0]
\u8F93\u51FA\uFF1A[[0,0,0]]
\u89E3\u91CA\uFF1A\u552F\u4E00\u53EF\u80FD\u7684\u4E09\u5143\u7EC4\u548C\u4E3A 0 \u3002
`,paraId:103,tocIndex:15},{value:"\u548C\u66B4\u529B\u6CD5\u5DEE\u4E0D\u591A\uFF0Ci\u5148\u4ECE0\u5F00\u59CB\u904D\u5386\uFF0C\u5DE6\u6307\u9488\u4E3Ai+1,\u53F3\u6307\u9488\u4E3Alength-1",paraId:104,tocIndex:15},{value:`class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums); // \u6392\u5E8F\u6570\u7EC4
        
        for (int i = 0; i < nums.length - 2; i++) {
            // \u907F\u514D\u91CD\u590D\u7684\u7B2C\u4E00\u4E2A\u6570
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));

                    // \u907F\u514D\u91CD\u590D\u7684\u7B2C\u4E8C\u4E2A\u6570
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    // \u907F\u514D\u91CD\u590D\u7684\u7B2C\u4E09\u4E2A\u6570
                    while (left < right && nums[right] == nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
}
`,paraId:105,tocIndex:15},{value:"75. \u989C\u8272\u5206\u7C7B",paraId:0},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u5305\u542B\u7EA2\u8272\u3001\u767D\u8272\u548C\u84DD\u8272\u3001\u5171 ",paraId:106,tocIndex:16},{value:"n",paraId:106,tocIndex:16},{value:" \u4E2A\u5143\u7D20\u7684\u6570\u7EC4 ",paraId:106,tocIndex:16},{value:"nums",paraId:106,tocIndex:16},{value:" \uFF0C**",paraId:106,tocIndex:16},{value:"\u539F\u5730",paraId:106,tocIndex:16},{value:"**\u5BF9\u5B83\u4EEC\u8FDB\u884C\u6392\u5E8F\uFF0C\u4F7F\u5F97\u76F8\u540C\u989C\u8272\u7684\u5143\u7D20\u76F8\u90BB\uFF0C\u5E76\u6309\u7167\u7EA2\u8272\u3001\u767D\u8272\u3001\u84DD\u8272\u987A\u5E8F\u6392\u5217\u3002",paraId:106,tocIndex:16},{value:"\u6211\u4EEC\u4F7F\u7528\u6574\u6570 ",paraId:107,tocIndex:16},{value:"0",paraId:107,tocIndex:16},{value:"\u3001 ",paraId:107,tocIndex:16},{value:"1",paraId:107,tocIndex:16},{value:" \u548C ",paraId:107,tocIndex:16},{value:"2",paraId:107,tocIndex:16},{value:" \u5206\u522B\u8868\u793A\u7EA2\u8272\u3001\u767D\u8272\u548C\u84DD\u8272\u3002",paraId:107,tocIndex:16},{value:"\u5FC5\u987B\u5728\u4E0D\u4F7F\u7528\u5E93\u5185\u7F6E\u7684 sort \u51FD\u6570\u7684\u60C5\u51B5\u4E0B\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u3002",paraId:108,tocIndex:16},{value:"\u793A\u4F8B 1\uFF1A",paraId:109,tocIndex:16},{value:`\u8F93\u5165\uFF1Anums = [2,0,2,1,1,0]
\u8F93\u51FA\uFF1A[0,0,1,1,2,2]
`,paraId:110,tocIndex:16},{value:"\u793A\u4F8B 2\uFF1A",paraId:111,tocIndex:16},{value:`\u8F93\u5165\uFF1Anums = [2,0,1]
\u8F93\u51FA\uFF1A[0,1,2]
`,paraId:112,tocIndex:16},{value:"\u5DE7\u5999\u5F97\u5229\u7528\u53CC\u6307\u9488\u5C06\u6570\u7EC4\u5212\u5206\u4E3A\u4E09\u4E2A\u8303\u56F4\uFF0C\u5E76\u6839\u636E\u904D\u5386\u5230\u7684\u6570\u63A7\u5236\u4E09\u4E2A\u8303\u56F4\u7684\u533A\u95F4",paraId:113,tocIndex:16},{value:`class Solution {
    public void sortColors(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return;
        }

        // all in [0, zero) = 0
        // all in [zero, i) = 1
        // all in [two, len - 1] = 2
        
        // \u5FAA\u73AF\u7EC8\u6B62\u6761\u4EF6\u662F i == two\uFF0C\u90A3\u4E48\u5FAA\u73AF\u53EF\u4EE5\u7EE7\u7EED\u7684\u6761\u4EF6\u662F i < two
        // \u4E3A\u4E86\u4FDD\u8BC1\u521D\u59CB\u5316\u7684\u65F6\u5019 [0, zero) \u4E3A\u7A7A\uFF0C\u8BBE\u7F6E zero = 0\uFF0C
        // \u6240\u4EE5\u4E0B\u9762\u904D\u5386\u5230 0 \u7684\u65F6\u5019\uFF0C\u5148\u4EA4\u6362\uFF0C\u518D\u52A0
        int zero = 0;

        // \u4E3A\u4E86\u4FDD\u8BC1\u521D\u59CB\u5316\u7684\u65F6\u5019 [two, len - 1] \u4E3A\u7A7A\uFF0C\u8BBE\u7F6E two = len
        // \u6240\u4EE5\u4E0B\u9762\u904D\u5386\u5230 2 \u7684\u65F6\u5019\uFF0C\u5148\u51CF\uFF0C\u518D\u4EA4\u6362
        int two = len;
        int i = 0;
        // \u5F53 i == two \u4E0A\u9762\u7684\u4E09\u4E2A\u5B50\u533A\u95F4\u6B63\u597D\u8986\u76D6\u4E86\u5168\u90E8\u6570\u7EC4
        // \u56E0\u6B64\uFF0C\u5FAA\u73AF\u53EF\u4EE5\u7EE7\u7EED\u7684\u6761\u4EF6\u662F i < two
        while (i < two) {
            if (nums[i] == 0) {
                swap(nums, i, zero);
                zero++;
                i++;
            } else if (nums[i] == 1) {
                i++;
            } else {
                two--;
                swap(nums, i, two);
            }
        }
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
`,paraId:114,tocIndex:16},{value:"134. \u52A0\u6CB9\u7AD9",paraId:0},{value:"\u5728\u4E00\u6761\u73AF\u8DEF\u4E0A\u6709 ",paraId:115,tocIndex:18},{value:"n",paraId:115,tocIndex:18},{value:" \u4E2A\u52A0\u6CB9\u7AD9\uFF0C\u5176\u4E2D\u7B2C ",paraId:115,tocIndex:18},{value:"i",paraId:115,tocIndex:18},{value:" \u4E2A\u52A0\u6CB9\u7AD9\u6709\u6C7D\u6CB9 ",paraId:115,tocIndex:18},{value:"gas[i]",paraId:115,tocIndex:18},{value:" \u5347\u3002",paraId:115,tocIndex:18},{value:"\u4F60\u6709\u4E00\u8F86\u6CB9\u7BB1\u5BB9\u91CF\u65E0\u9650\u7684\u7684\u6C7D\u8F66\uFF0C\u4ECE\u7B2C ",paraId:116,tocIndex:18},{value:"i",paraId:116,tocIndex:18},{value:" \u4E2A\u52A0\u6CB9\u7AD9\u5F00\u5F80\u7B2C ",paraId:116,tocIndex:18},{value:"i+1",paraId:116,tocIndex:18},{value:" \u4E2A\u52A0\u6CB9\u7AD9\u9700\u8981\u6D88\u8017\u6C7D\u6CB9 ",paraId:116,tocIndex:18},{value:"cost[i]",paraId:116,tocIndex:18},{value:" \u5347\u3002\u4F60\u4ECE\u5176\u4E2D\u7684\u4E00\u4E2A\u52A0\u6CB9\u7AD9\u51FA\u53D1\uFF0C\u5F00\u59CB\u65F6\u6CB9\u7BB1\u4E3A\u7A7A\u3002",paraId:116,tocIndex:18},{value:"\u7ED9\u5B9A\u4E24\u4E2A\u6574\u6570\u6570\u7EC4 ",paraId:117,tocIndex:18},{value:"gas",paraId:117,tocIndex:18},{value:" \u548C ",paraId:117,tocIndex:18},{value:"cost",paraId:117,tocIndex:18},{value:" \uFF0C\u5982\u679C\u4F60\u53EF\u4EE5\u6309\u987A\u5E8F\u7ED5\u73AF\u8DEF\u884C\u9A76\u4E00\u5468\uFF0C\u5219\u8FD4\u56DE\u51FA\u53D1\u65F6\u52A0\u6CB9\u7AD9\u7684\u7F16\u53F7\uFF0C\u5426\u5219\u8FD4\u56DE ",paraId:117,tocIndex:18},{value:"-1",paraId:117,tocIndex:18},{value:" \u3002\u5982\u679C\u5B58\u5728\u89E3\uFF0C\u5219 ",paraId:117,tocIndex:18},{value:"\u4FDD\u8BC1",paraId:117,tocIndex:18},{value:" \u5B83\u662F ",paraId:117,tocIndex:18},{value:"\u552F\u4E00",paraId:117,tocIndex:18},{value:" \u7684\u3002",paraId:117,tocIndex:18},{value:"\u793A\u4F8B 1:",paraId:118,tocIndex:18},{value:`\u8F93\u5165: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
\u8F93\u51FA: 3
\u89E3\u91CA:
\u4ECE 3 \u53F7\u52A0\u6CB9\u7AD9(\u7D22\u5F15\u4E3A 3 \u5904)\u51FA\u53D1\uFF0C\u53EF\u83B7\u5F97 4 \u5347\u6C7D\u6CB9\u3002\u6B64\u65F6\u6CB9\u7BB1\u6709 = 0 + 4 = 4 \u5347\u6C7D\u6CB9
\u5F00\u5F80 4 \u53F7\u52A0\u6CB9\u7AD9\uFF0C\u6B64\u65F6\u6CB9\u7BB1\u6709 4 - 1 + 5 = 8 \u5347\u6C7D\u6CB9
\u5F00\u5F80 0 \u53F7\u52A0\u6CB9\u7AD9\uFF0C\u6B64\u65F6\u6CB9\u7BB1\u6709 8 - 2 + 1 = 7 \u5347\u6C7D\u6CB9
\u5F00\u5F80 1 \u53F7\u52A0\u6CB9\u7AD9\uFF0C\u6B64\u65F6\u6CB9\u7BB1\u6709 7 - 3 + 2 = 6 \u5347\u6C7D\u6CB9
\u5F00\u5F80 2 \u53F7\u52A0\u6CB9\u7AD9\uFF0C\u6B64\u65F6\u6CB9\u7BB1\u6709 6 - 4 + 3 = 5 \u5347\u6C7D\u6CB9
\u5F00\u5F80 3 \u53F7\u52A0\u6CB9\u7AD9\uFF0C\u4F60\u9700\u8981\u6D88\u8017 5 \u5347\u6C7D\u6CB9\uFF0C\u6B63\u597D\u8DB3\u591F\u4F60\u8FD4\u56DE\u5230 3 \u53F7\u52A0\u6CB9\u7AD9\u3002
\u56E0\u6B64\uFF0C3 \u53EF\u4E3A\u8D77\u59CB\u7D22\u5F15\u3002
`,paraId:119,tocIndex:18},{value:"\u793A\u4F8B 2:",paraId:120,tocIndex:18},{value:`\u8F93\u5165: gas = [2,3,4], cost = [3,4,3]
\u8F93\u51FA: -1
\u89E3\u91CA:
\u4F60\u4E0D\u80FD\u4ECE 0 \u53F7\u6216 1 \u53F7\u52A0\u6CB9\u7AD9\u51FA\u53D1\uFF0C\u56E0\u4E3A\u6CA1\u6709\u8DB3\u591F\u7684\u6C7D\u6CB9\u53EF\u4EE5\u8BA9\u4F60\u884C\u9A76\u5230\u4E0B\u4E00\u4E2A\u52A0\u6CB9\u7AD9\u3002
\u6211\u4EEC\u4ECE 2 \u53F7\u52A0\u6CB9\u7AD9\u51FA\u53D1\uFF0C\u53EF\u4EE5\u83B7\u5F97 4 \u5347\u6C7D\u6CB9\u3002 \u6B64\u65F6\u6CB9\u7BB1\u6709 = 0 + 4 = 4 \u5347\u6C7D\u6CB9
\u5F00\u5F80 0 \u53F7\u52A0\u6CB9\u7AD9\uFF0C\u6B64\u65F6\u6CB9\u7BB1\u6709 4 - 3 + 2 = 3 \u5347\u6C7D\u6CB9
\u5F00\u5F80 1 \u53F7\u52A0\u6CB9\u7AD9\uFF0C\u6B64\u65F6\u6CB9\u7BB1\u6709 3 - 3 + 3 = 3 \u5347\u6C7D\u6CB9
\u4F60\u65E0\u6CD5\u8FD4\u56DE 2 \u53F7\u52A0\u6CB9\u7AD9\uFF0C\u56E0\u4E3A\u8FD4\u7A0B\u9700\u8981\u6D88\u8017 4 \u5347\u6C7D\u6CB9\uFF0C\u4F46\u662F\u4F60\u7684\u6CB9\u7BB1\u53EA\u6709 3 \u5347\u6C7D\u6CB9\u3002
\u56E0\u6B64\uFF0C\u65E0\u8BBA\u600E\u6837\uFF0C\u4F60\u90FD\u4E0D\u53EF\u80FD\u7ED5\u73AF\u8DEF\u884C\u9A76\u4E00\u5468\u3002
`,paraId:121,tocIndex:18},{value:"\u9996\u5148\uFF0C\u5982\u679C ",paraId:122,tocIndex:18},{value:"spare",paraId:122,tocIndex:18},{value:" \u6700\u7EC8\u5C0F\u4E8E 0\uFF0C\u8BF4\u660E\u603B\u6CB9\u91CF\u80AF\u5B9A\u4E0D\u8DB3\u4EE5\u5B8C\u6210\u4E00\u5468\u7684\u884C\u9A76",paraId:122,tocIndex:18},{value:"\u5982\u679C\u80FD\u5B8C\u6210\u884C\u9A76\u4E14\u6700\u7EC8\u8017\u635F\u5E73\u8861\u4E3A0\uFF0C\u5219\u53BB\u627E\u90A3\u4E2A",paraId:123,tocIndex:18},{value:"\u8017\u635F\u6700\u5927\u7684\u90A3\u4E00\u7AD9\u7684\u540E\u4E00\u7AD9",paraId:123,tocIndex:18},{value:"\u5426\u5219\u76F4\u63A5\u8F93\u51FA0\u8BF4\u660E\u65E0\u8BBA\u54EA\u4E00\u70B9\u51FA\u53D1\u90FD\u53EF\u4EE5\u73AF\u7ED5\u4E00\u5708",paraId:124,tocIndex:18},{value:`public int canCompleteCircuit (int [] gas, int [] cost) {
    int len = gas.length;
    int spare = 0;
    int minSpare = Integer.MAX_VALUE;
    int minIndex = 0;

    for (int i = 0; i < len; i++) {
        spare += gas [i] - cost [i];
        if (spare < minSpare) {
            minSpare = spare;
            minIndex = i;
        }
    }

   if (minSpare > 0) return 0;
   return spare < 0 ? -1 : (minIndex + 1) % len;
}
`,paraId:125,tocIndex:18},{value:"35. \u641C\u7D22\u63D2\u5165\u4F4D\u7F6E",paraId:0},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u6392\u5E8F\u6570\u7EC4\u548C\u4E00\u4E2A\u76EE\u6807\u503C\uFF0C\u5728\u6570\u7EC4\u4E2D\u627E\u5230\u76EE\u6807\u503C\uFF0C\u5E76\u8FD4\u56DE\u5176\u7D22\u5F15\u3002\u5982\u679C\u76EE\u6807\u503C\u4E0D\u5B58\u5728\u4E8E\u6570\u7EC4\u4E2D\uFF0C\u8FD4\u56DE\u5B83\u5C06\u4F1A\u88AB\u6309\u987A\u5E8F\u63D2\u5165\u7684\u4F4D\u7F6E\u3002",paraId:126,tocIndex:20},{value:"\u8BF7\u5FC5\u987B\u4F7F\u7528\u65F6\u95F4\u590D\u6742\u5EA6\u4E3A ",paraId:127,tocIndex:20},{value:"O(log n)",paraId:127,tocIndex:20},{value:" \u7684\u7B97\u6CD5\u3002",paraId:127,tocIndex:20},{value:"\u793A\u4F8B 1:",paraId:128,tocIndex:20},{value:`\u8F93\u5165: nums = [1,3,5,6], target = 5
\u8F93\u51FA: 2
`,paraId:129,tocIndex:20},{value:"\u793A\u4F8B 2:",paraId:130,tocIndex:20},{value:`\u8F93\u5165: nums = [1,3,5,6], target = 2
\u8F93\u51FA: 1
`,paraId:131,tocIndex:20},{value:"\u793A\u4F8B 3:",paraId:132,tocIndex:20},{value:`\u8F93\u5165: nums = [1,3,5,6], target = 7
\u8F93\u51FA: 4
`,paraId:133,tocIndex:20},{value:"\u6CE8\u610F\u5904\u7406\u8FB9\u754C",paraId:134,tocIndex:20},{value:`    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (target > nums[mid]) {
                left = mid + 1; // \u6CE8\u610F
            } else if (target < nums[mid]) {
                right = mid - 1;
            } else {
                return mid;
            }
        }
        return left;
    }
`,paraId:135,tocIndex:20},{value:"34. \u5728\u6392\u5E8F\u6570\u7EC4\u4E2D\u67E5\u627E\u5143\u7D20\u7684\u7B2C\u4E00\u4E2A\u548C\u6700\u540E\u4E00\u4E2A\u4F4D\u7F6E",paraId:0},{value:"\u7ED9\u4F60\u4E00\u4E2A\u6309\u7167\u975E\u9012\u51CF\u987A\u5E8F\u6392\u5217\u7684\u6574\u6570\u6570\u7EC4 ",paraId:136,tocIndex:21},{value:"nums",paraId:136,tocIndex:21},{value:"\uFF0C\u548C\u4E00\u4E2A\u76EE\u6807\u503C ",paraId:136,tocIndex:21},{value:"target",paraId:136,tocIndex:21},{value:"\u3002\u8BF7\u4F60\u627E\u51FA\u7ED9\u5B9A\u76EE\u6807\u503C\u5728\u6570\u7EC4\u4E2D\u7684\u5F00\u59CB\u4F4D\u7F6E\u548C\u7ED3\u675F\u4F4D\u7F6E\u3002",paraId:136,tocIndex:21},{value:"\u5982\u679C\u6570\u7EC4\u4E2D\u4E0D\u5B58\u5728\u76EE\u6807\u503C ",paraId:137,tocIndex:21},{value:"target",paraId:137,tocIndex:21},{value:"\uFF0C\u8FD4\u56DE ",paraId:137,tocIndex:21},{value:"[-1, -1]",paraId:137,tocIndex:21},{value:"\u3002",paraId:137,tocIndex:21},{value:"\u4F60\u5FC5\u987B\u8BBE\u8BA1\u5E76\u5B9E\u73B0\u65F6\u95F4\u590D\u6742\u5EA6\u4E3A ",paraId:138,tocIndex:21},{value:"O(log n)",paraId:138,tocIndex:21},{value:" \u7684\u7B97\u6CD5\u89E3\u51B3\u6B64\u95EE\u9898\u3002",paraId:138,tocIndex:21},{value:"\u793A\u4F8B 1\uFF1A",paraId:139,tocIndex:21},{value:`\u8F93\u5165\uFF1Anums = [5,7,7,8,8,10], target = 8
\u8F93\u51FA\uFF1A[3,4]
`,paraId:140,tocIndex:21},{value:"\u793A\u4F8B 2\uFF1A",paraId:141,tocIndex:21},{value:`\u8F93\u5165\uFF1Anums = [5,7,7,8,8,10], target = 6
\u8F93\u51FA\uFF1A[-1,-1]
`,paraId:142,tocIndex:21},{value:"\u793A\u4F8B 3\uFF1A",paraId:143,tocIndex:21},{value:`\u8F93\u5165\uFF1Anums = [], target = 0
\u8F93\u51FA\uFF1A[-1,-1]
`,paraId:144,tocIndex:21},{value:` // \u4E24\u6B21\u4E8C\u5206\u67E5\u627E\uFF0C\u5206\u5F00\u67E5\u627E\u7B2C\u4E00\u4E2A\u548C\u6700\u540E\u4E00\u4E2A
  // \u65F6\u95F4\u590D\u6742\u5EA6 O (log n), \u7A7A\u95F4\u590D\u6742\u5EA6 O (1)
  // [1,2,3,3,3,3,4,5,9]
  public int [] searchRange2 (int [] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    int first = -1;
    int last = -1;
    // \u627E\u7B2C\u4E00\u4E2A\u7B49\u4E8E target \u7684\u4F4D\u7F6E
    while (left <= right) {
      int middle = (left + right) / 2;
      if (nums [middle] == target) {
        first = middle;
        right = middle - 1; // \u91CD\u70B9
      } else if (nums [middle] > target) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }

    // \u6700\u540E\u4E00\u4E2A\u7B49\u4E8E target \u7684\u4F4D\u7F6E
    left = 0;
    right = nums.length - 1;
    while (left <= right) {
      int middle = (left + right) / 2;
      if (nums [middle] == target) {
        last = middle;
        left = middle + 1; // \u91CD\u70B9
      } else if (nums [middle] > target) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }

    return new int []{first, last};
  }
`,paraId:145,tocIndex:21},{value:"198. \u6253\u5BB6\u52AB\u820D",paraId:0},{value:"\u4F60\u662F\u4E00\u4E2A\u4E13\u4E1A\u7684\u5C0F\u5077\uFF0C\u8BA1\u5212\u5077\u7A83\u6CBF\u8857\u7684\u623F\u5C4B\u3002\u6BCF\u95F4\u623F\u5185\u90FD\u85CF\u6709\u4E00\u5B9A\u7684\u73B0\u91D1\uFF0C\u5F71\u54CD\u4F60\u5077\u7A83\u7684\u552F\u4E00\u5236\u7EA6\u56E0\u7D20\u5C31\u662F\u76F8\u90BB\u7684\u623F\u5C4B\u88C5\u6709\u76F8\u4E92\u8FDE\u901A\u7684\u9632\u76D7\u7CFB\u7EDF\uFF0C",paraId:146,tocIndex:23},{value:"\u5982\u679C\u4E24\u95F4\u76F8\u90BB\u7684\u623F\u5C4B\u5728\u540C\u4E00\u665A\u4E0A\u88AB\u5C0F\u5077\u95EF\u5165\uFF0C\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u62A5\u8B66",paraId:146,tocIndex:23},{value:"\u3002",paraId:146,tocIndex:23},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u4EE3\u8868\u6BCF\u4E2A\u623F\u5C4B\u5B58\u653E\u91D1\u989D\u7684\u975E\u8D1F\u6574\u6570\u6570\u7EC4\uFF0C\u8BA1\u7B97\u4F60 ",paraId:147,tocIndex:23},{value:"\u4E0D\u89E6\u52A8\u8B66\u62A5\u88C5\u7F6E\u7684\u60C5\u51B5\u4E0B",paraId:147,tocIndex:23},{value:" \uFF0C\u4E00\u591C\u4E4B\u5185\u80FD\u591F\u5077\u7A83\u5230\u7684\u6700\u9AD8\u91D1\u989D\u3002",paraId:147,tocIndex:23},{value:"\u793A\u4F8B 1\uFF1A",paraId:148,tocIndex:23},{value:`\u8F93\u5165\uFF1A[1,2,3,1]
\u8F93\u51FA\uFF1A4
\u89E3\u91CA\uFF1A\u5077\u7A83 1 \u53F7\u623F\u5C4B (\u91D1\u989D = 1) \uFF0C\u7136\u540E\u5077\u7A83 3 \u53F7\u623F\u5C4B (\u91D1\u989D = 3)\u3002
     \u5077\u7A83\u5230\u7684\u6700\u9AD8\u91D1\u989D = 1 + 3 = 4 \u3002
`,paraId:149,tocIndex:23},{value:"\u793A\u4F8B 2\uFF1A",paraId:150,tocIndex:23},{value:`\u8F93\u5165\uFF1A[2,7,9,3,1]
\u8F93\u51FA\uFF1A12
\u89E3\u91CA\uFF1A\u5077\u7A83 1 \u53F7\u623F\u5C4B (\u91D1\u989D = 2), \u5077\u7A83 3 \u53F7\u623F\u5C4B (\u91D1\u989D = 9)\uFF0C\u63A5\u7740\u5077\u7A83 5 \u53F7\u623F\u5C4B (\u91D1\u989D = 1)\u3002
     \u5077\u7A83\u5230\u7684\u6700\u9AD8\u91D1\u989D = 2 + 9 + 1 = 12 \u3002
`,paraId:151,tocIndex:23},{value:"\u5206\u5077\u6216\u8005\u4E0D\u5077\u7684\u60C5\u51B5",paraId:152,tocIndex:23},{value:`class Solution {
    public int rob (int [] nums) {
        if (nums.length <= 2) return Math.max (nums [0], nums [nums.length-1]);
        int [] dp = new int [nums.length];
        dp [0] = nums [0];
        dp [1] = Math.max (nums [1],nums [0]);
        for (int i = 2; i< nums.length; i ++){
            dp [i] = Math.max (dp [i - 2] + nums [i], dp [i - 1]);
        }
        return dp [nums.length - 1];
    }
}
`,paraId:153,tocIndex:23},{value:"300. \u6700\u957F\u9012\u589E\u5B50\u5E8F\u5217",paraId:0},{value:"\u7ED9\u4F60\u4E00\u4E2A\u6574\u6570\u6570\u7EC4 ",paraId:154,tocIndex:24},{value:"nums",paraId:154,tocIndex:24},{value:" \uFF0C\u627E\u5230\u5176\u4E2D\u6700\u957F\u4E25\u683C\u9012\u589E\u5B50\u5E8F\u5217\u7684\u957F\u5EA6\u3002",paraId:154,tocIndex:24},{value:"\u5B50\u5E8F\u5217",paraId:155,tocIndex:24},{value:" \u662F\u7531\u6570\u7EC4\u6D3E\u751F\u800C\u6765\u7684\u5E8F\u5217\uFF0C\u5220\u9664\uFF08\u6216\u4E0D\u5220\u9664\uFF09\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\u800C\u4E0D\u6539\u53D8\u5176\u4F59\u5143\u7D20\u7684\u987A\u5E8F\u3002\u4F8B\u5982\uFF0C",paraId:155,tocIndex:24},{value:"[3,6,2,7]",paraId:155,tocIndex:24},{value:" \u662F\u6570\u7EC4 ",paraId:155,tocIndex:24},{value:"[0,3,1,6,2,2,7]",paraId:155,tocIndex:24},{value:" \u7684\u5B50\u5E8F\u5217",paraId:155,tocIndex:24},{value:"\u793A\u4F8B 1\uFF1A",paraId:156,tocIndex:24},{value:`\u8F93\u5165\uFF1Anums = [10,9,2,5,3,7,101,18]
\u8F93\u51FA\uFF1A4
\u89E3\u91CA\uFF1A\u6700\u957F\u9012\u589E\u5B50\u5E8F\u5217\u662F [2,3,7,101]\uFF0C\u56E0\u6B64\u957F\u5EA6\u4E3A 4 \u3002
`,paraId:157,tocIndex:24},{value:"\u793A\u4F8B 2\uFF1A",paraId:158,tocIndex:24},{value:`\u8F93\u5165\uFF1Anums = [0,1,0,3,2,3]
\u8F93\u51FA\uFF1A4
`,paraId:159,tocIndex:24},{value:"\u793A\u4F8B 3\uFF1A",paraId:160,tocIndex:24},{value:`\u8F93\u5165\uFF1Anums = [7,7,7,7,7,7,7]
\u8F93\u51FA\uFF1A1
`,paraId:161,tocIndex:24},{value:`class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] dp=new int[nums.length];
        Arrays.fill(dp,1);
        for (int i = 0; i < nums.length; i++) {
            for (int j = i+1; j < nums.length; j++) {
                if(nums[j]>nums[i]){
                    dp[j]=Math.max(dp[j],dp[i]+1);
                }
            }
        }
        return Arrays.stream(dp).max().getAsInt();
    }
}
`,paraId:162,tocIndex:24},{value:"322. \u96F6\u94B1\u5151\u6362",paraId:0},{value:"\u7ED9\u4F60\u4E00\u4E2A\u6574\u6570\u6570\u7EC4 ",paraId:163,tocIndex:25},{value:"coins",paraId:163,tocIndex:25},{value:" \uFF0C\u8868\u793A\u4E0D\u540C\u9762\u989D\u7684\u786C\u5E01\uFF1B\u4EE5\u53CA\u4E00\u4E2A\u6574\u6570 ",paraId:163,tocIndex:25},{value:"amount",paraId:163,tocIndex:25},{value:" \uFF0C\u8868\u793A\u603B\u91D1\u989D\u3002",paraId:163,tocIndex:25},{value:"\u8BA1\u7B97\u5E76\u8FD4\u56DE\u53EF\u4EE5\u51D1\u6210\u603B\u91D1\u989D\u6240\u9700\u7684 ",paraId:164,tocIndex:25},{value:"\u6700\u5C11\u7684\u786C\u5E01\u4E2A\u6570",paraId:164,tocIndex:25},{value:" \u3002\u5982\u679C\u6CA1\u6709\u4EFB\u4F55\u4E00\u79CD\u786C\u5E01\u7EC4\u5408\u80FD\u7EC4\u6210\u603B\u91D1\u989D\uFF0C\u8FD4\u56DE ",paraId:164,tocIndex:25},{value:"-1",paraId:164,tocIndex:25},{value:" \u3002",paraId:164,tocIndex:25},{value:"\u4F60\u53EF\u4EE5\u8BA4\u4E3A\u6BCF\u79CD\u786C\u5E01\u7684\u6570\u91CF\u662F\u65E0\u9650\u7684\u3002",paraId:165,tocIndex:25},{value:"\u793A\u4F8B 1\uFF1A",paraId:166,tocIndex:25},{value:`\u8F93\u5165\uFF1Acoins = [1, 2, 5], amount = 11
\u8F93\u51FA\uFF1A3 
\u89E3\u91CA\uFF1A11 = 5 + 5 + 1
`,paraId:167,tocIndex:25},{value:"\u793A\u4F8B 2\uFF1A",paraId:168,tocIndex:25},{value:`\u8F93\u5165\uFF1Acoins = [2], amount = 3
\u8F93\u51FA\uFF1A-1
`,paraId:169,tocIndex:25},{value:"\u793A\u4F8B 3\uFF1A",paraId:170,tocIndex:25},{value:`\u8F93\u5165\uFF1Acoins = [1], amount = 0
\u8F93\u51FA\uFF1A0
`,paraId:171,tocIndex:25},{value:"\u8F6C\u5316\u4E3A\u5B8C\u5168\u80CC\u5305\u95EE\u9898\uFF0C\u4E3B\u8981\u6CE8\u610F\u521D\u59CB\u503C\u7684\u8BBE\u7F6E\u548C\u6700\u540E\u6761\u4EF6\u7684\u5224\u65AD",paraId:172,tocIndex:25},{value:`class Solution {
    public int coinChange(int[] coins, int amount) {
        int N = coins.length;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 0; i < N; i++) {
            for (int j = coins[i]; j <= amount; j++) {
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
`,paraId:173,tocIndex:25},{value:"494. \u76EE\u6807\u548C",paraId:0},{value:"\u7ED9\u4F60\u4E00\u4E2A\u975E\u8D1F\u6574\u6570\u6570\u7EC4 ",paraId:174,tocIndex:27},{value:"nums",paraId:174,tocIndex:27},{value:" \u548C\u4E00\u4E2A\u6574\u6570 ",paraId:174,tocIndex:27},{value:"target",paraId:174,tocIndex:27},{value:" \u3002",paraId:174,tocIndex:27},{value:"\u5411\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u6574\u6570\u524D\u6DFB\u52A0 ",paraId:175,tocIndex:27},{value:"'+'",paraId:175,tocIndex:27},{value:" \u6216 ",paraId:175,tocIndex:27},{value:"'-'",paraId:175,tocIndex:27},{value:" \uFF0C\u7136\u540E\u4E32\u8054\u8D77\u6240\u6709\u6574\u6570\uFF0C\u53EF\u4EE5\u6784\u9020\u4E00\u4E2A ",paraId:175,tocIndex:27},{value:"\u8868\u8FBE\u5F0F",paraId:175,tocIndex:27},{value:" \uFF1A",paraId:175,tocIndex:27},{value:"\u4F8B\u5982\uFF0C",paraId:176,tocIndex:27},{value:"nums = [2, 1]",paraId:176,tocIndex:27},{value:" \uFF0C\u53EF\u4EE5\u5728 ",paraId:176,tocIndex:27},{value:"2",paraId:176,tocIndex:27},{value:" \u4E4B\u524D\u6DFB\u52A0 ",paraId:176,tocIndex:27},{value:"'+'",paraId:176,tocIndex:27},{value:" \uFF0C\u5728 ",paraId:176,tocIndex:27},{value:"1",paraId:176,tocIndex:27},{value:" \u4E4B\u524D\u6DFB\u52A0 ",paraId:176,tocIndex:27},{value:"'-'",paraId:176,tocIndex:27},{value:" \uFF0C\u7136\u540E\u4E32\u8054\u8D77\u6765\u5F97\u5230\u8868\u8FBE\u5F0F ",paraId:176,tocIndex:27},{value:'"+2-1"',paraId:176,tocIndex:27},{value:" \u3002",paraId:176,tocIndex:27},{value:"\u8FD4\u56DE\u53EF\u4EE5\u901A\u8FC7\u4E0A\u8FF0\u65B9\u6CD5\u6784\u9020\u7684\u3001\u8FD0\u7B97\u7ED3\u679C\u7B49\u4E8E ",paraId:177,tocIndex:27},{value:"target",paraId:177,tocIndex:27},{value:" \u7684\u4E0D\u540C ",paraId:177,tocIndex:27},{value:"\u8868\u8FBE\u5F0F",paraId:177,tocIndex:27},{value:" \u7684\u6570\u76EE\u3002",paraId:177,tocIndex:27},{value:"\u793A\u4F8B 1\uFF1A",paraId:178,tocIndex:27},{value:`\u8F93\u5165\uFF1Anums = [1,1,1,1,1], target = 3
\u8F93\u51FA\uFF1A5
\u89E3\u91CA\uFF1A\u4E00\u5171\u6709 5 \u79CD\u65B9\u6CD5\u8BA9\u6700\u7EC8\u76EE\u6807\u548C\u4E3A 3 \u3002
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
`,paraId:179,tocIndex:27},{value:"\u793A\u4F8B 2\uFF1A",paraId:180,tocIndex:27},{value:`\u8F93\u5165\uFF1Anums = [1], target = 1
\u8F93\u51FA\uFF1A1
`,paraId:181,tocIndex:27},{value:`    public int findTargetSumWays(int[] nums, int target) {
        AtomicInteger num = new AtomicInteger(0);
        dfs(nums, 0, target, 0, num);
        return num.get();
    }

    public void dfs(int[] nums, int index, int target, int currentSum, AtomicInteger num) {
        if (index == nums.length) {
            if (currentSum == target) {
                num.incrementAndGet();
            }
            return;
        }
        // \u9009\u62E9\u52A0\u5F53\u524D\u6570\u5B57
        dfs(nums, index + 1, target, currentSum + nums[index], num);
        // \u9009\u62E9\u51CF\u5F53\u524D\u6570\u5B57
        dfs(nums, index + 1, target, currentSum - nums[index], num);
    }
`,paraId:182,tocIndex:27},{value:"46. \u5168\u6392\u5217",paraId:0},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u4E0D\u542B\u91CD\u590D\u6570\u5B57\u7684\u6570\u7EC4 ",paraId:183,tocIndex:28},{value:"nums",paraId:183,tocIndex:28},{value:" \uFF0C\u8FD4\u56DE\u5176 ",paraId:183,tocIndex:28},{value:"\u6240\u6709\u53EF\u80FD\u7684\u5168\u6392\u5217",paraId:183,tocIndex:28},{value:" \u3002\u4F60\u53EF\u4EE5 ",paraId:183,tocIndex:28},{value:"\u6309\u4EFB\u610F\u987A\u5E8F",paraId:183,tocIndex:28},{value:" \u8FD4\u56DE\u7B54\u6848\u3002",paraId:183,tocIndex:28},{value:"\u793A\u4F8B 1\uFF1A",paraId:184,tocIndex:28},{value:`\u8F93\u5165\uFF1Anums = [1,2,3]
\u8F93\u51FA\uFF1A[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
`,paraId:185,tocIndex:28},{value:"\u793A\u4F8B 2\uFF1A",paraId:186,tocIndex:28},{value:`\u8F93\u5165\uFF1Anums = [0,1]
\u8F93\u51FA\uFF1A[[0,1],[1,0]]
`,paraId:187,tocIndex:28},{value:"\u793A\u4F8B 3\uFF1A",paraId:188,tocIndex:28},{value:`\u8F93\u5165\uFF1Anums = [1]
\u8F93\u51FA\uFF1A[[1]]
`,paraId:189,tocIndex:28},{value:`class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        dfs(result, nums, used, nums.length, new ArrayList<>());
        return result;
    }

    public void dfs(List<List<Integer>> result, int[] nums, boolean[] used, int length, List<Integer> tempList) {
        if (tempList.size() == length) {
            result.add(new ArrayList<>(tempList));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            tempList.add(nums[i]);
            dfs(result, nums, used, nums.length, tempList);
            used[i] = false;
            tempList.remove(tempList.size() - 1);
        }
    }
}
`,paraId:190,tocIndex:28}]}}]);
