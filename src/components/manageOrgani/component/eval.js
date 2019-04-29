/**
* @Author: wujie
* @Date:   2018-08-24 12:06:49
*/
'use strict'
import Vue from 'vue'
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(function(record) {
    if (record.expanded === false) {
      Vue.set(record, 'expanded', expandAll)
    }
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record);
  })
  return tmp
}
