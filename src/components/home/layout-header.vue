<template>
  <div>
    <el-row class="layout-header" type='flex' justify='space-between' align='middle'>
      <el-col :span='6' >
        <i class='el-icon-s-fold' style='font-size:18px'></i>
        <span class="title">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span='4' class='icon'>
        <img src="../../assets/img/avatar.jpg" alt="">
        <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        皓月微凉<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item >git地址</el-dropdown-item>
        <el-dropdown-item >退出</el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.layout-header{
  height: 50px;

  .title{
    margin-left: 4px;
  }
  .icon{

    img{
       font-size:30px;
       border-radius: 50%;
       vertical-align: middle;

      }
      span{
        padding-left: 7px;
      }
  }

}
</style>
