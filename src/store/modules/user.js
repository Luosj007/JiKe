// 用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken, removeToken, request } from '@/utils'

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState:{
    token: getToken() || '',
    userInfo: {}
  },
  // 修改同步方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 登录成功后将token存入状态管理
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {},
      removeToken()
    }
  }
})

// 解构除actionCreator
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送异步请求
    const res = await request.post('/authorizations', loginForm)
    // 提交同步action进行token存入
    dispatch(setToken(res.data.token))
  }
}

// 获取个人异步信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    // 发送异步请求
    const res = await request.get('/user/profile')
    // 提交同步action进行userInfo存入
    dispatch(setUserInfo(res.data))
  }
}

export { fetchLogin, fetchUserInfo, clearUserInfo, setToken }

export default userReducer