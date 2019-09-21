<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材列表</template>
    </bread-crumb>
    <!-- 标签页   @tab-click="getMaterial"  点击-根据activeName得值改变收藏或全部   因为页码不同 所以更换地方发为changetab -->
    <el-tabs v-model="activeName" @tab-click="changetab">
      <el-tab-pane label="全部图片" name="all">
        <!-- 全部图片 -->
        <div class="allimg">
          <el-card v-for="item in list " :key="item.id" class="imgitem">
            <img :src="item.url" alt />
            <div class="icon">
              <i class="el-icon-star-on" :style='{color: item.is_collected ? "red": "#000"}'></i>
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
         <el-row type='flex' justify="center" style='margin:20px 0'>
      <el-pagination @current-change='changepage' background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize"></el-pagination>
    </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="Collection">
        <!-- 收藏图片 -->
        <div class="allimg">
          <el-card v-for="item in list " :key="item.id" class="imgitem">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type='flex' justify="center" style='margin:20px 0'>
      <el-pagination @current-change='changepage' background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize"></el-pagination>
    </el-row>
      </el-tab-pane>
    </el-tabs>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认全部图片
      list: [],
      // 分页信息
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {

    // 当页码改变时 会传入当前页面
    changepage (newpage) {
      this.page.currentPage = newpage // 复制最新页码
      this.getMaterial() // 调用此方法 获取最新数据
    },
    // 切换页签  当页签换成收藏时
    changetab () {
      // 页码归一  当从全部切换至收藏时 页码归属于  重新获取数据页面渲染
      this.page.currentPage = 1
      this.getMaterial()
    },
    // 请求接口 渲染页面
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // false  表示全部图片
        params: { collect: this.activeName === 'Collection', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.page.currentPage = result.data.page
        this.page.pageSize = result.data.per_page
        // console.log(this.list)     //每次数据更新都会重新赋值  所以全部与收藏 公用一个接口 返回数据却不相同
      })
    }
    // 点击切换页签  改变activeName值
    // handleClick () {
    //   if (this.activeName === 'all') {
    //     this.getMaterial(false)
    //   }
    //   if (this.activeName === 'Collection') {
    //     this.getMaterial(true)
    //   }
    // }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.allimg {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .imgitem {
    margin: 20px;
    width: 180px;
    height: 180px;
    border-radius: 6px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .icon {
      position: absolute;
      width: 30px;
      left: 0;
      right: 0;
      bottom: 0;
      height: 30px;
      width: 100%;
      background-color: #f4f5f6;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>
