<template>
<!-- 发布文章 -->
  <el-card>
      <bread-crumb slot='header'>
      <template slot='title'>
          发布文章
      </template>
    </bread-crumb>
    <!-- 表单效验 -->
    <el-form style="margin-left:100px" :model="formData"  :rules="formDataRules" ref='publishForm'>
        <!-- 标题 -->
        <el-form-item label="标题" prop='title' >
            <el-input v-model="formData.title" style="width:60%"></el-input>
        </el-form-item >
        <!-- 内容 -->
        <el-form-item label='内容' prop='content'>
            <el-input  v-model="formData.content" type="textarea"  :rows="10" style='width:90%'></el-input>
        </el-form-item>
        <!-- 封面标题 -->
        <el-form-item label="封面" prop="cover">
              <el-radio-group   v-model="formData.cover.type">
                  <!-- // 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 频道   v-model="channels"-->
        <el-form-item label="频道" prop="channel_id">
             <el-select v-model="formData.channel_id" >
                <el-option v-for='item in channels ' :key='item.id' :label="item.name" :value='item.id'></el-option>
            </el-select>
        </el-form-item>
        <!-- 发表 -->
        <el-form-item >
             <el-button type="primary" style="margin-left:40px" @click="publish(false)">发表</el-button>
             <el-button  @click="publish(true)">存入草稿</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
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
    // 发表文章   存为草稿
    publish (draft) {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: 'articles',
            method: 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            // 发布成功  返回内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getchannels()
  }
}
</script>

<style>

</style>
