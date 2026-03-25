"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[2931],{32931:function(d,e,a){a.r(e),a.d(e,{texts:function(){return n}});const n=[{value:"\u6838\u5FC3\u601D\u60F3\u5C31\u662F\uFF1A\u5C3D\u91CF\u5229\u7528\u4E00\u4E24\u4E2A\u590D\u6742\u7684\u591A\u5B57\u6BB5\u8054\u5408\u7D22\u5F15\uFF0C\u6297\u4E0B\u4F60 80% \u4EE5\u4E0A\u7684\u67E5\u8BE2\uFF0C\u7136\u540E\u7528\u4E00\u4E24\u4E2A\u8F85\u52A9\u7D22\u5F15\u5C3D\u91CF\u6297\u4E0B\u5269\u4F59\u7684\u4E00\u4E9B\u975E\u5178\u578B\u67E5\u8BE2\uFF0C\u4FDD\u8BC1\u8FD9\u79CD\u5927\u6570\u636E\u91CF\u8868\u7684\u67E5\u8BE2\u5C3D\u53EF\u80FD\u591A\u7684\u90FD\u80FD\u5145\u5206\u5229\u7528\u7D22\u5F15",paraId:0,tocIndex:0},{value:"\u793A\u4F8B\u8868",paraId:1,tocIndex:0},{value:"\u521B\u5EFA\u8054\u5408\u7D22\u5F15\uFF1A KEY ",paraId:2,tocIndex:0},{value:"idx_name_age_position",paraId:2,tocIndex:0},{value:" (",paraId:2,tocIndex:0},{value:"name",paraId:2,tocIndex:0},{value:",",paraId:2,tocIndex:0},{value:"age",paraId:2,tocIndex:0},{value:",",paraId:2,tocIndex:0},{value:"position",paraId:2,tocIndex:0},{value:") USING BTREE",paraId:2,tocIndex:0},{value:`CREATE TABLE \`employees\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(24) NOT NULL DEFAULT '' COMMENT '\u59D3\u540D',
  \`age\` int(11) NOT NULL DEFAULT '0' COMMENT '\u5E74\u9F84',
  \`position\` varchar(20) NOT NULL DEFAULT '' COMMENT '\u804C\u4F4D',
  \`hire_time\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '\u5165\u804C\u65F6\u95F4',
  PRIMARY KEY (\`id\`),
  KEY \`idx_name_age_position\` (\`name\`,\`age\`,\`position\`) USING BTREE 
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='\u5458\u5DE5\u8BB0\u5F55\u8868';
 
INSERT INTO employees(name,age,position,hire_time) VALUES('LiLei',22,'manager',NOW());
INSERT INTO employees(name,age,position,hire_time) VALUES('HanMeimei', 23,'dev',NOW());
INSERT INTO employees(name,age,position,hire_time) VALUES('Lucy',23,'dev',NOW());
 
-- \u63D2\u5165\u4E00\u4E9B\u793A\u4F8B\u6570\u636E
drop procedure if exists insert_emp; 
delimiter ;;
create procedure insert_emp()        
begin
  declare i int;                    
  set i=1;                          
  while(i<=100000)do                 
    insert into employees(name,age,position) values(CONCAT('cjl',i),i,'dev');  
    set i=i+1;                       
  end while;
end;;
delimiter ;
call insert_emp();
`,paraId:3,tocIndex:0},{value:"1\u3001\u8054\u5408\u7D22\u5F15\u7B2C\u4E00\u4E2A\u5B57\u6BB5\u7528\u8303\u56F4\u4E0D\u4F1A\u8D70\u7D22\u5F15",paraId:4},{value:`EXPLAIN SELECT * FROM employees WHERE name > 'LiLei' AND age = 22 AND position ='manager';
`,paraId:5,tocIndex:2},{value:"\u8054\u5408\u7D22\u5F15\u7B2C\u4E00\u4E2A\u5B57\u6BB5\u5C31\u7528\u8303\u56F4\u67E5\u627E\u4E0D\u4F1A\u8D70\u7D22\u5F15\uFF0Cmysql \u5185\u90E8\u53EF\u80FD\u89C9\u5F97\u7B2C\u4E00\u4E2A\u5B57\u6BB5\u5C31\u7528\u8303\u56F4\uFF0C\u7ED3\u679C\u96C6\u5E94\u8BE5\u5F88\u5927\uFF0C\u56DE\u8868\u6548\u7387\u4E0D\u9AD8\uFF0C\u8FD8\u4E0D\u5982\u5C31\u5168\u8868\u626B\u63CF",paraId:6,tocIndex:2},{value:"2\u3001\u5F3A\u5236\u8D70\u7D22\u5F15",paraId:4},{value:"\u4F7F\u7528",paraId:7,tocIndex:3},{value:"force index(idx_name_age_position)",paraId:7,tocIndex:3},{value:"\u5F3A\u5236\u4F7F\u7528\u7D22\u5F15",paraId:7,tocIndex:3},{value:`EXPLAIN SELECT * FROM employees force index(idx_name_age_position) WHERE name > 'LiLei' AND age = 22 AND position ='manager';
`,paraId:8,tocIndex:3},{value:"\u867D\u7136\u4F7F\u7528\u4E86\u5F3A\u5236\u8D70\u7D22\u5F15\u8BA9\u8054\u5408\u7D22\u5F15\u7B2C\u4E00\u4E2A\u5B57\u6BB5\u8303\u56F4\u67E5\u627E\u4E5F\u8D70\u7D22\u5F15\uFF0C\u626B\u63CF\u7684\u884C rows \u770B\u4E0A\u53BB\u4E5F\u5C11\u4E86\u70B9\uFF0C\u4F46\u662F",paraId:9,tocIndex:3},{value:"\u6700\u7EC8\u67E5\u627E\u6548\u7387\u4E0D\u4E00\u5B9A\u6BD4\u5168\u8868\u626B\u63CF\u9AD8\uFF0C\u56E0\u4E3A\u56DE\u8868\u6548\u7387\u4E0D\u9AD8",paraId:9,tocIndex:3},{value:`-- \u5173\u95ED\u67E5\u8BE2\u7F13\u5B58
set global query_cache_size=0;  
set global query_cache_type=0;
-- \u6267\u884C\u65F6\u95F40.333s
SELECT * FROM employees WHERE name > 'LiLei';
-- \u6267\u884C\u65F6\u95F40.444s
SELECT * FROM employees force index(idx_name_age_position) WHERE name > 'LiLei';
`,paraId:10,tocIndex:3},{value:"3\u3001\u8986\u76D6\u7D22\u5F15\u4F18\u5316",paraId:4},{value:"\u4F7F\u7528\u8986\u76D6\u7D22\u5F15\u5C31\u53EF\u4EE5\u907F\u514D\u5168\u8868\u626B\u63CF",paraId:11,tocIndex:4},{value:`EXPLAIN SELECT name,age,position FROM employees WHERE name > 'LiLei' AND age = 22 AND position ='manager';
`,paraId:12,tocIndex:4},{value:`EXPLAIN SELECT * FROM employees WHERE name in ('LiLei','HanMeimei','Lucy') AND age = 22 AND position ='manager';
`,paraId:13,tocIndex:5},{value:`EXPLAIN SELECT * FROM employees WHERE (name = 'LiLei' or name = 'HanMeimei') AND age = 22 AND position ='manager';
`,paraId:14,tocIndex:5},{value:"5\u3001like KK% \u4E00\u822C\u60C5\u51B5\u90FD\u4F1A\u8D70\u7D22\u5F15",paraId:4},{value:`EXPLAIN SELECT * FROM employees WHERE name like 'LiLei%' AND age = 22 AND position ='manager';
`,paraId:15,tocIndex:6},{value:"ike KK% \u5176\u5B9E\u5C31\u662F\u7528\u5230\u4E86",paraId:16,tocIndex:6},{value:"\u7D22\u5F15\u4E0B\u63A8\u4F18\u5316",paraId:16,tocIndex:6},{value:"\u4EC0\u4E48\u662F\u7D22\u5F15\u4E0B\u63A8",paraId:17,tocIndex:6},{value:"\u5BF9\u4E8E\u8F85\u52A9\u7684\u8054\u5408\u7D22\u5F15 (name,age,position)\uFF0C\u6B63\u5E38\u60C5\u51B5\u6309\u7167\u6700\u5DE6\u524D\u7F00\u539F\u5219\uFF0C",paraId:18,tocIndex:6},{value:"SELECT \\* FROM employees WHERE name like 'LiLei%' AND age = 22 AND position ='manager'",paraId:18,tocIndex:6},{value:"  \u8FD9\u79CD\u60C5\u51B5\u53EA\u4F1A\u8D70 name \u5B57\u6BB5\u7D22\u5F15\uFF0C\u56E0\u4E3A\u6839\u636E name \u5B57\u6BB5\u8FC7\u6EE4\u5B8C\uFF0C\u5F97\u5230\u7684\u7D22\u5F15\u884C\u91CC\u7684 age \u548C position \u662F\u65E0\u5E8F\u7684\uFF0C\u65E0\u6CD5\u5F88\u597D\u7684\u5229\u7528\u7D22\u5F15\u3002",paraId:18,tocIndex:6},{value:"\u5728 MySQL5.6 \u4E4B\u524D\u7684\u7248\u672C\uFF0C\u8FD9\u4E2A\u67E5\u8BE2\u53EA\u80FD\u5728\u8054\u5408\u7D22\u5F15\u91CC\u5339\u914D\u5230\u540D\u5B57\u662F 'LiLei' \u5F00\u5934\u7684\u7D22\u5F15\uFF0C\u7136\u540E\u62FF\u8FD9\u4E9B\u7D22\u5F15\u5BF9\u5E94\u7684\u4E3B\u952E",paraId:19,tocIndex:6},{value:"\u9010\u4E2A\u56DE\u8868",paraId:19,tocIndex:6},{value:"\uFF0C\u5230\u4E3B\u952E\u7D22\u5F15\u4E0A\u627E\u51FA\u76F8\u5E94\u7684\u8BB0\u5F55\uFF0C\u518D\u6BD4\u5BF9 age \u548C position \u8FD9\u4E24\u4E2A\u5B57\u6BB5\u7684\u503C\u662F\u5426\u7B26\u5408\u3002",paraId:19,tocIndex:6},{value:"MySQL 5.6 \u5F15\u5165\u4E86\u7D22\u5F15\u4E0B\u63A8\u4F18\u5316\uFF0C",paraId:20,tocIndex:6},{value:"\u53EF\u4EE5\u5728\u7D22\u5F15\u904D\u5386\u8FC7\u7A0B\u4E2D\uFF0C\u5BF9\u7D22\u5F15\u4E2D\u5305\u542B\u7684\u6240\u6709\u5B57\u6BB5\u5148\u505A\u5224\u65AD\uFF0C\u8FC7\u6EE4\u6389\u4E0D\u7B26\u5408\u6761\u4EF6\u7684\u8BB0\u5F55\u4E4B\u540E\u518D\u56DE\u8868\uFF0C\u53EF\u4EE5\u6709\u6548\u7684\u51CF\u5C11\u56DE\u8868\u6B21\u6570",paraId:20,tocIndex:6},{value:"\u3002\u4F7F\u7528\u4E86\u7D22\u5F15\u4E0B\u63A8\u4F18\u5316\u540E\uFF0C\u4E0A\u9762\u90A3\u4E2A\u67E5\u8BE2\u5728\u8054\u5408\u7D22\u5F15\u91CC\u5339\u914D\u5230\u540D\u5B57\u662F ",paraId:20,tocIndex:6},{value:"'LiLei' \u5F00\u5934",paraId:20,tocIndex:6},{value:"\u7684\u7D22\u5F15\u4E4B\u540E\uFF0C\u540C\u65F6\u8FD8\u4F1A\u5728\u7D22\u5F15\u91CC\u8FC7\u6EE4 ",paraId:20,tocIndex:6},{value:"age",paraId:20,tocIndex:6},{value:" \u548C ",paraId:20,tocIndex:6},{value:"position",paraId:20,tocIndex:6},{value:" \u8FD9\u4E24\u4E2A\u5B57\u6BB5\uFF0C\u62FF\u7740\u8FC7\u6EE4\u5B8C\u5269\u4E0B\u7684\u7D22\u5F15\u5BF9\u5E94\u7684\u4E3B\u952E id \u518D\u56DE\u8868\u67E5\u6574\u884C\u6570\u636E\u3002",paraId:20,tocIndex:6},{value:"\u7D22\u5F15\u4E0B\u63A8\u4F1A\u51CF\u5C11\u56DE\u8868\u6B21\u6570\uFF0C\u5BF9\u4E8E innodb \u5F15\u64CE\u7684\u8868\u7D22\u5F15\u4E0B\u63A8\u53EA\u80FD\u7528\u4E8E\u4E8C\u7EA7\u7D22\u5F15\uFF0Cinnodb \u7684\u4E3B\u952E\u7D22\u5F15\uFF08\u805A\u7C07\u7D22\u5F15\uFF09\u6811\u53F6\u5B50\u8282\u70B9\u4E0A\u4FDD\u5B58\u7684\u662F\u5168\u884C\u6570\u636E\uFF0C\u6240\u4EE5\u8FD9\u4E2A\u65F6\u5019\u7D22\u5F15\u4E0B\u63A8\u5E76\u4E0D\u4F1A\u8D77\u5230\u51CF\u5C11\u67E5\u8BE2\u5168\u884C\u6570\u636E\u7684\u6548\u679C\u3002",paraId:21,tocIndex:6},{value:"\u4E3A\u4EC0\u4E48\u8303\u56F4\u67E5\u627E Mysql \u6CA1\u6709\u7528\u7D22\u5F15\u4E0B\u63A8\u4F18\u5316\uFF1F",paraId:22,tocIndex:6},{value:"\u4F30\u8BA1\u5E94\u8BE5\u662F Mysql \u8BA4\u4E3A\u8303\u56F4\u67E5\u627E\u8FC7\u6EE4\u7684\u7ED3\u679C\u96C6\u8FC7\u5927\uFF0Clike KK% \u5728\u7EDD\u5927\u591A\u6570\u60C5\u51B5\u6765\u770B\uFF0C\u8FC7\u6EE4\u540E\u7684\u7ED3\u679C\u96C6\u6BD4\u8F83\u5C0F\uFF0C\u6240\u4EE5\u8FD9\u91CC Mysql \u9009\u62E9\u7ED9 like KK% \u7528\u4E86\u7D22\u5F15\u4E0B\u63A8\u4F18\u5316\uFF0C\u5F53\u7136\u8FD9\u4E5F\u4E0D\u662F\u7EDD\u5BF9\u7684\uFF0C\u6709\u65F6 like KK% \u4E5F\u4E0D\u4E00\u5B9A\u5C31\u4F1A\u8D70\u7D22\u5F15\u4E0B\u63A8\u3002",paraId:23,tocIndex:6},{value:"\u7D22\u5F15\u4E0B\u63A8\u5C31\u662F\u4E3A\u4E86\u51CF\u5C11\u56DE\u8868\u3002\u662F\u5426\u4F7F\u7528\u7D22\u5F15\u548C\u7ED3\u679C\u96C6\u5927\u5C0F\u6709\u5173\u8054",paraId:24,tocIndex:6},{value:`mysql> EXPLAIN select * from employees where name > 'a';
`,paraId:25,tocIndex:7},{value:"\u5982\u679C\u7528 name \u7D22\u5F15\u9700\u8981\u904D\u5386 name \u5B57\u6BB5\u8054\u5408\u7D22\u5F15\u6811\uFF0C\u7136\u540E\u8FD8\u9700\u8981\u6839\u636E\u904D\u5386\u51FA\u6765\u7684\u4E3B\u952E\u503C\u53BB\u4E3B\u952E\u7D22\u5F15\u6811\u91CC\u518D\u53BB\u67E5\u51FA\u6700\u7EC8\u6570\u636E\uFF0C",paraId:26,tocIndex:7},{value:"\u56DE\u8868\u6210\u672C\u6BD4\u5168\u8868\u626B\u63CF\u8FD8\u9AD8",paraId:26,tocIndex:7},{value:"\uFF0C\u53EF\u4EE5\u7528\u8986\u76D6\u7D22\u5F15\u4F18\u5316\uFF0C\u8FD9\u6837\u53EA\u9700\u8981\u904D\u5386 name \u5B57\u6BB5\u7684\u8054\u5408\u7D22\u5F15\u6811\u5C31\u80FD\u62FF\u5230\u6240\u6709\u7ED3\u679C\uFF0C\u5982\u4E0B\uFF1A",paraId:26,tocIndex:7},{value:`mysql> EXPLAIN select name,age,position from employees where name > 'a' ;
`,paraId:27,tocIndex:7},{value:`mysql> EXPLAIN select * from employees where name > 'zzz' ;
`,paraId:28,tocIndex:7},{value:"\u5BF9\u4E8E\u4E0A\u9762\u8FD9\u4E24\u79CD name>'a' \u548C name>'zzz' \u7684\u6267\u884C\u7ED3\u679C\uFF0Cmysql \u6700\u7EC8\u662F\u5426\u9009\u62E9\u8D70\u7D22\u5F15\u6216\u8005\u4E00\u5F20\u8868\u6D89\u53CA\u591A\u4E2A\u7D22\u5F15\uFF0Cmysql \u6700\u7EC8\u5982\u4F55\u9009\u62E9\u7D22\u5F15\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7528 ",paraId:29,tocIndex:7},{value:"trace \u5DE5\u5177",paraId:29,tocIndex:7},{value:"\u6765\u4E00\u67E5\u7A76\u7ADF\uFF0C\u5F00\u542F trace \u5DE5\u5177\u4F1A\u5F71\u54CD mysql \u6027\u80FD\uFF0C\u6240\u4EE5\u53EA\u80FD\u4E34\u65F6\u5206\u6790 sql \u4F7F\u7528\uFF0C\u7528\u5B8C\u4E4B\u540E\u7ACB\u5373\u5173\u95ED",paraId:29,tocIndex:7},{value:"trace \u5DE5\u5177\u7528\u6CD5\uFF1A",paraId:4},{value:`mysql> set session optimizer_trace="enabled=on",end_markers_in_json=on;  --\u5F00\u542Ftrace

mysql> select * from employees where name > 'a' order by position;
mysql> SELECT * FROM information_schema.OPTIMIZER_TRACE;  --\u4F7F\u7528\uFF1A\u5728\u67E5\u8BE2\u8BED\u53E5\u4E0B\u52A0\u4E0A\u8FD9\u4E00\u6761
 
\u67E5\u770Btrace\u5B57\u6BB5\uFF1A
{
  "steps": [
    {
      "join_preparation": {    --\u7B2C\u4E00\u9636\u6BB5\uFF1ASQL\u51C6\u5907\u9636\u6BB5\uFF0C\u683C\u5F0F\u5316sql
        "select#": 1,
        "steps": [
          {
            "expanded_query": "/* select#1 */ select \`employees\`.\`id\` AS \`id\`,\`employees\`.\`name\` AS \`name\`,\`employees\`.\`age\` AS \`age\`,\`employees\`.\`position\` AS \`position\`,\`employees\`.\`hire_time\` AS \`hire_time\` from \`employees\` where (\`employees\`.\`name\` > 'a') order by \`employees\`.\`position\`"
          }
        ] /* steps */
      } /* join_preparation */
    },
    {
      "join_optimization": {    --\u7B2C\u4E8C\u9636\u6BB5\uFF1ASQL\u4F18\u5316\u9636\u6BB5
        "select#": 1,
        "steps": [
          {
            "condition_processing": {    --\u6761\u4EF6\u5904\u7406
              "condition": "WHERE",
              "original_condition": "(\`employees\`.\`name\` > 'a')",
              "steps": [
                {
                  "transformation": "equality_propagation",
                  "resulting_condition": "(\`employees\`.\`name\` > 'a')"
                },
                {
                  "transformation": "constant_propagation",
                  "resulting_condition": "(\`employees\`.\`name\` > 'a')"
                },
                {
                  "transformation": "trivial_condition_removal",
                  "resulting_condition": "(\`employees\`.\`name\` > 'a')"
                }
              ] /* steps */
            } /* condition_processing */
          },
          {
            "substitute_generated_columns": {
            } /* substitute_generated_columns */
          },
          {
            "table_dependencies": [    --\u8868\u4F9D\u8D56\u8BE6\u60C5
              {
                "table": "\`employees\`",
                "row_may_be_null": false,
                "map_bit": 0,
                "depends_on_map_bits": [
                ] /* depends_on_map_bits */
              }
            ] /* table_dependencies */
          },
          {
            "ref_optimizer_key_uses": [
            ] /* ref_optimizer_key_uses */
          },
          {
            "rows_estimation": [    --\u9884\u4F30\u8868\u7684\u8BBF\u95EE\u6210\u672C
              {
                "table": "\`employees\`",
                "range_analysis": {
                  "table_scan": {     --\u5168\u8868\u626B\u63CF\u60C5\u51B5
                    "rows": 10123,    --\u626B\u63CF\u884C\u6570
                    "cost": 2054.7    --\u67E5\u8BE2\u6210\u672C
                  } /* table_scan */,
                  "potential_range_indexes": [    --\u67E5\u8BE2\u53EF\u80FD\u4F7F\u7528\u7684\u7D22\u5F15
                    {
                      "index": "PRIMARY",    --\u4E3B\u952E\u7D22\u5F15
                      "usable": false,
                      "cause": "not_applicable"
                    },
                    {
                      "index": "idx_name_age_position",    --\u8F85\u52A9\u7D22\u5F15
                      "usable": true,
                      "key_parts": [
                        "name",
                        "age",
                        "position",
                        "id"
                      ] /* key_parts */
                    }
                  ] /* potential_range_indexes */,
                  "setup_range_conditions": [
                  ] /* setup_range_conditions */,
                  "group_index_range": {
                    "chosen": false,
                    "cause": "not_group_by_or_distinct"
                  } /* group_index_range */,
                  "analyzing_range_alternatives": {    --\u5206\u6790\u5404\u4E2A\u7D22\u5F15\u4F7F\u7528\u6210\u672C
                    "range_scan_alternatives": [
                      {
                        "index": "idx_name_age_position",
                        "ranges": [
                          "a < name"      --\u7D22\u5F15\u4F7F\u7528\u8303\u56F4
                        ] /* ranges */,
                        "index_dives_for_eq_ranges": true,
                        "rowid_ordered": false,    --\u4F7F\u7528\u8BE5\u7D22\u5F15\u83B7\u53D6\u7684\u8BB0\u5F55\u662F\u5426\u6309\u7167\u4E3B\u952E\u6392\u5E8F
                        "using_mrr": false,
                        "index_only": false,       --\u662F\u5426\u4F7F\u7528\u8986\u76D6\u7D22\u5F15
                        "rows": 5061,              --\u7D22\u5F15\u626B\u63CF\u884C\u6570
                        "cost": 6074.2,            --\u7D22\u5F15\u4F7F\u7528\u6210\u672C
                        "chosen": false,           --\u662F\u5426\u9009\u62E9\u8BE5\u7D22\u5F15
                        "cause": "cost"
                      }
                    ] /* range_scan_alternatives */,
                    "analyzing_roworder_intersect": {
                      "usable": false,
                      "cause": "too_few_roworder_scans"
                    } /* analyzing_roworder_intersect */
                  } /* analyzing_range_alternatives */
                } /* range_analysis */
              }
            ] /* rows_estimation */
          },
          {
            "considered_execution_plans": [
              {
                "plan_prefix": [
                ] /* plan_prefix */,
                "table": "\`employees\`",
                "best_access_path": {    --\u6700\u4F18\u8BBF\u95EE\u8DEF\u5F84
                  "considered_access_paths": [   --\u6700\u7EC8\u9009\u62E9\u7684\u8BBF\u95EE\u8DEF\u5F84
                    {
                      "rows_to_scan": 10123,
                      "access_type": "scan",     --\u8BBF\u95EE\u7C7B\u578B\uFF1A\u4E3Ascan\uFF0C\u5168\u8868\u626B\u63CF
                      "resulting_rows": 10123,
                      "cost": 2052.6,
                      "chosen": true,            --\u786E\u5B9A\u9009\u62E9
                      "use_tmp_table": true
                    }
                  ] /* considered_access_paths */
                } /* best_access_path */,
                "condition_filtering_pct": 100,
                "rows_for_plan": 10123,
                "cost_for_plan": 2052.6,
                "sort_cost": 10123,
                "new_cost_for_plan": 12176,
                "chosen": true
              }
            ] /* considered_execution_plans */
          },
          {
            "attaching_conditions_to_tables": {
              "original_condition": "(\`employees\`.\`name\` > 'a')",
              "attached_conditions_computation": [
              ] /* attached_conditions_computation */,
              "attached_conditions_summary": [
                {
                  "table": "\`employees\`",
                  "attached": "(\`employees\`.\`name\` > 'a')"
                }
              ] /* attached_conditions_summary */
            } /* attaching_conditions_to_tables */
          },
          {
            "clause_processing": {
              "clause": "ORDER BY",
              "original_clause": "\`employees\`.\`position\`",
              "items": [
                {
                  "item": "\`employees\`.\`position\`"
                }
              ] /* items */,
              "resulting_clause_is_simple": true,
              "resulting_clause": "\`employees\`.\`position\`"
            } /* clause_processing */
          },
          {
            "reconsidering_access_paths_for_index_ordering": {
              "clause": "ORDER BY",
              "steps": [
              ] /* steps */,
              "index_order_summary": {
                "table": "\`employees\`",
                "index_provides_order": false,
                "order_direction": "undefined",
                "index": "unknown",
                "plan_changed": false
              } /* index_order_summary */
            } /* reconsidering_access_paths_for_index_ordering */
          },
          {
            "refine_plan": [
              {
                "table": "\`employees\`"
              }
            ] /* refine_plan */
          }
        ] /* steps */
      } /* join_optimization */
    },
    {
      "join_execution": {    --\u7B2C\u4E09\u9636\u6BB5\uFF1ASQL\u6267\u884C\u9636\u6BB5
        "select#": 1,
        "steps": [
        ] /* steps */
      } /* join_execution */
    }
  ] /* steps */
}

//\u518D\u6B21\u6267\u884C 
mysql> select * from employees where name > 'zzz' order by position;
mysql> SELECT * FROM information_schema.OPTIMIZER_TRACE;
 
 
mysql> set session optimizer_trace="enabled=off";    --\u5173\u95EDtrace
`,paraId:30,tocIndex:8},{value:"\u67E5\u770Btrace\u5B57\u6BB5\u53EF\u77E5\u7D22\u5F15\u626B\u63CF\u7684\u6210\u672C\u4F4E\u4E8E\u5168\u8868\u626B\u63CF\uFF0C\u6240\u4EE5mysql\u6700\u7EC8\u9009\u62E9\u7D22\u5F15\u626B\u63CF",paraId:31,tocIndex:8},{value:"\u7ED3\u8BBA\uFF1A\u5168\u8868\u626B\u63CF\u7684\u6210\u672C\u4F4E\u4E8E\u7D22\u5F15\u626B\u63CF\uFF0C\u6240\u4EE5mysql\u6700\u7EC8\u9009\u62E9\u5168\u8868\u626B\u63CF",paraId:32,tocIndex:8},{value:"Order by \u4E0E Group by \u4F18\u5316",paraId:4},{value:"Case1\uFF1A",paraId:33,tocIndex:10},{value:"\u200B	",paraId:34,tocIndex:10},{value:"\u5206\u6790\uFF1A",paraId:34,tocIndex:10},{value:"\u200B	\u5229\u7528\u6700\u5DE6\u524D\u7F00\u6CD5\u5219\uFF1A\u4E2D\u95F4\u5B57\u6BB5\u4E0D\u80FD\u65AD\uFF0C\u56E0\u6B64\u67E5\u8BE2\u7528\u5230\u4E86 name \u7D22\u5F15\uFF0C\u4ECE key_len=74 \u4E5F\u80FD\u770B\u51FA\uFF0Cage \u7D22\u5F15\u5217\u7528\u5728\u6392\u5E8F\u8FC7\u7A0B\u4E2D\uFF0C\u56E0\u4E3A Extra \u5B57\u6BB5\u91CC\u6CA1\u6709 using filesort",paraId:35,tocIndex:10},{value:"Case 2\uFF1A",paraId:36,tocIndex:10},{value:"\u5206\u6790\uFF1A",paraId:37,tocIndex:10},{value:"\u4ECE explain \u7684\u6267\u884C\u7ED3\u679C\u6765\u770B\uFF1Akey_len=74\uFF0C\u67E5\u8BE2\u4F7F\u7528\u4E86 name \u7D22\u5F15\uFF0C\u7531\u4E8E\u7528\u4E86 position \u8FDB\u884C\u6392\u5E8F\uFF0C\u8DF3\u8FC7\u4E86 age\uFF0C\u51FA\u73B0\u4E86 Using filesort",paraId:38,tocIndex:10},{value:"\u4F18\u5316",paraId:39,tocIndex:10},{value:"\u200B		\u5206\u6790\uFF1A",paraId:40,tocIndex:10},{value:"\u200B		\u67E5\u627E\u53EA\u7528\u5230\u7D22\u5F15 name\uFF0Cage \u548C position \u7528\u4E8E\u6392\u5E8F\uFF0C\u65E0 Using filesort\u3002",paraId:41,tocIndex:10},{value:"Case 3",paraId:42,tocIndex:10},{value:"\u5206\u6790\uFF1A",paraId:43,tocIndex:10},{value:"\u548C Case 3 \u4E2D explain \u7684\u6267\u884C\u7ED3\u679C\u4E00\u6837\uFF0C\u4F46\u662F\u51FA\u73B0\u4E86 Using filesort\uFF0C\u56E0\u4E3A\u7D22\u5F15\u7684\u521B\u5EFA\u987A\u5E8F\u4E3A name,age,position\uFF0C\u4F46\u662F\u6392\u5E8F\u7684\u65F6\u5019 age \u548C position \u98A0\u5012\u4F4D\u7F6E\u4E86\u3002",paraId:44,tocIndex:10},{value:"Case 4",paraId:45,tocIndex:10},{value:"\u5206\u6790\uFF1A",paraId:46,tocIndex:10},{value:"\u4E0E Case 3 \u5BF9\u6BD4\uFF0C\u5728 Extra \u4E2D\u5E76\u672A\u51FA\u73B0 Using filesort\uFF0C\u56E0\u4E3A age \u4E3A\u5E38\u91CF\uFF0C\u5728\u6392\u5E8F\u4E2D\u88AB\u4F18\u5316\uFF0C\u6240\u4EE5\u7D22\u5F15\u672A\u98A0\u5012\uFF0C\u4E0D\u4F1A\u51FA\u73B0 Using filesort\u3002",paraId:47,tocIndex:10},{value:"Case 5",paraId:48,tocIndex:10},{value:"\u5206\u6790\uFF1A",paraId:49,tocIndex:10},{value:"\u867D\u7136\u6392\u5E8F\u7684\u5B57\u6BB5\u5217\u4E0E\u7D22\u5F15\u987A\u5E8F\u4E00\u6837\uFF0C\u4E14 order by \u9ED8\u8BA4\u5347\u5E8F\uFF0C\u8FD9\u91CC position desc \u53D8\u6210\u4E86\u964D\u5E8F\uFF0C",paraId:50,tocIndex:10},{value:"\u5BFC\u81F4\u4E0E\u7D22\u5F15\u7684\u6392\u5E8F\u65B9\u5F0F\u4E0D\u540C",paraId:50,tocIndex:10},{value:"\uFF0C\u4ECE\u800C\u4EA7\u751F Using filesort\u3002Mysql8 \u4EE5\u4E0A\u7248\u672C\u6709\u964D\u5E8F\u7D22\u5F15\u53EF\u4EE5\u652F\u6301\u8BE5\u79CD\u67E5\u8BE2\u65B9\u5F0F\u3002",paraId:50,tocIndex:10},{value:"Case 6\uFF1A",paraId:51,tocIndex:10},{value:"\u5206\u6790\uFF1A",paraId:52,tocIndex:10},{value:"\u5BF9\u4E8E\u6392\u5E8F\u6765\u8BF4\uFF0C\u591A\u4E2A\u76F8\u7B49\u6761\u4EF6\u4E5F\u662F\u8303\u56F4\u67E5\u8BE2",paraId:53,tocIndex:10},{value:"Case 7",paraId:54,tocIndex:10},{value:"\u53EF\u4EE5\u7528\u8986\u76D6\u7D22\u5F15\u4F18\u5316",paraId:55,tocIndex:10},{value:"\u4F18\u5316\u603B\u7ED3\uFF1A",paraId:4},{value:"MySQL \u652F\u6301\u4E24\u79CD\u65B9\u5F0F\u7684\u6392\u5E8F filesort \u548C index\uFF0CUsing index \u662F\u6307 MySQL \u626B\u63CF\u7D22\u5F15\u672C\u8EAB\u5B8C\u6210\u6392\u5E8F\u3002",paraId:56,tocIndex:11},{value:"index \u6548\u7387\u9AD8\uFF0Cfilesort \u6548\u7387\u4F4E",paraId:56,tocIndex:11},{value:"order by \u6EE1\u8DB3\u4E24\u79CD\u60C5\u51B5\u4F1A\u4F7F\u7528 Using index\u3002",paraId:57,tocIndex:11},{value:"order by \u8BED\u53E5",paraId:58,tocIndex:11},{value:"\u4F7F\u7528\u7D22\u5F15\u6700\u5DE6\u524D\u5217",paraId:58,tocIndex:11},{value:"\u4F7F\u7528 where \u5B50\u53E5\u4E0E order by \u5B50\u53E5",paraId:58,tocIndex:11},{value:"\u6761\u4EF6\u5217\u7EC4\u5408\u6EE1\u8DB3\u7D22\u5F15\u6700\u5DE6\u524D\u5217",paraId:58,tocIndex:11},{value:"\u3002",paraId:58,tocIndex:11},{value:"\u5C3D\u91CF\u5728\u7D22\u5F15\u5217\u4E0A\u5B8C\u6210\u6392\u5E8F",paraId:59,tocIndex:11},{value:"\uFF0C\u9075\u5FAA\u7D22\u5F15\u5EFA\u7ACB\uFF08\u7D22\u5F15\u521B\u5EFA\u7684\u987A\u5E8F\uFF09\u65F6\u7684\u6700\u5DE6\u524D\u7F00\u6CD5\u5219\u3002",paraId:59,tocIndex:11},{value:"\u5982\u679C order by \u7684\u6761\u4EF6\u4E0D\u5728\u7D22\u5F15\u5217\u4E0A\uFF0C\u5C31\u4F1A\u4EA7\u751F Using filesort",paraId:60,tocIndex:11},{value:"\u80FD\u7528\u8986\u76D6\u7D22\u5F15\u5C3D\u91CF\u7528\u8986\u76D6\u7D22\u5F15",paraId:61,tocIndex:11},{value:"group by \u4E0E order by \u5F88\u7C7B\u4F3C\uFF0C",paraId:62,tocIndex:11},{value:"\u5176\u5B9E\u8D28\u662F\u5148\u6392\u5E8F\u540E\u5206\u7EC4",paraId:62,tocIndex:11},{value:"\uFF0C\u9075\u7167\u7D22\u5F15\u521B\u5EFA\u987A\u5E8F\u7684\u6700\u5DE6\u524D\u7F00\u6CD5\u5219\u3002\u5BF9\u4E8E group by \u7684\u4F18\u5316\u5982\u679C\u4E0D\u9700\u8981\u6392\u5E8F\u7684\u53EF\u4EE5\u52A0\u4E0A ",paraId:62,tocIndex:11},{value:"order by null \u7981\u6B62\u6392\u5E8F",paraId:62,tocIndex:11},{value:"\u6CE8\u610F\uFF0Cwhere \u9AD8\u4E8E having\uFF0C\u80FD\u5199\u5728 where \u4E2D\u7684\u9650\u5B9A\u6761\u4EF6\u5C31\u4E0D\u8981\u53BB having \u9650\u5B9A\u4E86\u3002",paraId:63,tocIndex:11},{value:"Using filesort \u6587\u4EF6\u6392\u5E8F\u539F\u7406\u8BE6\u89E3",paraId:4},{value:"filesort \u6587\u4EF6\u6392\u5E8F\u65B9\u5F0F",paraId:64,tocIndex:12},{value:"\u5355\u8DEF\u6392\u5E8F\uFF1A\u662F\u4E00\u6B21\u6027\u53D6\u51FA\u6EE1\u8DB3\u6761\u4EF6\u884C\u7684\u6240\u6709\u5B57\u6BB5\uFF0C\u7136\u540E\u5728 sort buffer \u4E2D\u8FDB\u884C\u6392\u5E8F\uFF1B\u7528 trace \u5DE5\u5177\u53EF\u4EE5\u770B\u5230 sort_mode \u4FE1\u606F\u91CC\u663E\u793A <sort_key, additional_fields> \u6216\u8005 < sort_key, packed_additional_fields >",paraId:65,tocIndex:12},{value:"\u53CC\u8DEF\u6392\u5E8F\uFF08\u53C8\u53EB",paraId:66,tocIndex:12},{value:"\u56DE\u8868",paraId:66,tocIndex:12},{value:"\u6392\u5E8F\u6A21\u5F0F\uFF09\uFF1A\u662F\u9996\u5148\u6839\u636E\u76F8\u5E94\u7684\u6761\u4EF6\u53D6\u51FA\u76F8\u5E94\u7684",paraId:66,tocIndex:12},{value:"\u6392\u5E8F\u5B57\u6BB5",paraId:66,tocIndex:12},{value:"\u548C",paraId:66,tocIndex:12},{value:"\u53EF\u4EE5\u76F4\u63A5\u5B9A\u4F4D\u884C\u6570\u636E\u7684\u884C ID",paraId:66,tocIndex:12},{value:"\uFF0C\u7136\u540E\u5728 sort buffer \u4E2D\u8FDB\u884C\u6392\u5E8F\uFF0C\u6392\u5E8F\u5B8C\u540E\u9700\u8981\u518D\u6B21\u53D6\u56DE\u5176\u5B83\u9700\u8981\u7684\u5B57\u6BB5\uFF1B\u7528 trace \u5DE5\u5177\u53EF\u4EE5\u770B\u5230 sort_mode \u4FE1\u606F\u91CC\u663E\u793A <sort_key, rowid>",paraId:66,tocIndex:12},{value:"\u5355\u8DEF\uFF1A\u62FF\u5230\u6240\u6709\u7684\u6570\u636E\u8FDB\u884C\u6392\u5E8F use filesort ",paraId:67,tocIndex:12},{value:"case5",paraId:67,tocIndex:12},{value:"\uFF1B\u53CC\u8DEF\uFF1A\u53EA\u62FF\u5230ID\u548C\u6392\u5E8F\u5B57\u6BB5\u6392\u5E8F\u7136\u540E",paraId:67,tocIndex:12},{value:"\u56DE\u8868",paraId:67,tocIndex:12},{value:"MySQL \u901A\u8FC7\u6BD4\u8F83\u7CFB\u7EDF\u53D8\u91CF max_length_for_sort_data (\u9ED8\u8BA4 1024 \u5B57\u8282) \u7684\u5927\u5C0F\u548C\u9700\u8981\u67E5\u8BE2\u7684\u5B57\u6BB5\u603B\u5927\u5C0F\u6765\u5224\u65AD\u4F7F\u7528\u54EA\u79CD\u6392\u5E8F\u6A21\u5F0F\u3002",paraId:68,tocIndex:12},{value:"\u67E5\u8BE2\u6210\u672C",paraId:68,tocIndex:12},{value:"\u5982\u679C \u5B57\u6BB5\u7684\u603B\u957F\u5EA6\u5C0F\u4E8E max_length_for_sort_data \uFF0C\u90A3\u4E48\u4F7F\u7528 \u5355\u8DEF\u6392\u5E8F\u6A21\u5F0F",paraId:69,tocIndex:12},{value:"\u5982\u679C \u5B57\u6BB5\u7684\u603B\u957F\u5EA6\u5927\u4E8E max_length_for_sort_data \uFF0C\u90A3\u4E48\u4F7F\u7528 \u53CC\u8DEF\u6392\u5E8F\u6A21\u5F0F",paraId:70,tocIndex:12},{value:"\u5355\u8DEF\u6392\u5E8F",paraId:71,tocIndex:12},{value:"\u7684\u8BE6\u7EC6\u8FC7\u7A0B\uFF1A",paraId:71,tocIndex:12},{value:"\u4ECE\u7D22\u5F15 name \u627E\u5230\u7B2C\u4E00\u4E2A\u6EE1\u8DB3 name = 'cjl' \u6761\u4EF6\u7684\u4E3B\u952E id",paraId:72,tocIndex:12},{value:"\u6839\u636E\u4E3B\u952E id \u53D6\u51FA\u6574\u884C\uFF0C",paraId:72,tocIndex:12},{value:"\u53D6\u51FA\u6240\u6709\u5B57\u6BB5\u7684\u503C\uFF0C\u5B58\u5165 sort_buffer \u4E2D",paraId:72,tocIndex:12},{value:"\u4ECE\u7D22\u5F15 name \u627E\u5230\u4E0B\u4E00\u4E2A\u6EE1\u8DB3 name = \u2018cjl\u2019 \u6761\u4EF6\u7684\u4E3B\u952E id",paraId:72,tocIndex:12},{value:"\u91CD\u590D\u6B65\u9AA4 2\u30013 \u76F4\u5230\u4E0D\u6EE1\u8DB3 name = 'cjl'",paraId:72,tocIndex:12},{value:"\u5BF9 sort_buffer \u4E2D\u7684\u6570\u636E\u6309\u7167\u5B57\u6BB5 position \u8FDB\u884C\u6392\u5E8F",paraId:72,tocIndex:12},{value:"\u8FD4\u56DE\u7ED3\u679C\u7ED9\u5BA2\u6237\u7AEF",paraId:72,tocIndex:12},{value:"\u53CC\u8DEF\u6392\u5E8F",paraId:73,tocIndex:12},{value:"\u7684\u8BE6\u7EC6\u8FC7\u7A0B\uFF1A",paraId:73,tocIndex:12},{value:"\u4ECE\u7D22\u5F15 name \u627E\u5230\u7B2C\u4E00\u4E2A\u6EE1\u8DB3 name = cjl  \u7684\u4E3B\u952E id",paraId:74,tocIndex:12},{value:"\u6839\u636E\u4E3B\u952E id \u53D6\u51FA\u6574\u884C\uFF0C",paraId:74,tocIndex:12},{value:"\u628A\u6392\u5E8F\u5B57\u6BB5 position \u548C\u4E3B\u952E id \u8FD9\u4E24\u4E2A\u5B57\u6BB5\u653E\u5230 sort buffer \u4E2D",paraId:74,tocIndex:12},{value:"\u4ECE\u7D22\u5F15 name \u53D6\u4E0B\u4E00\u4E2A\u6EE1\u8DB3 name = cjl  \u8BB0\u5F55\u7684\u4E3B\u952E id",paraId:74,tocIndex:12},{value:"\u91CD\u590D 3\u30014 \u76F4\u5230\u4E0D\u6EE1\u8DB3 name = cjl",paraId:74,tocIndex:12},{value:"\u5BF9 sort_buffer \u4E2D\u7684\u5B57\u6BB5 position \u548C\u4E3B\u952E id \u6309\u7167\u5B57\u6BB5 position \u8FDB\u884C\u6392\u5E8F",paraId:74,tocIndex:12},{value:"\u904D\u5386\u6392\u5E8F\u597D\u7684 id \u548C\u5B57\u6BB5 position\uFF0C\u6309\u7167 id \u7684\u503C",paraId:74,tocIndex:12},{value:"\u56DE\u5230\u539F\u8868",paraId:74,tocIndex:12},{value:"\u4E2D\u53D6\u51FA \u6240\u6709\u5B57\u6BB5\u7684\u503C\u8FD4\u56DE\u7ED9\u5BA2\u6237\u7AEF",paraId:74,tocIndex:12},{value:"\u5176\u5B9E\u5BF9\u6BD4\u4E24\u4E2A\u6392\u5E8F\u6A21\u5F0F\uFF0C\u5355\u8DEF\u6392\u5E8F\u4F1A\u628A\u6240\u6709\u9700\u8981\u67E5\u8BE2\u7684\u5B57\u6BB5\u90FD\u653E\u5230 sort buffer \u4E2D\uFF0C\u800C\u53CC\u8DEF\u6392\u5E8F\u53EA\u4F1A\u628A\u4E3B\u952E\u548C\u9700\u8981\u6392\u5E8F\u7684\u5B57\u6BB5\u653E\u5230 sort buffer \u4E2D\u8FDB\u884C\u6392\u5E8F\uFF0C\u7136\u540E\u518D\u901A\u8FC7\u4E3B\u952E\u56DE\u5230\u539F\u8868\u67E5\u8BE2\u9700\u8981\u7684\u5B57\u6BB5\u3002",paraId:75,tocIndex:12},{value:"\u5982\u679C MySQL ",paraId:76,tocIndex:12},{value:"\u6392\u5E8F\u5185\u5B58",paraId:76,tocIndex:12},{value:" ",paraId:76,tocIndex:12},{value:"sort_buffer",paraId:76,tocIndex:12},{value:"  \u914D\u7F6E\u7684\u6BD4\u8F83\u5C0F\u5E76\u4E14\u6CA1\u6709\u6761\u4EF6\u7EE7\u7EED\u589E\u52A0\u4E86\uFF0C\u53EF\u4EE5\u9002\u5F53\u628A max_length_for_sort_data \u914D\u7F6E\u5C0F\u70B9\uFF0C\u8BA9\u4F18\u5316\u5668\u9009\u62E9\u4F7F\u7528",paraId:76,tocIndex:12},{value:"\u53CC\u8DEF\u6392\u5E8F",paraId:76,tocIndex:12},{value:"\u7B97\u6CD5\uFF0C\u53EF\u4EE5\u5728 sort_buffer \u4E2D\u4E00\u6B21\u6392\u5E8F\u66F4\u591A\u7684\u884C\uFF0C\u53EA\u662F\u9700\u8981\u518D\u6839\u636E\u4E3B\u952E\u56DE\u5230\u539F\u8868\u53D6\u6570\u636E\u3002",paraId:76,tocIndex:12},{value:"\u5982\u679C MySQL \u6392\u5E8F\u5185\u5B58\u6709\u6761\u4EF6\u53EF\u4EE5\u914D\u7F6E\u6BD4\u8F83\u5927\uFF0C\u53EF\u4EE5\u9002\u5F53\u589E\u5927 max_length_for_sort_data \u7684\u503C\uFF0C\u8BA9\u4F18\u5316\u5668\u4F18\u5148\u9009\u62E9\u5168\u5B57\u6BB5\u6392\u5E8F (",paraId:77,tocIndex:12},{value:"\u5355\u8DEF\u6392\u5E8F",paraId:77,tocIndex:12},{value:")\uFF0C\u628A\u9700\u8981\u7684\u5B57\u6BB5\u653E\u5230 sort_buffer \u4E2D\uFF0C\u8FD9\u6837\u6392\u5E8F\u540E\u5C31\u4F1A\u76F4\u63A5\u4ECE\u5185\u5B58\u91CC\u8FD4\u56DE\u67E5\u8BE2\u7ED3\u679C\u4E86\u3002",paraId:77,tocIndex:12},{value:"\u6240\u4EE5\uFF0CMySQL \u901A\u8FC7 ",paraId:78,tocIndex:12},{value:"max_length_for_sort_data",paraId:78,tocIndex:12},{value:" \u8FD9\u4E2A\u53C2\u6570\u6765\u63A7\u5236\u6392\u5E8F\uFF0C\u5728\u4E0D\u540C\u573A\u666F\u4F7F\u7528\u4E0D\u540C\u7684\u6392\u5E8F\u6A21\u5F0F\uFF0C\u4ECE\u800C\u63D0\u5347\u6392\u5E8F\u6548\u7387\u3002",paraId:78,tocIndex:12},{value:"\u5982\u679C\u5168\u90E8\u4F7F\u7528 sort_buffer \u5185\u5B58\u6392\u5E8F\u4E00\u822C\u60C5\u51B5\u4E0B\u6548\u7387\u4F1A\u9AD8\u4E8E\u78C1\u76D8\u6587\u4EF6\u6392\u5E8F\uFF0C\u4F46\u4E0D\u80FD\u56E0\u4E3A\u8FD9\u4E2A\u5C31\u968F\u4FBF\u589E\u5927 sort_buffer (\u9ED8\u8BA4 1M)\uFF0Cmysql \u5F88\u591A\u53C2\u6570\u8BBE\u7F6E\u90FD\u662F\u505A\u8FC7\u4F18\u5316\u7684\uFF0C\u4E0D\u8981\u8F7B\u6613\u8C03\u6574\u3002",paraId:79,tocIndex:12},{value:"\u53EA\u8981\u4E86\u89E3\u5355\u53CC\u8DEF\u6392\u5E8F\u5373\u53EF",paraId:80,tocIndex:12},{value:"\u56DB. \u7D22\u5F15\u8BBE\u8BA1\u539F\u5219",paraId:4},{value:"1\u3001\u4EE3\u7801\u5148\u884C\uFF0C\u7D22\u5F15\u540E\u4E0A",paraId:4},{value:"\u4E00\u822C\u662F\u600E\u4E48\u7ED9\u6570\u636E\u8868\u5EFA\u7ACB\u7D22\u5F15\u7684\uFF0C\u662F\u5EFA\u5B8C\u8868\u9A6C\u4E0A\u5C31\u5EFA\u7ACB\u7D22\u5F15\u5417\uFF1F",paraId:81,tocIndex:14},{value:"\u8FD9\u5176\u5B9E\u662F\u4E0D\u5BF9\u7684\uFF0C\u4E00\u822C\u5E94\u8BE5",paraId:82,tocIndex:14},{value:"\u7B49\u5230\u4E3B\u4F53\u4E1A\u52A1\u529F\u80FD\u5F00\u53D1\u5B8C\u6BD5\uFF0C\u628A\u6D89\u53CA\u5230\u8BE5\u8868\u76F8\u5173 sql \u90FD\u8981\u62FF\u51FA\u6765\u5206\u6790\u4E4B\u540E\u518D\u5EFA\u7ACB\u7D22\u5F15",paraId:82,tocIndex:14},{value:"\u3002",paraId:82,tocIndex:14},{value:"2\u3001\u8054\u5408\u7D22\u5F15\u5C3D\u91CF\u8986\u76D6\u6761\u4EF6",paraId:4},{value:"\u6BD4\u5982\u53EF\u4EE5\u8BBE\u8BA1\u4E00\u4E2A\u6216\u8005\u4E24\u4E09\u4E2A\u8054\u5408\u7D22\u5F15 (",paraId:83,tocIndex:15},{value:"\u5C3D\u91CF\u5C11\u5EFA\u5355\u503C\u7D22\u5F15",paraId:83,tocIndex:15},{value:")\uFF0C\u8BA9\u6BCF\u4E00\u4E2A\u8054\u5408\u7D22\u5F15\u90FD\u5C3D\u91CF\u53BB\u5305\u542B sql \u8BED\u53E5\u91CC\u7684 where\u3001order by\u3001group by \u7684\u5B57\u6BB5\uFF0C\u8FD8\u8981\u786E\u4FDD\u8FD9\u4E9B\u8054\u5408\u7D22\u5F15\u7684\u5B57\u6BB5\u987A\u5E8F\u5C3D\u91CF\u6EE1\u8DB3 sql \u67E5\u8BE2\u7684\u6700\u5DE6\u524D\u7F00\u539F\u5219\u3002",paraId:83,tocIndex:15},{value:"3\u3001\u4E0D\u8981\u5728\u5C0F\u57FA\u6570\u5B57\u6BB5\u4E0A\u5EFA\u7ACB\u7D22\u5F15",paraId:4},{value:"\u7D22\u5F15\u57FA\u6570\u662F\u6307\u8FD9\u4E2A\u5B57\u6BB5\u5728\u8868\u91CC\u603B\u5171\u6709\u591A\u5C11\u4E2A\u4E0D\u540C\u7684\u503C\uFF0C\u6BD4\u5982\u4E00\u5F20\u8868\u603B\u5171 100 \u4E07\u884C\u8BB0\u5F55\uFF0C\u5176\u4E2D\u6709\u4E2A\u6027\u522B\u5B57\u6BB5\uFF0C\u5176\u503C\u4E0D\u662F\u7537\u5C31\u662F\u5973\uFF0C\u90A3\u4E48\u8BE5\u5B57\u6BB5\u7684\u57FA\u6570\u5C31\u662F 2\u3002",paraId:84,tocIndex:16},{value:"\u5982\u679C\u5BF9\u8FD9\u79CD\u5C0F\u57FA\u6570\u5B57\u6BB5\u5EFA\u7ACB\u7D22\u5F15\u7684\u8BDD\uFF0C\u8FD8\u4E0D\u5982\u5168\u8868\u626B\u63CF\u4E86\uFF0C\u56E0\u4E3A\u4F60\u7684\u7D22\u5F15\u6811\u91CC\u5C31\u5305\u542B\u7537\u548C\u5973\u4E24\u79CD\u503C\uFF0C\u6839\u672C",paraId:85,tocIndex:16},{value:"\u6CA1\u6CD5\u8FDB\u884C\u5FEB\u901F\u7684\u4E8C\u5206\u67E5\u627E",paraId:85,tocIndex:16},{value:"\uFF0C\u90A3\u7528\u7D22\u5F15\u5C31\u6CA1\u6709\u592A\u5927\u7684\u610F\u4E49\u4E86\u3002",paraId:85,tocIndex:16},{value:"\u4E00\u822C\u5EFA\u7ACB\u7D22\u5F15\uFF0C\u5C3D\u91CF\u4F7F\u7528\u90A3\u4E9B\u57FA\u6570\u6BD4\u8F83\u5927\u7684\u5B57\u6BB5\uFF0C\u5C31\u662F\u503C\u6BD4\u8F83\u591A\u7684\u5B57\u6BB5\uFF0C\u90A3\u4E48\u624D\u80FD\u53D1\u6325\u51FA B + \u6811\u5FEB\u901F\u4E8C\u5206\u67E5\u627E\u7684\u4F18\u52BF\u6765\u3002",paraId:86,tocIndex:16},{value:"4\u3001\u957F\u5B57\u7B26\u4E32\u6211\u4EEC\u53EF\u4EE5\u91C7\u7528\u524D\u7F00\u7D22\u5F15",paraId:4},{value:"\u5C3D\u91CF\u5BF9\u5B57\u6BB5\u7C7B\u578B\u8F83\u5C0F\u7684\u5217\u8BBE\u8BA1\u7D22\u5F15\uFF0C\u6BD4\u5982\u8BF4\u4EC0\u4E48 tinyint \u4E4B\u7C7B\u7684\uFF0C\u56E0\u4E3A\u5B57\u6BB5\u7C7B\u578B\u8F83\u5C0F\u7684\u8BDD\uFF0C",paraId:87,tocIndex:17},{value:"\u5360\u7528\u78C1\u76D8\u7A7A\u95F4\u4E5F\u4F1A\u6BD4\u8F83\u5C0F",paraId:87,tocIndex:17},{value:"\uFF0C\u6B64\u65F6\u4F60\u5728\u641C\u7D22\u7684\u65F6\u5019\u6027\u80FD\u4E5F\u4F1A\u6BD4\u8F83\u597D\u4E00\u70B9\u3002",paraId:87,tocIndex:17},{value:"\u5F53\u7136\uFF0C\u8FD9\u4E2A\u6240\u8C13\u7684\u5B57\u6BB5\u7C7B\u578B\u5C0F\u4E00\u70B9\u7684\u5217\uFF0C\u4E5F\u4E0D\u662F\u7EDD\u5BF9\u7684\uFF0C\u5F88\u591A\u65F6\u5019\u4F60\u5C31\u662F\u8981\u9488\u5BF9 varchar (255) \u8FD9\u79CD\u5B57\u6BB5\u5EFA\u7ACB\u7D22\u5F15\uFF0C\u54EA\u6015\u591A\u5360\u7528\u4E00\u4E9B\u78C1\u76D8\u7A7A\u95F4\u4E5F\u662F\u6709\u5FC5\u8981\u7684\u3002",paraId:88,tocIndex:17},{value:"\u5BF9\u4E8E\u8FD9\u79CD varchar (255) \u7684\u5927\u5B57\u6BB5\u53EF\u80FD\u4F1A\u6BD4\u8F83\u5360\u7528\u78C1\u76D8\u7A7A\u95F4\uFF0C\u53EF\u4EE5\u7A0D\u5FAE\u4F18\u5316\u4E0B\uFF0C\u6BD4\u5982\u9488\u5BF9\u8FD9\u4E2A\u5B57\u6BB5\u7684\u524D 20 \u4E2A\u5B57\u7B26\u5EFA\u7ACB\u7D22\u5F15\uFF0C\u5C31\u662F\u8BF4\uFF0C\u5BF9\u8FD9\u4E2A\u5B57\u6BB5\u91CC\u7684\u6BCF\u4E2A\u503C\u7684\u524D 20 \u4E2A\u5B57\u7B26\u653E\u5728\u7D22\u5F15\u6811\u91CC\uFF0C\u7C7B\u4F3C\u4E8E KEY index (name (20),age,position)\u3002",paraId:89,tocIndex:17},{value:"\u6B64\u65F6\u4F60\u5728 where \u6761\u4EF6\u91CC\u641C\u7D22\u7684\u65F6\u5019\uFF0C\u5982\u679C\u662F\u6839\u636E name \u5B57\u6BB5\u6765\u641C\u7D22\uFF0C\u90A3\u4E48\u6B64\u65F6\u5C31\u4F1A\u5148\u5230\u7D22\u5F15\u6811\u91CC\u6839\u636E name \u5B57\u6BB5\u7684\u524D 20 \u4E2A\u5B57\u7B26\u53BB\u641C\u7D22\uFF0C\u5B9A\u4F4D\u5230\u4E4B\u540E\u524D 20 \u4E2A\u5B57\u7B26\u7684\u524D\u7F00\u5339\u914D\u7684\u90E8\u5206\u6570\u636E\u4E4B\u540E\uFF0C\u518D\u56DE\u5230\u805A\u7C07\u7D22\u5F15\u63D0\u53D6\u51FA\u6765\u5B8C\u6574\u7684 name \u5B57\u6BB5\u503C\u8FDB\u884C\u6BD4\u5BF9\u3002",paraId:90,tocIndex:17},{value:"\u4F46\u662F\u5047\u5982\u4F60\u8981\u662F order by name\uFF0C\u90A3\u4E48\u6B64\u65F6\u4F60\u7684 name \u56E0\u4E3A\u5728\u7D22\u5F15\u6811\u91CC\u4EC5\u4EC5\u5305\u542B\u4E86\u524D 20 \u4E2A\u5B57\u7B26\uFF0C\u6240\u4EE5\u8FD9\u4E2A\u6392\u5E8F\u662F\u6CA1\u6CD5\u7528\u4E0A\u7D22\u5F15\u7684\uFF0C group by \u4E5F\u662F\u540C\u7406\u3002\u6240\u4EE5\u8FD9\u91CC\u5927\u5BB6\u8981\u5BF9\u524D\u7F00\u7D22\u5F15\u6709\u4E00\u4E2A\u4E86\u89E3\u3002",paraId:91,tocIndex:17},{value:"5\u3001where \u4E0E order by \u51B2\u7A81\u65F6\u4F18\u5148 where",paraId:4},{value:"\u5728 where \u548C order by \u51FA\u73B0\u7D22\u5F15\u8BBE\u8BA1\u51B2\u7A81\u65F6\uFF0C\u5230\u5E95\u662F\u9488\u5BF9 where \u53BB\u8BBE\u8BA1\u7D22\u5F15\uFF0C\u8FD8\u662F\u9488\u5BF9 order by \u8BBE\u8BA1\u7D22\u5F15\uFF1F\u5230\u5E95\u662F\u8BA9 where \u53BB\u7528\u4E0A\u7D22\u5F15\uFF0C\u8FD8\u662F\u8BA9 order by \u7528\u4E0A\u7D22\u5F15\uFF1F",paraId:92,tocIndex:18},{value:"\u4E00\u822C\u8FD9\u79CD\u65F6\u5019\u5F80\u5F80\u90FD\u662F\u8BA9 where \u6761\u4EF6\u53BB\u4F7F\u7528\u7D22\u5F15\u6765\u5FEB\u901F\u7B5B\u9009\u51FA\u6765\u4E00\u90E8\u5206\u6307\u5B9A\u7684\u6570\u636E\uFF0C\u63A5\u7740\u518D\u8FDB\u884C\u6392\u5E8F\u3002",paraId:93,tocIndex:18},{value:"\u56E0\u4E3A\u5927\u591A\u6570\u60C5\u51B5\u57FA\u4E8E\u7D22\u5F15\u8FDB\u884C where \u7B5B\u9009\u5F80\u5F80\u53EF\u4EE5\u6700\u5FEB\u901F\u5EA6\u7B5B\u9009\u51FA\u4F60\u8981\u7684\u5C11\u90E8\u5206\u6570\u636E\uFF0C\u7136\u540E\u505A\u6392\u5E8F\u7684\u6210\u672C\u53EF\u80FD\u4F1A\u5C0F\u5F88\u591A\u3002",paraId:94,tocIndex:18},{value:"6\u3001\u57FA\u4E8E\u6162 sql \u67E5\u8BE2\u505A\u4F18\u5316",paraId:4},{value:"\u53EF\u4EE5\u6839\u636E\u76D1\u63A7\u540E\u53F0\u7684\u4E00\u4E9B\u6162 sql\uFF0C\u9488\u5BF9\u8FD9\u4E9B\u6162 sql \u67E5\u8BE2\u505A\u7279\u5B9A\u7684\u7D22\u5F15\u4F18\u5316\u3002",paraId:95,tocIndex:19},{value:"\u4E94. \u7D22\u5F15\u8BBE\u8BA1\u5B9E\u6218",paraId:4},{value:"\u200B	\u4EE5\u793E\u4EA4\u573A\u666F APP \u6765\u4E3E\u4F8B\uFF0C\u6211\u4EEC\u4E00\u822C\u4F1A\u53BB\u641C\u7D22\u4E00\u4E9B\u597D\u53CB\uFF0C\u8FD9\u91CC\u9762\u5C31\u6D89\u53CA\u5230\u5BF9\u7528\u6237\u4FE1\u606F\u7684\u7B5B\u9009\uFF0C\u5C31\u662F\u5BF9\u7528\u6237 user \u8868\u641C\u7D22\u4E86\u3002\u8FD9\u4E2A\u8868\u4E00\u822C\u6765\u8BF4\u6570\u636E\u91CF\u4F1A\u6BD4\u8F83\u5927\uFF0C\u6211\u4EEC\u5148\u4E0D\u8003\u8651\u5206\u5E93\u5206\u8868\u7684\u60C5\u51B5\uFF0C\u6BD4\u5982\uFF0C\u6211\u4EEC\u4E00\u822C\u4F1A",paraId:96,tocIndex:20},{value:"\u7B5B\u9009\u5730\u533A (\u7701\u5E02)\uFF0C\u6027\u522B\uFF0C\u5E74\u9F84\uFF0C\u8EAB\u9AD8\uFF0C\u7231\u597D",paraId:96,tocIndex:20},{value:"\u4E4B\u7C7B\u7684\uFF0C\u6709\u7684 APP \u53EF\u80FD\u7528\u6237\u8FD8\u6709\u8BC4\u5206\uFF0C\u6BD4\u5982\u7528\u6237\u7684",paraId:96,tocIndex:20},{value:"\u53D7\u6B22\u8FCE\u7A0B\u5EA6\u8BC4\u5206",paraId:96,tocIndex:20},{value:"\uFF0C\u6211\u4EEC\u53EF\u80FD\u8FD8\u4F1A\u6839\u636E\u8BC4\u5206\u6765\u6392\u5E8F\u7B49\u7B49\u3002",paraId:96,tocIndex:20},{value:"\u200B	\u5BF9\u4E8E\u540E\u53F0\u7A0B\u5E8F\u6765\u8BF4\u9664\u4E86\u8FC7\u6EE4\u7528\u6237\u7684\u5404\u79CD\u6761\u4EF6\uFF0C\u8FD8\u9700\u8981\u5206\u9875\u4E4B\u7C7B\u7684\u5904\u7406\uFF0C\u53EF\u80FD\u4F1A\u751F\u6210\u7C7B\u4F3C sql \u8BED\u53E5\u6267\u884C\uFF1A",paraId:97,tocIndex:20},{value:"select xx from user where xx=xx and xx=xx order by xx limit xx,xx",paraId:98,tocIndex:20},{value:"\u200B	",paraId:99,tocIndex:20},{value:"\u5BF9\u4E8E\u8FD9\u79CD\u60C5\u51B5\u5982\u4F55\u5408\u7406\u8BBE\u8BA1\u7D22\u5F15\uFF1F",paraId:99,tocIndex:20},{value:"\u6BD4\u5982\u7528\u6237\u53EF\u80FD\u7ECF\u5E38\u4F1A\u6839\u636E\u7701\u5E02\u4F18\u5148\u7B5B\u9009\u540C\u57CE\u7684\u7528\u6237\uFF0C\u8FD8\u6709\u6839\u636E\u6027\u522B\u53BB\u7B5B\u9009\uFF0C\u90A3\u6211\u4EEC\u662F\u5426",paraId:100,tocIndex:20},{value:"\u5E94\u8BE5\u8BBE\u8BA1\u4E00\u4E2A\u8054\u5408\u7D22\u5F15  (province,city,sex)",paraId:100,tocIndex:20},{value:" \u4E86\uFF1F\u8FD9\u4E9B\u5B57\u6BB5\u597D\u50CF\u57FA\u6570\u90FD\u4E0D\u5927\uFF0C\u5176\u5B9E\u662F\u5E94\u8BE5\u7684\uFF0C\u56E0\u4E3A\u8FD9\u4E9B\u5B57\u6BB5\u67E5\u8BE2\u592A\u9891\u7E41\u4E86\u3002",paraId:100,tocIndex:20},{value:"\u5047\u8BBE\u53C8\u6709\u7528\u6237\u6839\u636E\u5E74\u9F84\u8303\u56F4\u53BB\u7B5B\u9009\u4E86\uFF0C\u6BD4\u5982 ",paraId:101,tocIndex:20},{value:"where  province=xx and city=xx and age>=xx and age<=xx",paraId:101,tocIndex:20},{value:"\uFF0C\u6211\u4EEC\u5C1D\u8BD5\u7740\u628A age \u5B57\u6BB5\u52A0\u5165\u8054\u5408\u7D22\u5F15 (province,city,sex,age)",paraId:101,tocIndex:20},{value:"\u6CE8\u610F\uFF0C\u4E00\u822C\u8FD9\u79CD\u8303\u56F4\u67E5\u627E\u7684\u6761\u4EF6\u90FD\u8981\u653E\u5728\u6700\u540E",paraId:102,tocIndex:20},{value:"\u8054\u5408\u7D22\u5F15\u8303\u56F4\u4E4B\u540E\u6761\u4EF6\u7684\u662F\u4E0D\u80FD\u7528\u7D22\u5F15\u7684\uFF0C\u4F46\u662F\u5BF9\u4E8E\u5F53\u524D\u8FD9\u79CD\u60C5\u51B5\u4F9D\u7136\u7528\u4E0D\u5230 age \u8FD9\u4E2A\u7D22\u5F15\u5B57\u6BB5\uFF0C\u56E0\u4E3A\u7528\u6237\u6CA1\u6709\u7B5B\u9009 sex \u5B57\u6BB5\uFF0C\u90A3\u600E\u4E48\u4F18\u5316\u4E86\uFF1F\u5176\u5B9E\u53EF\u4EE5\u8FD9\u4E48\u6765\u4F18\u5316\u4E0B sql \u7684\u5199\u6CD5\uFF1A",paraId:103,tocIndex:20},{value:"where  province=xx and city=xx and sex in ('female','male') and age>=xx and age<=xx",paraId:104,tocIndex:20},{value:"\u5BF9\u4E8E\u7231\u597D\u4E4B\u7C7B\u7684\u5B57\u6BB5\u4E5F\u53EF\u4EE5\u7C7B\u4F3C sex \u5B57\u6BB5\u5904\u7406\uFF0C\u6240\u4EE5\u53EF\u4EE5\u628A\u7231\u597D\u5B57\u6BB5\u4E5F\u52A0\u5165\u7D22\u5F15 ",paraId:105,tocIndex:20},{value:"province,city,sex,hobby,age",paraId:105,tocIndex:20},{value:"\u5047\u8BBE\u53EF\u80FD\u8FD8\u6709\u4E00\u4E2A\u7B5B\u9009\u6761\u4EF6\uFF0C\u6BD4\u5982\u8981\u7B5B\u9009\u6700\u8FD1\u4E00\u5468\u767B\u5F55\u8FC7\u7684\u7528\u6237\uFF0C\u4E00\u822C\u5927\u5BB6\u80AF\u5B9A\u5E0C\u671B\u8DDF\u6D3B\u8DC3\u7528\u6237\u4EA4\u53CB\u4E86\uFF0C\u8FD9\u6837\u80FD\u5C3D\u5FEB\u6536\u5230\u53CD\u9988\uFF0C\u5BF9\u5E94\u540E\u53F0 sql \u53EF\u80FD\u662F\u8FD9\u6837\uFF1A",paraId:106,tocIndex:20},{value:"where  province=xx and city=xx and sex in ('female','male') and age>=xx and age<=xx and latest_login_time>= xx",paraId:107,tocIndex:20},{value:"**\u90A3\u6211\u4EEC\u662F\u5426\u80FD\u628A latest_login_time \u5B57\u6BB5\u4E5F\u52A0\u5165\u7D22\u5F15\u4E86\uFF1F**\u6BD4\u5982  (province,city,sex,hobby,age,latest_login_time) \uFF0C",paraId:108,tocIndex:20},{value:"\u663E\u7136\u662F\u4E0D\u884C\u7684\uFF0C\u90A3\u600E\u4E48\u6765\u4F18\u5316\u8FD9\u79CD\u60C5\u51B5\u4E86\uFF1F",paraId:109,tocIndex:20},{value:"\u5176\u5B9E\u6211\u4EEC\u53EF\u4EE5\u8BD5\u7740\u518D\u8BBE\u8BA1\u4E00\u4E2A\u5B57\u6BB5 is_login_in_latest_7_days",paraId:110,tocIndex:20},{value:"\uFF0C\u7528\u6237\u5982\u679C\u4E00\u5468\u5185\u6709\u767B\u5F55\u503C\u5C31\u4E3A 1\uFF0C\u5426\u5219\u4E3A 0\uFF0C\u90A3\u4E48\u6211\u4EEC\u5C31\u53EF\u4EE5\u628A\u7D22\u5F15\u8BBE\u8BA1\u6210 (province,city,sex,hobby,is_login_in_latest_7_days,age)  \u6765\u6EE1\u8DB3\u4E0A\u9762\u90A3\u79CD\u573A\u666F\u4E86",paraId:110,tocIndex:20},{value:"\u4E00\u822C\u6765\u8BF4\uFF0C\u901A\u8FC7\u8FD9\u4E48\u4E00\u4E2A\u591A\u5B57\u6BB5\u7684\u7D22\u5F15\u662F\u80FD\u591F\u8FC7\u6EE4\u6389\u7EDD\u5927\u90E8\u5206\u6570\u636E\u7684\uFF0C\u5C31\u4FDD\u7559\u5C0F\u90E8\u5206\u6570\u636E\u4E0B\u6765\u57FA\u4E8E\u78C1\u76D8\u6587\u4EF6\u8FDB\u884C order by \u8BED\u53E5\u7684\u6392\u5E8F\uFF0C\u6700\u540E\u57FA\u4E8E limit \u8FDB\u884C\u5206\u9875\uFF0C\u90A3\u4E48\u4E00\u822C\u6027\u80FD\u8FD8\u662F\u6BD4\u8F83\u9AD8\u7684\u3002",paraId:111,tocIndex:20},{value:"\u4E0D\u8FC7\u6709\u65F6\u53EF\u80FD\u7528\u6237\u4F1A\u8FD9\u4E48\u6765\u67E5\u8BE2\uFF0C\u5C31\u67E5\u4E0B\u53D7\u6B22\u8FCE\u5EA6\u8F83\u9AD8\u7684\u5973\u6027\uFF0C\u6BD4\u5982 ",paraId:112,tocIndex:20},{value:"sql\uFF1Awhere  sex = 'female'  order by score limit xx,xx",paraId:112,tocIndex:20},{value:"\uFF0C\u90A3\u4E48\u4E0A\u9762\u90A3\u4E2A\u7D22\u5F15\u662F\u5F88\u96BE\u7528\u4E0A\u7684\uFF0C\u4E0D\u80FD\u628A\u592A\u591A\u7684\u5B57\u6BB5\u4EE5\u53CA\u592A\u591A\u7684\u503C\u90FD\u7528 in \u8BED\u53E5\u62FC\u63A5\u5230 sql \u91CC\u7684\uFF0C\u90A3\u600E\u4E48\u529E\uFF1F",paraId:112,tocIndex:20},{value:"\u5176\u5B9E\u6211\u4EEC\u53EF\u4EE5\u518D\u8BBE\u8BA1\u4E00\u4E2A\u8F85\u52A9\u7684\u8054\u5408\u7D22\u5F15\uFF0C\u6BD4\u5982 (sex,score)\uFF0C\u8FD9\u6837\u5C31\u80FD\u6EE1\u8DB3\u67E5\u8BE2\u8981\u6C42\u4E86\u3002",paraId:113,tocIndex:20},{value:"\u4EE5\u4E0A\u5C31\u662F\u7ED9\u5927\u5BB6\u8BB2\u7684\u4E00\u4E9B\u7D22\u5F15\u8BBE\u8BA1\u7684\u601D\u8DEF\u4E86\uFF0C",paraId:114,tocIndex:20},{value:"\u6838\u5FC3\u601D\u60F3\u5C31\u662F\uFF1A\u5C3D\u91CF\u5229\u7528\u4E00\u4E24\u4E2A\u590D\u6742\u7684\u591A\u5B57\u6BB5\u8054\u5408\u7D22\u5F15\uFF0C\u6297\u4E0B\u4F60 80% \u4EE5\u4E0A\u7684\u67E5\u8BE2\uFF0C\u7136\u540E\u7528\u4E00\u4E24\u4E2A\u8F85\u52A9\u7D22\u5F15\u5C3D\u91CF\u6297\u4E0B\u5269\u4F59\u7684\u4E00\u4E9B\u975E\u5178\u578B\u67E5\u8BE2",paraId:114,tocIndex:20},{value:"\uFF0C\u4FDD\u8BC1\u8FD9\u79CD\u5927\u6570\u636E\u91CF\u8868\u7684\u67E5\u8BE2\u5C3D\u53EF\u80FD\u591A\u7684\u90FD\u80FD\u5145\u5206\u5229\u7528\u7D22\u5F15\uFF0C\u8FD9\u6837\u5C31\u80FD\u4FDD\u8BC1\u4F60\u7684\u67E5\u8BE2\u901F\u5EA6\u548C\u6027\u80FD\u4E86\uFF01",paraId:114,tocIndex:20}]}}]);
