// 封装获取文章列表接口
import { useState, useEffect } from "react"
import { getChannelAPI } from "@/apis/article"

function useChannel() {
  // 1.相关接口逻辑
  const [ channelList, setChannelList ] = useState([])
  // 调用接口
  useEffect(() => {
      const getChannelList = async ()=> {
        const res = await getChannelAPI()
        setChannelList(res.data.channels)
      }
      getChannelList()
  }, []) 
  // 2.返回接口
  return {
    channelList
  }
}

export { useChannel }