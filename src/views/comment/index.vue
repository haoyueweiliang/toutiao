<template>
  <el-card v-loading='loading'>
      <bread-crumb slot='header'>
        <template slot='title'>首页详情</template>
      </bread-crumb>
      <!-- 评论列表 -->
      <el-table :data='list'>

          <el-table-column label='标题' prop='title' width='500px'></el-table-column>
          <!-- 当返回值是布尔值时  用次:formatter属性 方法的函数可得到row单行数据 找到需要的值进行判断-->
          <el-table-column :formatter="formatter" label='评论状态' prop='comment_status' align='center'></el-table-column>
          <el-table-column label='总评论数' prop='total_comment_count' align='center'></el-table-column>
          <el-table-column label='粉丝评论数' prop='fans_comment_count' align='center'></el-table-column>
          <el-table-column label='操作' >
            <!-- 通过slot-scope  获取table内设的row，column $index,store -->
            <template slot-scope="obj">
                <el-button type="text" size='small'>修改</el-button>
                <!-- 根据当前状态的trunk  绑定属性 判断颜色 -->
                <el-button :style='{color:obj.row.comment_status ? "#E6A23C":"#67C23A"}' type="text" @click='openorClose(obj.row)' size='small'>{{obj.row.comment_status ? "关闭评论":"打开评论"}}</el-button>
            </template>
          </el-table-column>

      </el-table>
          <!-- 分页-->
          <el-row type='flex' justify="center">
            <el-pagination
            style='margin:20px'
             background
             layout="prev, pager, next"
             :total="page.total"
             :page-size='page.pageSize'
             :current-page='page.currentPage'
             @current-change='changePage'>
          </el-pagination>
          </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 加载
      loading: true,
      list: [],
      // 分页数据  total 总条数  pagesize 一页几条  currentpage 当前页
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    // 页码点谁是谁
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getComment()
      // alert(newpage)
    },
    // 获取评论列表
    getComment () {
      // 加载状态开始
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then((result) => {
        this.list = result.data.results
        // console.log(result)
        this.page.total = result.data.total_count
        this.page.pageSize = result.data.per_page
        this.page.currentPage = result.data.page
        // 加载状态结束
        this.loading = false
      })
    },
    // 获取状态值将布尔转化为
    //        单条数据  列表信息  此小表格信息   下标
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 点击修改开关评论
    openorClose (row) {
      console.log(row) // 根据评论状态 调用接口更改开关评论的显示
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定${mess}此评论吗`).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() }, // 修改路径   但是此时得到的id为大数字  去axios 更改tranformResponse 属性
          data: { allow_comment: !row.comment_status } // 改变状态的布尔值  去相反的
        }).then(() => {
          // 改变数据信息后  调用渲染列表  从新渲染
          this.getComment()
        })
      })
    }

  },
  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
