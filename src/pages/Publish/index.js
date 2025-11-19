import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hook/useChannel'

const { Option } = Select

const Publish = () => {
  const { channelList } = useChannel()
  // 提交表单
  const onFinish = (formValue) => {
    console.log(formValue)
    // 校验封面类型与实际图片不匹配
    if(imageList.length !== imageType) 
      return message.warning("封面类型与实际图片数量不匹配") 
    const { title, content, channel_id  } = formValue
    // 1.根据接口文档格式处理收集到的表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        // 编辑的时候额外处理
        images: imageList.map(item =>{
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        })
      },
      channel_id
    }
    // 2.调用接口提交
    // 处理编辑或新增状态的接口
    if(articleId){
      
      //更新
      updateArticleAPI({...reqData, id:articleId})
      message.success('更新成功')

    } else {
      createArticleAPI(reqData)
    }
  }

    // 上传回调
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    console.log("图片上传中",value)
    setImageList(value.fileList)
  }

  // 切换图片上传个数
  const [imageType, setImageType] = useState([])
  const onTypeChange = (e) => {
    console.log("切换",e.target.value)
    setImageType(e.target.value)
  }

  // 编辑文章-回显数据
  const [ searchParams ] = useSearchParams()
  const articleId = searchParams.get('id')
  // 获取实例
  const [form] = Form.useForm()
  console.log(articleId);
  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleById(articleId)
      const data = res.data
      // 解构一下
      const { cover } = data
      form.setFieldsValue({
        ...data,
        type:cover.type
      })
      // 编辑-回显图片
      setImageType(cover.type)
      setImageList(cover.images.map(url => {
        return { url }
      }))
    }
    // 需要有id才能调用
    if(articleId){
      getArticleDetail()
    }
  },[articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '编辑' : '发布'}文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item =>(
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType是决定文件筐的外观 */}
            {/* showUploadList是决定显示上传列表 */}
            {imageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name="image"
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}

          </Form.Item>       

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
        <ReactQuill
          className="publish-quill"
          theme="snow"
          placeholder="请输入文章内容"
        />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish