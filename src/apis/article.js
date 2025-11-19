// 放置文章相关的请求
import { request } from "@/utils"

// 获取频道
export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

// 创建文章
export function createArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

// 编辑文章
export function updateArticleAPI(data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}

// 获取文章列表
export function getArticleListAPI(params) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

// 删除文章
export function delArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE'
  })
}

// 获取文章详情
export function getArticleById(id) {
  return request({
    url: `/mp/articles/${id}`
  })
}
