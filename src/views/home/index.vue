<template>
  <el-container>
      <el-aside>
         <layout-aside></layout-aside>
      </el-aside>
       <el-container>
           <el-header>顶部</el-header>
           <el-main>
               <!-- 二级容器 -->
                <router-view></router-view>
           </el-main>
  </el-container>
  </el-container>

</template>

<script>
import layoutAside from '../../components/aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
