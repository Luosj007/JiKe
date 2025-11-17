import { request } from "@/utils"
import { useEffect } from "react";

// 测试token
const Layout = () => {
  useEffect(() => {
    request.get('/user/profile')
  },[])
  return <div>这是布局页</div>
}

export default Layout;
