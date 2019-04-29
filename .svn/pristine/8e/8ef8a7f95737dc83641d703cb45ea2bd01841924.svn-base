<template>
	<div>
		
  <span v-for="item in moreButton.items" v-if="item.hover" style="margin:0 5px;">		
	  <el-popover trigger="hover">    
		   <div><el-button size="mini" type="text" @click="handleCommand(item.func1)">用户分配</el-button></div>
		   <div><el-button size="mini" type="text" @click="handleCommand(item.func2)">权限修改</el-button> </div>
		   <div><el-button size="mini" type="text" @click="handleCommand(item.func3)">停用/启用</el-button></div>
		   
		   <i slot="reference" :class="item.icon" @click="handleCommand(item.func)" style="color:#942987;cursor:pointer;"></i>
		   
	  	  <!--<el-button slot="reference" @click="handleCommand(item.func)" :type="item.type" size="mini">{{item.label}}</el-button>-->
	  </el-popover>
  </span>
  <span v-else style="margin:0 5px;">
  	<i :class="item.icon" @click="handleCommand(item.func)" style="color:#942987;cursor:pointer;font-style:normal;">{{item.label}}</i>
  	 <!--<el-button @click="handleCommand(item.func)" :type="item.type" size="mini">{{item.hover}}{{item.label}}</el-button>-->
  </span> 
  
  
  </div>
</template>
<script>
  export default {
    props: ["moreButton"],
    methods: {
      handleCommand(command) {
        this.$emit(command.func, command.rowList);
      }
    }
  };
</script>