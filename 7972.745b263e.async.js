"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7972],{57972:function(a,n,e){e.r(n),e.d(n,{texts:function(){return t}});const t=[{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:0,tocIndex:2},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u4E71\u5E8F\u7684\u6570\u7EC4\uFF0C",paraId:1,tocIndex:2},{value:"\u5220\u9664\u6240\u6709",paraId:1,tocIndex:2},{value:"\u7684\u91CD\u590D\u5143\u7D20\uFF0C\u4F7F\u5F97\u6BCF\u4E2A\u5143\u7D20\u53EA\u51FA\u73B0\u4E00\u6B21\uFF0C\u5E76\u4E14\u6309\u7167\u51FA\u73B0\u7684\u6B21\u6570\u4ECE\u9AD8\u5230\u4F4E\u8FDB\u884C\u6392\u5E8F\uFF0C\u76F8\u540C\u51FA\u73B0\u6B21\u6570\u6309\u7167\u7B2C\u4E00\u6B21\u51FA\u73B0\u987A\u5E8F\u8FDB\u884C\u5148\u540E\u6392\u5E8F\u3002",paraId:1,tocIndex:2},{value:"\u4E8C\u3001\u8F93\u5165\u63CF\u8FF0",paraId:2,tocIndex:2},{value:"\u4E00\u4E2A\u6570\u7EC4\u3002",paraId:3,tocIndex:2},{value:"\u4E09\u3001\u8F93\u51FA\u63CF\u8FF0",paraId:4,tocIndex:2},{value:"\u53BB",paraId:5,tocIndex:2},{value:"\u91CD\u6392\u5E8F",paraId:5,tocIndex:2},{value:"\u540E\u7684\u6570\u7EC4\u3002",paraId:5,tocIndex:2},{value:`public class RemoveDuplicatesAndSort {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        
        // \u89E3\u6790\u8F93\u5165\u6570\u7EC4
        String[] elements = input.split(" ");
        int[] nums = new int[elements.length];
        for (int i = 0; i < elements.length; i++) {
            nums[i] = Integer.parseInt(elements[i]);
        }

        // \u8C03\u7528\u5904\u7406\u51FD\u6570
        int[] result = removeDuplicatesAndSort(nums);

        // \u8F93\u51FA\u7ED3\u679C
        for (int num : result) {
            System.out.print(num + " ");
        }
    }

    public static int[] removeDuplicatesAndSort(int[] nums) {
        // \u4F7F\u7528LinkedHashMap\u4EE5\u4FDD\u6301\u63D2\u5165\u987A\u5E8F
        Map<Integer, Integer> frequencyMap = new LinkedHashMap<>();
        
        // \u7EDF\u8BA1\u6BCF\u4E2A\u5143\u7D20\u7684\u51FA\u73B0\u6B21\u6570
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // \u521B\u5EFA\u4E00\u4E2A\u5217\u8868\uFF0C\u5305\u542BMap\u7684\u6240\u6709\u6761\u76EE
        List<Map.Entry<Integer, Integer>> entryList = new ArrayList<>(frequencyMap.entrySet());

        // \u6309\u7167\u9891\u7387\u4ECE\u9AD8\u5230\u4F4E\u6392\u5E8F\uFF0C\u9891\u7387\u76F8\u540C\u7684\u6309\u7B2C\u4E00\u6B21\u51FA\u73B0\u987A\u5E8F\u6392\u5E8F
        entryList.sort((entry1, entry2) -> {
            if (entry2.getValue().equals(entry1.getValue())) {
                // \u9891\u7387\u76F8\u540C\uFF0C\u6309\u7B2C\u4E00\u6B21\u51FA\u73B0\u987A\u5E8F\u6392\u5E8F
                return 0;
            }
            // \u6309\u7167\u9891\u7387\u4ECE\u9AD8\u5230\u4F4E\u6392\u5E8F
            return entry2.getValue() - entry1.getValue();
        });

        // \u6784\u5EFA\u7ED3\u679C\u6570\u7EC4
        int[] result = new int[entryList.size()];
        for (int i = 0; i < entryList.size(); i++) {
            result[i] = entryList.get(i).getKey();
        }

        return result;
    }
}
`,paraId:6,tocIndex:2},{value:"\u9898\u76EE\u8BF4\u660E",paraId:7,tocIndex:3},{value:"\u5927\u4F17\u5BF9\u5783\u573E\u77ED\u4FE1\u6DF1\u6076\u75DB\u7EDD\uFF0C\u5E0C\u671B\u80FD\u5BF9\u5783\u573E\u77ED\u4FE1\u53D1\u9001\u8005\u8FDB\u884C\u8BC6\u522B\uFF0C\u4E3A\u6B64\uFF0C\u5F88\u591A\u8F6F\u4EF6\u589E\u52A0 \u4E86\u5783\u573E\u77ED\u4FE1\u8BC6\u522B\u673A\u5236\u3002\u7ECF\u5206\u6790\uFF0C\u53D1\u73B0\u6B63\u5E38\u7528\u6237\u7684\u77ED\u4FE1\u901A\u5E38\u5177\u5907\u4EA4\u4E92\u6027\uFF0C\u800C\u5783\u573E\u77ED\u4FE1\u5F80 \u5F80\u90FD\u662F\u5927\u91CF\u5355\u5411\u7684\u77ED\u4FE1\uFF0C\u6309\u7167\u5982\u4E0B\u89C4\u5219\u8FDB\u884C\u5783\u573E\u77ED\u4FE1\u8BC6\u522B\uFF1A \u672C\u9898\u4E2D\uFF0C\u53D1\u9001\u8005 A \u7B26\u5408\u4EE5\u4E0B\u6761\u4EF6\u4E4B\u4E00\u7684\uFF0C\u5219\u8BA4\u4E3A A \u662F\u5783\u573E\u77ED\u4FE1\u53D1\u9001\u8005\uFF1A ",paraId:7,tocIndex:3},{value:"\xB7",paraId:7,tocIndex:3},{value:" A \u53D1\u9001\u77ED\u4FE1\u7684\u63A5\u6536\u8005\u4E2D\uFF0C\u6CA1\u6709\u53D1\u8FC7\u77ED\u4FE1\u7ED9 A \u7684\u4EBA\u6570 L > 5\uFF1B ",paraId:7,tocIndex:3},{value:"\xB7",paraId:7,tocIndex:3},{value:" A \u53D1\u9001\u7684\u77ED\u4FE1\u6570 - A \u63A5\u6536\u7684\u77ED\u4FE1\u6570 M > 10\uFF1B ",paraId:7,tocIndex:3},{value:"\xB7",paraId:7,tocIndex:3},{value:" \u5982\u679C\u5B58\u5728 X\uFF0CA \u53D1\u9001\u7ED9 X \u7684\u77ED\u4FE1\u6570 - A \u63A5\u6536\u5230 X \u7684\u77ED\u4FE1\u6570 N > 5\u3002",paraId:7,tocIndex:3},{value:"\u8F93\u5165\u63CF\u8FF0",paraId:7,tocIndex:3},{value:"\u7B2C\u4E00\u884C\u4E3A\u6761\u76EE\u6570\u76EE\uFF0C\u63A5\u4E0B\u6765\u51E0\u884C\u662F\u5177\u4F53\u7684\u6761\u76EE\uFF0C\u6BCF\u4E2A\u6761\u76EE\uFF0C\u662F\u4E00\u5BF9 ID\uFF0C\u7B2C\u4E00\u4E2A\u6570\u5B57\u662F\u53D1\u9001\u8005 ID\uFF0C\u540E\u9762\u7684\u6570\u5B57\u662F\u63A5\u6536\u8005 ID\uFF0C\u4E2D\u95F4\u7A7A\u683C\u9694\u5F00\uFF0C\u6240\u6709\u7684 ID \u90FD\u4E3A\u65E0\u7B26\u53F7\u6574\u578B\uFF0CID \u6700\u5927\u503C\u4E3A 100\uFF1B \u540C\u4E00\u4E2A\u6761\u76EE\u4E2D\uFF0C\u4E24\u4E2A ID \u4E0D\u4F1A\u76F8\u540C\uFF08\u5373\u4E0D\u4F1A\u81EA\u5DF1\u7ED9\u81EA\u5DF1\u53D1\u6D88\u606F\uFF09\uFF1B \u6700\u540E\u4E00\u884C\u4E3A\u6307\u5B9A\u7684 ID\u3002",paraId:7,tocIndex:3},{value:"\u8F93\u51FA\u63CF\u8FF0",paraId:7,tocIndex:3},{value:"\u8F93\u51FA\u8BE5 ID \u662F\u5426\u4E3A\u5783\u573E\u77ED\u4FE1\u53D1\u9001\u8005\uFF08\u662F\u8F93\u51FA true\uFF0C\u5426\u5219\u8F93\u51FA false\uFF09\uFF0C\u5E76\u4E14\u6309\u5E8F\u5217\u8F93\u51FA L\u3001M \u7684\u503C\uFF08\u7531\u4E8E N \u503C\u4E0D\u552F\u4E00\uFF0C\u4E0D\u9700\u8981\u8F93\u51FA\uFF09\uFF1B \u8F93\u51FA\u5747\u4E3A\u5B87\u7B26\u4E32\u3002",paraId:7,tocIndex:3},{value:"\u793A\u4F8B",paraId:8,tocIndex:3},{value:"\u793A\u4F8B 1",paraId:8,tocIndex:3},{value:"\u8F93\u5165",paraId:8,tocIndex:3},{value:"15 1 2 1 3 1 4 1 5 1 6 1 7 1 8 1 9 1 10 1 11 1 12 1 13 1 14 14 1 1 15 1",paraId:8,tocIndex:3},{value:"\u8F93\u51FA",paraId:8,tocIndex:3},{value:"true 13 13",paraId:8,tocIndex:3},{value:`import java.util.*;

public class SpamMessageIdentifier {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int entries = Integer.parseInt(scanner.nextLine());
        List<int[]> logs = new ArrayList<>();
        
        // \u8BFB\u53D6\u77ED\u4FE1\u8BB0\u5F55
        for (int i = 0; i < entries; i++) {
            String[] parts = scanner.nextLine().split(" ");
            int sender = Integer.parseInt(parts[0]);
            int receiver = Integer.parseInt(parts[1]);
            logs.add(new int[]{sender, receiver});
        }
        
        int targetID = Integer.parseInt(scanner.nextLine());
        
        // \u7EDF\u8BA1\u53D1\u9001\u548C\u63A5\u6536\u77ED\u4FE1\u7684\u6B21\u6570
        Map<Integer, Set<Integer>> senders = new HashMap<>();
        Map<Integer, Integer> sentCount = new HashMap<>();
        Map<Integer, Integer> receivedCount = new HashMap<>();
        Map<String, Integer> sendReceiveCount = new HashMap<>();
        
        for (int[] log : logs) {
            int sender = log[0];
            int receiver = log[1];
            
            senders.computeIfAbsent(sender, k -> new HashSet<>()).add(receiver);
            sentCount.put(sender, sentCount.getOrDefault(sender, 0) + 1);
            receivedCount.put(receiver, receivedCount.getOrDefault(receiver, 0) + 1);
            String key = sender + "," + receiver;
            sendReceiveCount.put(key, sendReceiveCount.getOrDefault(key, 0) + 1);
        }
        
        // \u8BA1\u7B97L\u503C
        int L = 0;
        if (senders.containsKey(targetID)) {
            for (int receiver : senders.get(targetID)) {
                if (!senders.getOrDefault(receiver, Collections.emptySet()).contains(targetID)) {
                    L++;
                }
            }
        }
        
        // \u8BA1\u7B97M\u503C
        int M = sentCount.getOrDefault(targetID, 0) - receivedCount.getOrDefault(targetID, 0);
        
        // \u5224\u65AD\u662F\u5426\u4E3A\u5783\u573E\u77ED\u4FE1\u53D1\u9001\u8005
        boolean isSpamSender = L > 5 || M > 10;
        if (senders.containsKey(targetID)) {
            for (int receiver : senders.get(targetID)) {
                int N = sendReceiveCount.getOrDefault(targetID + "," + receiver, 0) 
                      - sendReceiveCount.getOrDefault(receiver + "," + targetID, 0);
                if (N > 5) {
                    isSpamSender = true;
                    break;
                }
            }
        }
        
        // \u8F93\u51FA\u7ED3\u679C
        System.out.println(isSpamSender + " " + L + " " + M);
    }
}
`,paraId:9,tocIndex:3},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:10,tocIndex:5},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u961F\u5217\uFF0C\u4F46\u662F\u8FD9\u4E2A\u961F\u5217\u6BD4\u8F83\u7279\u6B8A\uFF0C\u53EF\u4EE5\u4ECE\u5934\u90E8\u6DFB\u52A0\u6570\u636E\uFF0C\u4E5F\u53EF\u4EE5\u4ECE\u5C3E\u90E8\u6DFB\u52A0\u6570\u636E\uFF0C\u4F46\u662F\u53EA\u80FD\u4ECE\u5934\u90E8",paraId:11,tocIndex:5},{value:"\u5220\u9664\u6570\u636E",paraId:11,tocIndex:5},{value:"\u3002",paraId:11,tocIndex:5},{value:"\u8F93\u5165\u4E00\u4E2A\u6570\u5B57 n\uFF0C\u4F1A\u4F9D\u6B21\u6DFB\u52A0\u6570\u5B57 1~n\uFF08\u4E5F\u5C31\u662F\u6DFB\u52A0 n \u6B21\uFF09\u3002",paraId:12,tocIndex:5},{value:"\u4F46\u662F\u5728\u6DFB\u52A0\u6570\u636E\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u4E5F\u4F1A\u5220\u9664\u6570\u636E\uFF0C\u8981\u6C42\u5220\u9664\u5FC5\u987B\u6309\u7167 1~n \u6309\u7167\u987A\u5E8F\u8FDB\u884C\u5220\u9664\uFF0C\u6240\u4EE5\u5728\u5220\u9664\u65F6\uFF0C\u53EF\u4EE5\u6839\u636E\u9700\u8981\u8C03\u6574\u961F\u5217\u4E2D\u6570\u5B57\u7684\u987A\u5E8F\u4EE5\u6EE1\u8DB3\u5220\u9664\u6761\u4EF6\u3002",paraId:13,tocIndex:5},{value:"\u4E8C\u3001\u8F93\u5165\u63CF\u8FF0",paraId:14,tocIndex:5},{value:"\u7B2C\u4E00\u884C\u4E00\u4E2A\u6570\u636E N\uFF0C\u8868\u793A\u6570\u636E\u7684\u8303\u56F4\u3002",paraId:15,tocIndex:5},{value:"\u63A5\u4E0B\u6765\u7684 2N \u884C\u662F\u6DFB\u52A0\u548C\u5220\u9664\u8BED\u53E5\u3002",paraId:16,tocIndex:5},{value:"\u5176\u4E2D\uFF1A",paraId:17,tocIndex:5},{value:"head add x \u8868\u793A\u4ECE\u5934\u90E8\u6DFB\u52A0\u5143\u7D20 x\uFF1B",paraId:18,tocIndex:5},{value:"tail add \u8868\u793A\u4ECE\u5C3E\u90E8\u6DFB\u52A0\u5143\u7D20\uFF1B",paraId:18,tocIndex:5},{value:"remove \u8868\u793A\u5220\u9664\u5143\u7D20\u3002",paraId:18,tocIndex:5},{value:"\u4E09\u3001\u8F93\u51FA\u63CF\u8FF0",paraId:19,tocIndex:5},{value:"\u8F93\u51FA\u4E00\u4E2A\u6570\u5B57\uFF0C\u8868\u793A\u6700\u5C0F\u7684\u8C03\u6574\u987A\u5E8F\u6B21\u6570\u3002",paraId:20,tocIndex:5},{value:`public class SpecialDeque {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        scanner.nextLine(); // consume the newline
        
        Deque<Integer> deque = new ArrayDeque<>();
        int[] pos = new int[n + 1];
        int removeCount = 0;
        int adjustCount = 0;

        for (int i = 0; i < 2 * n; i++) {
            String command = scanner.nextLine();
            if (command.startsWith("head add")) {
                int x = Integer.parseInt(command.split(" ")[2]);
                deque.addFirst(x);
            } else if (command.startsWith("tail add")) {
                int x = Integer.parseInt(command.split(" ")[2]);
                deque.addLast(x);
            } else if (command.equals("remove")) {
                removeCount++;
                if (deque.peekFirst() != removeCount) {
                    adjustCount++;
                    while (deque.peekFirst() != removeCount) {
                        deque.addLast(deque.removeFirst());
                    }
                }
                deque.removeFirst();
            }
        }
        
        System.out.println(adjustCount);
        scanner.close();
    }
}
`,paraId:21,tocIndex:5},{value:"\u6ED1\u52A8\u7A97\u53E3\u662F\u4E00\u79CD\u9AD8\u6548\u7684\u6280\u672F\uFF0C",paraId:22,tocIndex:6},{value:"\u53EF\u4EE5\u5728\u7EBF\u6027\u65F6\u95F4\u5185\u627E\u5230\u6EE1\u8DB3\u7279\u5B9A\u6761\u4EF6\u7684\u5B50\u6570\u7EC4",paraId:22,tocIndex:6},{value:"\u3002",paraId:22,tocIndex:6},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:23,tocIndex:7},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u542B\u6709 N \u4E2A\u6B63\u6574\u6570\u7684\u6570\u7EC4\uFF0C\u6C42\u51FA\u6709\u591A\u5C11\u8FDE\u7EED\u533A\u95F4\uFF08\u5305\u62EC\u5355\u4E2A\u6B63\u6574\u6570\uFF09\uFF0C\u5B83\u4EEC\u7684\u548C\u5927\u4E8E\u7B49\u4E8E x\u3002",paraId:24,tocIndex:7},{value:"\u4E8C\u3001\u8F93\u5165\u63CF\u8FF0",paraId:25,tocIndex:7},{value:"\u7B2C\u4E00\u884C\u4E3A\u4E24\u4E2A\u6574\u6570 N,x\u3002(0<N\u2264100000, 0\u2264x\u226410000000)",paraId:26,tocIndex:7},{value:"\u7B2C\u4E8C\u884C\u6709 N \u4E2A\u6B63\u6574\u6570 \uFF08\u6BCF\u4E2A\u6B63\u6574\u6570\u5C0F\u4E8E\u7B49\u4E8E 100\uFF09\u3002",paraId:27,tocIndex:7},{value:"\u4E09\u3001\u8F93\u51FA\u63CF\u8FF0",paraId:28,tocIndex:7},{value:"\u8F93\u51FA\u4E00\u4E2A\u6574\u6570\uFF0C\u8868\u793A\u6240\u6C42\u7684\u4E2A\u6570",paraId:29,tocIndex:7},{value:"\u6CE8\u610F\uFF1A\u6B64\u9898\u5BF9\u6548\u7387\u6709\u8981\u6C42\uFF0C\u66B4\u529B\u89E3\u6CD5\u901A\u8FC7\u7387\u4E0D\u9AD8",paraId:30,tocIndex:7},{value:`public class SubarrayCount {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int N = scanner.nextInt();
        int x = scanner.nextInt();
        int[] array = new int[N];
        
        for (int i = 0; i < N; i++) {
            array[i] = scanner.nextInt();
        }
        
        scanner.close();
        
        int left = 0, right = 0;
        int current_sum = 0;
        int count = 0;
        
        while (right < N) {
            current_sum += array[right];
            
            while (current_sum >= x) {
                count += N - right;
                current_sum -= array[left];
                left++;
            }
            
            right++;
        }
        
        System.out.println(count);
    }
}
`,paraId:31,tocIndex:7},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:32,tocIndex:8},{value:"\u7ED9\u5B9A\u4E24\u4E2A",paraId:33,tocIndex:8},{value:"\u5B57\u7B26\u4E32",paraId:33,tocIndex:8},{value:" s1 \u548C s2 \u548C\u6B63\u6574\u6570 k\uFF0C\u5176\u4E2D s1 \u957F\u5EA6\u4E3A n1\uFF0Cs2 \u957F\u5EA6\u4E3A n2\uFF0C \u5728 s2 \u4E2D\u9009\u4E00\u4E2A\u5B50\u4E32\uFF0C\u6EE1\u8DB3:",paraId:33,tocIndex:8},{value:"\u8BE5\u5B50\u4E32\u957F\u5EA6\u4E3A n1+k\uFF1B",paraId:34,tocIndex:8},{value:"\u8BE5\u5B50\u4E32\u4E2D\u5305\u542B s1 \u4E2D\u5168\u90E8\u5B57\u6BCD\uFF1B",paraId:34,tocIndex:8},{value:"\u8BE5\u5B50\u4E32\u6BCF\u4E2A\u5B57\u6BCD\u51FA\u73B0\u6B21\u6570\u4E0D\u5C0F\u4E8E s1 \u4E2D\u5BF9\u5E94\u7684\u5B57\u6BCD\uFF0C \u6211\u4EEC\u79F0 s2 \u4EE5\u957F\u5EA6 k \u5197\u4F59\u8986\u76D6 s1\uFF0C \u7ED9\u5B9A s1\uFF0Cs2\uFF0Ck, \u6C42\u6700\u5DE6\u4FA7\u7684 s2 \u4EE5\u957F\u5EA6 k \u5197\u4F59\u8986\u76D6 s1 \u7684\u5B50\u4E32\u7684\u9996\u4E2A\u5143\u7D20\u7684\u4E0B\u6807\uFF0C \u5982\u679C\u6CA1\u6709\u8FD4\u56DE - 1\u3002",paraId:34,tocIndex:8},{value:"\u4E8C\u3001\u8F93\u5165\u63CF\u8FF0",paraId:35,tocIndex:8},{value:"\u8F93\u5165\u4E3A\u4E09\u884C\uFF1A",paraId:36,tocIndex:8},{value:"\u7B2C\u4E00\u884C\u4E3A s1",paraId:37,tocIndex:8},{value:"\u7B2C\u4E8C\u884C\u4E3A s1",paraId:37,tocIndex:8},{value:"\u7B2C\u4E09\u884C\u4E3A k",paraId:37,tocIndex:8},{value:"s1 \u548C s2 \u90FD\u53EA\u5305\u542B\u5C0F\u5199\u5B57\u6BCD\u3002",paraId:38,tocIndex:8},{value:"\u4E09\u3001\u8F93\u51FA\u63CF\u8FF0",paraId:39,tocIndex:8},{value:"\u6700\u5DE6\u4FA7\u7684 s2 \u4EE5\u957F\u5EA6 k \u5197\u4F59\u8986\u76D6 s1 \u7684\u5B50\u4E32\u7684\u9996\u4E2A\u5143\u7D20\u4E0B\u6807\uFF0C\u82E5\u4E0D\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE - 1\u3002",paraId:40,tocIndex:8},{value:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s1 = scanner.nextLine();
        String s2 = scanner.nextLine();
        int k = scanner.nextInt();
        scanner.close();
        
        int result = findLeftmostSubstring(s1, s2, k);
        System.out.println(result);
    }

    private static int findLeftmostSubstring(String s1, String s2, int k) {
        int n1 = s1.length();
        int n2 = s2.length();
        int targetLength = n1 + k;

        if (targetLength > n2) {
            return -1;
        }

        int[] required = new int[26];
        for (char c : s1.toCharArray()) {
            required[c - 'a']++;
        }

        int[] current = new int[26];
        int left = 0;

        for (int right = 0; right < n2; right++) {
            current[s2.charAt(right) - 'a']++;

            if (right - left + 1 > targetLength) {
                current[s2.charAt(left) - 'a']--;
                left++;
            }

            if (right - left + 1 == targetLength) {
                if (isValid(required, current)) {
                    return left;
                }
            }
        }

        return -1;
    }

    private static boolean isValid(int[] required, int[] current) {
        for (int i = 0; i < 26; i++) {
            if (current[i] < required[i]) {
                return false;
            }
        }
        return true;
    }
}
`,paraId:41,tocIndex:8},{value:"\u9898\u76EE\u63CF\u8FF0",paraId:42,tocIndex:10},{value:"\u670D\u52A1\u5668\u8FDE\u63A5\u65B9\u5F0F\u5305\u62EC\u76F4\u63A5\u76F8\u8FDE\uFF0C\u95F4\u63A5\u8FDE\u63A5\uFF0CA \u548C B \u76F4\u63A5\u8FDE\u63A5\uFF0CB \u548C C \u76F4\u63A5\u8FDE\u63A5\uFF0C\u5219 A \u548C c \u95F4\u63A5\u8FDE\u63A5\uFF0C\u76F4\u63A5\u8FDE\u63A5\u548C\u95F4\u63A5\u8FDE\u63A5\u90FD\u53EF\u4EE5\u53D1\u9001\u5E7F\u64AD\uFF0C\u7ED9\u51FA\u4E00\u4E2A N * N \u6570\u7EC4\uFF0C\u4EE3\u8868 N \u4E2A\u670D\u52A1\u5668\uFF0C",paraId:43,tocIndex:10},{value:"matrix [i][j] == 1",paraId:43,tocIndex:10},{value:"\uFF0C\u5219\u4EE3\u8868 i \u548C j \u76F4\u63A5\u8FDE\u63A5\uFF1B\u4E0D\u7B49\u4E8E 1 \u65F6\uFF0C\u4EE3\u8868 i \u548C j \u4E0D\u76F4\u63A5\u8FDE\u63A5\uFF0C",paraId:43,tocIndex:10},{value:"matrix [i][j] == 1",paraId:43,tocIndex:10},{value:"\uFF0C\u5373\u81EA\u5DF1\u548C\u81EA\u5DF1\u76F4\u63A5\u8FDE\u63A5\uFF0C",paraId:43,tocIndex:10},{value:"matrix [i][j] == matrix [j][i]",paraId:43,tocIndex:10},{value:"\u8BA1\u7B97\u521D\u59CB\u9700\u8981\u7ED9\u51E0\u53F0\u670D\u52A1\u5668\u5E7F\u64AD\uFF0C\u624D\u53EF\u4EE5\u4F7F\u6BCF\u4E2A\u670D\u52A1\u5668\u90FD\u6536\u5230\u5E7F\u64AD",paraId:44,tocIndex:10},{value:"\u8F93\u5165\u8F93\u51FA",paraId:45,tocIndex:10},{value:"\u8F93\u5165",paraId:46,tocIndex:10},{value:`
\u8F93\u5165\u4E3A N \u884C\uFF0C\u6BCF\u884C\u6709 N \u4E2A\u6570\u5B57\uFF0C\u4E3A 0 \u6216 1\uFF0C\u7A7A\u683C\u5206\u9694\uFF0C`,paraId:46,tocIndex:10},{value:`
\u6784\u6210 N * N`,paraId:46,tocIndex:10},{value:`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int N = scanner.nextInt();
        int[][] matrix = new int[N][N];
        
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                matrix[i][j] = scanner.nextInt();
            }
        }
        
        System.out.println(countBroadcastServers(matrix));
    }

    public static int countBroadcastServers(int[][] matrix) {
        int N = matrix.length;
        boolean[] visited = new boolean[N];
        int count = 0;

        for (int i = 0; i < N; i++) {
            if (!visited[i]) {
                dfs(matrix, visited, i);
                count++;
            }
        }

        return count;
    }

    private static void dfs(int[][] matrix, boolean[] visited, int node) {
        visited[node] = true;
        for (int i = 0; i < matrix.length; i++) {
            if (matrix[node][i] == 1 && !visited[i]) {
                dfs(matrix, visited, i);
            }
        }
    }
}
`,paraId:47,tocIndex:10},{value:"\u4EE3\u7801\u89E3\u91CA",paraId:48,tocIndex:10},{value:"\u8F93\u5165\u8BFB\u53D6",paraId:49,tocIndex:10},{value:`\uFF1A
`,paraId:49,tocIndex:10},{value:"\u4F7F\u7528 ",paraId:50,tocIndex:10},{value:"Scanner",paraId:50,tocIndex:10},{value:" \u8BFB\u53D6\u8F93\u5165\u7684 N \u548C\u90BB\u63A5\u77E9\u9635\u3002",paraId:50,tocIndex:10},{value:"\u4E3B\u51FD\u6570 ",paraId:49,tocIndex:10},{value:"countBroadcastServers",paraId:49,tocIndex:10},{value:`\uFF1A
`,paraId:49,tocIndex:10},{value:"\u521D\u59CB\u5316\u4E00\u4E2A ",paraId:51,tocIndex:10},{value:"visited",paraId:51,tocIndex:10},{value:" \u6570\u7EC4\u6765\u8BB0\u5F55\u6BCF\u4E2A\u670D\u52A1\u5668\u662F\u5426\u5DF2\u7ECF\u88AB\u8BBF\u95EE\u3002",paraId:51,tocIndex:10},{value:"\u904D\u5386\u6BCF\u4E2A\u670D\u52A1\u5668\uFF0C\u5982\u679C\u5B83\u6CA1\u6709\u88AB\u8BBF\u95EE\u8FC7\uFF0C\u5219\u8C03\u7528 ",paraId:51,tocIndex:10},{value:"dfs",paraId:51,tocIndex:10},{value:" \u51FD\u6570\u8FDB\u884C\u6DF1\u5EA6\u4F18\u5148\u641C\u7D22\uFF0C\u5E76\u5C06\u8FDE\u901A\u5206\u91CF\u8BA1\u6570\u5668\u52A0\u4E00\u3002",paraId:51,tocIndex:10},{value:"\u6DF1\u5EA6\u4F18\u5148\u641C\u7D22\u51FD\u6570 ",paraId:49,tocIndex:10},{value:"dfs",paraId:49,tocIndex:10},{value:`\uFF1A
`,paraId:49,tocIndex:10},{value:"\u6807\u8BB0\u5F53\u524D\u670D\u52A1\u5668\u4E3A\u5DF2\u8BBF\u95EE\u3002",paraId:52,tocIndex:10},{value:"\u904D\u5386\u6240\u6709\u670D\u52A1\u5668\uFF0C\u5982\u679C\u5F53\u524D\u670D\u52A1\u5668\u4E0E\u5176\u4ED6\u670D\u52A1\u5668\u76F4\u63A5\u8FDE\u63A5\u4E14\u8BE5\u670D\u52A1\u5668\u672A\u88AB\u8BBF\u95EE\uFF0C\u5219\u9012\u5F52\u8C03\u7528 ",paraId:52,tocIndex:10},{value:"dfs",paraId:52,tocIndex:10},{value:" \u8FDB\u884C\u6DF1\u5EA6\u4F18\u5148\u641C\u7D22\u3002",paraId:52,tocIndex:10},{value:"\u5728\u7ED9\u5B9A\u7684 ",paraId:53,tocIndex:11},{value:"m x n",paraId:53,tocIndex:11},{value:" \u7F51\u683C ",paraId:53,tocIndex:11},{value:"grid",paraId:53,tocIndex:11},{value:" \u4E2D\uFF0C\u6BCF\u4E2A\u5355\u5143\u683C\u53EF\u4EE5\u6709\u4EE5\u4E0B\u4E09\u4E2A\u503C\u4E4B\u4E00\uFF1A",paraId:53,tocIndex:11},{value:"\u503C ",paraId:54,tocIndex:11},{value:"0",paraId:54,tocIndex:11},{value:" \u4EE3\u8868\u7A7A\u5355\u5143\u683C\uFF1B",paraId:54,tocIndex:11},{value:"\u503C ",paraId:54,tocIndex:11},{value:"1",paraId:54,tocIndex:11},{value:" \u4EE3\u8868\u65B0\u9C9C\u6A58\u5B50\uFF1B",paraId:54,tocIndex:11},{value:"\u503C ",paraId:54,tocIndex:11},{value:"2",paraId:54,tocIndex:11},{value:" \u4EE3\u8868\u8150\u70C2\u7684\u6A58\u5B50\u3002",paraId:54,tocIndex:11},{value:"\u6BCF\u5206\u949F\uFF0C\u8150\u70C2\u7684\u6A58\u5B50 ",paraId:55,tocIndex:11},{value:"\u5468\u56F4 4 \u4E2A\u65B9\u5411\u4E0A\u76F8\u90BB",paraId:55,tocIndex:11},{value:" \u7684\u65B0\u9C9C\u6A58\u5B50\u90FD\u4F1A\u8150\u70C2\u3002",paraId:55,tocIndex:11},{value:"\u8FD4\u56DE \u76F4\u5230\u5355\u5143\u683C\u4E2D\u6CA1\u6709\u65B0\u9C9C\u6A58\u5B50\u4E3A\u6B62\u6240\u5FC5\u987B\u7ECF\u8FC7\u7684\u6700\u5C0F\u5206\u949F\u6570\u3002\u5982\u679C\u4E0D\u53EF\u80FD\uFF0C\u8FD4\u56DE ",paraId:56,tocIndex:11},{value:"-1",paraId:56,tocIndex:11},{value:" \u3002",paraId:56,tocIndex:11},{value:"\u793A\u4F8B 1\uFF1A",paraId:57,tocIndex:11},{value:`\u8F93\u5165\uFF1Agrid = [[2,1,1],[1,1,0],[0,1,1]]
\u8F93\u51FA\uFF1A4
`,paraId:58,tocIndex:11},{value:"\u793A\u4F8B 2\uFF1A",paraId:59,tocIndex:11},{value:`\u8F93\u5165\uFF1Agrid = [[2,1,1],[0,1,1],[1,0,1]]
\u8F93\u51FA\uFF1A-1
\u89E3\u91CA\uFF1A\u5DE6\u4E0B\u89D2\u7684\u6A58\u5B50\uFF08\u7B2C 2 \u884C\uFF0C \u7B2C 0 \u5217\uFF09\u6C38\u8FDC\u4E0D\u4F1A\u8150\u70C2\uFF0C\u56E0\u4E3A\u8150\u70C2\u53EA\u4F1A\u53D1\u751F\u5728 4 \u4E2A\u65B9\u5411\u4E0A\u3002
`,paraId:60,tocIndex:11},{value:"\u793A\u4F8B 3\uFF1A",paraId:61,tocIndex:11},{value:`\u8F93\u5165\uFF1Agrid = [[0,2]]
\u8F93\u51FA\uFF1A0
\u89E3\u91CA\uFF1A\u56E0\u4E3A 0 \u5206\u949F\u65F6\u5DF2\u7ECF\u6CA1\u6709\u65B0\u9C9C\u6A58\u5B50\u4E86\uFF0C\u6240\u4EE5\u7B54\u6848\u5C31\u662F 0 \u3002
`,paraId:62,tocIndex:11},{value:`import java.util.LinkedList;
import java.util.Queue;

public class RottingOranges {
    public int orangesRotting(int[][] grid) {
        int m = grid.length; // \u83B7\u53D6\u7F51\u683C\u7684\u884C\u6570
        int n = grid[0].length; // \u83B7\u53D6\u7F51\u683C\u7684\u5217\u6570
        int freshCount = 0; // \u8BB0\u5F55\u65B0\u9C9C\u6A58\u5B50\u7684\u6570\u91CF
        Queue<int[]> queue = new LinkedList<>(); // \u521B\u5EFA\u4E00\u4E2A\u961F\u5217\u7528\u4E8EBFS

        // \u521D\u59CB\u5316\u961F\u5217\u548C\u65B0\u9C9C\u6A58\u5B50\u6570\u91CF
        for (int i = 0; i < m; i++) { // \u904D\u5386\u6BCF\u4E00\u884C
            for (int j = 0; j < n; j++) { // \u904D\u5386\u6BCF\u4E00\u5217
                if (grid[i][j] == 2) { // \u5982\u679C\u5F53\u524D\u6A58\u5B50\u662F\u8150\u70C2\u7684
                    queue.offer(new int[]{i, j}); // \u5C06\u5176\u5750\u6807\u52A0\u5165\u961F\u5217
                } else if (grid[i][j] == 1) { // \u5982\u679C\u5F53\u524D\u6A58\u5B50\u662F\u65B0\u9C9C\u7684
                    freshCount++; // \u65B0\u9C9C\u6A58\u5B50\u6570\u91CF\u52A0\u4E00
                }
            }
        }

        // \u5982\u679C\u6CA1\u6709\u65B0\u9C9C\u6A58\u5B50\uFF0C\u76F4\u63A5\u8FD4\u56DE0
        if (freshCount == 0) {
            return 0; // \u8FD4\u56DE0\u8868\u793A\u65E0\u9700\u65F6\u95F4\u8150\u70C2\u6A58\u5B50
        }

        // \u56DB\u4E2A\u65B9\u5411\u7684\u6570\u7EC4\uFF0C\u8868\u793A\u4E0A\u4E0B\u5DE6\u53F3\u56DB\u4E2A\u65B9\u5411
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        int minutes = 0; // \u8BB0\u5F55\u8150\u70C2\u8FC7\u7A0B\u7ECF\u8FC7\u7684\u65F6\u95F4

        // \u5F00\u59CBBFS
        while (!queue.isEmpty()) { // \u5F53\u961F\u5217\u4E0D\u4E3A\u7A7A\u65F6\u5FAA\u73AF
            int size = queue.size(); // \u5F53\u524D\u5C42\u7684\u5927\u5C0F
            boolean rotted = false; // \u6807\u8BB0\u662F\u5426\u6709\u6A58\u5B50\u8150\u70C2

            for (int i = 0; i < size; i++) { // \u904D\u5386\u5F53\u524D\u5C42\u7684\u6240\u6709\u8282\u70B9
                int[] current = queue.poll(); // \u53D6\u51FA\u961F\u9996\u5143\u7D20
                int x = current[0], y = current[1]; // \u83B7\u53D6\u5F53\u524D\u6A58\u5B50\u7684\u5750\u6807

                for (int[] direction : directions) { // \u904D\u5386\u56DB\u4E2A\u65B9\u5411
                    int nx = x + direction[0]; // \u65B0\u4F4D\u7F6E\u7684\u884C\u5750\u6807
                    int ny = y + direction[1]; // \u65B0\u4F4D\u7F6E\u7684\u5217\u5750\u6807

                    // \u68C0\u67E5\u65B0\u4F4D\u7F6E\u662F\u5426\u5728\u7F51\u683C\u5185\u4E14\u662F\u5426\u662F\u65B0\u9C9C\u6A58\u5B50
                    if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] == 1) {
                        grid[nx][ny] = 2; // \u5C06\u65B0\u9C9C\u6A58\u5B50\u8150\u70C2
                        queue.offer(new int[]{nx, ny}); // \u5C06\u65B0\u4F4D\u7F6E\u52A0\u5165\u961F\u5217
                        freshCount--; // \u65B0\u9C9C\u6A58\u5B50\u6570\u91CF\u51CF\u4E00
                        rotted = true; // \u6807\u8BB0\u6709\u6A58\u5B50\u8150\u70C2
                    }
                }
            }

            if (rotted) { // \u5982\u679C\u6709\u6A58\u5B50\u8150\u70C2
                minutes++; // \u65F6\u95F4\u52A0\u4E00
            }
        }

        // \u5982\u679C\u8FD8\u6709\u5269\u4F59\u7684\u65B0\u9C9C\u6A58\u5B50\uFF0C\u8FD4\u56DE-1\uFF0C\u5426\u5219\u8FD4\u56DE\u8150\u70C2\u6240\u6709\u6A58\u5B50\u6240\u9700\u7684\u65F6\u95F4
        return freshCount == 0 ? minutes : -1;
    }

    public static void main(String[] args) {
        RottingOranges solution = new RottingOranges();
        int[][] grid1 = {{2, 1, 1}, {1, 1, 0}, {0, 1, 1}};
        int[][] grid2 = {{2, 1, 1}, {0, 1, 1}, {1, 0, 1}};
        int[][] grid3 = {{0, 2}};

        // \u8F93\u51FA\u6BCF\u4E2A\u793A\u4F8B\u7684\u7ED3\u679C
        System.out.println(solution.orangesRotting(grid1)); // \u8F93\u51FA: 4
        System.out.println(solution.orangesRotting(grid2)); // \u8F93\u51FA: -1
        System.out.println(solution.orangesRotting(grid3)); // \u8F93\u51FA: 0
    }
}
`,paraId:63,tocIndex:11},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:64,tocIndex:13},{value:"\u5B59\u609F\u7A7A\u559C\u6B22\u5403\u87E0\u6843\uFF0C\u4E00\u5929\u4ED6\u4E58\u5B88\u536B\u87E0\u6843\u56ED\u7684\u5929\u5175\u5929\u5C06\u79BB\u5F00\u4E86\u800C\u5077\u5077\u7684\u6765\u5230\u738B\u6BCD\u5A18\u5A18\u7684\u87E0\u6843\u56ED\u5077\u5403\u87E0\u6843\u3002",paraId:65,tocIndex:13},{value:"\u5DF2\u77E5\u87E0\u6843\u56ED\u6709 N \u68F5\u87E0\u6843\u6811\uFF0C\u7B2C i \u68F5\u87E0\u6843\u6811\u4E0A\u6709 N [i]\uFF08\u5927\u4E8E 0\uFF09\u4E2A\u87E0\u6843\uFF0C\u5929\u5175\u5929\u5C06\u5C06\u5728 H\uFF08\u4E0D\u5C0F\u4E8E\u87E0\u6843\u6811\u68F5\u6570\uFF09\u5C0F\u65F6\u540E\u56DE\u6765\u3002",paraId:66,tocIndex:13},{value:"\u5B59\u609F\u7A7A\u53EF\u4EE5\u51B3\u5B9A\u4ED6\u5403\u87E0\u6843\u7684\u901F\u5EA6 K\uFF08\u5355\u4F4D\uFF1A\u4E2A / \u5C0F\u65F6\uFF09\uFF0C\u6BCF\u4E2A\u5C0F\u65F6\u4ED6\u4F1A\u9009\u62E9\u4E00\u9897\u87E0\u6843\u6811\uFF0C\u4ECE\u4E2D\u5403\u6389 K \u4E2A\u87E0\u6843\uFF0C\u5982\u679C\u8FD9\u68F5\u6811\u4E0A\u7684\u87E0\u6843\u6570\u5C0F\u4E8E K\uFF0C\u4ED6\u5C06\u5403\u6389\u8FD9\u68F5\u6811\u4E0A\u6240\u6709\u87E0\u6843\uFF0C\u7136\u540E\u8FD9\u4E00\u5C0F\u65F6\u5185\u4E0D\u518D\u5403\u5176\u4F59\u87E0\u6843\u6811\u4E0A\u7684\u87E0\u6843\u3002",paraId:67,tocIndex:13},{value:"\u5B59\u609F\u7A7A\u559C\u6B22\u6162\u6162\u5403\uFF0C\u4F46\u4ECD\u60F3\u5728\u5929\u5175\u5929\u5C06\u56DE\u6765\u524D\u5C06\u6240\u6709\u87E0\u6843\u5403\u5B8C\u3002",paraId:68,tocIndex:13},{value:"\u6C42\u5B59\u609F\u7A7A\u53EF\u4EE5\u5728 H \u5C0F\u65F6\u5185\u5403\u6389\u6240\u6709\u87E0\u6843\u7684\u6700\u5C0F\u901F\u5EA6 K\uFF08K \u4E3A\u6574\u6570\uFF09\u3002",paraId:69,tocIndex:13},{value:"\u4E8C\u3001\u8F93\u5165\u63CF\u8FF0",paraId:70,tocIndex:13},{value:"\u4ECE\u6807\u51C6\u8F93\u5165\u4E2D",paraId:71,tocIndex:13},{value:"\u8BFB\u53D6\u4E00\u884C",paraId:71,tocIndex:13},{value:"\u6570\u5B57\uFF0C\u524D\u9762\u6570\u5B57\u8868\u793A\u6BCF\u68F5\u6570\u4E0A\u87E0\u6843\u4E2A\u6570\uFF0C\u6700\u540E\u7684\u6570\u5B57\u8868\u793A\u5929\u5175\u5929\u5C06\u5C06\u79BB\u5F00\u7684\u65F6\u95F4\u3002",paraId:71,tocIndex:13},{value:"\u4E09\u3001\u8F93\u51FA\u63CF\u8FF0",paraId:72,tocIndex:13},{value:"\u5403\u6389\u6240\u6709\u87E0\u6843\u7684 \u6700\u5C0F\u901F\u5EA6 K\uFF08K \u4E3A\u6574\u6570\uFF09\u6216 \u8F93\u5165\u5F02\u5E38\u65F6\u8F93\u51FA -1\u3002",paraId:73,tocIndex:13},{value:"1\u3001\u8F93\u5165",paraId:74,tocIndex:13},{value:"3 11 6 7 8",paraId:75,tocIndex:13},{value:"2\u3001\u8F93\u51FA",paraId:76,tocIndex:13},{value:"4",paraId:77,tocIndex:13},{value:"3\u3001\u8BF4\u660E",paraId:78,tocIndex:13},{value:"\u5929\u5175\u5929\u5C06 8 \u4E2A\u5C0F\u65F6\u540E\u56DE\u6765\uFF0C\u5B59\u609F\u7A7A\u5403\u6389\u6240\u6709\u87E0\u6843\u7684\u6700\u5C0F\u901F\u5EA6 4\u3002",paraId:79,tocIndex:13},{value:"\u7B2C 1 \u5C0F\u65F6\u5168\u90E8\u5403\u5B8C\u7B2C\u4E00\u68F5\u6811\uFF0C\u5403 3 \u4E2A\uFF0C",paraId:80,tocIndex:13},{value:"\u7B2C 2 \u5C0F\u65F6\u5403 4 \u4E2A\uFF0C\u7B2C\u4E8C\u68F5\u6811\u5269 7 \u4E2A\uFF0C",paraId:80,tocIndex:13},{value:"\u7B2C 3 \u5C0F\u65F6\u5403 4 \u4E2A\uFF0C\u7B2C\u4E8C\u68F5\u6811\u5269 3 \u4E2A\uFF0C",paraId:80,tocIndex:13},{value:"\u7B2C 4 \u5C0F\u65F6\u5403 3 \u4E2A\uFF0C\u7B2C\u4E8C\u68F5\u6811\u5403\u5B8C\uFF0C",paraId:80,tocIndex:13},{value:"\u7B2C 5 \u5C0F\u65F6\u5403 4 \u4E2A\uFF0C\u7B2C\u4E09\u68F5\u6811\u5269 2 \u4E2A\uFF0C",paraId:80,tocIndex:13},{value:"\u7B2C 6 \u5C0F\u65F6\u5403 2 \u4E2A\uFF0C\u7B2C\u4E09\u68F5\u6811\u5403\u5B8C\uFF0C",paraId:80,tocIndex:13},{value:"\u7B2C 7 \u5C0F\u65F6\u5403 4 \u4E2A\uFF0C\u7B2C 4 \u68F5\u6811\u5269 3 \u4E2A\uFF0C",paraId:80,tocIndex:13},{value:"\u7B2C 8 \u5C0F\u65F6\u5403 3 \u4E2A\uFF0C\u7B2C 4 \u68F5\u6811\u5403\u5B8C\u3002",paraId:80,tocIndex:13},{value:`public class Test09 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        // \u5929\u5175\u5929\u5C06\u5C06\u79BB\u5F00\u7684\u65F6\u95F4H
        int H = arr[arr.length - 1];

        // \u83B7\u53D6\u6BCF\u68F5\u6570\u4E0A\u87E0\u6843\u4E2A\u6570
        arr = Arrays.copyOf(arr, arr.length - 1);
        // \u4ECE\u5C11\u5230\u591A\u6392\u5E8F
        Arrays.sort(arr);

        //\u5C06\u5403\u6843\u901F\u5EA6\u5B9A\u4E3A\u6700\u5C0F\u6811\u4E0A\u7684\u6843\u5B50\u548C\u6700\u591A\u6811\u4E0A\u7684\u6843\u5B50\u7684\u4E00\u534A
        int left = 1;
        int right = arr[arr.length - 1];
        while (left < right) {
            int mid = (left + right) / 2;
            // \u5403\u5B8C\u4E86\uFF0C\u8FD8\u80FD\u6162\u4E00\u70B9
            if (dfs(arr, H, mid)) {
                right = mid;
            } else {// \u6CA1\u5403\u5B8C\uFF0C\u5403\u5FEB\u4E00\u70B9
                left = mid + 1;
            }
        }
        System.out.println(left);
        System.out.println("\u6267\u884C\u6B21\u6570\uFF1A" + num);
    }

    // \u8BB0\u5F55\u56DE\u6EAF\u6B21\u6570\uFF0C\u4F18\u5316\u56DE\u6EAF\u7B97\u6CD5
    static int num = 0;
    // \u4E0A\u4E00\u6B21\u5403\u5B8C\u6240\u6709\u6843\u5B50\u7684\u901F\u5EA6
    static int preSpeed = 0;

    private static boolean dfs(int[] arr, int H, int K) {
        int times = 0;
        for (int i = 0; i < arr.length; i++) {
            num++;
            // \u4EE5\u901F\u5EA6K\u5403\u5B8C\u6BCF\u9897\u6843\u6811\u7684\u65F6\u95F4
            times += arr[i] / K;
            if (arr[i] % K != 0) {
                times++;
            }
        }
        return times <= H;
    }
}
`,paraId:81,tocIndex:13},{value:"\u548C\u4E0A\u9898\u7C7B\u4F3C",paraId:82,tocIndex:14},{value:"\u9898\u76EE\u63CF\u8FF0",paraId:83,tocIndex:14},{value:"\u673A\u5668\u4EBA\u642C\u7816\uFF0C\u4E00\u5171\u6709 N \u5806\u7816\u5B58\u653E\u5728 N \u4E2A\u4E0D\u540C\u7684\u4ED3\u5E93\u4E2D\uFF0C\u7B2C i \u5806\u7816\u4E2D\u6709 bricks [i] \u5757\u7816\u5934\uFF0C\u8981\u6C42\u5728 8 \u5C0F\u65F6\u5185\u642C\u5B8C\u3002",paraId:84,tocIndex:14},{value:"\u673A\u5668\u4EBA\u6BCF\u5C0F\u65F6\u80FD\u642C\u7816\u7684\u6570\u91CF\u53D6\u51B3\u4E8E\u6709\u591A\u5C11\u80FD\u91CF\u683C\uFF0C\u673A\u5668\u4EBA\u4E00\u4E2A\u5C0F\u65F6\u4E2D\u53EA\u80FD\u5728\u4E00\u4E2A\u4ED3\u5E93\u4E2D\u642C\u7816\uFF0C\u673A\u5668\u4EBA\u7684\u80FD\u91CF\u683C\u53EA\u5728\u8FD9\u4E00\u4E2A\u5C0F\u65F6\u6709\u6548\uFF0C\u4E3A\u4F7F\u5F97\u673A\u5668\u4EBA\u635F\u8017\u6700\u5C0F\u5316\uFF0C\u5E94\u5C3D\u91CF\u51CF\u5C0F\u6BCF\u6B21\u8865\u5145\u7684\u80FD\u91CF\u683C\u6570\u3002",paraId:85,tocIndex:14},{value:"\u4E3A\u4E86\u4FDD\u969C\u5728 8 \u5C0F\u65F6\u5185\u80FD\u5B8C\u6210\u642C\u7816\u4EFB\u52A1\uFF0C\u8BF7\u8BA1\u7B97\u6BCF\u5C0F\u65F6\u7ED9\u673A\u5668\u4EBA\u5145\u80FD\u7684\u6700\u5C0F\u80FD\u91CF\u683C\u6570\u3002",paraId:86,tocIndex:14},{value:"\u65E0\u9700\u8003\u8651\u673A\u5668\u4EBA\u8865\u5145\u80FD\u529B\u683C\u7684\u8017\u65F6\uFF1B",paraId:87,tocIndex:14},{value:"\u65E0\u9700\u8003\u8651\u673A\u5668\u4EBA\u642C\u7816\u7684\u8017\u65F6\uFF1B",paraId:87,tocIndex:14},{value:"\u673A\u5668\u4EBA\u6BCF\u5C0F\u65F6\u8865\u5145\u80FD\u91CF\u683C\u53EA\u5728\u8FD9\u4E00\u4E2A\u5C0F\u65F6\u4E2D\u6709\u6548\uFF1B",paraId:87,tocIndex:14},{value:"\u8F93\u5165\u63CF\u8FF0",paraId:88,tocIndex:14},{value:"\u7B2C\u4E00\u884C\u4E3A\u4E00\u884C\u6570\u5B57\uFF0C\u7A7A\u683C\u5206\u9694",paraId:89,tocIndex:14},{value:"\u8F93\u51FA\u63CF\u8FF0",paraId:90,tocIndex:14},{value:"\u673A\u5668\u4EBA\u6BCF\u5C0F\u65F6\u6700\u5C11\u9700\u8981\u5145\u7684\u80FD\u91CF\u683C\uFF0C\u82E5\u65E0\u6CD5\u5B8C\u6210\u4EFB\u52A1\uFF0C\u8F93\u51FA -1",paraId:91,tocIndex:14},{value:`public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String str=sc.nextLine();
    String[] strArr=str.split(" ");
    int[] arr=new int[strArr.length];
    for (int i = 0; i < strArr.length; i++) {
        arr[i]=Integer.parseInt(strArr[i]);
    }
    // \u4ECE\u5C11\u5230\u591A\u6392\u5E8F
    Arrays.sort(arr);
    int left = 1;
    int right = arr[arr.length - 1];
    while (left < right) {
        int mid = (left + right) / 2;
        if (dfs(arr, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    System.out.println(left);
}

private static boolean dfs(int[] arr, int K) {
    int times = 0;
    for (int j : arr) {
        // \u4EE5\u901F\u5EA6K\u642C\u5B8C\u4E00\u4E2A\u4ED3\u5E93\u7684\u7816\u7684\u65F6\u95F4
        times += j / K;
        if (j % K != 0) {
            times++;
        }
    }
    return times <= 8;
}
`,paraId:92,tocIndex:14},{value:"\u6CE8\u610F\u548C\u7EC4\u5408\u7684\u533A\u522B",paraId:93},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:94,tocIndex:16},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u53EA\u5305\u542B\u5927\u5199",paraId:95,tocIndex:16},{value:"\u82F1\u6587\u5B57\u6BCD",paraId:95,tocIndex:16},{value:"\u7684\u5B57\u7B26\u4E32 S\uFF0C\u8981\u6C42\u4F60\u7ED9\u51FA\u5BF9 S \u91CD\u65B0\u6392\u5217\u7684\u6240\u6709\u4E0D\u76F8\u540C\u7684\u6392\u5217\u6570\u3002",paraId:95,tocIndex:16},{value:"\u5982\uFF1AS \u4E3A ABA\uFF0C\u5219\u4E0D\u540C\u7684\u6392\u5217\u6709 ABA\u3001AAB\u3001BAA \u4E09\u79CD\u3002",paraId:96,tocIndex:16},{value:"\u4E8C\u3001\u8F93\u5165\u63CF\u8FF0",paraId:97,tocIndex:16},{value:"\u8F93\u5165\u4E00\u4E2A\u957F\u5EA6\u4E0D\u8D85\u8FC7 10 \u7684\u5B57\u7B26\u4E32 S\uFF0C\u786E\u4FDD\u90FD\u662F\u5927\u5199\u7684\u3002",paraId:98,tocIndex:16},{value:"\u4E09\u3001\u8F93\u51FA\u63CF\u8FF0",paraId:99,tocIndex:16},{value:"\u8F93\u51FA S \u91CD\u65B0\u6392\u5217\u7684\u6240\u6709\u4E0D\u76F8\u540C\u7684\u6392\u5217\u6570\uFF08\u5305\u542B\u81EA\u5DF1\u672C\u8EAB\uFF09\u3002",paraId:100,tocIndex:16},{value:`public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String str = sc.nextLine();
    char[] charArr = str.toCharArray();
    String[] strArray = new String[charArr.length];
    for (int i = 0; i < charArr.length; i++) {
        strArray[i] = String.valueOf(charArr[i]);
    }
    //\u5B58\u50A8\u6392\u5217\u7684set
    Set<String> path = new HashSet<>();
    StringBuilder builder = new StringBuilder();
    boolean[] used = new boolean[str.length()]; // \u7528\u4E8E\u6807\u8BB0\u6BCF\u4E2A\u5B57\u7B26\u662F\u5426\u88AB\u4F7F\u7528\u8FC7
    dfs1(path, strArray, builder, str.length(), used);
    path.forEach(System.out::println);
}

