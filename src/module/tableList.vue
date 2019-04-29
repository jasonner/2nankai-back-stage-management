<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" @selection-change="selectionChange">
    		<el-table-column type="selection" width="40" v-if="checkBox">
        </el-table-column>
        <el-table-column v-for="(column, index) in columns" v-if="column.sortable" sortable :index="index" :class-name="column.className" :prop="column.prop" :label="column.label" :fixed="column.fixed" :width="column.width">
            <template slot-scope="scope">
                    <my-render v-if="column.render" :row="scope.row" :render="column.render" :index="index" :rowIndex = "scope.$index">
                    </my-render>
                    <span v-else-if="column.order">
                      {{scope.$index+1+(pageNum-1)*pageSize}}
                    </span>
                    <span v-else-if="column.html" v-html="scope.row[column.prop]">
                    </span>
                    <span v-else>
                    {{scope.row[column.prop]}}
                    </span>
            </template>
        </el-table-column>
        
        <el-table-column v-else :index="index" :prop="column.prop" :label="column.label" :class-name="column.className" :fixed="column.fixed" :width="column.width">
            <template slot-scope="scope">
                    <my-render v-if="column.render" :row="scope.row" :render="column.render" :index="index" :rowIndex = "scope.$index">
                    </my-render>
                    <span v-else-if="column.order">
                      {{scope.$index+1+(pageNum-1)*pageSize}}
                    </span>
                    <span v-else-if="column.html" v-html="scope.row[column.prop]">
                    </span>
                    <span v-else>
                    {{scope.row[column.prop]}}
                    </span>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination style="margin-top:10px;text-align:right"
        @current-change="CurrentChange"
        :current-page="pageNum"
        :page-size="pageSize"
        prev-text="上一页"
        next-text="下一页"
        layout="total,jumper, prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>

import MyRender from "./MyRender.vue";
export default {
  data () {
    return {
    }
  },
  props: {
    tableData: Array,
    columns: Array,
    checkBox:Boolean,
    pageNum: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    total:{ type: Number, default:0}
  },
  components:{
    MyRender
  },
  methods:{
    CurrentChange(val){
        this.$emit('CurrentChange',val)
    },
    selectionChange:function(selections){
        this.$emit("selectionChange",selections);
    }
  },
  mounted() {
    // console.log(this.pageNum)
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
