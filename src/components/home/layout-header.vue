<template>
  <div>
    <el-row class="layout-header" type='flex' justify='space-between' align='middle'>
      <el-col :span='6'>
        <i class='el-icon-s-fold' style='font-size:18px'></i>
        <span class="title">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span='4' class='icon'>
        <img :src="userInfo.photo?userInfo.photo:defualticon" alt="">
        <el-dropdown trigger="click" @command='commandClick'>
          <span class="el-dropdown-link">
            {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='account'>个人信息</el-dropdown-item>
            <el-dropdown-item command='git'>git地址</el-dropdown-item>
            <el-dropdown-item command='lgout'>退出</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      userInfo: {},
      defualticon: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // 获取用户资料
    getUserInfo () {
      // 获取token
      // let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile'
        // headers: { 'Authorization': `Bearer ${token}` }
      }).then((result) => {
        this.userInfo = result.data
      })
    },
    // 公共点击事件
    commandClick (key) {
      if (key === 'account') {
        // 账户信息
        this.$router.push('/home/account')
      } else if (key === 'git') {
        window.location.href = 'https://github.com/haoyueweiliang/toutiao.git'
      } else {
        // 回到login页面   删除token
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
    // 一旦监听到抛出的事件  就会重新拉取信息
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  height: 50px;

  .title {
    margin-left: 3px;
  }
  .icon {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      padding-left: 7px;
    }
  }
}
</style>
