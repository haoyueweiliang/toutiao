<template>
    <el-card>
        <bread-crumb slot='header'>
        <template slot='title'>素材列表</template>
        </bread-crumb>
        <!-- 标签页   -->
         <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="全部图片" name="all">
        <!-- 全部图片 -->
        <div class='allimg'>
            <el-card v-for="item in list " :key='item.id' class="imgitem">
            <img :src="item.url" alt="" >
            <div class="icon">
                <i class="el-icon-star-on" :style='{color: item.is_collected ? "red": "#000"}'></i>
            <i class="el-icon-delete-solid"></i>
            </div>
        </el-card>
        </div>
    </el-tab-pane>
    <el-tab-pane label="收藏图片" name="Collection">
        <!-- 收藏图片 -->
        <div class='allimg'>
            <el-card v-for="item in list " :key='item.id' class="imgitem">
            <img :src="item.url" alt="" >
            <div class="icon">
                <i class="el-icon-star-on" :style='{color: item.is_collected ? "red": "#000"}'></i>
            <i class="el-icon-delete-solid"></i>
            </div>
        </el-card>
        </div>
    </el-tab-pane>
  </el-tabs>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认全部图片
      list: []
    }
  },
  methods: {
    // 请求接口 渲染页面
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // false  表示全部图片
        params: { collect: false }
      }).then((result) => {
        this.list = result.data.results
        // console.log(this.list)
      })
    }
    // 点击切换页签  改变activeName值
    // handleClick () {
    //     if(this.activeName === 'all'){

    //     }
    // }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
     .allimg{
         display: flex;
         flex-wrap: wrap;
         justify-content: center;
         .imgitem{
             margin: 20px;
             width: 180px;
             height: 180px;
            border-radius: 6px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .icon{
                position: absolute;
                width: 30px;
                left: 0;
                right: 0;
                bottom: 0;
                height: 30px;
                width: 100%;
                background-color: #f4f5f6;
                display: flex;
                justify-content:space-around;
                align-items: center;
                i{
                    font-size:18px
                }
            }
         }
     }
</style>
