<template>
  <!-- 发布文章 -->
  <el-card v-loading='loading'>
    <bread-crumb slot='header'>
      <template slot='title'>
        发布文章
      </template>
    </bread-crumb>
    <!-- 表单效验 -->
    <el-form style="margin-left:100px" :model="formData" :rules="formDataRules" ref='publishForm'
      label-width="60px">
      <!-- 标题 -->
      <el-form-item label="标题" prop='title'>
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <!-- 内容 -->
      <el-form-item label='内容' prop='content'>
        <quill-editor v-model="formData.content" style='height:300px'></quill-editor>
      </el-form-item>
      <!-- 封面标题 -->
      <el-form-item label="封面" prop="cover" style='margin-top:120px;margin-top:100px'>
        <el-radio-group v-model="formData.cover.type" @change='changetType'>
          <!-- // 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- /显示图片的组件   封面组件 父传子组件:images  接收子组件抛出的URL和index   @selectImg='changeImg-->
      <cover-img :images="formData.cover.images" @selectImg='changeImg'></cover-img>
      <!-- 频道   v-model="channels"-->
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for='item in channels ' :key='item.id' :label="item.name" :value='item.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 发表 -->
      <el-form-item>
        <el-button type="primary" style="margin-left:40px" @click="publish(false)">发表</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      loading: false, // 加载
      // 效验
      formDataRules: {
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '字段在5-30之间' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      },
      channels: [], // 频道
      // 表单数据
      formData: {
        title: '', // 标题
        channel_id: '', // 频道
        content: '', // 内容
        cover: {
          type: 0,
          images: []
          // 封面类型 -1:自动，0-无图，1-1张，3-3张
        }
      }

    }
  },
  methods: {
    // 频道  获取
    getchannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    // changeradio () {
    //   alert(this.formData.cover.type)
    // }
    // 发表文章   存为草稿    ==   x修改文章
    publish (draft) {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          // 判断有无 id  有编辑  无发表文件  三元表达式判断
          let { articlesId } = this.$route.params

          this.$axios({
            url: articlesId ? `/articles/${articlesId}` : '/articles',
            method: articlesId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            // 发布成功  返回内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 根据文章id  获取详情
    getArticlesid (articlesId) {
      this.loading = true
      this.$axios({
        url: `articles/${articlesId}`
      }).then((result) => {
        this.formData = result.data
        this.loading = false
      })
    },
    // 图片类型改变事件
    changetType () {
      // 类型改变 formdata随之改变
      // alert(this.formData.cover.type)
      // 封面类型 -1:自动，0-无图，1-1张，3-3张
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 接收子组件cover-img 抛出的值
    changeImg (url, index) {
      //    this.formData.cover.images[index] = url // 错误
      // Vue 更新原理 this.a = "zhangsan"  this.list[index] =  值 错误的
      // 方法一
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     // 说明找到了要修改的值吧
      //     return url
      //   }
      //   return item
      // })
      // 方法2
      // this.formData.cover.images.splice(index, 1, url) // 直接替换 只适用于字符串数组的情况
      // 简化版
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    }

  },
  created () {
    this.getchannels()
    // 根据修改可获得id   获得为修改传值   没获得为添加
    let { articlesId } = this.$route.params
    articlesId && this.getArticlesid(articlesId)
  }
}
</script>

<style>
</style>
