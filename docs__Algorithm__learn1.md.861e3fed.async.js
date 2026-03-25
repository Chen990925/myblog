"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4328],{8158:function(s,e,t){t.r(e);var l=t(72269),d=t(93359),m=t(82478),u=t(61452),_=t(96057),c=t(88550),a=t(18591),r=t(80936),o=t(67294),i=t(49542),n=t(85893);function h(){return(0,n.jsx)(a.dY,{children:(0,n.jsx)(o.Suspense,{fallback:(0,n.jsx)(r.Z,{}),children:(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"markdown",children:[(0,n.jsxs)("h1",{id:"\u5FEB\u901F\u6392\u5E8F\u8BE6\u89E3",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5FEB\u901F\u6392\u5E8F\u8BE6\u89E3",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u5FEB\u901F\u6392\u5E8F\u8BE6\u89E3"]}),(0,n.jsxs)("p",{children:[i.texts[0].value,(0,n.jsx)("a",{href:"https://space.bilibili.com/236935093",children:i.texts[1].value})]}),(0,n.jsxs)("h2",{id:"\u57FA\u672C\u601D\u60F3",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u57FA\u672C\u601D\u60F3",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u57FA\u672C\u601D\u60F3\uFF1A"]}),(0,n.jsx)("img",{alt:"image-20240625232957149",style:{zoom:"50%"},src:t(7829)}),(0,n.jsx)("p",{children:i.texts[2].value}),(0,n.jsxs)("h2",{id:"partition",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#partition",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"partition"]}),(0,n.jsx)("p",{children:i.texts[3].value}),(0,n.jsx)("img",{alt:"image-20240625233440120",style:{zoom:"50%"},src:t(8618)}),(0,n.jsxs)("h2",{id:"\u7B2C\u4E00\u7248\u4EE3\u7801",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u7B2C\u4E00\u7248\u4EE3\u7801",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u7B2C\u4E00\u7248\u4EE3\u7801"]}),(0,n.jsx)(u.Z,{lang:"java",children:i.texts[4].value}),(0,n.jsx)("p",{children:i.texts[5].value}),(0,n.jsx)("p",{children:i.texts[6].value}),(0,n.jsx)("p",{children:i.texts[7].value}),(0,n.jsxs)("h2",{id:"\u7B2C\u4E8C\u7248\u4EE3\u7801",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u7B2C\u4E8C\u7248\u4EE3\u7801",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u7B2C\u4E8C\u7248\u4EE3\u7801"]}),(0,n.jsx)(u.Z,{lang:"java",children:i.texts[8].value}),(0,n.jsx)("p",{children:i.texts[9].value}),(0,n.jsxs)("h2",{id:"\u53CC\u8DEF\u5FEB\u6392",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u53CC\u8DEF\u5FEB\u6392",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u53CC\u8DEF\u5FEB\u6392"]}),(0,n.jsx)(u.Z,{lang:"java",children:i.texts[10].value}),(0,n.jsx)("p",{children:i.texts[11].value}),(0,n.jsxs)("h2",{id:"\u4E09\u8DEF\u5FEB\u6392",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E09\u8DEF\u5FEB\u6392",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u4E09\u8DEF\u5FEB\u6392"]}),(0,n.jsx)("p",{children:i.texts[12].value}),(0,n.jsx)(u.Z,{lang:"java",children:i.texts[13].value})]})})})})}e.default=h},61452:function(s,e,t){var l=t(70122),d=t(93958),m=t(68562),u=t(85893),_=function(a){var r=a.children,o=a.lang,i=(0,m.H)(function(n){return n.siteData.themeConfig.syntaxTheme});return(0,u.jsx)(l.f,{children:(0,u.jsx)(d.oP,{syntaxThemes:i,language:o,children:r})})};e.Z=_},49542:function(s,e,t){t.r(e),t.d(e,{texts:function(){return l}});const l=[{value:"\u6765\u81EAB\u7AD9 ",paraId:0,tocIndex:0},{value:"liweiwei1419",paraId:0,tocIndex:0},{value:"\u5206\u6CBB\u601D\u60F3\uFF1A\u51CF\u800C\u6CBB\u4E4B",paraId:1,tocIndex:1},{value:"\u5212\u5206",paraId:2,tocIndex:2},{value:`class Solution {
    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    public void quickSort(int[] nums, int left, int right) {
        if (left >= right) return;
        int pivotIndex = partition(nums, left, right);
        quickSort(nums, left, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, right);
    }
	
    //\u5F00\u59CB\u4FDD\u8BC1nums[left+1..j)\u548C[j..i]\u4E3A\u7A7A\u96C6
    public int partition(int[] nums, int left, int right) {
        int pivot = nums[left];
        int j = left + 1;
        for (int i = left + 1; i <= right; i++) {
            if (nums[i] < pivot) {
                swap(nums, i, j);
                j++;
            }
        }
        swap(nums, left, j - 1);
        return j-1;
    }

    public void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