private static void dfs1(Set<String> path, String[] arr, StringBuilder builder, int length, boolean[] used) {
    // \u9012\u5F52\u7EC8\u6B62\u6761\u4EF6\u662F\uFF1Apath \u7684\u957F\u5EA6\u7B49\u4E8E k
    if (builder.toString().length() == length) {
        path.add(builder.toString());
        return;
    }
    for (int i = 0; i < length; i++) {
        if (used[i]) {
            continue;
        }
        // \u6807\u8BB0\u5F53\u524D\u5B57\u7B26\u4E3A\u5DF2\u4F7F\u7528
        used[i] = true;
        builder.append(arr[i]);
        dfs1(path, arr, builder, length, used);
        builder.deleteCharAt(builder.length() - 1);
        used[i] = false;
    }
}
`,paraId:101,tocIndex:16},{value:"\u9898\u76EE\u63CF\u8FF0",paraId:102,tocIndex:17},{value:"\u627E\u5230\u5B83\u662F\u4E2A\u5C0F\u6E38\u620F\uFF0C\u4F60\u9700\u8981\u5728\u4E00\u4E2A\u77E9\u9635\u4E2D\u627E\u5230\u7ED9\u5B9A\u7684\u5355\u8BCD\u3002\u5047\u8BBE\u7ED9\u5B9A\u5355\u8BCD HELLOWORLD\uFF0C\u5728\u77E9\u9635\u4E2D\u53EA\u8981\u80FD\u627E\u5230 H->E->L->L->O->W->O->R->L->D \u8FDE\u6210\u7684\u5355\u8BCD\uFF0C\u5C31\u7B97\u901A\u8FC7\u3002",paraId:103,tocIndex:17},{value:"\u6CE8\u610F\u533A\u5206\u82F1\u6587\u5B57\u6BCD\u5927\u5C0F\u5199\uFF0C\u5E76\u4E14\u4F60\u53EA\u80FD\u4E0A\u4E0B\u5DE6\u53F3\u884C\u8D70\uFF0C\u4E0D\u80FD\u8D70\u56DE\u5934\u8DEF\u3002",paraId:104,tocIndex:17},{value:"\u8F93\u5165\u63CF\u8FF0",paraId:105,tocIndex:17},{value:"\u8F93\u5165\u7B2C\u4E00\u884C\u5305\u542B\u4E24\u4E2A\u6574\u6570 n\u3001m (0<n,m<21) \u5206\u522B\u8868\u793A n \u884C m \u5217\u7684\u77E9\u9635\uFF0C\u7B2C\u4E8C\u884C\u662F\u957F\u5EA6\u4E0D\u8D85\u8FC7 100 \u7684\u5355\u8BCD W\uFF08\u5728\u6574\u4E2A\u77E9\u9635\u4E2D\u7ED9\u5B9A\u5355\u8BCD W \u53EA\u4F1A\u51FA\u73B0\u4E00\u6B21\uFF09\uFF0C\u4ECE\u7B2C 3 \u884C\u5230\u7B2C n+2 \u884C\u662F\u53EA\u5305\u542B\u5927\u5C0F\u5199\u82F1\u6587\u5B57\u6BCD\u7684\u957F\u5EA6\u4E3A m \u7684\u5B57\u7B26\u4E32\u77E9\u9635\u3002",paraId:106,tocIndex:17},{value:"\u8F93\u51FA\u63CF\u8FF0",paraId:107,tocIndex:17},{value:"\u5982\u679C\u80FD\u5728\u77E9\u9635\u4E2D\u8FDE\u6210\u7ED9\u5B9A\u7684\u5355\u8BCD\uFF0C\u5219\u8F93\u51FA\u7ED9\u5B9A\u5355\u8BCD\u9996\u5B57\u6BCD\u5728\u77E9\u9635\u4E2D\u7684\u4F4D\u7F6E\uFF08\u7B2C\u51E0\u884C \u7B2C\u51E0\u5217\uFF09\uFF0C\u5426\u5219\u8F93\u51FA \u201CNO\u201D\u3002",paraId:108,tocIndex:17},{value:"\u8F93\u5165",paraId:109,tocIndex:17},{value:"5 5",paraId:110,tocIndex:17},{value:`
HELLOWORLD`,paraId:110,tocIndex:17},{value:`
CPUCY`,paraId:110,tocIndex:17},{value:`
EKLQH`,paraId:110,tocIndex:17},{value:`
CHELL`,paraId:110,tocIndex:17},{value:`
LROWO`,paraId:110,tocIndex:17},{value:`
DGRBC`,paraId:110,tocIndex:17},{value:"\u8F93\u51FA",paraId:111,tocIndex:17},{value:"3 2",paraId:112,tocIndex:17},{value:`import java.util.Scanner;

