<template>
<!-- 内容列表 -->
  <el-card >
      <bread-crumb slot='header'>
        <template  slot='title'>全部图文</template>
      </bread-crumb>
      <!-- 文章状态  全部草稿待审核审核通过审核失败-->
    <el-form style='margin-left:40px'>
        <el-form-item label="文章状态 ：">
            <!--changeCondition  变化条件  -->
   <el-radio-group v-model="formData.status" @change="changeCondition" >
     <el-radio :label="5">全部</el-radio>
     <el-radio :label="0">草稿</el-radio>
     <el-radio :label="1">待审核</el-radio>
     <el-radio :label="2">审核通过</el-radio>
     <el-radio :label="3">审核失败</el-radio>
  </el-radio-group>
  </el-form-item>
  <!-- 选择器 -->
  <el-form-item label="频道列表 ：">
      <!-- v-model="formData.channels_id"  当选择时 会根据子元素 的value 变化 -->
  <el-select v-model="formData.channel_id" @change="changeCondition">

      <!-- value 储存数据   label 显示数据 -->

    <el-option v-for='item in channels' :key='item.id' :value='item.id' :label="item.name">
       </el-option>
 </el-select>
  </el-form-item>
  <!-- 时间处理 -->
  <el-form-item label="时间选择 ：">
      <!-- value-format="yyyy-MM-dd"  制定绑定值得格式 必须设置  否事件会出错-->
     <el-date-picker
     @change="changeCondition"
      type="daterange"
      v-model="formData.date"
      value-format="yyyy-MM-dd"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
     </el-form>
    <!-- 数据 -->
    <div class='title'>共找到{{page.total}}条符合条件的内容</div>
    <div class="articlesdata" v-for='(item,index) in list ' :key='index'>

        <div class='item'>
            <div class="imgitem">
                <!--  .cover返回值是一个数组 所以要判断长度  去下标第一个-->
                <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
            </div>
            <div class='textdata'>
               <span>{{item.title}}</span>
               <!-- 过滤器 -->
               <el-tag :type='item.status | statusType' style='width:70px' >{{item.status | statusitem}}</el-tag>
               <span style='font-size:12px;color:#999 '>{{item.pubdate}}</span>
            </div>
        </div>
        <div class="statusitem">
            <span @click='updatedata(item.id)'><i class="el-icon-edit" >修改</i></span>
            <span  @click='deletedata(item.id)'><i class="el-icon-delete">删除</i></span>
        </div>
    </div>
    <el-row type='flex' justify="center" style='margin:20px 0'>
        <!-- 分页-->
        <el-pagination
 @current-change='changePage'
  background
  layout="prev, pager, next"
  :total="page.total"
  :page-size='page.pageSize'
  :current-page='page.currentPage'>
</el-pagination>

    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      defaultImg: require('../../assets/img/404.png'),
      total_count: '',
      formData: {
        status: 5, //  默认全部  null
        channel_id: null, // 频道   什么都不出传为null  空串是''
        date: '' // 时间

      },
      channels: [], // 频道
      // 分页
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 获取数据 渲染列表     传值为条件  封装的使用优化代码
    getarticlesData (params) {
      this.$axios({
        url: '/articles',
        params // 条件参数
      }).then((result) => {
        this.list = result.data.results
        // this.total_count = result.data.total_count
        // 分页
        this.page.currentPage = result.data.page
        this.page.pageSize = result.data.per_page
        this.page.total = result.data.total_count

        // console.log(this.list)
      })
    },
    // 获取频道
    getchannels () {
      this.$axios({
        url: 'channels'
      }).then((result) => {
        this.channels = result.data.channels
        // console.log(this.channels)
      })
    },
    // 由于formdata 都是最新的值  所以三个值改变事件  绑定这一个方法即可
    // 变化条件    通过值改变事件  得到变化变化的条件   然后进行axios请求   g改变条件冲第一页开始
    changeCondition () {
      this.page.currentPage = 1
      this.queryarticles()
    },
    // 页码改变事件   调用带条件的事件   改变条件从第一页开始
    changePage (newpage) {
      this.page.currentPage = newpage
      this.queryarticles()
    },
    // 封装方法  带条件的查询
    queryarticles () {
      let params = {
        //  时间  先要判断时间有没有   没有为null  时间绑定的是一个数组 [开始，结束]
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null, // 时间开始
        end_pubdate: this.formData.date.length > 1 ? this.formData.date[1] : null, // 时间结束
        status: this.formData.status === 5 ? null : this.formData.status, // 什么都不传代表全部 借口要求  所有  null  radio 必须写值
        channel_id: this.formData.channel_id, // 频道id
        // 页码
        per_page: this.page.pageSize,
        page: this.page.currentPage

      }
      this.getarticlesData(params)
    },
    // 删除  139111111账号已发表的不能删  可删除草稿   记住
    deletedata (id) {
      this.$confirm('您确定要删除此条信息吗？').then(() => {
        this.$axios({
          // id  是大数字
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.queryarticles()
        })
      })
    },
    // 修改文章
    updatedata (id) {
      this.$router.push(`/home/publish/${id.toString()}`) // 大数字转化
    }

  },
  created () {
    // 获取数据 渲染列表
    this.getarticlesData()
    // 获取频道
    this.getchannels()
  },
  // 过滤器  文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
  filters: {
    statusitem (value) {
      switch (value) {
        case 0 :
          return '草稿'
        case 1 :
          return '待审核'
        case 2:
          return '已发表'
        case 3 :
          return '审核失败'
        case 4 :
          return '已删除'
      }
    },
    // 属性过滤器
    statusType (value) {
      switch (value) {
        case 0 :
          return 'warning'
        case 1 :
          return 'info'
        case 2:
          return 'sussess'
        case 3 :
          return 'danger'
        case 4 :
          return 'denger'
      }
    }
  }

}
</script>

<style lang='less' scoped>
.title{
    height: 60px;
    margin-top:20;
    line-height: 60px;
    border-bottom: 1px dashed #ccc
}
.articlesdata{
        height: 130px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 15px 10px ;
        padding-bottom: 10px;
        border-bottom:1px solid #f2f3f5;
        .item{
            display: flex;
            justify-content:space-between;
            .imgitem{
                width: 150px;
                height: 100px;
                margin-right: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
                 }
            .textdata{
                font-size:14px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

        }

        }
        .statusitem{
            i{
                margin-left: 15px;
                font-size:12px;
                cursor: pointer;  //小手

            }
        }

    }
</style>
