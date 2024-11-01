import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    menuList: [],//后端配置权限菜单
    iconList: [
      {title:'产品日报',type: '产品',icon: 'zz',code:'product-report', path:'/product-report'}
    ]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_AUTH: (state, payload) => {
    state.authInfo = payload
  },
  SET_MENU_LIST: (state, {menuList}) => {
    state.menuList = menuList
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  async setAuthInfo({ commit }, payload){
    try {
      const ssoAuthInfo = await getAuth({})
      commit('SET_AUTH_INFO', ssoAuthInfo)
      console.log(ssoAuthInfo)
      if(payload.isBaphd){return}//灰度环境不请求菜单权限
      // 转发（透传）接口， 获取CRMC统一权限系统需要的x-access-token
      const crmcTokenInfo = await getIPBSToken(ssoAuthInfo.ssoUserName)
      console.log(crmcTokenInfo)
      // 获取x-access-token后，转发（透传）菜单权限接口，获取角色菜单列表
      const menuConf = await getMenuList(crmcTokenInfo.token)
      console.log(menuConf)
      const menuConfig = menuConf.menu.find(item=>item.meta.title === '数值化平台移动端')
      const menuList = menuConfig ? menuConfig.children : []
      commit('SET_MENU_LIST', {menuList})
    } catch (error) {
      // 异常情况，所有菜单不展示
      commit('SET_MENU_LIST', {menuList: []})
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