public class WordSearch {
    // \u5B9A\u4E49\u65B9\u5411\u6570\u7EC4\uFF0C\u7528\u4E8E\u8868\u793A\u4E0A\u3001\u4E0B\u3001\u5DE6\u3001\u53F3\u56DB\u4E2A\u65B9\u5411\u7684\u79FB\u52A8
    private static final int[] rowDirection = {-1, 1, 0, 0};
    private static final int[] colDirection = {0, 0, -1, 1};

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // \u8BFB\u53D6\u77E9\u9635\u7684\u884C\u6570\u548C\u5217\u6570
        int n = sc.nextInt();
        int m = sc.nextInt();
        // \u8BFB\u53D6\u76EE\u6807\u5355\u8BCD
        String word = sc.next();
        // \u521D\u59CB\u5316\u77E9\u9635
        char[][] board = new char[n][m];
        
        // \u8BFB\u53D6\u77E9\u9635\u4E2D\u7684\u5B57\u7B26
        for (int i = 0; i < n; i++) {
            board[i] = sc.next().toCharArray();
        }
        
        // \u67E5\u627E\u76EE\u6807\u5355\u8BCD\u5728\u77E9\u9635\u4E2D\u7684\u8D77\u59CB\u4F4D\u7F6E
        int[] result = findWord(board, word);
        if (result[0] != -1) {
            // \u5982\u679C\u627E\u5230\u76EE\u6807\u5355\u8BCD\uFF0C\u8F93\u51FA\u8D77\u59CB\u4F4D\u7F6E\uFF08\u884C\u548C\u5217\u4ECE1\u5F00\u59CB\u8BA1\u6570\uFF09
            System.out.println((result[0] + 1) + " " + (result[1] + 1));
        } else {
            // \u5982\u679C\u6CA1\u6709\u627E\u5230\u76EE\u6807\u5355\u8BCD\uFF0C\u8F93\u51FA "NO"
            System.out.println("NO");
        }
        
