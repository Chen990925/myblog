"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4983],{74983:function(n,a,e){e.r(a),e.d(a,{texts:function(){return d}});const d=[{value:"\u6A21\u677F\u5185\u7684\u8868\u8FBE\u5F0F\u975E\u5E38\u4FBF\u5229\uFF0C\u4F46\u662F\u8BBE\u8BA1\u5B83\u4EEC\u7684\u521D\u8877\u662F\u7528\u4E8E\u7B80\u5355\u8FD0\u7B97\u7684\u3002\u5728\u6A21\u677F\u4E2D\u653E\u5165\u592A\u591A\u7684\u903B\u8F91\u4F1A\u8BA9\u6A21\u677F\u8FC7\u91CD\u4E14\u96BE\u4EE5\u7EF4\u62A4\u3002\u4F8B\u5982\uFF1A",paraId:0,tocIndex:1},{value:`<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
`,paraId:1,tocIndex:1},{value:"\u5728\u8FD9\u4E2A\u5730\u65B9\uFF0C\u6A21\u677F\u4E0D\u518D\u662F\u7B80\u5355\u7684\u58F0\u660E\u5F0F\u903B\u8F91\u3002",paraId:2,tocIndex:1},{value:"\u5FC5\u987B\u770B\u4E00\u6BB5\u65F6\u95F4\u624D\u80FD\u610F\u8BC6\u5230\uFF0C\u8FD9\u91CC\u662F\u60F3\u8981\u663E\u793A\u53D8\u91CF ",paraId:3,tocIndex:1},{value:"message",paraId:3,tocIndex:1},{value:" \u7684\u7FFB\u8F6C\u5B57\u7B26\u4E32\u3002\u5F53\u60F3\u8981\u5728\u6A21\u677F\u4E2D\u7684\u591A\u5904\u5305\u542B\u6B64\u7FFB\u8F6C\u5B57\u7B26\u4E32\u65F6\uFF0C\u5C31\u4F1A\u66F4\u52A0\u96BE\u4EE5\u5904\u7406\u3002",paraId:3,tocIndex:1},{value:"\u6240\u4EE5\uFF0C",paraId:4,tocIndex:1},{value:"\u5BF9\u4E8E\u4EFB\u4F55\u590D\u6742\u903B\u8F91",paraId:4,tocIndex:1},{value:"\uFF0C\u90FD\u5E94\u5F53\u4F7F\u7528",paraId:4,tocIndex:1},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:4,tocIndex:1},{value:"\u3002",paraId:4,tocIndex:1},{value:`<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
`,paraId:5,tocIndex:2},{value:"js\u5185\u5BB9",paraId:6,tocIndex:2},{value:`var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // \u8BA1\u7B97\u5C5E\u6027\u7684 getter
    // \u9009\u62E9\u7684\u5C5E\u6027reversedMessage\u662F\u901A\u8FC7 \u51FD\u6570\u8FD4\u56DE\u56DE\u6765\u7684
    reversedMessage: function () {
      // \`this\` \u6307\u5411 vm \u5B9E\u4F8B
      return this.message.split('').reverse().join('')
    }
  }
})
`,paraId:7,tocIndex:2},{value:"\u58F0\u660E\u4E86\u4E00\u4E2A",paraId:8,tocIndex:2},{value:"\u8BA1\u7B97\u5C5E\u6027",paraId:8,tocIndex:2},{value:" ",paraId:8,tocIndex:2},{value:"reversedMessage",paraId:8,tocIndex:2},{value:"\u3002\u6211\u4EEC\u63D0\u4F9B\u7684\u51FD\u6570\u5C06\u7528\u4F5C property ",paraId:8,tocIndex:2},{value:"vm.reversedMessage",paraId:8,tocIndex:2},{value:" \u7684 getter \u51FD\u6570\uFF1A",paraId:8,tocIndex:2},{value:"\u6CE8\u610F\u4F7F\u7528\u7684\u65F6\u5019\u662F\u4E00\u4E2A",paraId:9,tocIndex:2},{value:"\u5C5E\u6027",paraId:9,tocIndex:2},{value:"\uFF0C\u8BA1\u7B97\u5C5E\u6027\u91CC\u8BBE\u7F6E\u7684\u51FD\u6570\u4F5C\u7528\u4E8E\u83B7\u53D6\u8BE5\u5C5E\u6027\u7684get\u51FD\u6570\u4E0A",paraId:9,tocIndex:2},{value:`console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
`,paraId:10,tocIndex:2},{value:"\u53EF\u4EE5\u901A\u8FC7\u5728\u8868\u8FBE\u5F0F\u4E2D\u8C03\u7528\u65B9\u6CD5\u6765\u8FBE\u5230\u540C\u6837\u7684\u6548\u679C\uFF1A",paraId:11,tocIndex:3},{value:`<p>Reversed message: "{{ reversedMessage() }}"</p>

