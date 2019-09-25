<template>
  <!-- 账户信息 -->
  <el-card>
    <bread-crumb slot='header'>
      <template slot='title'>账户信息</template>
    </bread-crumb>
    <!-- 用户信息 -->
    <el-form label-width="60px" style="margin-left:100px" :model="formData" :rules="formDataRules"
      ref='formData'>
      <el-form-item label='名称:' style="width:350px" prop='name'>
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" style="width:350px" prop='email'>
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="简介:" style="width:350px">
        <el-input type='textarea' :rows="3" v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" style="width:350px">
        <el-input disabled="" v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin:20px 60px  0  180px " @click='updateUserInfo'>修改
        </el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
    <!-- 头像  点击上传   自定义上传:http-request='uploadImg' -->
    <el-upload action="" :show-file-list="false" :http-request='uploadImg'>
      <img :src="formData.photo ? formData.photo :defaultImg" alt="" class='head-img'>
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {},
      defaultImg: require('../../assets/img/111.jpg'),
      formDataRules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '字符长度控制在1-7' }
        ],
        email: [
          { required: true, message: '邮箱名不能为空' },
          { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }
        ]
      }
    }
  },
  methods: {
    // 获取用户信息
    getUserinfo () {
      this.$axios({
        url: '/user/profile'
      }).then((result) => {
        this.formData = result.data
      })
    },
    // 表单验证  成功编辑信息
    updateUserInfo () {
      this.$refs.formData.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            this.getUserinfo()
            eventBus.$emit('updateUserInfo') // 抛出事件
          })
        }
      })
    },
    // 上传用户头像
    uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then((result) => {
        // 上传用户头像保存  不会同步更新的到头部组件 两个组件没有任何关系 使用
        // 使用公共eventBus实例    已经注册该实例  用到导入即可
        eventBus.$emit('uploadImg')
        this.formData.photo = result.data.photo // 成功上传的头像更新给当前的页面数据
      })
    }
  },
  created () {
    this.getUserinfo()
  }
}
</script>

<style scoped>
.head-img {
  position: absolute;
  right: 270px;
  top: 130px;
  width: 250px;
  border-radius: 50%;
  height: 250px;
}
</style>
