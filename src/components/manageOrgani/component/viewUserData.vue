<template>
  <div>
    <el-container>
      <el-aside width="300px" class="showDetailAside">
        <img src="../../../../static/userLogo.gif" alt="" class="image">
        <div>{{userDetalData.realname}}</div>
        <!--邮箱-->
        <div class="three-party-binding" style="border: none;height: 40px">
          <i class="iconfont icon-youxiang" style="color: #862a7a;float: left;" v-if="userDetalData.email && userDetalData.email != '' "> {{userDetalData.email}}</i>
          <i class="iconfont icon-youxiang" style="color: #862a7a;float: left;" v-if="!userDetalData.email||userDetalData.email == '' "></i><span v-if="!userDetalData.email||userDetalData.email == '' " style="margin-left: 20px;float: left">无</span>
          <span style="color: #00ff00;float: right" v-if="userDetalData.bindemail">已绑定</span>
          <span style="color: #dd6161;float: right" v-if="!userDetalData.bindemail|| userDetalData.bindemail==''">未绑定</span>
        </div>
        <!--手机号-->
        <div class="three-party-binding" style="border: none;height: 40px">
          <i class="iconfont icon-shouji" style="color: #862a7a;float: left;" v-if="userDetalData.phone && userDetalData.phone != '' "> {{userDetalData.phone}}</i>
          <i class="iconfont icon-shouji" style="color: #862a7a;float: left;" v-if="!userDetalData.phone||userDetalData.phone == '' "></i><span v-if="!userDetalData.phone||userDetalData.phone == '' " style="margin-left: 20px;float: left">无</span>
          <span style="color: #00ff00;float: right" v-if="userDetalData.bindphone">已绑定</span>
          <span style="color: #dd6161;float: right" v-if="!userDetalData.bindphone|| userDetalData.bindphone==''">未绑定</span>
        </div>
      </el-aside>
      <el-main class="showDetailMain">
        <div style="text-align: left;margin-left: 20px; "><i style="color: #6a005d" class="iconfont icon-yonghufangkeshu"></i>{{userDetalData.realname}}</div>
        <ul style="text-align: left;line-height: 30px">
          <li>用户类型 : {{userDetalData.usertype}}</li>
          <li>所属部门 : {{userDetalData.user_primary}}</li>
          <li>用户情况 : {{userDetalData.user_situation}}</li>
          <li>用户状态 : {{userDetalData.locked}}</li>

        </ul>
      </el-main>
    </el-container>
    <div> <!--第三方绑定-->
      <div class="third" style="text-align: left" >
        <h4>第三方绑定 </h4>
        <ul class="third-box">
          <li style="list-style: none;">
            <img style="vertical-align: middle" src="../../../../static/qq_black.gif"/>
            <span style="margin-left: 40px">无</span>
            <span style="color: #dd6161;margin-left: 40px">未绑定</span>
          </li>
          <li style="list-style: none;margin-top: 20px">
            <img  style="vertical-align: middle" src="../../../../static/weixin.png"/>
            <span style="margin-left: 40px">无</span>
            <span style="margin-left: 40px;color: #dd6161">未绑定</span>
          </li>
          <li style="list-style: none; margin-top: 20px">
            <img style="vertical-align: middle" src="../../../../static/weibo_black.gif"/>
            <span style="margin-left: 40px">无</span>
            <span style="margin-left: 40px;color: #dd6161">未绑定</span>
          </li>
        </ul>
      </div>
    </div>
    <div @click="resetMsg"><el-button type="primary">确认返回</el-button></div>
  </div>
</template>

<script>
  import bus from '../../../assets/componentBridge'
    export default {
        name: "view-user-data",
      data(){
          return{
            userData: {}
          }
      },
      mounted(){
        let self = this;
        bus.$on('userDetalData', function (msg) {
          self.userData = msg;
          this.userName = msg.realname
          console.log(msg)
        })
      },
    }
</script>

<style scoped>

</style>