// \u5728\u7EC4\u4EF6\u4E2D
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
`,paraId:12,tocIndex:3},{value:"\u4E24\u79CD\u65B9\u5F0F\u7684\u6700\u7EC8\u7ED3\u679C\u786E\u5B9E\u662F\u5B8C\u5168\u76F8\u540C\u7684\u3002",paraId:13,tocIndex:3},{value:"\u7136\u800C\uFF0C\u4E0D\u540C\u7684\u662F",paraId:14,tocIndex:3},{value:"\u8BA1\u7B97\u5C5E\u6027\u662F\u57FA\u4E8E\u5B83\u4EEC\u7684\u54CD\u5E94\u5F0F\u4F9D\u8D56\u8FDB\u884C\u7F13\u5B58\u7684",paraId:14,tocIndex:3},{value:"\u3002\u53EA\u5728\u76F8\u5173\u54CD\u5E94\u5F0F\u4F9D\u8D56\u53D1\u751F\u6539\u53D8\u65F6\u5B83\u4EEC\u624D\u4F1A\u91CD\u65B0\u6C42\u503C\u3002\u8FD9\u5C31\u610F\u5473\u7740\u53EA\u8981 ",paraId:14,tocIndex:3},{value:"message",paraId:14,tocIndex:3},{value:" \u8FD8\u6CA1\u6709\u53D1\u751F\u6539\u53D8\uFF0C\u591A\u6B21\u8BBF\u95EE ",paraId:14,tocIndex:3},{value:"reversedMessage",paraId:14,tocIndex:3},{value:" \u8BA1\u7B97\u5C5E\u6027\u4F1A\u7ACB\u5373\u8FD4\u56DE\u4E4B\u524D\u7684\u8BA1\u7B97\u7ED3\u679C\uFF0C\u800C\u4E0D\u5FC5\u518D\u6B21\u6267\u884C\u51FD\u6570\u3002",paraId:14,tocIndex:3},{value:"\u6CE8\u610F\uFF01\uFF01\uFF1A\u8FD9\u4E5F\u540C\u6837\u610F\u5473\u7740\u4E0B\u9762\u7684\u8BA1\u7B97\u5C5E\u6027\u5C06\u4E0D\u518D\u66F4\u65B0\uFF0C\u56E0\u4E3A ",paraId:15,tocIndex:3},{value:"Date.now()",paraId:15,tocIndex:3},{value:" \u4E0D\u662F\u54CD\u5E94\u5F0F\u4F9D\u8D56\uFF1A",paraId:15,tocIndex:3},{value:`computed: {
  now: function () {
    return Date.now()
  }
}
`,paraId:16,tocIndex:3},{value:"\u76F8\u6BD4\u4E4B\u4E0B\uFF0C\u6BCF\u5F53\u89E6\u53D1\u91CD\u65B0\u6E32\u67D3\u65F6\uFF0C\u8C03\u7528\u65B9\u6CD5\u5C06",paraId:17,tocIndex:3},{value:"\u603B\u4F1A\u518D\u6B21",paraId:17,tocIndex:3},{value:"\u6267\u884C\u51FD\u6570\u3002",paraId:17,tocIndex:3},{value:"\u6211\u4EEC\u4E3A\u4EC0\u4E48\u9700\u8981\u7F13\u5B58\uFF1F",paraId:18,tocIndex:3},{value:"\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u6027\u80FD\u5F00\u9500\u6BD4\u8F83\u5927\u7684\u8BA1\u7B97\u5C5E\u6027 ",paraId:19,tocIndex:3},{value:"A",paraId:19,tocIndex:3},{value:"\uFF0C\u5B83\u9700\u8981\u904D\u5386\u4E00\u4E2A\u5DE8\u5927\u7684\u6570\u7EC4\u5E76\u505A\u5927\u91CF\u7684\u8BA1\u7B97\u3002\u7136\u540E\u6211\u4EEC\u53EF\u80FD\u6709\u5176\u4ED6\u7684\u8BA1\u7B97\u5C5E\u6027\u4F9D\u8D56\u4E8E ",paraId:19,tocIndex:3},{value:"A",paraId:19,tocIndex:3},{value:"\u3002\u5982\u679C\u6CA1\u6709\u7F13\u5B58\uFF0C\u6211\u4EEC\u5C06\u4E0D\u53EF\u907F\u514D\u7684\u591A\u6B21\u6267\u884C ",paraId:19,tocIndex:3},{value:"A",paraId:19,tocIndex:3},{value:" \u7684 getter\uFF01",paraId:19,tocIndex:3},{value:"\u5982\u679C\u4F60\u4E0D\u5E0C\u671B\u6709\u7F13\u5B58\uFF0C\u8BF7\u7528\u65B9\u6CD5\u6765\u66FF\u4EE3",paraId:20,tocIndex:3},{value:"Vue \u63D0\u4F9B\u4E86\u4E00\u79CD\u66F4\u901A\u7528\u7684\u65B9\u5F0F\u6765\u89C2\u5BDF\u548C\u54CD\u5E94 Vue \u5B9E\u4F8B\u4E0A\u7684\u6570\u636E\u53D8\u52A8\uFF1A",paraId:21,tocIndex:4},{value:"\u4FA6\u542C\u5C5E\u6027",paraId:21,tocIndex:4},{value:"\u3002",paraId:21,tocIndex:4},{value:"\u5F53\u4F60\u6709\u4E00\u4E9B\u6570\u636E\u9700\u8981\u968F\u7740\u5176\u5B83\u6570\u636E\u53D8\u52A8\u800C\u53D8\u52A8\u65F6\uFF0C\u5BB9\u6613\u6EE5\u7528 ",paraId:22,tocIndex:4},{value:"watch",paraId:22,tocIndex:4},{value:"\u2014\u2014\u7136\u800C\uFF0C\u901A\u5E38\u66F4\u597D\u7684\u505A\u6CD5\u662F\u4F7F\u7528\u8BA1\u7B97\u5C5E\u6027\u800C\u4E0D\u662F\u547D\u4EE4\u5F0F\u7684 ",paraId:22,tocIndex:4},{value:"watch",paraId:22,tocIndex:4},{value:" \u56DE\u8C03\u3002",paraId:22,tocIndex:4},{value:`<div id="demo">{{ fullName }}</div>
`,paraId:23,tocIndex:4},{value:`var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
`,paraId:24,tocIndex:4},{value:"\u4E0A\u9762\u4EE3\u7801\u662F",paraId:25,tocIndex:4},{value:"\u547D\u4EE4\u5F0F\u4E14\u91CD\u590D",paraId:25,tocIndex:4},{value:"\u7684\u3002\u5C06\u5B83\u4E0E\u8BA1\u7B97\u5C5E\u6027\u7684\u7248\u672C\u8FDB\u884C\u6BD4\u8F83\uFF1A",paraId:25,tocIndex:4},{value:`var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
`,paraId:26,tocIndex:4},{value:"\u8BA1\u7B97\u5C5E\u6027\u9ED8\u8BA4\u53EA\u6709 getter\uFF0C\u4E0D\u8FC7\u5728\u9700\u8981\u65F6\u4F60\u4E5F\u53EF\u4EE5\u63D0\u4F9B\u4E00\u4E2A setter\uFF1A",paraId:27,tocIndex:5},{value:`// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
`,paraId:28,tocIndex:5},{value:"\u73B0\u5728\u518D\u8FD0\u884C ",paraId:29,tocIndex:5},{value:"vm.fullName = 'John Doe'",paraId:29,tocIndex:5},{value:" \u65F6\uFF0Csetter \u4F1A\u88AB\u8C03\u7528\uFF0C",paraId:29,tocIndex:5},{value:"vm.firstName",paraId:29,tocIndex:5},{value:" \u548C ",paraId:29,tocIndex:5},{value:"vm.lastName",paraId:29,tocIndex:5},{value:" \u4E5F\u4F1A\u76F8\u5E94\u5730\u88AB\u66F4\u65B0\u3002",paraId:29,tocIndex:5},{value:"\u867D\u7136\u8BA1\u7B97\u5C5E\u6027\u5728\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u66F4\u5408\u9002\uFF0C\u4F46\u6709\u65F6\u4E5F\u9700\u8981\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7684\u4FA6\u542C\u5668\u3002\u8FD9\u5C31\u662F\u4E3A\u4EC0\u4E48 Vue \u901A\u8FC7 ",paraId:30,tocIndex:6},{value:"watch",paraId:30,tocIndex:6},{value:" \u9009\u9879\u63D0\u4F9B\u4E86\u4E00\u4E2A\u66F4\u901A\u7528\u7684\u65B9\u6CD5\uFF0C\u6765\u54CD\u5E94\u6570\u636E\u7684\u53D8\u5316\u3002",paraId:30,tocIndex:6},{value:"\u5F53\u9700\u8981\u5728",paraId:31,tocIndex:6},{value:"\u6570\u636E\u53D8\u5316\u65F6\u6267\u884C\u5F02\u6B65\u6216\u5F00\u9500\u8F83\u5927\u7684\u64CD\u4F5C",paraId:31,tocIndex:6},{value:"\u65F6\uFF0C\u8FD9\u4E2A\u65B9\u5F0F\u662F\u6700\u6709\u7528\u7684",paraId:31,tocIndex:6},{value:`<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
`,paraId:32,tocIndex:6},{value:`watch: {
	// \u5982\u679C \`question\` \u53D1\u751F\u6539\u53D8\uFF0C\u8FD9\u4E2A\u51FD\u6570\u5C31\u4F1A\u8FD0\u884C
	question: function (newQuestion, oldQuestion) {
  		this.answer = 'Waiting for you to stop typing...'
  		this.debouncedGetAnswer()
	}
},
`,paraId:33,tocIndex:6},{value:"\u64CD\u4F5C\u5143\u7D20\u7684 class \u5217\u8868\u548C\u5185\u8054\u6837\u5F0F\u662F\u6570\u636E\u7ED1\u5B9A\u7684\u4E00\u4E2A\u5E38\u89C1\u9700\u6C42\u3002\u6BD4\u5982\u66F4\u6362\u67D0\u4E2A\u7EC4\u4EF6\u7684\u6837\u5F0F\u3002\u56E0\u4E3A\u5B83\u4EEC\u90FD\u662F attribute\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u7528 ",paraId:34,tocIndex:7},{value:"v-bind",paraId:34,tocIndex:7},{value:" \u5904\u7406\u5B83\u4EEC\uFF1A\u53EA\u9700\u8981\u901A\u8FC7\u8868\u8FBE\u5F0F\u8BA1\u7B97\u51FA\u5B57\u7B26\u4E32\u7ED3\u679C\u5373\u53EF\u3002",paraId:34,tocIndex:7},{value:"\u4E0D\u8FC7\uFF0C\u5B57\u7B26\u4E32\u62FC\u63A5\u9EBB\u70E6\u4E14\u6613\u9519\u3002\u56E0\u6B64\uFF0C\u5728\u5C06 ",paraId:35,tocIndex:7},{value:"v-bind",paraId:35,tocIndex:7},{value:" \u7528\u4E8E ",paraId:35,tocIndex:7},{value:"class",paraId:35,tocIndex:7},{value:" \u548C ",paraId:35,tocIndex:7},{value:"style",paraId:35,tocIndex:7},{value:" \u65F6\uFF0CVue.js \u505A\u4E86\u4E13\u95E8\u7684\u589E\u5F3A\u3002\u8868\u8FBE\u5F0F\u7ED3\u679C\u7684\u7C7B\u578B\u9664\u4E86\u5B57\u7B26\u4E32\u4E4B\u5916\uFF0C\u8FD8\u53EF\u4EE5\u662F",paraId:35,tocIndex:7},{value:"\u5BF9\u8C61\u6216\u6570\u7EC4",paraId:35,tocIndex:7},{value:"\u3002",paraId:35,tocIndex:7},{value:"\u5BF9\u8C61\u8BED\u6CD5",paraId:36,tocIndex:8},{value:"\u6211\u4EEC\u53EF\u4EE5\u4F20\u7ED9 ",paraId:37,tocIndex:8},{value:"v-bind:class",paraId:37,tocIndex:8},{value:" \u4E00\u4E2A\u5BF9\u8C61\uFF0C\u4EE5",paraId:37,tocIndex:8},{value:"\u52A8\u6001\u5730\u5207\u6362 class",paraId:37,tocIndex:8},{value:"\uFF1A",paraId:37,tocIndex:8},{value:`<div v-bind:class="{ active: isActive }"></div>
`,paraId:38,tocIndex:8},{value:"\u4E0A\u9762\u7684\u8BED\u6CD5\u8868\u793A ",paraId:39,tocIndex:8},{value:"active",paraId:39,tocIndex:8},{value:" \u8FD9\u4E2A class \u5B58\u5728\u4E0E\u5426\u5C06\u53D6\u51B3\u4E8E\u6570\u636E property ",paraId:39,tocIndex:8},{value:"isActive",paraId:39,tocIndex:8},{value:"\u53EF\u4EE5\u5728\u5BF9\u8C61\u4E2D\u4F20\u5165\u66F4\u591A\u5B57\u6BB5\u6765\u52A8\u6001\u5207\u6362\u591A\u4E2A class\u3002\u6B64\u5916\uFF0C",paraId:40,tocIndex:8},{value:"v-bind:class",paraId:40,tocIndex:8},{value:" \u6307\u4EE4\u4E5F\u53EF\u4EE5\u4E0E\u666E\u901A\u7684 class attribute \u5171\u5B58\u3002",paraId:40,tocIndex:8},{value:"\u5355\u72EC\u5B9A\u4E49\u5BF9\u8C61",paraId:41,tocIndex:8},{value:"\u7ED1\u5B9A\u7684\u6570\u636E\u5BF9\u8C61\u4E0D\u5FC5\u5185\u8054\u5B9A\u4E49\u5728\u6A21\u677F\u91CC\uFF1A",paraId:42,tocIndex:8},{value:`<div v-bind:class="classObject"></div>

