<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材列表</template>
    </bread-crumb>
    <!-- 上传 图片   :http-request自定义上传   默认不显示上传成功:show-file-list="false"-->
    <el-upload action='' :show-file-list="false" :http-request="locadimg" class='uploadimg'>
        <el-button type="primary">上传图片</el-button>
    </el-upload>
    <!-- 标签页   @tab-click="getMaterial"  点击-根据activeName得值改变收藏或全部   因为页码不同 所以更换地方发为changetab -->
    <el-tabs v-model="activeName" @tab-click="changetab">
      <el-tab-pane label="全部图片" name="all">
        <!-- 全部图片 -->
        <div class="allimg">
          <el-card v-for="item in list " :key="item.id" class="imgitem">
            <img :src="item.url" alt />
            <div class="icon">
              <i @click='Collectionimg(item)' class="el-icon-star-on" :style='{color: item.is_collected ? "red": "#000"}'></i>
              <i class="el-icon-delete-solid"  @click='deleteimg(item.id)'></i>
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
    // 上传图片方法
    locadimg (params) {
      // console.log(params)

      const data = new FormData() // 声明一个新的表单
      data.append('image', params.file)
      // 上传文件
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      })
    },

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
    },
    // 点击切换页签  改变activeName值
    // handleClick () {
    //   if (this.activeName === 'all') {
    //     this.getMaterial(false)
    //   }
    //   if (this.activeName === 'Collection') {
    //     this.getMaterial(true)
    //   }
    // }

    // 点击收藏反收藏
    Collectionimg (item) {
      // let id = item.id
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected }
      }).then(() => {
        this.getMaterial()
      })
    },
    // 删除图片
    deleteimg (id) {
      // console.log(id)

      this.$confirm('您确认删除此条信息吗？').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.uploadimg{
    position: absolute;
    right: 20px;
    margin-top: -10px;
    z-index:10

}
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