        sc.close();
    }

    // \u5728\u77E9\u9635\u4E2D\u67E5\u627E\u76EE\u6807\u5355\u8BCD\u7684\u65B9\u6CD5
    private static int[] findWord(char[][] board, String word) {
        int n = board.length;
        int m = board[0].length;
        
        // \u904D\u5386\u77E9\u9635\u4E2D\u7684\u6BCF\u4E2A\u4F4D\u7F6E
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // \u5982\u679C\u5F53\u524D\u5B57\u7B26\u662F\u76EE\u6807\u5355\u8BCD\u7684\u7B2C\u4E00\u4E2A\u5B57\u7B26\uFF0C\u5E76\u4E14\u901A\u8FC7DFS\u67E5\u627E\u5230\u6574\u4E2A\u5355\u8BCD
                if (board[i][j] == word.charAt(0) && dfs(board, word, 0, i, j, new boolean[n][m])) {
                    // \u8FD4\u56DE\u8D77\u59CB\u4F4D\u7F6E
                    return new int[]{i, j};
                }
            }
        }
        
        // \u5982\u679C\u6CA1\u6709\u627E\u5230\u76EE\u6807\u5355\u8BCD\uFF0C\u8FD4\u56DE -1, -1
        return new int[]{-1, -1};
    }

    // \u6DF1\u5EA6\u4F18\u5148\u641C\u7D22\u65B9\u6CD5\uFF0C\u7528\u4E8E\u67E5\u627E\u5355\u8BCD
    private static boolean dfs(char[][] board, String word, int index, int row, int col, boolean[][] visited) {
        // \u5982\u679C\u5DF2\u7ECF\u627E\u5230\u6574\u4E2A\u5355\u8BCD\uFF0C\u8FD4\u56DE true
        if (index == word.length()) {
            return true;
        }
        
        // \u5982\u679C\u5F53\u524D\u5750\u6807\u8D8A\u754C\uFF0C\u5B57\u7B26\u4E0D\u5339\u914D\uFF0C\u6216\u8005\u5DF2\u7ECF\u8BBF\u95EE\u8FC7\uFF0C\u8FD4\u56DE false
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] != word.charAt(index) || visited[row][col]) {
            return false;
        }
        
        // \u6807\u8BB0\u5F53\u524D\u5750\u6807\u4E3A\u5DF2\u8BBF\u95EE
        visited[row][col] = true;
        // \u904D\u5386\u56DB\u4E2A\u65B9\u5411
        for (int d = 0; d < 4; d++) {
            int newRow = row + rowDirection[d];
            int newCol = col + colDirection[d];
            // \u9012\u5F52\u67E5\u627E\u4E0B\u4E00\u4E2A\u5B57\u7B26
            if (dfs(board, word, index + 1, newRow, newCol, visited)) {
                return true;
            }
        }
        // \u56DE\u6EAF\uFF0C\u64A4\u9500\u6807\u8BB0
        visited[row][col] = false;
        return false;
    }
}