data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
`,paraId:43,tocIndex:8},{value:"\u6570\u7EC4\u8BED\u6CD5",paraId:44,tocIndex:8},{value:"\u6211\u4EEC\u53EF\u4EE5\u628A\u4E00\u4E2A\u6570\u7EC4\u4F20\u7ED9 ",paraId:45,tocIndex:8},{value:"v-bind:class",paraId:45,tocIndex:8},{value:"\uFF0C\u4EE5\u5E94\u7528\u4E00\u4E2A class \u5217\u8868\uFF1A",paraId:45,tocIndex:8},{value:`<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
`,paraId:46,tocIndex:8},{value:"\u6839\u636E\u6761\u4EF6\u5207\u6362\u5217\u8868\u4E2D\u7684 class\uFF0C\u53EF\u4EE5\u7528\u4E09\u5143\u8868\u8FBE\u5F0F\uFF1A",paraId:47,tocIndex:8},{value:`<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
`,paraId:48,tocIndex:8},{value:"\u8FD9\u6837\u5199\u5C06\u59CB\u7EC8\u6DFB\u52A0 ",paraId:49,tocIndex:8},{value:"errorClass",paraId:49,tocIndex:8},{value:"\uFF0C\u4F46\u662F\u53EA\u6709\u5728 ",paraId:49,tocIndex:8},{value:"isActive",paraId:49,tocIndex:8},{value:" \u662F truth \u65F6\u624D\u6DFB\u52A0 ",paraId:49,tocIndex:8},{value:"activeClass",paraId:49,tocIndex:8},{value:"\u3002",paraId:49,tocIndex:8},{value:"\u4E0D\u8FC7\uFF0C\u5F53\u6709\u591A\u4E2A\u6761\u4EF6 class \u65F6\u8FD9\u6837\u5199\u6709\u4E9B\u7E41\u7410\u3002\u6240\u4EE5\u5728\u6570\u7EC4\u8BED\u6CD5\u4E2D\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5BF9\u8C61\u8BED\u6CD5\uFF1A",paraId:50,tocIndex:8},{value:`<div v-bind:class="[{ active: isActive }, errorClass]"></div>
`,paraId:51,tocIndex:8},{value:"\u5BF9\u8C61\u8BED\u6CD5",paraId:52,tocIndex:9},{value:"v-bind:style",paraId:53,tocIndex:9},{value:" \u7684\u5BF9\u8C61\u8BED\u6CD5\u5341\u5206\u76F4\u89C2\u2014\u2014\u770B\u7740\u975E\u5E38\u50CF CSS\uFF0C\u4F46\u5176\u5B9E\u662F\u4E00\u4E2A JavaScript \u5BF9\u8C61\u3002CSS property \u540D\u53EF\u4EE5\u7528",paraId:53,tocIndex:9},{value:"\u9A7C\u5CF0\u5F0F (camelCase)",paraId:53,tocIndex:9},{value:"  \u6216 ",paraId:53,tocIndex:9},{value:"\u77ED\u6A2A\u7EBF\u5206\u9694 (kebab-case\uFF0C\u8BB0\u5F97\u7528\u5F15\u53F7\u62EC\u8D77\u6765)",paraId:53,tocIndex:9},{value:" \u6765\u547D\u540D\uFF1A",paraId:53,tocIndex:9},{value:`<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
`,paraId:54,tocIndex:9},{value:"\u76F4\u63A5\u7ED1\u5B9A\u5230\u4E00\u4E2A\u6837\u5F0F\u5BF9\u8C61\u901A\u5E38\u66F4\u597D\uFF0C\u8FD9\u4F1A\u8BA9\u6A21\u677F\u66F4\u6E05\u6670\uFF1A",paraId:55,tocIndex:9},{value:`<div v-bind:style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
`,paraId:56,tocIndex:9},{value:"v-if",paraId:57,tocIndex:10},{value:" \u6307\u4EE4\u7528\u4E8E\u6761\u4EF6\u6027\u5730\u6E32\u67D3\u4E00\u5757\u5185\u5BB9\u3002\u8FD9\u5757\u5185\u5BB9\u53EA\u4F1A\u5728\u6307\u4EE4\u7684\u8868\u8FBE\u5F0F\u8FD4\u56DE truthy \u503C\u7684\u65F6\u5019\u88AB\u6E32\u67D3\u3002",paraId:57,tocIndex:10},{value:`<h1 v-if="awesome">Vue is awesome!</h1>
`,paraId:58,tocIndex:10},{value:"\u4E5F\u53EF\u4EE5\u7528 ",paraId:59,tocIndex:10},{value:"v-else",paraId:59,tocIndex:10},{value:" \u6DFB\u52A0\u4E00\u4E2A\u201Celse \u5757\u201D\uFF1A",paraId:59,tocIndex:10},{value:`<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no \u{1F622}</h1>
`,paraId:60,tocIndex:10},{value:"\u56E0\u4E3A ",paraId:61,tocIndex:10},{value:"v-if",paraId:61,tocIndex:10},{value:" \u662F\u4E00\u4E2A\u6307\u4EE4\uFF0C\u6240\u4EE5\u5FC5\u987B\u5C06\u5B83\u6DFB\u52A0\u5230\u4E00\u4E2A\u5143\u7D20\u4E0A\u3002",paraId:61,tocIndex:10},{value:"\u4F46\u662F\u5982\u679C\u60F3\u5207\u6362\u591A\u4E2A\u5143\u7D20\u5462\uFF1F",paraId:61,tocIndex:10},{value:"\u6B64\u65F6\u53EF\u4EE5\u628A\u4E00\u4E2A ",paraId:62,tocIndex:10},{value:"<template>",paraId:62,tocIndex:10},{value:" \u5143\u7D20\u5F53\u505A",paraId:62,tocIndex:10},{value:"\u4E0D\u53EF\u89C1\u7684\u5305\u88F9\u5143\u7D20",paraId:62,tocIndex:10},{value:"\uFF0C\u5E76\u5728\u4E0A\u9762\u4F7F\u7528 ",paraId:62,tocIndex:10},{value:"v-if",paraId:62,tocIndex:10},{value:"\u3002\u6700\u7EC8\u7684\u6E32\u67D3\u7ED3\u679C\u5C06\u4E0D\u5305\u542B ",paraId:62,tocIndex:10},{value:"<template>",paraId:62,tocIndex:10},{value:" \u5143\u7D20\u3002",paraId:62,tocIndex:10},{value:`<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
`,paraId:63,tocIndex:10},{value:"v-else",paraId:64,tocIndex:10},{value:" \u5143\u7D20\u5FC5\u987B\u7D27\u8DDF\u5728\u5E26 ",paraId:64,tocIndex:10},{value:"v-if",paraId:64,tocIndex:10},{value:" \u6216\u8005 ",paraId:64,tocIndex:10},{value:"v-else-if",paraId:64,tocIndex:10},{value:" \u7684\u5143\u7D20\u7684\u540E\u9762\uFF0C\u5426\u5219\u5B83\u5C06\u4E0D\u4F1A\u88AB\u8BC6\u522B\u3002",paraId:64,tocIndex:10},{value:"v-else-if",paraId:65},{value:"\u7C7B\u4F3C\u4E8E ",paraId:66,tocIndex:11},{value:"v-else",paraId:66,tocIndex:11},{value:"\uFF0C",paraId:66,tocIndex:11},{value:"v-else-if",paraId:66,tocIndex:11},{value:" \u4E5F\u5FC5\u987B\u7D27\u8DDF\u5728\u5E26 ",paraId:66,tocIndex:11},{value:"v-if",paraId:66,tocIndex:11},{value:" \u6216\u8005 ",paraId:66,tocIndex:11},{value:"v-else-if",paraId:66,tocIndex:11},{value:" \u7684\u5143\u7D20\u4E4B\u540E\u3002",paraId:66,tocIndex:11},{value:"key",paraId:65},{value:"Vue \u4F1A\u5C3D\u53EF\u80FD\u9AD8\u6548\u5730\u6E32\u67D3\u5143\u7D20\uFF0C\u901A\u5E38\u4F1A\u590D\u7528\u5DF2\u6709\u5143\u7D20\u800C\u4E0D\u662F\u4ECE\u5934\u5F00\u59CB\u6E32\u67D3\u3002\u8FD9\u4E48\u505A\u9664\u4E86\u4F7F Vue \u53D8\u5F97\u975E\u5E38\u5FEB\u4E4B\u5916\uFF0C\u8FD8\u6709\u5176\u5B83\u4E00\u4E9B\u597D\u5904\u3002\u4F8B\u5982\uFF0C\u5141\u8BB8\u7528\u6237\u5728\u4E0D\u540C\u7684\u767B\u5F55\u65B9\u5F0F\u4E4B\u95F4\u5207\u6362\uFF1A",paraId:67,tocIndex:12},{value:`<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
`,paraId:68,tocIndex:12},{value:"\u90A3\u4E48\u5728\u4E0A\u9762\u7684\u4EE3\u7801\u4E2D\u5207\u6362 ",paraId:69,tocIndex:12},{value:"loginType",paraId:69,tocIndex:12},{value:" \u5C06\u4E0D\u4F1A\u6E05\u9664\u7528\u6237\u5DF2\u7ECF\u8F93\u5165\u7684\u5185\u5BB9\u3002\u56E0\u4E3A\u4E24\u4E2A\u6A21\u677F\u4F7F\u7528\u4E86\u76F8\u540C\u7684\u5143\u7D20\uFF0C",paraId:69,tocIndex:12},{value:"<input>",paraId:69,tocIndex:12},{value:" \u4E0D\u4F1A\u88AB\u66FF\u6362\u6389\u2014\u2014\u4EC5\u4EC5\u662F\u66FF\u6362\u4E86\u5B83\u7684 ",paraId:69,tocIndex:12},{value:"placeholder",paraId:69,tocIndex:12},{value:"\u3002",paraId:69,tocIndex:12},{value:"\u8FD9\u6837\u4E5F\u4E0D\u603B\u662F\u7B26\u5408\u5B9E\u9645\u9700\u6C42\uFF0C\u5982\u679C\u4E0D\u8981\u590D\u7528\u5B83\u4EEC\u201D\u3002\u53EA\u9700\u6DFB\u52A0\u4E00\u4E2A\u5177\u6709\u552F\u4E00\u503C\u7684 ",paraId:70,tocIndex:12},{value:"key",paraId:70,tocIndex:12},{value:" attribute \u5373\u53EF\uFF1A",paraId:70,tocIndex:12},{value:`<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
`,paraId:71,tocIndex:12},{value:"v-show",paraId:65},{value:"\u53E6\u4E00\u4E2A\u7528\u4E8E\u6839\u636E\u6761\u4EF6\u5C55\u793A\u5143\u7D20\u7684\u9009\u9879\u662F ",paraId:72,tocIndex:13},{value:"v-show",paraId:72,tocIndex:13},{value:" \u6307\u4EE4\u3002\u7528\u6CD5\u5927\u81F4\u4E00\u6837\uFF1A",paraId:72,tocIndex:13},{value:`<h1 v-show="ok">Hello!</h1>
`,paraId:73,tocIndex:13},{value:"\u4E0D\u540C\u7684\u662F\u5E26\u6709 ",paraId:74,tocIndex:13},{value:"v-show",paraId:74,tocIndex:13},{value:" \u7684\u5143\u7D20\u59CB\u7EC8\u4F1A\u88AB\u6E32\u67D3\u5E76\u4FDD\u7559\u5728 DOM \u4E2D\u3002",paraId:74,tocIndex:13},{value:"v-show",paraId:74,tocIndex:13},{value:" \u53EA\u662F\u7B80\u5355\u5730\u5207\u6362\u5143\u7D20\u7684 CSS property ",paraId:74,tocIndex:13},{value:"display",paraId:74,tocIndex:13},{value:"\u3002",paraId:74,tocIndex:13},{value:"\u6CE8\u610F\uFF0C",paraId:75,tocIndex:13},{value:"v-show",paraId:75,tocIndex:13},{value:" \u4E0D\u652F\u6301 ",paraId:75,tocIndex:13},{value:"<template>",paraId:75,tocIndex:13},{value:" \u5143\u7D20\uFF0C\u4E5F\u4E0D\u652F\u6301 ",paraId:75,tocIndex:13},{value:"v-else",paraId:75,tocIndex:13},{value:"\u3002",paraId:75,tocIndex:13},{value:"v-if",paraId:76,tocIndex:14},{value:" \u662F\u201C\u771F\u6B63\u201D\u7684\u6761\u4EF6\u6E32\u67D3\uFF0C\u56E0\u4E3A\u5B83\u4F1A\u786E\u4FDD\u5728\u5207\u6362\u8FC7\u7A0B\u4E2D\u6761\u4EF6\u5757\u5185\u7684\u4E8B\u4EF6\u76D1\u542C\u5668\u548C\u5B50\u7EC4\u4EF6\u9002\u5F53\u5730\u88AB",paraId:76,tocIndex:14},{value:"\u9500\u6BC1\u548C\u91CD\u5EFA",paraId:76,tocIndex:14},{value:"\u3002",paraId:76,tocIndex:14},{value:"v-if",paraId:77,tocIndex:14},{value:" \u4E5F\u662F",paraId:77,tocIndex:14},{value:"\u60F0\u6027\u7684",paraId:77,tocIndex:14},{value:"\uFF1A\u5982\u679C\u5728\u521D\u59CB\u6E32\u67D3\u65F6\u6761\u4EF6\u4E3A\u5047\uFF0C\u5219\u4EC0\u4E48\u4E5F\u4E0D\u505A\u2014\u2014\u76F4\u5230\u6761\u4EF6\u7B2C\u4E00\u6B21\u53D8\u4E3A\u771F\u65F6\uFF0C",paraId:77,tocIndex:14},{value:"\u624D\u4F1A\u5F00\u59CB\u6E32\u67D3\u6761\u4EF6\u5757\u3002",paraId:77,tocIndex:14},{value:"\u76F8\u6BD4\u4E4B\u4E0B\uFF0C",paraId:78,tocIndex:14},{value:"v-show",paraId:78,tocIndex:14},{value:" \u5C31\u7B80\u5355\u5F97\u591A\u2014\u2014\u4E0D\u7BA1\u521D\u59CB\u6761\u4EF6\u662F\u4EC0\u4E48\uFF0C",paraId:78,tocIndex:14},{value:"\u5143\u7D20\u603B\u662F\u4F1A\u88AB\u6E32\u67D3",paraId:78,tocIndex:14},{value:"\uFF0C\u5E76\u4E14\u53EA\u662F\u7B80\u5355\u5730\u57FA\u4E8E CSS \u8FDB\u884C\u5207\u6362\u3002",paraId:78,tocIndex:14},{value:"\u4E00\u822C\u6765\u8BF4\uFF0C",paraId:79,tocIndex:14},{value:"v-if",paraId:79,tocIndex:14},{value:" \u6709\u66F4\u9AD8\u7684\u5207\u6362\u5F00\u9500\uFF0C\u800C ",paraId:79,tocIndex:14},{value:"v-show",paraId:79,tocIndex:14},{value:" \u6709\u66F4\u9AD8\u7684\u521D\u59CB\u6E32\u67D3\u5F00\u9500\u3002",paraId:79,tocIndex:14},{value:"\u56E0\u6B64\uFF0C",paraId:80,tocIndex:14},{value:"\u5982\u679C\u9700\u8981\u975E\u5E38\u9891\u7E41\u5730\u5207\u6362\uFF0C\u5219\u4F7F\u7528 ",paraId:80,tocIndex:14},{value:"v-show",paraId:80,tocIndex:14},{value:" \u8F83\u597D\uFF1B\u5982\u679C\u5728\u8FD0\u884C\u65F6\u6761\u4EF6\u5F88\u5C11\u6539\u53D8\uFF0C\u5219\u4F7F\u7528 ",paraId:80,tocIndex:14},{value:"v-if",paraId:80,tocIndex:14},{value:" \u8F83\u597D",paraId:80,tocIndex:14},{value:"\u3002",paraId:80,tocIndex:14},{value:"\u6211\u4EEC\u53EF\u4EE5\u7528 ",paraId:81,tocIndex:15},{value:"v-for",paraId:81,tocIndex:15},{value:" \u6307\u4EE4\u57FA\u4E8E\u4E00\u4E2A\u6570\u7EC4\u6765\u6E32\u67D3\u4E00\u4E2A\u5217\u8868\u3002",paraId:81,tocIndex:15},{value:"v-for",paraId:81,tocIndex:15},{value:" \u6307\u4EE4\u9700\u8981\u4F7F\u7528 ",paraId:81,tocIndex:15},{value:"item in items",paraId:81,tocIndex:15},{value:" \u5F62\u5F0F\u7684\u7279\u6B8A\u8BED\u6CD5\uFF0C\u5176\u4E2D ",paraId:81,tocIndex:15},{value:"items",paraId:81,tocIndex:15},{value:" \u662F\u6E90\u6570\u636E\u6570\u7EC4\uFF0C\u800C ",paraId:81,tocIndex:15},{value:"item",paraId:81,tocIndex:15},{value:" \u5219\u662F\u88AB\u8FED\u4EE3\u7684\u6570\u7EC4\u5143\u7D20\u7684",paraId:81,tocIndex:15},{value:"\u522B\u540D",paraId:81,tocIndex:15},{value:"\u3002",paraId:81,tocIndex:15},{value:`<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
`,paraId:82,tocIndex:15},{value:"\u5728 ",paraId:83,tocIndex:15},{value:"v-for",paraId:83,tocIndex:15},{value:" \u5757\u4E2D\uFF0C\u6211\u4EEC\u53EF\u4EE5\u8BBF\u95EE",paraId:83,tocIndex:15},{value:"\u6240\u6709\u7236\u4F5C\u7528\u57DF\u7684 property",paraId:83,tocIndex:15},{value:"\u3002",paraId:83,tocIndex:15},{value:"v-for",paraId:84,tocIndex:15},{value:" \u8FD8\u652F\u6301\u4E00\u4E2A\u53EF\u9009\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\uFF0C\u5373\u5F53\u524D\u9879\u7684\u7D22\u5F15\u3002",paraId:84,tocIndex:15},{value:`<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
`,paraId:85,tocIndex:15},{value:"\u4E5F\u53EF\u4EE5\u7528 ",paraId:86,tocIndex:15},{value:"of",paraId:86,tocIndex:15},{value:" \u66FF\u4EE3 ",paraId:86,tocIndex:15},{value:"in",paraId:86,tocIndex:15},{value:" \u4F5C\u4E3A\u5206\u9694\u7B26\uFF0C\u56E0\u4E3A\u5B83\u66F4\u63A5\u8FD1 JavaScript \u8FED\u4EE3\u5668\u7684\u8BED\u6CD5\uFF1A",paraId:86,tocIndex:15},{value:`<div v-for="item of items"></div>
`,paraId:87,tocIndex:15},{value:"v-for",paraId:65},{value:"\u4F60\u4E5F\u53EF\u4EE5\u7528 ",paraId:88,tocIndex:16},{value:"v-for",paraId:88,tocIndex:16},{value:" \u6765\u904D\u5386\u4E00\u4E2A\u5BF9\u8C61\u7684 property\u3002",paraId:88,tocIndex:16},{value:`<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>

