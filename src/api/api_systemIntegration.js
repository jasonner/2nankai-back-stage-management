import * as API from './'
import qs from 'qs'

export default {
  //新增业务配置
  ClientConfigAdd: params => {
    return API.POST('/api/ClientConfig/add', qs.stringify(params))
  },
  //修改业务配置
  ClientConfigUpdate: params => {
    return API.POST('/api/ClientConfig/update', qs.stringify(params))
  },
  //删除业务配置
  ClientConfigDel: params => {
    return API.GET('/api/ClientConfig/del', params)
  },
  //获取业务配置
  ClientConfigGetSelect: params => {
    return API.GET('/api/ClientConfig/select', params)
  },
  //发送数据
  sendDataMsg: params => {
    return API.GET('/api/ClientConfig/sendData', params);
  },
}
