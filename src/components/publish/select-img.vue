<template>
  <!-- 弹窗组件内部 -->
  <el-card v-loading='loading'>
    <!-- 标签页   被选中时触发@tab-click="handleClick"    默认  v-model="activeName" 被选中的元素-->
    <el-tabs>
      <el-tab-pane label="素材库">
        <div class='img-material'>
          <el-card v-for='item in list' :key='item.id' class='card-img'>
            <!-- 点击图片抛出当前图片的路径 -->
            <img :src="item.url" alt="" @click='clickImg(item)'>
          </el-card>
        </div>
        <!-- 分页 -->
        <el-row type='flex' justify="center" style='margin:10px 0'>
          <el-pagination background layout="prev, pager, next" :total="page.total"
            :page-size="page.pageSize" :current-page="page.currentPage"
            @current-change='changePage'>
          </el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片">
        <!-- 自定义上传 -->
        <el-upload :show-file-list="false" action="" :http-request="uploadImg">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      // 分页
      page: {
        pageSize: 8,
        currentPage: 1,
        total: 0
      }

    }
  },
  methods: {
    // 获取所有图片
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then((result) => {
        this.list = result.data.results
        // console.log(list)
        this.page.total = result.data.total_count
        this.page.pageSize = result.data.per_page
      })
    },
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
      // alert(newPage)
    },
    // 点击图片代表选中   抛出图片路径给父组件 cover-img
    clickImg (item) {
      this.$emit('selectOneImg', item.url)
      // this.$emit('selectOneImg', item.url) // 自定义事件 若干参数
      // alert(item.url)
    },
    // 上传用户素材
    uploadImg (params) {
      // debugger

      let data = new FormData()
      data.append('image', params.file)
      this.loading = true
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then((result) => {
        // 上传成功  抛出图片路径给父组件 cover-img   抛出的UI在cover-img组建中接收
        this.$emit('selectOneImg', result.data.url)
        this.loading = false
      })
    }
  },
  created () {
    // 获取所有图片
    this.getAllImg()
  }

}
</script>

<style lang='less' scoped>
.img-material {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .card-img {
    width: 120px;
    height: 100px;
    margin: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