`,paraId:113,tocIndex:17},{value:"\u5C0F\u806A\u5165\u804C\u65B0\u516C\u53F8\uFF0C\u53C2\u52A0\u7EBF\u4E0A\u7684\u65B0\u5458\u5DE5\u5FC5\u8003\u8BD5\u5171 25 \u9898\uFF0C\u4F9D\u6B21\u662F 10 \u4E2A\u5224\u65AD\u9898 (\u6BCF\u9898 2 \u5206\uFF09\u300110 \u4E2A\u5355\u9009\u9898 (\u6BCF\u9898 4 \u5206) \u548C 5 \u4E2A\u591A\u9009\u9898 (\u6BCF\u9898 8 \u5206), \u603B\u5206 100 \u5206\u3002",paraId:114,tocIndex:18},{value:"\u8003\u9898\u53EA\u80FD\u987A\u5E8F\u4F5C\u7B54\uFF0C\u7B54\u5BF9\u9898\u76EE\u83B7\u5F97\u76F8\u5E94\u7684\u5206\u6570\uFF0C\u7B54\u9519\u9898\u76EE\u83B7\u5F97 0 \u5206\uFF0C\u8003\u8BD5\u7CFB\u7EDF\u4E0D\u63D0\u793A\u4F5C\u7B54\u662F\u5426\u6B63\u786E\uFF0C\u7B54\u9898\u8FC7\u7A0B\u4E2D\u5982\u679C\u7D2F\u79EF\u6709 3 \u9898\u7B54\u9519\uFF0C\u76F4\u63A5\u4E2D\u8003\u8BD5\u5E76\u8BA1\u7B97\u8003\u8BD5\u5206\u6570\u3002",paraId:115,tocIndex:18},{value:"\u5C0F\u806A\u8003\u8BD5\u7ED3\u679C\u662F N \u5206\uFF080<=N<=100)\uFF0C\u8BF7\u6839\u636E\u5C0F\u806A\u7684\u5206\u6570\uFF0C\u7B97\u51FA\u6240\u6709\u53EF\u80FD\u7684\u7B54\u9898\u60C5\u51B5\u7684\u4E2A\u6570\u3002",paraId:116,tocIndex:18},{value:`    public static int judgeNum = 10;  // \u5224\u65AD\u9898\u603B\u6570
    public static int chooseNum = 10; // \u5355\u9009\u9898\u603B\u6570
    public static int chooseMore = 5; // \u591A\u9009\u9898\u603B\u6570
    public static int sum = 25;       // \u603B\u9898\u6570

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // \u8BFB\u53D6\u76EE\u6807\u5206\u6570
        int target = sc.nextInt();
        List<Grade> result = new ArrayList<>();
        int[] arr = new int[]{0, 0, 0}; // \u7528\u6765\u8BB0\u5F55\u7B54\u5BF9\u7684\u9898\u76EE\u6570\u91CF\uFF0C\u4F9D\u6B21\u662F\u5224\u65AD\u9898\u3001\u5355\u9009\u9898\u548C\u591A\u9009\u9898
        dfs(result, 0, target, arr, 0, 0);
        System.out.println(result.size());
    }

    /**
     * \u6DF1\u5EA6\u4F18\u5148\u641C\u7D22\uFF0C\u7528\u6765\u8BA1\u7B97\u6240\u6709\u53EF\u80FD\u7684\u7B54\u9898\u60C5\u51B5\u7684\u4E2A\u6570
     *
     * @param gradeList \u5B58\u50A8\u6240\u6709\u53EF\u80FD\u7684\u7B54\u9898\u60C5\u51B5
     * @param begin \u5F53\u524D\u9898\u76EE\u7D22\u5F15
     * @param target \u76EE\u6807\u5206\u6570
     * @param arr \u8BB0\u5F55\u5F53\u524D\u7B54\u5BF9\u7684\u9898\u76EE\u6570\u91CF
     * @param correct \u5F53\u524D\u7B54\u5BF9\u7684\u9898\u76EE\u6570\u91CF
     * @param wrong \u5F53\u524D\u7B54\u9519\u7684\u9898\u76EE\u6570\u91CF
     */
    public static void dfs(List<Grade> gradeList, int begin, int target, int[] arr, int correct, int wrong) {
        // \u8BA1\u7B97\u5F53\u524D\u603B\u5206\u6570
        int currentScore = 2 * arr[0] + 4 * arr[1] + 8 * arr[2];

        // \u5982\u679C\u603B\u5206\u6570\u8FBE\u5230\u76EE\u6807\u5206\u6570\uFF0C\u4E14\u9519\u8BEF\u6570\u4E0D\u8D85\u8FC72\uFF0C\u5219\u8BB0\u5F55\u4E00\u79CD\u53EF\u80FD\u60C5\u51B5
        if (currentScore == target && wrong <= 2) {
            gradeList.add(new Grade(arr[0], arr[1], arr[2]));
            return;
        }

        // \u5982\u679C\u9519\u8BEF\u6570\u8FBE\u52303\uFF0C\u6216\u8005\u603B\u5206\u8D85\u8FC7\u76EE\u6807\u5206\u6570\uFF0C\u6216\u8005\u6240\u6709\u9898\u76EE\u90FD\u5DF2\u4F5C\u7B54\uFF0C\u5219\u8FD4\u56DE
        if (wrong >= 3 || currentScore > target || begin >= sum) {
            return;
        }

        // \u5904\u7406\u5F53\u524D\u9898\u76EE
        if (begin < judgeNum) {
            // \u5F53\u524D\u662F\u5224\u65AD\u9898
            arr[0]++;
            dfs(gradeList, begin + 1, target, arr, correct + 1, wrong);
            arr[0]--;
            dfs(gradeList, begin + 1, target, arr, correct, wrong + 1);
        } else if (begin < judgeNum + chooseNum) {
            // \u5F53\u524D\u662F\u5355\u9009\u9898
            arr[1]++;
            dfs(gradeList, begin + 1, target, arr, correct + 1, wrong);
            arr[1]--;
            dfs(gradeList, begin + 1, target, arr, correct, wrong + 1);
        } else {
            // \u5F53\u524D\u662F\u591A\u9009\u9898
            arr[2]++;
            dfs(gradeList, begin + 1, target, arr, correct + 1, wrong);
            arr[2]--;
            dfs(gradeList, begin + 1, target, arr, correct, wrong + 1);
        }
    }
}