new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
`,paraId:89,tocIndex:16},{value:"\u7ED3\u679C\uFF1A",paraId:90,tocIndex:16},{value:"How to do lists in Vue",paraId:91,tocIndex:16},{value:"Jane Doe",paraId:91,tocIndex:16},{value:"2016-04-10",paraId:91,tocIndex:16},{value:"\u4F60\u4E5F\u53EF\u4EE5\u63D0\u4F9B\u7B2C\u4E8C\u4E2A\u7684\u53C2\u6570\u4E3A property \u540D\u79F0 (\u4E5F\u5C31\u662F\u952E\u540D)\uFF1A",paraId:92,tocIndex:16},{value:`<div v-for="(value, name) in object">
  {{ name }}: {{ value }}
</div>
`,paraId:93,tocIndex:16},{value:"title: How to do lists in Vue",paraId:94,tocIndex:16},{value:"author: Jane Doe",paraId:95,tocIndex:16},{value:"publishedAt: 2016-04-10",paraId:96,tocIndex:16},{value:"\u8FD8\u53EF\u4EE5\u7528\u7B2C\u4E09\u4E2A\u53C2\u6570\u4F5C\u4E3A\u7D22\u5F15\uFF1A",paraId:97,tocIndex:16},{value:`<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
`,paraId:98,tocIndex:16},{value:"\u5F53 Vue \u6B63\u5728\u66F4\u65B0\u4F7F\u7528 ",paraId:99,tocIndex:17},{value:"v-for",paraId:99,tocIndex:17},{value:" \u6E32\u67D3\u7684\u5143\u7D20\u5217\u8868\u65F6\uFF0C\u5B83\u9ED8\u8BA4\u4F7F\u7528\u201C\u5C31\u5730\u66F4\u65B0\u201D\u7684\u7B56\u7565\u3002",paraId:99,tocIndex:17},{value:"\u5982\u679C\u6570\u636E\u9879\u7684\u987A\u5E8F\u88AB\u6539\u53D8\uFF0CVue \u5C06\u4E0D\u4F1A\u79FB\u52A8 DOM \u5143\u7D20\u6765\u5339\u914D\u6570\u636E\u9879\u7684\u987A\u5E8F\uFF0C\u800C\u662F\u5C31\u5730\u66F4\u65B0\u6BCF\u4E2A\u5143\u7D20",paraId:99,tocIndex:17},{value:"\uFF0C\u5E76\u4E14\u786E\u4FDD\u5B83\u4EEC\u5728\u6BCF\u4E2A\u7D22\u5F15\u4F4D\u7F6E\u6B63\u786E\u6E32\u67D3",paraId:99,tocIndex:17},{value:"\u8FD9\u4E2A\u9ED8\u8BA4\u7684\u6A21\u5F0F\u662F\u9AD8\u6548\u7684\uFF0C\u4F46\u662F",paraId:100,tocIndex:17},{value:"\u53EA\u9002\u7528\u4E8E\u4E0D\u4F9D\u8D56\u5B50\u7EC4\u4EF6\u72B6\u6001\u6216\u4E34\u65F6 DOM \u72B6\u6001 (\u4F8B\u5982\uFF1A\u8868\u5355\u8F93\u5165\u503C) \u7684\u5217\u8868\u6E32\u67D3\u8F93\u51FA",paraId:100,tocIndex:17},{value:"\u3002",paraId:100,tocIndex:17},{value:"\u4E3A\u4E86\u7ED9 Vue \u4E00\u4E2A\u63D0\u793A\uFF0C\u4EE5\u4FBF\u5B83\u80FD\u8DDF\u8E2A\u6BCF\u4E2A\u8282\u70B9\u7684\u8EAB\u4EFD\uFF0C\u4ECE\u800C",paraId:101,tocIndex:17},{value:"\u91CD\u7528\u548C\u91CD\u65B0\u6392\u5E8F\u73B0\u6709\u5143\u7D20",paraId:101,tocIndex:17},{value:"\uFF0C\u4F60\u9700\u8981\u4E3A\u6BCF\u9879\u63D0\u4F9B\u4E00\u4E2A\u552F\u4E00 ",paraId:101,tocIndex:17},{value:"key",paraId:101,tocIndex:17},{value:" attribute\uFF1A",paraId:101,tocIndex:17},{value:`<div v-for="item in items" v-bind:key="item.id">
  <!-- \u5185\u5BB9 -->
