import { login, logout, showByid } from '@/api/api_user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {
  setStore,
  getStore,
  removeStore
} from '../../utils/store'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    isLock: getStore({
      name: 'isLock'
    }) || false,
    lockPasswd: getStore({
      name: 'lockPasswd'
    }) || '',
    browserHeaderTitle: getStore({
      name: 'browserHeaderTitle'
    }) || 'NxAdmin'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    SET_LOCK: (state, action) => {
      state.isLock = true
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false
      state.lockPasswd = ''
      removeStore({
        name: 'lockPasswd'
      })
      removeStore({
        name: 'isLock'
      })
    },
    SET_BROWSERHEADERTITLE: (state, action) => {
      state.browserHeaderTitle = action.browserHeaderTitle
    }

  },

  actions: {
    // 登录
    login ({ commit }, userInfo) {
      console.log(666);
      console.log(userInfo);
      let loginInfo = {
        register: userInfo.register,
        password: userInfo.password
      }
      return new Promise((resolve, reject) => {
        console.log(login(loginInfo))
        login(loginInfo).then((response) => {
          const data = response
          console.log(data.token);
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    showByid({ commit, state }) {
      console.log(commit);
      console.log(state);
      return new Promise((resolve, reject) => {
        console.log(resolve);
        console.log(reject)
        commit('SET_NAME', ['zmy']);
        commit('SET_AVATAR', ['zmy']);
        commit('SET_NAME', 'zmy');
        commit('SET_ROLES', ['zmy']);
        commit('SET_AVATAR', '12345678aa');
       /* showByid(state.token).then(response => {
          const data = response;
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', ['zmy'])
          } else {
            //reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', ['zmy'])
          commit('SET_AVATAR', ['zmy'])
          commit('SET_NAME', 'zmy')
          commit('SET_AVATAR', '12345678aa')
          resolve(response)
        }).catch(error => {
          reject(error)
        })*/

      })
    },

    // 登出
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('CLEAR_LOCK')
          //removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        //removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        showByid(role).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        })
      })
    }
  }
}

export default user