// \u7528\u4E8E\u8BB0\u5F55\u7B54\u5BF9\u7684\u9898\u76EE\u6570\u91CF
class Grade {
    int judgeCorrect;  // \u7B54\u5BF9\u7684\u5224\u65AD\u9898\u6570\u91CF
    int chooseCorrect; // \u7B54\u5BF9\u7684\u5355\u9009\u9898\u6570\u91CF
    int chooseMoreCorrect; // \u7B54\u5BF9\u7684\u591A\u9009\u9898\u6570\u91CF

    public Grade(int judgeCorrect, int chooseCorrect, int chooseMoreCorrect) {
        this.judgeCorrect = judgeCorrect;
        this.chooseCorrect = chooseCorrect;
        this.chooseMoreCorrect = chooseMoreCorrect;
    }
}
`,paraId:117,tocIndex:18},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:118,tocIndex:19},{value:"\u8003\u53E4\u95EE\u9898\uFF0C\u5047\u8BBE\u4EE5\u524D\u7684\u77F3\u7891\u88AB\u6253\u788E\u6210\u4E86\u5F88\u591A\u5757\uFF0C\u6BCF\u5757\u4E0A\u9762\u90FD\u6709\u4E00\u4E2A\u6216\u82E5\u5E72\u4E2A\u5B57\u7B26\uFF0C\u8BF7\u4F60\u5199\u4E2A\u7A0B\u5E8F\u6765\u628A\u4E4B\u524D\u77F3\u7891\u4E0A\u6587\u5B57\u53EF\u80FD\u7684\u7EC4\u5408\u5168\u90E8\u5199\u51FA\u6765\uFF0C\u6309\u5347\u5E8F\u8FDB\u884C\u6392\u5217\u3002",paraId:119,tocIndex:19},{value:"\u4E8C\u3001\u8F93\u5165\u63CF\u8FF0",paraId:120,tocIndex:19},{value:"\u82E5\u5E72\u4E2A\u5B57\u7B26\u3002",paraId:121,tocIndex:19},{value:"\u4E09\u3001\u8F93\u51FA\u63CF\u8FF0",paraId:122,tocIndex:19},{value:"\u628A\u4E4B\u524D\u77F3\u7891\u4E0A\u6587\u5B57\u53EF\u80FD\u7684\u7EC4\u5408\u5168\u90E8\u5199\u51FA\u6765\uFF0C\u6309\u5347\u5E8F\u8FDB\u884C\u6392\u5217\u3002",paraId:123,tocIndex:19},{value:"1\u3001\u8F93\u5165",paraId:124,tocIndex:19},{value:"3",paraId:125,tocIndex:19},{value:`
a b c`,paraId:125,tocIndex:19},{value:"2\u3001\u8F93\u51FA",paraId:126,tocIndex:19},{value:"ab",paraId:127,tocIndex:19},{value:`public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // \u8BFB\u53D6\u8F93\u5165
    int n = scanner.nextInt();
    String[] chars = new String[n];

    for (int i = 0; i < n; i++) {
        chars[i] = scanner.next();
    }
    //\u5B58\u50A8\u6392\u5217\u7684set
    Set<String> path = new TreeSet<>();
    StringBuilder builder = new StringBuilder();
    boolean[] used = new boolean[n]; // \u7528\u4E8E\u6807\u8BB0\u6BCF\u4E2A\u5B57\u7B26\u662F\u5426\u88AB\u4F7F\u7528\u8FC7
    dfs(path, chars, builder, n, used);
    path.forEach(System.out::println);
}


public static void dfs(Set<String> path, String[] arr, StringBuilder builder, int length, boolean[] used){
    if (builder.toString().length() == length) {
        path.add(builder.toString());
        return;
    }
    for (int i = 0; i < length; i++) {
        if(used[i]){
            continue;
        }
        used[i]=true;
        builder.append(arr[i]);
        dfs(path, arr, builder, length, used);
        builder.deleteCharAt(builder.length() - 1);
        used[i] = false;
    }
}
`,paraId:128,tocIndex:19},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:129,tocIndex:20},{value:"\u7ED9\u5B9A M \u4E2A\u5B57\u7B26 (a-z) \uFF0C\u4ECE\u4E2D\u53D6\u51FA\u4EFB\u610F\u5B57\u7B26 (\u6BCF\u4E2A\u5B57\u7B26\u53EA\u80FD\u7528\u4E00\u6B21) \u62FC\u63A5\u6210\u957F\u5EA6\u4E3A N \u7684\u5B57\u7B26\u4E32\uFF0C\u8981\u6C42\u76F8\u540C\u7684\u5B57\u7B26\u4E0D\u80FD\u76F8\u90BB\u3002",paraId:130,tocIndex:20},{value:"\u8BA1\u7B97\u51FA\u7ED9\u5B9A\u7684\u5B57\u7B26\u5217\u8868\u80FD\u62FC\u63A5\u51FA\u591A\u5C11\u79CD\u6EE1\u8DB3\u6761\u4EF6\u7684\u5B57\u7B26\u4E32\uFF0C\u8F93\u5165\u975E\u6CD5\u6216\u8005\u65E0\u6CD5\u62FC\u63A5\u51FA\u6EE1\u8DB3\u6761\u4EF6\u7684\u5B57\u7B26\u4E32\u5219\u8FD4\u56DE 0 \u3002",paraId:131,tocIndex:20},{value:`public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // \u8BFB\u53D6\u8F93\u5165
    int m = scanner.nextInt();
    int n = scanner.nextInt();
    String[] chars = new String[m];
    for (int i = 0; i < chars.length; i++) {
        chars[i] = scanner.next();
    }
    //\u5B58\u50A8\u6392\u5217\u7684set
    Set<String> path = new HashSet<>();
    StringBuilder builder = new StringBuilder();
    boolean[] used = new boolean[m]; // \u7528\u4E8E\u6807\u8BB0\u6BCF\u4E2A\u5B57\u7B26\u662F\u5426\u88AB\u4F7F\u7528\u8FC7
    dfs(path, chars, builder, n, used);
    path.forEach(System.out::println);
}


