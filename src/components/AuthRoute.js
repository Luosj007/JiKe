// 封装高阶组件
// 1.判断是否有token
// 2.有token->正常渲染
// 3.没有token->跳转到登录页

import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

export function AuthRoute({ children }) {
  const token = getToken()
  if(token){
    return <>{children}</>
  }
  return <Navigate to="/login" replace/>
}
