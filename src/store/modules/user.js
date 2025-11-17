// 用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState:{
    token: localStorage.getItem('token_key') || ''
  },
  // 修改同步方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 登录成功后将token存入状态管理
      localStorage.setItem('token_key', action.payload)
    }
  }
})

// 解构除actionCreator
const { setToken } = userStore.actions

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

export { setToken, fetchLogin }

export default userReducer