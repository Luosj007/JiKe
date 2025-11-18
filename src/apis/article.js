// 放置文章相关的请求
import { request } from "@/utils"

export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

export function createArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}