</div>
`,paraId:102,tocIndex:17},{value:"\u5EFA\u8BAE\u5C3D\u53EF\u80FD\u5728\u4F7F\u7528 ",paraId:103,tocIndex:17},{value:"v-for",paraId:103,tocIndex:17},{value:" \u65F6\u63D0\u4F9B ",paraId:103,tocIndex:17},{value:"key",paraId:103,tocIndex:17},{value:" attribute",paraId:103,tocIndex:17},{value:"\uFF0C\u9664\u975E\u904D\u5386\u8F93\u51FA\u7684 DOM \u5185\u5BB9\u975E\u5E38\u7B80\u5355\uFF0C\u6216\u8005\u662F\u523B\u610F\u4F9D\u8D56\u9ED8\u8BA4\u884C\u4E3A\u4EE5\u83B7\u53D6\u6027\u80FD\u4E0A\u7684\u63D0\u5347\u3002",paraId:103,tocIndex:17},{value:"\u56E0\u4E3A\u5B83\u662F Vue ",paraId:104,tocIndex:17},{value:"\u8BC6\u522B\u8282\u70B9\u7684\u4E00\u4E2A\u901A\u7528\u673A\u5236",paraId:104,tocIndex:17},{value:"\uFF0C",paraId:104,tocIndex:17},{value:"key",paraId:104,tocIndex:17},{value:" \u5E76\u4E0D\u4EC5\u4E0E ",paraId:104,tocIndex:17},{value:"v-for",paraId:104,tocIndex:17},{value:" \u7279\u522B\u5173\u8054",paraId:104,tocIndex:17},{value:"\u4E0D\u8981\u4F7F\u7528\u5BF9\u8C61\u6216\u6570\u7EC4\u4E4B\u7C7B\u7684\u975E\u57FA\u672C\u7C7B\u578B\u503C\u4F5C\u4E3A ",paraId:105,tocIndex:17},{value:"v-for",paraId:105,tocIndex:17},{value:" \u7684 ",paraId:105,tocIndex:17},{value:"key",paraId:105,tocIndex:17},{value:"\u3002\u8BF7\u7528\u5B57\u7B26\u4E32\u6216\u6570\u503C\u7C7B\u578B\u7684\u503C\u3002\u53EF\u4EE5\u4F7F\u7528\u81EA\u5E26\u9ED8\u8BA4\u7684index\u4E0B\u6807",paraId:105,tocIndex:17},{value:"Vue \u5C06\u88AB\u4FA6\u542C\u7684\u6570\u7EC4\u7684\u53D8\u66F4\u65B9\u6CD5\u8FDB\u884C\u4E86\u5305\u88F9\uFF0C\u6240\u4EE5\u5B83\u4EEC\u4E5F\u5C06\u4F1A\u89E6\u53D1\u89C6\u56FE\u66F4\u65B0\u3002\u8FD9\u4E9B\u88AB\u5305\u88F9\u8FC7\u7684\u65B9\u6CD5\u5305\u62EC\uFF1A",paraId:106,tocIndex:18},{value:"push()",paraId:107,tocIndex:18},{value:"pop()",paraId:107,tocIndex:18},{value:"shift()",paraId:107,tocIndex:18},{value:"unshift()",paraId:107,tocIndex:18},{value:"splice()",paraId:107,tocIndex:18},{value:"sort()",paraId:107,tocIndex:18},{value:"reverse()",paraId:107,tocIndex:18},{value:"\u66FF\u6362\u6570\u7EC4",paraId:108,tocIndex:18},{value:"\u53D8\u66F4\u65B9\u6CD5\uFF0C\u987E\u540D\u601D\u4E49\uFF0C\u4F1A\u53D8\u66F4\u8C03\u7528\u4E86\u8FD9\u4E9B\u65B9\u6CD5\u7684\u539F\u59CB\u6570\u7EC4\u3002\u76F8\u6BD4\u4E4B\u4E0B\uFF0C\u4E5F\u6709\u975E\u53D8\u66F4\u65B9\u6CD5\uFF0C\u4F8B\u5982 ",paraId:109,tocIndex:18},{value:"filter()",paraId:109,tocIndex:18},{value:"\u3001",paraId:109,tocIndex:18},{value:"concat()",paraId:109,tocIndex:18},{value:" \u548C ",paraId:109,tocIndex:18},{value:"slice()",paraId:109,tocIndex:18},{value:"\u3002\u5B83\u4EEC\u4E0D\u4F1A\u53D8\u66F4\u539F\u59CB\u6570\u7EC4\uFF0C\u800C",paraId:109,tocIndex:18},{value:"\u603B\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u6570\u7EC4",paraId:109,tocIndex:18},{value:"\u3002\u5F53\u4F7F\u7528\u975E\u53D8\u66F4\u65B9\u6CD5\u65F6\uFF0C\u53EF\u4EE5\u7528\u65B0\u6570\u7EC4\u66FF\u6362\u65E7\u6570\u7EC4\uFF1A",paraId:109,tocIndex:18},{value:`example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
`,paraId:110,tocIndex:18},{value:"\u8FD9\u4E0D\u4F1A\u5BFC\u81F4 Vue \u4E22\u5F03\u73B0\u6709 DOM \u5E76\u91CD\u65B0\u6E32\u67D3\u6574\u4E2A\u5217\u8868\u3002Vue \u4E3A\u4E86\u4F7F\u5F97 DOM \u5143\u7D20\u5F97\u5230\u6700\u5927\u8303\u56F4\u7684\u91CD\u7528\u800C\u5B9E\u73B0\u4E86\u4E00\u4E9B\u667A\u80FD\u7684\u542F\u53D1\u5F0F\u65B9\u6CD5\uFF0C\u6240\u4EE5\u7528\u4E00\u4E2A\u542B\u6709\u76F8\u540C\u5143\u7D20\u7684\u6570\u7EC4\u53BB\u66FF\u6362\u539F\u6765\u7684\u6570\u7EC4\u662F\u975E\u5E38\u9AD8\u6548\u7684\u64CD\u4F5C",paraId:111,tocIndex:18},{value:"v-for",paraId:65},{value:"v-if",paraId:65},{value:"\u6CE8\u610F\u6211\u4EEC",paraId:112,tocIndex:19},{value:"\u4E0D",paraId:112,tocIndex:19},{value:"\u63A8\u8350\u5728\u540C\u4E00\u5143\u7D20\u4E0A\u4F7F\u7528 ",paraId:112,tocIndex:19},{value:"v-if",paraId:112,tocIndex:19},{value:" \u548C ",paraId:112,tocIndex:19},{value:"v-for",paraId:112,tocIndex:19},{value:"\u5F53\u5B83\u4EEC\u5904\u4E8E\u540C\u4E00\u8282\u70B9\uFF0C",paraId:113,tocIndex:19},{value:"v-for",paraId:113,tocIndex:19},{value:" \u7684\u4F18\u5148\u7EA7\u6BD4 ",paraId:113,tocIndex:19},{value:"v-if",paraId:113,tocIndex:19},{value:" \u66F4\u9AD8\uFF0C\u8FD9\u610F\u5473\u7740 ",paraId:113,tocIndex:19},{value:"v-if",paraId:113,tocIndex:19},{value:" \u5C06\u5206\u522B\u91CD\u590D\u8FD0\u884C\u4E8E\u6BCF\u4E2A ",paraId:113,tocIndex:19},{value:"v-for",paraId:113,tocIndex:19},{value:" \u5FAA\u73AF\u4E2D\u3002\u5F53\u4F60\u53EA\u60F3\u4E3A",paraId:113,tocIndex:19},{value:"\u90E8\u5206",paraId:113,tocIndex:19},{value:"\u9879\u6E32\u67D3\u8282\u70B9\u65F6\uFF0C\u8FD9\u79CD\u4F18\u5148\u7EA7\u7684\u673A\u5236\u4F1A\u5341\u5206\u6709\u7528\uFF0C\u5982\u4E0B\uFF1A",paraId:113,tocIndex:19},{value:`<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
`,paraId:114,tocIndex:19},{value:"\u4E0A\u9762\u7684\u4EE3\u7801\u5C06\u53EA\u6E32\u67D3\u672A\u5B8C\u6210\u7684 todo\u3002",paraId:115,tocIndex:19},{value:"\u800C\u5982\u679C\u4F60\u7684\u76EE\u7684\u662F\u6709\u6761\u4EF6\u5730\u8DF3\u8FC7\u5FAA\u73AF\u7684\u6267\u884C\uFF0C\u90A3\u4E48\u53EF\u4EE5\u5C06 ",paraId:116,tocIndex:19},{value:"v-if",paraId:116,tocIndex:19},{value:" \u7F6E\u4E8E\u5916\u5C42\u5143\u7D20 (\u6216 [`) \u4E0A\u3002\u5982\uFF1A",paraId:116,tocIndex:19},{value:`<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
`,paraId:117,tocIndex:19},{value:"\u53EF\u4EE5\u7528 ",paraId:118,tocIndex:20},{value:"v-on",paraId:118,tocIndex:20},{value:" \u6307\u4EE4\u76D1\u542C DOM \u4E8B\u4EF6\uFF0C\u5E76\u5728\u89E6\u53D1\u65F6\u8FD0\u884C\u4E00\u4E9B JavaScript \u4EE3\u7801\u3002",paraId:118,tocIndex:20},{value:"\u7136\u800C\u8BB8\u591A\u4E8B\u4EF6\u5904\u7406\u903B\u8F91\u4F1A\u66F4\u4E3A\u590D\u6742\uFF0C\u6240\u4EE5\u76F4\u63A5\u628A JavaScript \u4EE3\u7801\u5199\u5728 ",paraId:119,tocIndex:21},{value:"v-on",paraId:119,tocIndex:21},{value:" \u6307\u4EE4\u4E2D\u662F\u4E0D\u53EF\u884C\u7684\u3002\u56E0\u6B64 ",paraId:119,tocIndex:21},{value:"v-on",paraId:119,tocIndex:21},{value:" \u8FD8\u53EF\u4EE5\u63A5\u6536\u4E00\u4E2A\u9700\u8981\u8C03\u7528\u7684\u65B9\u6CD5\u540D\u79F0\u3002",paraId:119,tocIndex:21},{value:"\u793A\u4F8B\uFF1A",paraId:120,tocIndex:21},{value:`<div id="example-2">
  <!-- \`greet\` \u662F\u5728\u4E0B\u9762\u5B9A\u4E49\u7684\u65B9\u6CD5\u540D -->
  <button v-on:click="greet">Greet</button>
</div>

var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // \u5728 \`methods\` \u5BF9\u8C61\u4E2D\u5B9A\u4E49\u65B9\u6CD5
  methods: {
    greet: function (event) {
      // \`this\` \u5728\u65B9\u6CD5\u91CC\u6307\u5411\u5F53\u524D Vue \u5B9E\u4F8B
      alert('Hello ' + this.name + '!')
      // \`event\` \u662F\u539F\u751F DOM \u4E8B\u4EF6
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

// \u4E5F\u53EF\u4EE5\u7528 JavaScript \u76F4\u63A5\u8C03\u7528\u65B9\u6CD5
example2.greet() // => 'Hello Vue.js!'
`,paraId:121,tocIndex:21},{value:"\u9664\u4E86\u76F4\u63A5\u7ED1\u5B9A\u5230\u4E00\u4E2A\u65B9\u6CD5\uFF0C\u4E5F\u53EF\u4EE5\u5728\u5185\u8054 JavaScript \u8BED\u53E5\u4E2D\u8C03\u7528\u65B9\u6CD5\uFF1A",paraId:122,tocIndex:22},{value:`<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>

new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
`,paraId:123,tocIndex:22},{value:"\u6709\u65F6\u4E5F\u9700\u8981\u5728\u5185\u8054\u8BED\u53E5\u5904\u7406\u5668\u4E2D\u8BBF\u95EE\u539F\u59CB\u7684 DOM \u4E8B\u4EF6\u3002\u53EF\u4EE5\u7528\u7279\u6B8A\u53D8\u91CF ",paraId:124,tocIndex:22},{value:"$event",paraId:124,tocIndex:22},{value:" \u628A\u5B83\u4F20\u5165\u65B9\u6CD5\uFF1A",paraId:124,tocIndex:22},{value:`<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
`,paraId:125,tocIndex:22},{value:`// ...
methods: {
  warn: function (message, event) {
    // \u73B0\u5728\u6211\u4EEC\u53EF\u4EE5\u8BBF\u95EE\u539F\u751F\u4E8B\u4EF6\u5BF9\u8C61
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
`,paraId:126,tocIndex:22},{value:"\u5728\u4E8B\u4EF6\u5904\u7406\u7A0B\u5E8F\u4E2D\u8C03\u7528 ",paraId:127,tocIndex:23},{value:"event.preventDefault()",paraId:127,tocIndex:23},{value:" \u6216 ",paraId:127,tocIndex:23},{value:"event.stopPropagation()",paraId:127,tocIndex:23},{value:" \u662F\u975E\u5E38\u5E38\u89C1\u7684\u9700\u6C42\u3002\u5C3D\u7BA1\u6211\u4EEC\u53EF\u4EE5\u5728\u65B9\u6CD5\u4E2D\u8F7B\u677E\u5B9E\u73B0\u8FD9\u70B9\uFF0C\u4F46\u66F4\u597D\u7684\u65B9\u5F0F\u662F\uFF1A\u65B9\u6CD5\u53EA\u6709\u7EAF\u7CB9\u7684\u6570\u636E\u903B\u8F91\uFF0C\u800C\u4E0D\u662F\u53BB\u5904\u7406 DOM \u4E8B\u4EF6\u7EC6\u8282\u3002",paraId:127,tocIndex:23},{value:"\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0CVue.js \u4E3A ",paraId:128,tocIndex:23},{value:"v-on",paraId:128,tocIndex:23},{value:" \u63D0\u4F9B\u4E86",paraId:128,tocIndex:23},{value:"\u4E8B\u4EF6\u4FEE\u9970\u7B26",paraId:128,tocIndex:23},{value:"\u3002\u4E4B\u524D\u63D0\u8FC7\uFF0C\u4FEE\u9970\u7B26\u662F\u7531\u70B9\u5F00\u5934\u7684\u6307\u4EE4\u540E\u7F00\u6765\u8868\u793A\u7684\u3002",paraId:128,tocIndex:23},{value:".stop",paraId:129,tocIndex:23},{value:".prevent",paraId:129,tocIndex:23},{value:".capture",paraId:129,tocIndex:23},{value:".self",paraId:129,tocIndex:23},{value:".once",paraId:129,tocIndex:23},{value:".passive",paraId:129,tocIndex:23},{value:`<!-- \u963B\u6B62\u5355\u51FB\u4E8B\u4EF6\u7EE7\u7EED\u4F20\u64AD -->
<a v-on:click.stop="doThis"></a>

<!-- \u63D0\u4EA4\u4E8B\u4EF6\u4E0D\u518D\u91CD\u8F7D\u9875\u9762 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- \u4FEE\u9970\u7B26\u53EF\u4EE5\u4E32\u8054 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- \u53EA\u6709\u4FEE\u9970\u7B26 -->
<form v-on:submit.prevent></form>

<!-- \u6DFB\u52A0\u4E8B\u4EF6\u76D1\u542C\u5668\u65F6\u4F7F\u7528\u4E8B\u4EF6\u6355\u83B7\u6A21\u5F0F -->
<!-- \u5373\u5185\u90E8\u5143\u7D20\u89E6\u53D1\u7684\u4E8B\u4EF6\u5148\u5728\u6B64\u5904\u7406\uFF0C\u7136\u540E\u624D\u4EA4\u7531\u5185\u90E8\u5143\u7D20\u8FDB\u884C\u5904\u7406 -->
<div v-on:click.capture="doThis">...</div>

<!-- \u53EA\u5F53\u5728 event.target \u662F\u5F53\u524D\u5143\u7D20\u81EA\u8EAB\u65F6\u89E6\u53D1\u5904\u7406\u51FD\u6570 -->
<!-- \u5373\u4E8B\u4EF6\u4E0D\u662F\u4ECE\u5185\u90E8\u5143\u7D20\u89E6\u53D1\u7684 -->
<div v-on:click.self="doThat">...</div>
`,paraId:130,tocIndex:23},{value:`<!-- \u70B9\u51FB\u4E8B\u4EF6\u5C06\u53EA\u4F1A\u89E6\u53D1\u4E00\u6B21 -->
<a v-on:click.once="doThis"></a>
`,paraId:131,tocIndex:23},{value:"\u5728\u76D1\u542C\u952E\u76D8\u4E8B\u4EF6\u65F6\uFF0C\u6211\u4EEC\u7ECF\u5E38\u9700\u8981\u68C0\u67E5\u8BE6\u7EC6\u7684\u6309\u952E\u3002Vue \u5141\u8BB8\u4E3A ",paraId:132,tocIndex:24},{value:"v-on",paraId:132,tocIndex:24},{value:" \u5728\u76D1\u542C\u952E\u76D8\u4E8B\u4EF6\u65F6\u6DFB\u52A0\u6309\u952E\u4FEE\u9970\u7B26\uFF1A",paraId:132,tocIndex:24},{value:'<!-- \u53EA\u6709\u5728 `key` \u662F `Enter` \u65F6\u8C03\u7528 `vm.submit()` -->\n<input v-on:keyup.enter="submit">\n',paraId:133,tocIndex:24},{value:"\u4E3A\u4E86\u5728\u5FC5\u8981\u7684\u60C5\u51B5\u4E0B\u652F\u6301\u65E7\u6D4F\u89C8\u5668\uFF0CVue \u63D0\u4F9B\u4E86\u7EDD\u5927\u591A\u6570\u5E38\u7528\u7684\u6309\u952E\u7801\u7684\u522B\u540D\uFF1A",paraId:134,tocIndex:24},{value:".enter",paraId:135,tocIndex:24},{value:".tab",paraId:135,tocIndex:24},{value:".delete",paraId:135,tocIndex:24},{value:" (\u6355\u83B7\u201C\u5220\u9664\u201D\u548C\u201C\u9000\u683C\u201D\u952E)",paraId:135,tocIndex:24},{value:".esc",paraId:135,tocIndex:24},{value:".space",paraId:135,tocIndex:24},{value:".up",paraId:135,tocIndex:24},{value:".down",paraId:135,tocIndex:24},{value:".left",paraId:135,tocIndex:24},{value:".right",paraId:135,tocIndex:24},{value:".exact",paraId:136,tocIndex:24},{value:" \u4FEE\u9970\u7B26",paraId:136,tocIndex:24},{value:".exact",paraId:137,tocIndex:24},{value:" \u4FEE\u9970\u7B26\u5141\u8BB8\u4F60\u63A7\u5236\u7531\u7CBE\u786E\u7684\u7CFB\u7EDF\u4FEE\u9970\u7B26\u7EC4\u5408\u89E6\u53D1\u7684\u4E8B\u4EF6\u3002",paraId:137,tocIndex:24},{value:`<!-- \u5373\u4F7F Alt \u6216 Shift \u88AB\u4E00\u540C\u6309\u4E0B\u65F6\u4E5F\u4F1A\u89E6\u53D1 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- \u6709\u4E14\u53EA\u6709 Ctrl \u88AB\u6309\u4E0B\u7684\u65F6\u5019\u624D\u89E6\u53D1 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- \u6CA1\u6709\u4EFB\u4F55\u7CFB\u7EDF\u4FEE\u9970\u7B26\u88AB\u6309\u4E0B\u7684\u65F6\u5019\u624D\u89E6\u53D1 -->
<button v-on:click.exact="onClick">A</button>
`,paraId:138,tocIndex:24},{value:".left",paraId:139,tocIndex:25},{value:".right",paraId:139,tocIndex:25},{value:".middle",paraId:139,tocIndex:25},{value:"\u4F60\u53EF\u4EE5\u7528 ",paraId:140,tocIndex:26},{value:"v-model",paraId:140,tocIndex:26},{value:" \u6307\u4EE4\u5728\u8868\u5355 ",paraId:140,tocIndex:26},{value:"<input>",paraId:140,tocIndex:26},{value:"\u3001",paraId:140,tocIndex:26},{value:"<textarea>",paraId:140,tocIndex:26},{value:" \u53CA ",paraId:140,tocIndex:26},{value:"<select>",paraId:140,tocIndex:26},{value:" \u5143\u7D20\u4E0A\u521B\u5EFA\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u3002\u5B83\u4F1A\u6839\u636E\u63A7\u4EF6\u7C7B\u578B\u81EA\u52A8\u9009\u53D6\u6B63\u786E\u7684\u65B9\u6CD5\u6765\u66F4\u65B0\u5143\u7D20\u3002\u5C3D\u7BA1\u6709\u4E9B\u795E\u5947\uFF0C\u4F46 ",paraId:140,tocIndex:26},{value:"v-model",paraId:140,tocIndex:26},{value:" \u672C\u8D28\u4E0A\u4E0D\u8FC7\u662F\u8BED\u6CD5\u7CD6\u3002\u5B83\u8D1F\u8D23\u76D1\u542C\u7528\u6237\u7684\u8F93\u5165\u4E8B\u4EF6\u4EE5\u66F4\u65B0\u6570\u636E\uFF0C\u5E76\u5BF9\u4E00\u4E9B\u6781\u7AEF\u573A\u666F\u8FDB\u884C\u4E00\u4E9B\u7279\u6B8A\u5904\u7406\u3002",paraId:140,tocIndex:26}]}}]);
