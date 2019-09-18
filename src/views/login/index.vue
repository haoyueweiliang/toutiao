<template>
  <div class='login'>
      <!-- 卡片 -->
<el-card class='login-card'>
    <div class='title'>
        <img src="../../assets/img/logo_index.png" alt="">
    </div>
    <!-- 表单 -->
<el-form>
<el-form-item>
<el-input placeholder="请输入手机号"></el-input>
</el-form-item>
<el-form-item>
<el-input placeholder="请输入验证码" style='width:65%'></el-input><el-button style='float:right'>发送验证码</el-button>
</el-form-item>
<el-form-item>
<el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
</el-form-item>
<el-form-item>
<el-button type="primary" style='width:100%'>登录</el-button>
</el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
export default {

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
