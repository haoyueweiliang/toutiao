<template>
  <div class='login'>
      <!-- 卡片 -->
<el-card class='login-card'>
    <div class='title'>
        <img src="../../assets/img/logo_index.png" alt="">
    </div>
    <!-- 表单 -->
<el-form :model='loginForm' ref='myForm' :rules='loginRules'>
<el-form-item prop='mobile'>
<el-input v-model='loginForm.mobile' placeholder="请输入手机号"></el-input>
</el-form-item>
<el-form-item prop='code'>
<el-input v-model='loginForm.code' placeholder="请输入验证码" style='width:65%'></el-input><el-button style='float:right'>发送验证码</el-button>
</el-form-item>
<el-form-item prop='agree'>
<el-checkbox v-model='loginForm.agree' >我已阅读并同意用户协议和隐私条款</el-checkbox>
</el-form-item>
<el-form-item>
<el-button @click='login' type="primary" style='width:100%'>登录</el-button>
</el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自动效验函数
    let validator = function (rule, value, callBack) {
      value ? callBack() : callBack(new Error('请您勾选同意该协议'))
    }
    return {
      loginForm: { mobile: '', code: '', agree: '' },
      loginRules: {
        mobile: [
          { required: true, message: '请您填写手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号' }
        ],
        code: [
          { required: true, message: '请您填写验证码' },
          { pattern: /^\d{6}$/, message: '请填写正确的验证码' }
        ],
        agree: [
          // 自动效验
          { validator }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'post'
          }).then((result) => {
            // console.log(result)
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
            // 错误     this.$message() 调用的是elementui的组件
          }).catch(() => this.$message({ typt: 'warning', message: '您的手机或验证码错误' }))
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
    background-image: url(../../assets/img/login_bg.jpg);
    height: 100vh;  //高度可视屏100%
    background-size: cover;  //铺满
    //布局设置
    display: flex;
    justify-content: center;  //左右
    align-items: center;

    .login-card{
        width: 440px;
        height: 340px;
        .title{
            text-align: center;
            margin-bottom: 20px;
            img{
                height: 45px;
            }
        }
    }
}
</style>