`,paraId:3,tocIndex:3},{value:"\u4E3A\u4EC0\u4E48\u8FD9\u4E00\u7248\u6BD4\u8F83\u6162\uFF1F\u56E0\u4E3A\u9009\u62E9\u4E86\u672A\u6392\u5B9A\u533A\u95F4\u7684\u7B2C\u4E00\u4E2A\u5143\u7D20\u4E3A\u7B2C\u4E00\u4E2A\u5143\u7D20\uFF0C\u6700\u5DEE\u60C5\u51B5\u4E3AN\u5E73\u65B9\u65F6\u95F4\u590D\u6742\u5EA6",paraId:4,tocIndex:3},{value:"\u5728\u987A\u5E8F\u6570\u7EC4/\u9006\u5E8F\u6570\u7EC4\u65F6\u6548\u7387\u5F88\u5DEE",paraId:5,tocIndex:3},{value:"\u4F7F\u7528\u968F\u673A\u9009\u62E9\u5143\u7D20\u7684\u65B9\u5F0F\u6253\u4E71\u6570\u7EC4",paraId:6,tocIndex:3},{value:`class Solution {

    public final static Random random = new Random(System.currentTimeMillis());

    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    public void quickSort(int[] nums, int left, int right) {
        if (left >= right) return;
        int pivotIndex = partition(nums, left, right);
        quickSort(nums, left, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, right);
    }

    public int partition(int[] nums, int left, int right) {
        //\u968F\u673A\u9009\u62E9\u8303\u56F4\u4E2D\u7684\u4E00\u4E2A\u4E0B\u6807\uFF0C\u5DE6\u53F3\u90FD\u662F\u95ED\u533A\u95F4
        int randomIndex = left + random.nextInt(right - left + 1);
        swap(nums, randomIndex, left);
        //\u6B64\u65F6pivot\u5C31\u662F\u533A\u95F4\u4E2D\u7684\u4E00\u4E2A\u968F\u673A\u6570
        int pivot = nums[left];
        int j = left + 1;
        for (int i = left + 1; i <= right; i++) {
            if (nums[i] < pivot) {
                swap(nums, i, j);
                j++;
            }
        }
        swap(nums, left, j - 1);
        return j-1;
    }

    public void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
`,paraId:7,tocIndex:4},{value:"\u8FD8\u5B58\u5728\u95EE\u9898\uFF1A\u6709\u5F88\u591A\u76F8\u540C\u503C\u5143\u7D20\u5B58\u5728\u65F6\uFF0C\u968F\u673A\u9009\u62E9pivot\u65E0\u6548",paraId:8,tocIndex:4},{value:`class Solution {

    public final static Random random = new Random(System.currentTimeMillis());

    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    public void quickSort(int[] nums, int left, int right) {
        if (left >= right)
            return;
        int pivotIndex = partition(nums, left, right);
        quickSort(nums, left, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, right);
    }

    public int partition(int[] nums, int left, int right) {
        int randomIndex = left + random.nextInt(right - left + 1);
        swap(nums, randomIndex, left);
        int pivot = nums[left];
        // (left+1..le)<=pivot
        int le = left + 1;
        // (ge..right]>=pivot
        int ge = right;
        while (true) {
            while ( le <= ge && nums[le] < pivot ) {
                le++;
            }
            while ( le <= ge && nums[ge] > pivot ) {
                ge--;
            }
            if (le >= ge) {
                break;
            }
            swap(nums, le, ge);
            le++;
            ge--;
        }
        swap(nums, left, ge);
        //\u4EA4\u6362\u4E00\u6B21\u5B8C\u6210\u540E\uFF0Cj\u524D\u9762\u6240\u6709\u5143\u7D20\u90FD\u5C0F\u4E8E\u7B49\u4E8Epivot,j\u540E\u9762\u5143\u7D20\u90FD\u662F\u5927\u4E8E\u7B49\u4E8Epivot
        return ge;
    }
  

    public void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
`,paraId:9,tocIndex:5},{value:"\u5E73\u5747\u5730\u5C06\u76F8\u7B49\u7684\u5143\u7D20\u5206\u5230\u4E24\u4E2A\u533A\u95F4\u5185\uFF0C\u662F\u4E0D\u7A33\u5B9A\u7684\u6392\u5E8F",paraId:10,tocIndex:5},{value:"\u5C06\u76F8\u540C\u5730\u5143\u7D20\u90FD\u653E\u5728\u540C\u4E00\u4E2A\u533A\u95F4\u5185",paraId:11,tocIndex:6},{value:`import java.util.Random;

class Solution {

    public final static Random random = new Random(System.currentTimeMillis());

    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    public void quickSort(int[] nums, int left, int right) {
        if (left >= right) return;
        int randomIndex = left + random.nextInt(right - left + 1);
        swap(nums, randomIndex, left);
        int pivot = nums[left];

        int lt = left;  // nums[left+1...lt] < pivot
        int gt = right + 1; // nums[gt...right] > pivot
        int i = left + 1; // nums[lt+1...i-1] == pivot
        while (i < gt) {
            if (nums[i] < pivot) {
                lt++;
                swap(nums, i, lt);
                i++;
            } else if (nums[i] == pivot) {
                i++;
            } else {
                gt--;
                swap(nums, i, gt);
            }
        }
        swap(nums, left, lt);

        quickSort(nums, left, lt - 1); // \u5BF9\u5DE6\u534A\u90E8\u5206\u8FDB\u884C\u5FEB\u901F\u6392\u5E8F
        quickSort(nums, gt, right);    // \u5BF9\u53F3\u534A\u90E8\u5206\u8FDB\u884C\u5FEB\u901F\u6392\u5E8F
    }

    public void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
`,paraId:12,tocIndex:6}]},7829:function(s,e,t){s.exports=t.p+"static/image-20240625232957149.84d3965b.png"},8618:function(s,e,t){s.exports=t.p+"static/image-20240625233440120.59025931.png"}}]);