public static void dfs(Set<String> path, String[] chars, StringBuilder builder, int n, boolean[] used) {
    if (builder.toString().length() == n) {
        path.add(builder.toString());
        return;
    }
    for (int i = 0; i < n; i++) {
        if (used[i]) {
            continue;
        }
        if (builder.length()!=0&&builder.substring(builder.length()-1).equals(chars[i])) {
            continue;
        }
        used[i]=true;
        builder.append(chars[i]);
        dfs(path, chars, builder, n, used);
        builder.deleteCharAt(builder.length() - 1);
        used[i] = false;
    }
}
`,paraId:132,tocIndex:20},{value:"\u9898\u76EE\u63CF\u8FF0\uFF1A",paraId:133,tocIndex:22},{value:"\u8F93\u5165\u6B63\u6574\u6570 topN \u548C\u6587\u7AE0\u6570 M\uFF0C\u6B63\u6574\u6570 topN \u8868\u793A\u8981\u627E\u51FA\u6765\u7684\u51FA\u73B0\u9891\u7387\u6700\u9AD8\u7684 topN \u4E2A\u5B57\u7B26\u4E32\uFF0CM \u7BC7\u6587\u7AE0\u4E2D\u6BCF\u7BC7\u6587\u7AE0\u4F1A\u6709\u4E24\u4E2A\u5B57\u7B26\u4E32\uFF0C\u4E00\u4E2A\u662F\u6807\u9898\u5B57\u7B26\u4E32\uFF0C\u4E00\u4E2A\u662F\u6B63\u6587\u5B57\u7B26\u4E32\uFF0C\u5B57\u7B26\u4E32\u95F4\u6709\u7A7A\u683C\uFF0C\u6BCF\u4E2A\u5355\u8BCD\u88AB\u7A7A\u683C\u9694\u5F00\u3002",paraId:134,tocIndex:22},{value:"\u6211\u4EEC\u7684\u76EE\u7684\u5C31\u662F\u628A\u8FD9 M \u7BC7\u6587\u7AE0\u8FDE\u6807\u9898\u5E26\u6B63\u6587\u62C6\u6210\u4E00\u4E2A\u4E2A\u5355\u8BCD\uFF0C\u7136\u540E\u7EDF\u8BA1\u8FD9\u4E00\u5806\u5355\u8BCD\u51FA\u73B0\u9891\u7387\u6700\u9AD8\u7684 topN \u4E2A\u3002",paraId:135,tocIndex:22},{value:"\u7EDF\u8BA1\u89C4\u5219\uFF1A",paraId:136,tocIndex:22},{value:`
\u6807\u9898\u4E2D\u51FA\u73B0\u7684\u8BCD\u8BED\u9891\u7387\u7CFB\u6570\u4E3A 3\uFF0C\u6B63\u6587\u4E2D\u51FA\u73B0\u7684\u8BCD\u8BED\u9891\u7387\u7CFB\u6570\u4E3A 1\uFF0C\u8FD4\u56DE\u7684\u7B54\u6848\u5E94\u8BE5\u6309\u7167\u8BCD\u8BED\u51FA\u73B0\u4ECE\u9AD8\u5230\u4F4E\u6392\u5E8F\uFF0C\u5F53\u8BCD\u8BED\u51FA\u73B0\u6B21\u6570\u9891\u7387\u76F8\u540C\u65F6\uFF0C\u5728\u6807\u9898\u4E2D\u51FA\u73B0\u9891\u7387\u6B21\u6570\u9AD8\u7684\u6392\u5728\u524D\u9762\uFF0C\u5982\u679C\u4ECD\u7136\u76F8\u540C\uFF0C\u5219\u6309\u7167\u8BCD\u8BED\u5728\u6807\u9898\u4E2D\u51FA\u73B0\u7684\u5148\u540E\u987A\u5E8F\u8FDB\u884C\u6392\u5E8F\uFF0C\u5982\u679C\u4ECD\u76F8\u540C\uFF0C\u5219\u6309\u7167\u8BCD\u8BED\u5728\u6B63\u6587\u4E2D\u51FA\u73B0\u7684\u5148\u540E\u987A\u5E8F\u8FDB\u884C\u6392\u5E8F\uFF0C\u5148\u51FA\u73B0\u7684\u6392\u5728\u524D\u9762\u3002`,paraId:136,tocIndex:22},{value:"\u8F93\u5165",paraId:137,tocIndex:22},{value:"\u8F93\u5165\uFF1A\u7B2C\u4E00\u884C\u8F93\u5165\u4E3A\u6B63\u6574\u6570 topN \u548C\u6587\u7AE0\u6570 M\u3002\u7136\u540E\u7531\u4E8E\u6BCF\u7BC7\u6587\u7AE0\u6709\u6807\u9898\u548C\u6B63\u6587\u4E24\u884C\uFF0C\u56E0\u6B64\u540E\u9762\u6709 2*M \u884C\u6570\u636E\u3002\u4ECE\u7B2C\u4E8C\u884C\u8D77\uFF0C\u6309\u987A\u5E8F\u5904\u7406\u6BCF\u7BC7\u6587\u7AE0\u7684\u6807\u9898\u4E32\u548C\u6B63\u6587\u4E32\u3002",paraId:138,tocIndex:22},{value:"\u8F93\u51FA",paraId:139,tocIndex:22},{value:"\u51FA\u73B0\u9891\u7387 topN \u9AD8\u7684\u5355\u8BCD\uFF0C\u6BCF\u4E2A\u5355\u8BCD\u7528 ",paraId:140,tocIndex:22},{value:"\u2018 \u2019",paraId:140,tocIndex:22},{value:" \u9694\u5F00\u3002",paraId:140,tocIndex:22},{value:`import java.util.*;

public class TopNWords {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // \u8BFB\u53D6\u8F93\u5165\u7684topN\u548C\u6587\u7AE0\u6570M
        int topN = scanner.nextInt();
        int M = scanner.nextInt();
        scanner.nextLine();  // consume the remaining newline

        // \u7528\u4E8E\u5B58\u50A8\u5355\u8BCD\u53CA\u5176\u76F8\u5173\u7EDF\u8BA1\u6570\u636E\u7684Map
        Map<String, WordData> wordMap = new HashMap<>();
        
        // \u5904\u7406\u6BCF\u7BC7\u6587\u7AE0
        for (int i = 0; i < M; i++) {
            String title = scanner.nextLine(); // \u8BFB\u53D6\u6807\u9898
            String body = scanner.nextLine();  // \u8BFB\u53D6\u6B63\u6587

            // \u5904\u7406\u6807\u9898\u5B57\u7B26\u4E32
            processString(title, wordMap, true);
            // \u5904\u7406\u6B63\u6587\u5B57\u7B26\u4E32
            processString(body, wordMap, false);
        }

        // \u5C06Map\u4E2D\u7684\u6570\u636E\u8F6C\u4E3AList\u4EE5\u4FBF\u6392\u5E8F
        List<WordData> wordList = new ArrayList<>(wordMap.values());
        
        // \u6309\u7167\u6307\u5B9A\u89C4\u5219\u6392\u5E8F
        wordList.sort((a, b) -> {
            if (b.totalFrequency != a.totalFrequency) {
                return b.totalFrequency - a.totalFrequency; // \u6309\u603B\u9891\u7387\u964D\u5E8F
            } else if (b.titleFrequency != a.titleFrequency) {
                return b.titleFrequency - a.titleFrequency; // \u6309\u6807\u9898\u9891\u7387\u964D\u5E8F
            } else if (a.firstTitleIndex != b.firstTitleIndex) {
                return a.firstTitleIndex - b.firstTitleIndex; // \u6309\u6807\u9898\u4E2D\u9996\u6B21\u51FA\u73B0\u4F4D\u7F6E\u5347\u5E8F
            } else {
                return a.firstBodyIndex - b.firstBodyIndex; // \u6309\u6B63\u6587\u4E2D\u9996\u6B21\u51FA\u73B0\u4F4D\u7F6E\u5347\u5E8F
            }
        });

        // \u8F93\u51FA\u524DtopN\u4E2A\u5355\u8BCD
        for (int i = 0; i < Math.min(topN, wordList.size()); i++) {
            if (i > 0) {
                System.out.print(" ");
            }
            System.out.print(wordList.get(i).word);
        }
    }

    // \u5904\u7406\u5B57\u7B26\u4E32\u5E76\u66F4\u65B0wordMap\u4E2D\u7684\u6570\u636E
    private static void processString(String text, Map<String, WordData> wordMap, boolean isTitle) {
        String[] words = text.split("\\\\s+"); // \u5C06\u5B57\u7B26\u4E32\u6309\u7A7A\u683C\u62C6\u5206\u6210\u5355\u8BCD\u6570\u7EC4
        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            // \u83B7\u53D6\u6216\u521B\u5EFAWordData\u5BF9\u8C61
            WordData wordData = wordMap.getOrDefault(word, new WordData(word));
            
            if (isTitle) {
                wordData.titleFrequency++; // \u66F4\u65B0\u6807\u9898\u4E2D\u7684\u9891\u7387
                wordData.totalFrequency += 3; // \u6807\u9898\u4E2D\u7684\u8BCD\u9891\u6743\u91CD\u4E3A3
                if (wordData.firstTitleIndex == -1) {
                    wordData.firstTitleIndex = i; // \u8BB0\u5F55\u9996\u6B21\u5728\u6807\u9898\u4E2D\u51FA\u73B0\u7684\u4F4D\u7F6E
                }
            } else {
                wordData.bodyFrequency++; // \u66F4\u65B0\u6B63\u6587\u4E2D\u7684\u9891\u7387
                wordData.totalFrequency++; // \u6B63\u6587\u4E2D\u7684\u8BCD\u9891\u6743\u91CD\u4E3A1
                if (wordData.firstBodyIndex == -1) {
                    wordData.firstBodyIndex = i; // \u8BB0\u5F55\u9996\u6B21\u5728\u6B63\u6587\u4E2D\u51FA\u73B0\u7684\u4F4D\u7F6E
                }
            }
            // \u5C06\u66F4\u65B0\u540E\u7684WordData\u5BF9\u8C61\u653E\u5165Map\u4E2D
            wordMap.put(word, wordData);
        }
    }

    // \u7528\u4E8E\u5B58\u50A8\u6BCF\u4E2A\u5355\u8BCD\u76F8\u5173\u7EDF\u8BA1\u6570\u636E\u7684\u7C7B
    static class WordData {
        String word; // \u5355\u8BCD\u672C\u8EAB
        int totalFrequency; // \u603B\u9891\u7387
        int titleFrequency; // \u5728\u6807\u9898\u4E2D\u7684\u9891\u7387
        int bodyFrequency; // \u5728\u6B63\u6587\u4E2D\u7684\u9891\u7387
        int firstTitleIndex; // \u5728\u6807\u9898\u4E2D\u9996\u6B21\u51FA\u73B0\u7684\u4F4D\u7F6E
        int firstBodyIndex; // \u5728\u6B63\u6587\u4E2D\u9996\u6B21\u51FA\u73B0\u7684\u4F4D\u7F6E

        WordData(String word) {
            this.word = word;
            this.totalFrequency = 0;
            this.titleFrequency = 0;
            this.bodyFrequency = 0;
            this.firstTitleIndex = -1;
            this.firstBodyIndex = -1;
        }
    }
}
`,paraId:141,tocIndex:22},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:142,tocIndex:23},{value:"\u7ED9\u5B9A\u4E24\u4E2A\u5B57\u7B26\u96C6\u5408\uFF0C\u4E00\u4E2A\u662F\u5168\u91CF\u5B57\u7B26\u96C6\uFF0C\u4E00\u4E2A\u662F\u5DF2\u5360\u7528\u5B57\u7B26\u96C6\uFF0C\u5DF2\u5360\u7528\u5B57\u7B26\u96C6\u4E2D\u7684\u5B57\u7B26\u4E0D\u80FD\u518D\u4F7F\u7528\uFF0C\u8981\u6C42\u8F93\u51FA\u5269\u4F59\u53EF\u7528\u5B57\u7B26\u96C6\u3002",paraId:143,tocIndex:23},{value:"\u4E8C\u3001",paraId:144,tocIndex:23},{value:"\u8F93\u5165\u63CF\u8FF0 \u8F93\u5165\u4E00\u4E2A\u5B57\u7B26\u4E32 \u4E00\u5B9A\u5305\u542B @\uFF0C@\u524D\u4E3A\u5168\u91CF\u5B57\u7B26\u96C6 @\u540E\u7684\u4E3A\u5DF2\u5360\u7528\u5B57\u7B26\u96C6\u3002 \u5DF2\u5360\u7528\u5B57\u7B26\u96C6\u4E2D\u7684\u5B57\u7B26\uFF0C\u4E00\u5B9A\u662F\u5168\u91CF\u5B57\u7B26\u96C6\u4E2D\u7684\u5B57\u7B26\uFF0C\u5B57\u7B26\u96C6\u4E2D\u7684\u5B57\u7B26\u8DDF\u5B57\u7B26\u4E4B\u95F4\u4F7F\u7528\u82F1\u6587\u9017\u53F7\u9694\u5F00\u3002 \u6BCF\u4E2A\u5B57\u7B26\u90FD\u8868\u793A\u4E3A\u5B57\u7B26\u52A0\u6570\u5B57\u7684\u5F62\u5F0F\uFF0C\u7528\u82F1\u6587\u5192\u53F7\u5206\u9694",paraId:145,tocIndex:23},{value:`import java.util.*;

