
import * as API from './'
import qs from 'qs'

export default {
	dlmodel:'http://www.2nankai.cn/api',
  // 操作日志
  log: params => {
    return API.GET('/api/log/list', params)
  },
  // 操作日志清空
  logDel: params => {
    return API.GET('/api/log/del', params)
  },


  // 微信绑定
  wechatBindAccount: params => {
    return API.POST('/api/user/bindAccount',qs.stringify(params))
  },
  //微信登陆
  wexinLogin: params => {
    return API.GET('/api/thirdLogin',params)
  },
  // 在线用户
  online: params => {
    return API.GET('/api/activeUser/list',params)
  },

  //踢除在线人员
  expurgate: params => {
    return API.GET('/api/activeUser/expurgate',params)
  },

  //协议增加
  agreeAdd: params => {
    return API.POST('/api/agree/add',qs.stringify(params))
  },

  //协议展示
  agreeShow: params => {
    return API.GET('/api/agree/show',params)
  },

  //修改协议
  agreeUpdate: params => {
    return API.POST('/api/agree/update',qs.stringify(params))
  },



	//系统设置很多参数
	ArgumentsList: params => {
	    return API.GET('/api/Arguments/list',params)
	},
	//系统设置很多参数修改接口
	ArgumentsUpdate: params => {
	    return API.POST('/api/Arguments/update',qs.stringify(params))
	},
	//创建称呼
	appellationAdd: params => {
	    return API.POST('/api/appellation/create',qs.stringify(params))
	},
	//显示家长称呼列表
	appellationList: params => {
	    return API.GET('/api/appellation/list',params)
	},
	//修改称呼
	appellationUpdate: params => {
	    return API.POST('/api/appellation/update',qs.stringify(params))
	},
  //删除称呼
	appellationDel: params => {
	    return API.GET('/api/appellation/del',params)
	},

	//删除浏览器
	BrowserDel: params => {
	    return API.GET('/api/Browser/del',params)
	},

	//添加浏览器
	BrowserAdd: params => {
	    return API.POST('/api/Browser/create',qs.stringify(params))
	},
	//修改浏览器
	BrowserUpdate: params => {
	    return API.POST('/api/Browser/update',qs.stringify(params))
	},
	//显示浏览器
	BrowserList: params => {
	    return API.GET('/api/Browser/list',params)
	},

	//显示用户头像列表
	usertypeImgList: params => {
	    return API.GET('/api/UserType/list',params)
	},
	//修改用户头像
	usertypeImgUpdate: params => {
	    return API.POST('/api/UserType/update',qs.stringify(params))
	},


	//日志更新的展示
	LogmsgShow: params => {
	    return API.GET('/api/Logmsg/show',params)
	},
	//编辑日志更新
	LogmsgUpdate: params => {
	    return API.POST('/api/Logmsg/update',qs.stringify(params))
	},

  //查询用户是否绑定接口
 }
