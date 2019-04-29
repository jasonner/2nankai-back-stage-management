<template>
    <div class="content-box role">
      <div v-if="!sendRecordFlage">
        <div class="content-title">我的消息</div>
        <!--Tab消息切换-->
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick(activeName)">
          <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key="item.key" :name="item.key">
            <keep-alive>
              <!--<tab-pane v-if="activeName==item.key" :type="item.key" @create="showCreatedTimes"/>-->
              <!--消息筛选-->
              <div class="msgSelect">
                <el-select v-model="msgStateValue" @change="msgStateChange(msgStateValue)"  style="width: 120px;" placeholder="消息状态">
                  <el-option
                    v-for="item in msgState"
                    :key="item.msgStateValue"
                    :label="item.msgStateLabel"
                    :value="item.msgStateValue">
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="value6"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']"
                  @change='TimeDateChange(value6)'
                  style="width: 358px;margin-left: 10px"
                >
                </el-date-picker>
                <el-button type="primary" style="margin-left: 10px" @click="queryMsg">查询</el-button>

                <el-input style="display: inline-block;width: 200px;margin-left: 10px" maxlength="10" v-model="value9" placeholder="请输入姓名进行搜索"></el-input>
                <el-button type="primary" style="margin-left: 10px" @click="searchName">搜索</el-button>
                <div style="text-align: right; float: right">
                    <el-button type="primary" @click="batchDeleting">批量删除</el-button>
                    <el-button type="primary" style="margin-left: 10px" @click="sendRecord">发送记录</el-button>
                </div>
                <!--发送列表-->
                <div style="margin-top: 10px">
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    v-loading="loading2"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    style="width: 100%;margin-top: 20px;text-align: left;border: 1px solid #dfdfdf;border-radius: 5px"
                    class="usertable"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      width="3"
                    >
                    </el-table-column>
                    <el-table-column
                      type="selection"
                      label="全选"
                      width="60"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="msgIndex"
                      label="序号"
                      width="100"
                    >
                      <template slot-scope="scope"> {{scope.$index+1+(currentPage-1)*pageSize}}</template>
                    </el-table-column>
                    <el-table-column
                      prop="username"
                      label="发送人"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="msgData"
                      label="日期"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="msgState"
                      label="状态"
                      sortable
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.msgState =='未读'" style="color: #dd6161">未读</span>
                        <span v-else-if="scope.row.msgState === '已读'" style="color: #13ce66">已读</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="MSGContent"
                      label="消息"
                      style="overflow: hidden"
                    >
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          style="color: #862a7a;border: none; font-size:20px;padding: 0; margin-left: 10px"
                          class="iconfont icon-chakan"
                          @click="handleShow(scope.$index, scope.row)"></el-button>
                        <el-button
                          size="mini"
                          class="iconfont icon-shanchu"
                          style="color: #862a7a; font-size:20px;border: none;padding: 0; margin-left: 10px"
                          @click="handleDelet(scope.$index, scope.row)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!--分页-->
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  style="text-align: center;margin-top: 20px"
                >
                </el-pagination>
              </div>
            </keep-alive>
          </el-tab-pane>

          <!--参会tab开始-->
          <el-tab-pane label="参会" name="4">
          	<div class="msgSelect">
                <el-select v-model="msgStateValueCH" @change="msgStateChangeCH(msgStateValueCH)"  style="width: 120px;" placeholder="参会状态">
                  <el-option
                    v-for="item in msgStateCH"
                    :key="item.msgStateValue"
                    :label="item.msgStateLabel"
                    :value="item.msgStateValue">
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="timeCH"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['9:00:00', '17:00:00']"
                  style="width: 358px;margin-left: 10px"
                >
                </el-date-picker>
                <el-button type="primary" style="margin-left: 10px" @click="queryMsgCH">查询</el-button>

                <div style="text-align: right; float: right">
                    <el-button type="primary" @click="batchDeletingCH">批量删除</el-button>
                    <!--<el-button type="primary" style="margin-left: 10px" @click="sendRecordCH">发送记录</el-button>-->
                </div>
                <!--发送列表-->
                <div style="margin-top: 10px">
                  <el-table
                    :data="tableDataCH"
                    v-loading="loadingCH"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    style="width: 100%;margin-top: 20px;text-align: left;border: 1px solid #dfdfdf;border-radius: 5px"
                    class="usertable"
                    @selection-change="handleSelectionChangeCH">
                    <el-table-column
                      width="3"
                    >
                    </el-table-column>
                    <el-table-column
                      type="selection"
                      label="全选"
                      width="60"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="msgIndex"
                      label="序号"
                      width="100"
                    >
                      <template slot-scope="scope"> {{scope.$index+1+(currentPage-1)*pageSize}}</template>
                    </el-table-column>
                    <el-table-column
                      prop="serder"
                      label="发送人"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="time"
                      label="日期"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      label="状态"
                      sortable
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.status == '2' " style="color: #dd6161">未参加</span>
                        <span v-else-if="scope.row.status == '1' " style="color: #13ce66">已参加</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="titel"
                      label="参会主题"
                      style="overflow: hidden"
                    >
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          style="color: #862a7a;border: none; font-size:20px;padding: 0; margin-left: 10px"
                          class="iconfont icon-chakan"
                          @click="handleShowCH(scope.$index, scope.row)"></el-button>
                        <el-button
                          size="mini"
                          class="iconfont icon-shanchu"
                          style="color: #862a7a; font-size:20px;border: none;padding: 0; margin-left: 10px"
                          @click="handleDeletCH(scope.row)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>

                <!--分页-->
                <el-pagination
                  @size-change="handleSizeChangeCH"
                  @current-change="handleCurrentChangeCH"
                  :page-sizes="[10, 20, 30, 40]"
                  :current-page="paramsCH.page"
                  :page-size="paramsCH.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCH"
                  style="text-align: center;margin-top: 20px"
                >
                </el-pagination>
              </div>
          </el-tab-pane>
          <!--参会tab结束-->

        </el-tabs>
        <!--查看弹层-->
        <el-dialog title="查看详情" style="text-align: center" :visible.sync="dialogLookVisible" top="20vh">
          <div style="text-align: left;border-bottom: 1px solid #dfdfdf;padding-bottom: 20px;box-sizing: border-box">
            <p><span style="font-weight: 700">发送人</span>:{{viewTabList.username}}</p>
            <p>{{viewTabList.msgData}}</p>
            <p v-html="viewTabList.content"></p>
            <div>关联代办 <el-radio style="margin-left: 10px" v-model="radio" @change="radioChange(radio)" label="1">是</el-radio>
              <el-radio v-model="radio" @change="radioChange(radio)" label="2">否</el-radio>
            </div>
            <!--设置提醒日期-->
            <div v-if="radio == '1'" style="display: flex;margin-top: 20px">
              <div class="block" style="flex: auto">
                <div class="demonstration" style="margin-bottom: 10px">设置提醒日期</div>
                <el-date-picker
                  @change="dataChange(value1)"
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <!--设置更多提醒日期-->
              <div class="block" style="flex: auto">
                <div class="demonstration" style="margin-bottom: 10px">设置更多提醒日期</div>
                <el-date-picker
                  @change="dataTimeChange(value4)"
                  v-model="value4"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
            <!--待办主题-->
            <div v-if="radio == '1'" style="margin-top: 20px;">
              <div style="margin-bottom: 20px">待办主题</div>
              <el-input v-model="mattertitle" placeholder="请输入待办主题"></el-input>
            </div>
          </div>
          <div style="margin-top: 20px" v-if="radio=='2'">
            <el-button plain @click="viewPosition">关闭</el-button>
          </div>
          <div style="margin-top: 20px" v-else>
            <el-button plain @click="viewPosition">取消</el-button>
            <el-button type="primary" @click="viewSure(viewTabList)">确定</el-button>
          <!--  <el-button type="primary"  @click="viewPosition">关闭</el-button>-->
          </div>
        </el-dialog>
        <!--消息回复-->
        <el-dialog title="消息回复" style="text-align: center" :visible.sync="dialogReplyVisible" top="20vh">
          <div class="msg-row-text">
            <el-input v-model="MsgTitlt" placeholder="消息主题"></el-input>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="msgContent"
              style="margin-top: 20px;"
              class="msgContent"
            >
            </el-input>
            <div style="border-top: 1px solid #dfdfdf;padding-top: 20px;box-sizing: border-box">
              <el-button @click="msgReplyCancel">取消</el-button>
              <el-button type="primary" @click="msgReplySure">确认</el-button>
            </div>
          </div>
        </el-dialog>
      </div>
      <!--发送记录-->

     <!--参会邀请弹窗开始-->
    <el-dialog
		  title="家长会通知"
		  :visible.sync="dialogLookVisibleCH"
		  width="40%"
		  :before-close="beforeClose"
		  center>
		    <div style="text-align: left;border-bottom: 1px solid #dfdfdf;box-sizing: border-box">
				<p><span style="font-weight: 700">发送人</span> : &nbsp;{{sender}}</p>
				<p>{{sendtitle}}</p>
				<p>{{sendcontent}}</p>

			</div>
			<div style="text-align: left;border-bottom: 1px solid #dfdfdf;box-sizing: border-box">
				<p>参会地点：{{sendaddress}}</p>
				<p>参会时间：{{stime}}&nbsp;&nbsp;&nbsp;&nbsp;失效时间：{{etime}}</p>
			</div>
			<div class="qart" id="qqw" style="text-align:center;">
				<div id="getval" style="opacity:0;height:20px;">{{erweima}}</div>
				<div id="qrcode" ref="qrcode" style="width:100px;height:100px;margin:0 auto;"></div>
				<div style="text-align:center;margin-top:10px;">入校时请向门卫出示此二维码</div>
				<!--<input type="text" id="getval" v-model="erweima" placeholder="修改这个值改变二维码">-->
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="beforeClose">取 消</el-button>
			    <el-button type="primary" @click="beforeClose">确 定</el-button>
			</span>
	</el-dialog>

    <!--参会邀请弹窗结束-->

      <send-record v-show="sendRecordFlage" @add-parent-total="sendRecord" ref="child"  :showDlg.sync= 'sendRecordFlage'></send-record>
    </div>
