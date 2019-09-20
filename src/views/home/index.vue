<template>
  <el-container>
    <!-- 左侧导航 -->
      <el-aside style='width:201px'>
         <layout-aside ></layout-aside>
      </el-aside>
       <el-container>
         <!-- 顶部 -->
           <el-header>
             <layout-header></layout-header>
           </el-header>
           <el-main>
               <!-- 二级容器 -->

                    <router-view></router-view>

           </el-main>
  </el-container>
  </el-container>

</template>

<script>
// 已全局同意注册可删除
// import layoutAside from '../../components/home/layout-aside'
// import headerA from '../../components/home/layout-header'
export default {
  // components: {
  //   'layout-aside': layoutAside,
  //   'layout-header': layoutHeader
  // }
}
</script>

<style>

</style>