public class AvailableCharacters {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();

        // \u89E3\u6790\u8F93\u5165\uFF0C\u5206\u5272\u5168\u91CF\u5B57\u7B26\u96C6\u548C\u5DF2\u5360\u7528\u5B57\u7B26\u96C6
        String[] parts = input.split("@");
        String fullSetString = parts[0];
        String occupiedSetString = parts[1];

        // \u5C06\u5168\u91CF\u5B57\u7B26\u96C6\u89E3\u6790\u6210\u96C6\u5408
        Set<String> fullSet = new HashSet<>(Arrays.asList(fullSetString.split(",")));
        
        // \u5C06\u5DF2\u5360\u7528\u5B57\u7B26\u96C6\u89E3\u6790\u6210\u96C6\u5408
        Set<String> occupiedSet = new HashSet<>(Arrays.asList(occupiedSetString.split(",")));

        // \u4ECE\u5168\u91CF\u5B57\u7B26\u96C6\u4E2D\u79FB\u9664\u5DF2\u5360\u7528\u7684\u5B57\u7B26
        fullSet.removeAll(occupiedSet);

        // \u5C06\u5269\u4F59\u7684\u53EF\u7528\u5B57\u7B26\u96C6\u6309\u9017\u53F7\u5206\u9694\u7684\u5F62\u5F0F\u8F93\u51FA
        List<String> availableList = new ArrayList<>(fullSet);
        Collections.sort(availableList); // \u8FD9\u91CC\u6211\u4EEC\u9009\u62E9\u6392\u5E8F\u4EE5\u4FDD\u8BC1\u8F93\u51FA\u7684\u987A\u5E8F
        System.out.println(String.join(",", availableList));
    }
}
`,paraId:146,tocIndex:23},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:147,tocIndex:25},{value:"\u7ED9\u5B9A\u4E00\u4E2A\u957F\u5EA6\u4E3A n \u7684\u6574\u578B\u6570\u7EC4\uFF0C\u8868\u793A\u4E00\u4E2A\u9009\u624B\u5728 n \u8F6E\u5185\u53EF\u9009\u62E9\u7684\u724C\u9762\u5206\u6570\u3002\u9009\u624B\u57FA\u4E8E\u89C4\u5219\u9009\u724C\uFF0C",paraId:148,tocIndex:25},{value:"\u8BF7\u8BA1\u7B97\u6240\u6709\u8F6E\u7ED3\u675F\u540E\u5176\u53EF\u4EE5\u83B7\u5F97\u7684\u6700\u9AD8\u603B\u5206\u6570\u3002",paraId:149,tocIndex:25},{value:"\u9009\u62E9\u89C4\u5219\u5982\u4E0B\uFF1A",paraId:150,tocIndex:25},{value:"\u5728\u6BCF\u8F6E\u91CC\u9009\u624B\u53EF\u4EE5\u9009\u62E9\u83B7\u53D6\u8BE5\u8F6E\u724C\u9762\uFF0C\u5219\u5176\u603B\u5206\u6570\u52A0\u4E0A\u8BE5\u8F6E\u724C\u9762\u5206\u6570\uFF0C\u4E3A\u5176\u65B0\u7684\u603B\u5206\u6570\uFF1B",paraId:151,tocIndex:25},{value:"\u9009\u624B\u4E5F\u53EF\u4E0D\u9009\u62E9\u672C\u8F6E\u724C\u9762\u76F4\u63A5\u8DF3\u5230\u4E0B\u4E00\u8F6E\uFF0C\u6B64\u65F6\u5C06\u5F53\u524D\u603B\u5206\u6570\u8FD8\u539F\u4E3A 3 \u8F6E\u524D\u7684\u603B\u5206\u6570\uFF0C\u82E5\u5F53\u524D\u8F6E\u6B21\u5C0F\u4E8E\u7B49\u4E8E 3\uFF08\u5373\u5728\u7B2C 1\u30012\u30013 \u8F6E\u9009\u62E9\u8DF3\u8FC7\u8F6E\u6B21\uFF09\uFF0C\u5219\u603B\u5206\u6570\u7F6E\u4E3A 0\uFF1B",paraId:151,tocIndex:25},{value:"\u9009\u624B\u7684\u521D\u59CB\u603B\u5206\u6570\u4E3A 0\uFF0C\u4E14\u5FC5\u987B\u4F9D\u6B21\u53C2\u52A0\u6BCF\u4E00\u8F6E\u3002",paraId:151,tocIndex:25},{value:"\u4E8C\u3001\u8F93\u5165\u63CF\u8FF0",paraId:152,tocIndex:25},{value:"\u7B2C\u4E00\u884C\u4E3A\u4E00\u4E2A\u5C0F\u5199\u9017\u53F7\u5206\u5272\u7684",paraId:153,tocIndex:25},{value:"\u5B57\u7B26\u4E32",paraId:153,tocIndex:25},{value:"\uFF0C\u8868\u793A n \u8F6E\u7684\u724C\u9762\u5206\u6570\uFF0C1<= n <=20\u3002",paraId:153,tocIndex:25},{value:"\u5206\u6570\u503C\u4E3A\u6574\u6570\uFF0C-100 <= \u5206\u6570\u503C <= 100\u3002",paraId:154,tocIndex:25},{value:"\u4E0D\u8003\u8651\u683C\u5F0F\u95EE\u9898\u3002",paraId:155,tocIndex:25},{value:"\u4E09\u3001\u8F93\u51FA\u63CF\u8FF0",paraId:156,tocIndex:25},{value:"\u6240\u6709\u8F6E\u7ED3\u675F\u540E\u9009\u624B\u83B7\u5F97\u7684\u6700\u9AD8\u603B\u5206\u6570\u3002",paraId:157,tocIndex:25},{value:`public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    // \u8BFB\u53D6\u8F93\u5165
    int n = scanner.nextInt();
    int[] arr = new int[n];
    for (int i = 0; i < arr.length; i++) {
        arr[i] = scanner.nextInt();
    }
    int[] grade = new int[n];
    grade[0] = Math.max(arr[0], 0);
    for (int i = 1; i < n; i++) {
        //\u5982\u679C\u662F\u524D\u4E09\u8F6E
        if (i < 3) {
            grade[i] = Math.max(grade[i-1] + arr[i], 0);
        } else {
            grade[i] = Math.max(grade[i-1] + arr[i], grade[i - 3]);
        }
    }
    System.out.println(grade[grade.length - 1]);
}
`,paraId:158,tocIndex:25},{value:"\u4E00\u3001\u9898\u76EE\u63CF\u8FF0",paraId:159,tocIndex:26},{value:"\u6709\u4E00\u4E2A\u6570\u5217 a [N] (N=60)\uFF0C\u4ECE a [0] \u5F00\u59CB\uFF0C\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u6570\u5B57\u3002\u6570\u5217\u4E2D a [n+1] \u90FD\u662F a [n] \u7684\u63CF\u8FF0\u3002\u5176\u4E2D a [0]=1",paraId:160,tocIndex:26},{value:"\u89C4\u5219\u5982\u4E0B\uFF1A",paraId:161,tocIndex:26},{value:"a[0]:1",paraId:162,tocIndex:26},{value:"a [1]:11 (\u542B\u4E49\uFF1A\u5176\u524D\u4E00\u9879 a [0]=1 \u662F 1 \u4E2A 1\uFF0C\u5373 \u201C11\u201D\u3002\u8868\u793A a [0] \u4ECE\u5DE6\u5230\u53F3\uFF0C\u8FDE\u7EED\u51FA\u73B0\u4E86 1 \u6B21 \u201C1\u201D\uFF09",paraId:163,tocIndex:26},{value:"a [2]:21 (\u542B\u4E49\uFF1A\u5176\u524D\u4E00\u9879 a [1]=11\uFF0C\u4ECE\u5DE6\u5230\u53F3\uFF1A\u662F\u7531\u4E24\u4E2A 1 \u7EC4\u6210\uFF0C\u5373 \u201C21\u201D\u3002\u8868\u793A a [1] \u4ECE\u5DE6\u5230\u53F3\uFF0C\u8FDE\u7EED\u51FA\u73B0\u4E86\u4E24\u6B21 \u201C1\u201D)",paraId:164,tocIndex:26},{value:"a [3]:1211 (\u542B\u4E49\uFF1A\u5176\u524D\u4E00\u9879 a [2]=21\uFF0C\u4ECE\u5DE6\u5230\u53F3\uFF1A\u662F\u7531\u4E00\u4E2A 2 \u548C\u4E00\u4E2A 1 \u7EC4\u6210\uFF0C\u5373 \u201C1211\u201D\u3002\u8868\u793A a [2] \u4ECE\u5DE6\u5230\u53F3\uFF0C\u8FDE\u7EED\u51FA\u73B0\u4E86 1 \u6B21 \u201C2\u201D\uFF0C\u7136\u540E\u53C8\u8FDE\u7EED\u51FA\u73B0\u4E86 1 \u6B21 \u201C1\u201D)",paraId:165,tocIndex:26},{value:"a [4]:111221 (\u542B\u4E49\uFF1A\u5176\u524D\u4E00\u9879 a [3]=1211\uFF0C\u4ECE\u5DE6\u5230\u53F3\uFF1A\u662F\u7531\u4E00\u4E2A 1\u3001\u4E00\u4E2A 2\u3001\u4E24\u4E2A 1 \u7EC4\u6210\uFF0C\u5373 \u201C111221\u201D\u3002\u8868\u793A a [3] \u4ECE\u5DE6\u5230\u53F3\uFF0C\u8FDE\u7EED\u51FA\u73B0\u4E86 1 \u6B21 \u201C1\u201D\uFF0C\u8FDE\u7EED\u51FA\u73B0\u4E86 1 \u6B21 \u201C2\u201D\uFF0C\u8FDE\u7EED\u51FA\u73B0\u4E86\u4E24\u6B21 \u201C1\u201D)",paraId:166,tocIndex:26},{value:"\u8BF7\u8F93\u51FA\u8FD9\u4E2A\u6570\u5217\u7684\u7B2C n \u9879\u7ED3\u679C\uFF08a [n]\uFF0C0\u2264n\u226459\uFF09\u3002",paraId:167,tocIndex:26},{value:"\u4E8C\u3001\u8F93\u5165\u63CF\u8FF0",paraId:168,tocIndex:26},{value:"\u6570\u5217\u7684\u7B2C n \u9879 (0\u2264n\u226459)",paraId:169,tocIndex:26},{value:"5",paraId:170,tocIndex:26},{value:"\u4E09\u3001\u8F93\u51FA\u63CF\u8FF0",paraId:171,tocIndex:26},{value:"\u6570\u5217\u7684\u5185\u5BB9",paraId:172,tocIndex:26},{value:"312211",paraId:173,tocIndex:26},{value:`public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int n = scanner.nextInt();

    // \u521D\u59CB\u5316\u7B2C0\u9879
    String current = "1";

    // \u751F\u6210\u4ECE\u7B2C1\u9879\u5230\u7B2Cn\u9879
    for (int i = 1; i <= n; i++) {
        current = generateNext(current);
    }

    // \u8F93\u51FA\u7B2Cn\u9879
    System.out.println(current);
}

// \u751F\u6210\u4E0B\u4E00\u9879\u7684\u65B9\u6CD5
private static String generateNext(String s) {
    StringBuilder result = new StringBuilder();
    int count = 1;
    char currentChar = s.charAt(0);

    for (int i = 1; i < s.length(); i++) {
        if (s.charAt(i) == currentChar) {
            count++;
        } else {
            result.append(count).append(currentChar);
            currentChar = s.charAt(i);
            count = 1;
        }
    }

    // \u6DFB\u52A0\u6700\u540E\u4E00\u7EC4
    result.append(count).append(currentChar);

    return result.toString();
}
`,paraId:174,tocIndex:26}]}}]);