</template>

<script>
    import sendRecord from './sendRecord';
    import API from '@/api/api_news';
    export default {
      components: {sendRecord},
        name: "my-manage",
        data() {
        return {
          user:{},
          tabMapOptions: [
            { label: '消息', key: '1' },
            { label: '通知', key: '2' },
            { label: '公告', key: '3' },
          ],
          loading2: false,
          createdTimes: 0,
          activeName: '1',
          msgState: [{
            msgStateValue: '0',
            msgStateLabel: '未读'
          }, {
            msgStateValue: '1',
            msgStateLabel: '已读'
          }],

          total: 0,
          pageSize: 10,
          currentPage: 1,
          msgStateValue: '',
          value6: '',
          options4: [],
          value9: '',
          list: [],
          loading: false,
          states: ["Alabama", "Alaska", "Arizona",
            "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois",
            "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas",
            "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin",
            "Wyoming"],
          tableData:[{
            msgIndex: '1',
            username: '吴杰',
            msgData: '2018-08-28',
            msgState: '已读',
            MSGContent: '值得有心能自奋，何愁他日不雄飞！！！'
          },
            {
              msgIndex: '2',
              username: '吴杰',
              msgData: '2018-08-30',
              msgState: '未读',
              MSGContent: '衣带渐宽终不悔，为伊消得人憔悴？？？'
            },
            {
              msgIndex: '3',
              username: '吴杰',
              msgData: '2018-08-29',
              msgState: '未读',
              MSGContent: '真正的大师常怀着一颗学徒的心，不要被骄傲遮蔽了双眼！！！'
            }],
          multipleSelection: [],//选择消息列表
          dialogLookVisible: false,
          dialogReplyVisible: false,
          radio: '2',
          viewTabList: {
            username: '',
            msgData: '',
            MSGContent: ''
          },
          MsgTitlt: '',
          msgContent: '',
          MsgReply: true,
          sendRecordFlage: false,
          timeData1: '',
          timeData2: '',
          value1: '',
          value4: '',
          dataTime1: '',
          dataTime2: '',
          mattertitle: '',//待办主题

//        参会邀请的变量开始
			msgStateCH: [{
	            msgStateValue: '2',
	            msgStateLabel: '未参加'
	        }, {
	            msgStateValue: '1',
	            msgStateLabel: '已参加'
	        }],
	        multipleSelectionCH:[],
	        msgStateValueCH: '',
	        tableDataCH:[],
	        loadingCH:false,
	        statusCH:-1,
	        timeCH:'',
	        startCH:'',
	        endCH:'',
	        dialogLookVisibleCH:false,
	        totalCH:0,
	        paramsCH:{
	        	page:1,
	        	pageSize:10
	        },
	        erweima:'',
	        sender:'',
	        stime:'',
	        etime:'',
	        sendtitle:'',
	        sendcontent:'',
	        sendaddress:'',
//        参会邀请的变量结束




        };
     },
      mounted() {
      	this.user = JSON.parse(sessionStorage.getItem('user')).user;
        this.list = this.states.map(item => {
          return { value: item, label: item };
        });
        this.getMyMsg();
      },
      methods: {
          //获取消息
        getMyMsg(){
          this.loading2 = true;
          let promise = {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            typeId: this.activeName,
            userId: this.user.userid,
          /*  statu: this.msgStateValue,//已读or未读状态
            starttime: this.timeData1,//开始日期
            endtime: this.timeData1,//结束日期
            username: this.value9,//用户名*/
          };
          API.getMyAllMsg(promise).then((res)=>{
            console.log(res);
            let Arr = [];
            if(res.data){
              res.data.forEach(item =>{
                let Obj = {};
                Obj.username = item.userName;
                Obj.MSGContent = item.title;
                Obj.content = item.content;
                let sendtime = this.getLocalTime(item.sendtime);
                Obj.msgData = sendtime;
                Obj.msgState = item.bisread;
                Obj.msgid = item.msgId;
                Obj.msgobgid = item.id;
                Arr.push(Obj);
              })
            }
            this.tableData = Arr;
            this.total = res.total;
          }).then(() =>{
            this.loading2 = false;
          })
        },
        //消息筛选
        msgScreening(promise){
          this.loading2 = true;
          console.log("消息筛选");
          API.getMyAllMsg(promise).then((res)=>{
            console.log(res.data);
            let arr = [];
            if(res && res.code === 1){
              if(res.data.length>0){
                res.data.forEach((item)=>{
                  let obj = {
                    content: item.content,
                    id: item.id,
                    msgid: item.msgid,
                    msgobgid: item.msgobgid,
                    msgState: item.bisread,
                    msgtype: item.msgtype,
                    username: item.userName,
                    msgData: this.getLocalTime(item.sendtime,'data'),
                    MSGContent: item.title,
                  }
                  console.log(item);
                  arr.push(obj);
                })
              }
            }
            this.tableData = arr;
            console.log(this.tableData)
            this.total = res.total;
          }).then( () => {
            this.loading2 = false;
          });
        },
        //时间戳转日期
        getLocalTime(nS,type) {
          var date = new Date(nS*1);//如果date为13位不需要乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
          var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
          var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
          var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
          if(type=="data"){
            return Y+M+D;
          }else {
            return Y+M+D+h+m+s;
          }
        },
          //Tab切换
        handleClick(val) {
          console.log(val);
          if(val==4){//如果是参会
          	this.chList();
          }else{
          	 this.getMyMsg(this.currentPage,this.pageSize);
          }
        },
          //消息状态筛选
        msgStateChange(val){
          this.msgStateValue = val;
          console.log("消息状态筛选"+ val);
          this.loading2 = true;
          let promise = {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            typeId: this.activeName,
            isRead: this.msgStateValue,//已读or未读状态
            userId: this.user.userid,
            starttime: this.timeData1,//开始日期
            endtime: this.timeData2,//结束日期
            usernName: this.value9,//用户名
          }
          this.msgScreening(promise);
        },
        //时间段筛选
        TimeDateChange(val){
          console.log("时间段筛选"+val);
          this.timeData1 = this.getLocalTime(this.value6[0]);
          this.timeData2 = this.getLocalTime(this.value6[1]);
        },
        //查询
        queryMsg(){
          let promise = {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            typeId: this.activeName,
            userId: this.user.userid,
            isRead: this.msgStateValue,//已读or未读状态
            starttime: this.timeData1,//开始日期
            endtime: this.timeData2,//结束日期
            usernName: this.value9,//用户名
          }
          //TODO   筛选用户信息
          this.msgScreening(promise);
        },
        //按用户姓名搜索
        searchName(){
          console.log("按用户姓名搜索"); //暂时走不通;
          //TODO  按用户姓名搜索
          let promise = {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            typeId: this.activeName,
            userId: this.user.userid,
            isRead: this.msgStateValue,//已读or未读状态
            starttime: this.timeData1,//开始日期
            endtime: this.timeData1,//结束日期
            userName: this.value9,//用户名
          }
          this.msgScreening(promise);
        },
         //搜索
        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options4 = this.list.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.options4 = [];
          }
        },
        //批量删除
        batchDeleting(){
          console.log("批量删除");
          console.log(this.multipleSelection );
          let  index = this.multipleSelection.length;
          if(this.multipleSelection && this.multipleSelection.length<1){
            this.$notify.error({
              title: '错误提示',
              message: '请选择消息列表'
            });
          }else if(this.multipleSelection && this.multipleSelection.length>0){
            this.$confirm('您确定要删除这'+ index +'条消息吗？', '删除提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              center: true,
              type: 'warning'
            }).then(() => {
              //this.tableData.splice(index,1);
              // TODO  调用批量删除接口
              let Ids = '';
              console.log(this.multipleSelection);
              this.multipleSelection.forEach( item => {
                Ids += item.msgobgid + '-'
              });
              let promise = {
                msgobjids : Ids
              };
              API.endMsgDeleteall(promise).then( (res) =>{
                console.log(res);
              }).then( ()=> {
                this.getMyMsg(this.currentPage,this.pageSize);
              })
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        },
        //发送记录
        sendRecord(){
          console.log("发送记录");
          this.sendRecordFlage = true;
        },
        //全选
        handleSelectionChange(val) {
          console.log(val)
          this.multipleSelection = val;
        },
        //查看
        handleShow(index,val){
          console.log('查看');
          console.log(index,val);
          this.viewTabList = val;
          let promise = {
            msgobjid: val.msgobgid
          };
          API.sendMsgUpdate(promise).then(data =>{
            console.log(data);
          }).then( () => {
            this.getMyMsg(this.currentPage,this.pageSize);
          })
          this.dialogLookVisible = true;
        },
        //消息
        handleMsg(index,val){
          console.log('消息发送');
          console.log(index,val);
          this.dialogReplyVisible = true;
        },
        //删除
        handleDelet(index,val){
          console.log("消息删除");
          console.log(index,val);
          //TODO 消息删除接口
          this.$confirm('您确定要删除这条消息吗？', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            type: 'warning'
          }).then(() => {
            let promise = {
              msgobjids: val.msgobgid
            };
            API.endMsgDeleteall(promise).then( (res) =>{
              console.log(res);
            }).then( ()=> {
              this.getMyMsg(this.currentPage,this.pageSize);
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //分页
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.getMyMsg(this.currentPage,val);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.getMyMsg(val,this.pageSize);
        },
        //关联代办单选
        radioChange(val){
          console.log('关联代办单选'+val);
        },
        //提醒日期设置
        dataChange(val){
          console.log(val+"提醒日期设置");
          this.value1 = this.getLocalTime(this.value1,"data");
          console.log(this.value1);
        },
        //更多提醒日期设置
        dataTimeChange(val){
          console.log(val+"更多提醒日期设置");
          this.dataTime1 = this.getLocalTime(this.value4[0]);
          this.dataTime2 = this.getLocalTime(this.value4[1]);
        },
        //查看取消
        viewPosition(){
          this.dialogLookVisible = false;
        },
        //查看确定
        viewSure(val){
          console.log("查看确定");
          console.log(val);
          console.log(this.radio);
          //TODO  关联代办;
          if(this.radio == "1"){
            if(this.mattertitle == ""){
              this.$notify({
                title: '警告',
                message: '请输入待办主题',
                type: 'warning'
              });
            }else {
              let promise = {
                msgid: val.msgid,//消息ID
                rtime: this.value1,//提醒时间
                msgobjectid: val.msgobgid, //收件ID
                start: this.dataTime1,//开始时间
                end: this.dataTime2,//结束时间
                mattertitle: this.mattertitle,//待办事项标题
              };
              API.myTodoAdd(promise).then((res)=>{
                console.log(res);
                if(res&&res.code===1){
                  this.$message({
                    message: '创建待办成功！',
                    type: 'success'
                  });
                }
              }).then(() =>{
                this.loading2 = false;
                this.dialogLookVisible = false;
              })
            }
          }
        },
        //消息回复取消
        msgReplyCancel(){
          console.log("消息回复取消");
          this.dialogReplyVisible = false;
        },
        //消息回复确认
        msgReplySure(){
          console.log("消息回复确认");
          this.dialogReplyVisible = false;
        },



        //参会邀请的方法开始
        chList(){
        	let promise={
        		userid:this.user.userid,
        		pageNum:this.paramsCH.page,
        		pageSize:this.paramsCH.pageSize,
        		status:this.statusCH,
        		start:this.startCH,
        		end:this.endCH,
        	}
        	console.log(promise)
        	this.loadingCH = true;
        	API.getMyMeetList(promise).then((res)=>{
                console.log(res);
                if(res.code==1){
                	this.tableDataCH = res.data;
                	this.totalCH = res.total;
                }
                this.loadingCH = false;
            })
        },
        msgStateChangeCH(val){//更换状态
        	console.log(val)
        	this.statusCH = val;
        	this.paramsCH.page = 1;
        	this.chList();
        },
        queryMsgCH(){//按照日期查询
        	if(this.timeCH){
        		this.startCH = this.getLocalTime(this.timeCH[0]);
        		this.endCH = this.getLocalTime(this.timeCH[1]);
        	}else{
        		this.startCH='';
        		this.endCH='';
        	}

        	this.paramsCH.page = 1;
        	this.chList();
        },




		handleDeletCH(item){//单个删除
			API.delMyMeetList({ids:item.id}).then((res)=>{
                console.log(res)
                if(res.code==1){
                	this.$message({
		                title: '提示',
		                message: '删除成功',
		                type: 'success'
		            });
		            this.chList();
                }else{
                	this.$message({
		                title: '提示',
		                message: res.message,
		                type: 'warning'
		            });
                }

            })

		},
        batchDeletingCH(){//批量删除
        	console.log(this.multipleSelectionCH)
        	if(this.multipleSelectionCH.length<1){
        		this.$notify({
	                title: '警告',
	                message: '请选择需要删除的人员',
	                type: 'warning',
	                offset:70
	            });
        	}else{
        		let Ids = '';
	            this.multipleSelectionCH.forEach( item => {
	                Ids += item.id + '-'
	            });

	            API.delMyMeetList({ids:Ids}).then((res)=>{
	                console.log(res)
	                if(res.code==1){
	                	this.$message({
			                title: '提示',
			                message: '删除成功',
			                type: 'success'
			            });
			            this.chList();
	                }else{
	                	this.$message({
			                title: '提示',
			                message: res.message,
			                type: 'warning'
			            });
	                }

	            })


        	}
        },
        sendRecordCH(){//发送记录

        },
        handleSelectionChangeCH(val){//多选
        	console.log(val)
        	this.multipleSelectionCH = val
        },
        handleSizeChangeCH(val){//分页
        	console.log(val)
        },
        handleCurrentChangeCH(val) {
          this.paramsCH.page = val;
          this.chList();
        },


		handleShowCH(index,val){//查看家长会详情
          	this.dialogLookVisibleCH = true;
          	let promise={
          		id:val.id,
          		userid:this.user.userid
          	}
          	API.getLookMsg(promise).then((res)=>{
                console.log(res.data);
                this.sender = res.data.serder;
                this.stime = res.data.time;
                this.etime = res.data.lostTime;
                this.sendtitle = res.data.titel;
                this.sendaddress = res.data.address;
                this.sendcontent = res.data.content;

				this.erweima = API.model + '?j='+ escape('('+val.id+","+this.user.userid+')')//逗号后面是id和userid
//				this.erweima = 'http://192.168.1.130?id='+this.encode(val.id+","+this.user.userid);//逗号后面是id和userid
                window.setTimeout(this.qrcode,200)
            })


		},

        qrcode(){
		    var qrcode = new QRCode(document.getElementById("qrcode"), {
		        width : 100,//设置宽高
		        height : 100,
		    });
		    qrcode.makeCode(document.getElementById("getval").innerHTML);
		},

		beforeClose(){
			document.getElementById("qrcode").innerHTML='';
			this.dialogLookVisibleCH = false;
		}
        //参会邀请的方法结束
      }
    }
</script>
<style scoped lang="scss">
  .content-box{
        width: 100%;
        background:#efefef;
        .content-title{
          padding: 0 30px;
          box-sizing: border-box;
          font-weight: 600;
          height: 40px;
          line-height: 40px;
        }
        .tab-box{
          padding: 0 30px;
          box-sizing: border-box;
          border-top: 1px solid #dfdfdf;
        }
        .msgSelect{
          padding: 0 30px;
          box-sizing: border-box;
        }
        .msgContent textarea{
          min-height: 300px !important;
        }
      }
</style>
