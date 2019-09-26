<template>
  <!-- 封面组件 -->
  <div class="cover-img">
    <!-- 点击图片要传递索引 -->
    <div v-for='(item,index) in images' :key='index' @click="openDialog(index)" class="cove-item">
      <img :src="item ? item : defaultImg" alt="">
    </div>
    <!--弹层  弹层状态:visible="dialogVisible"  监听关闭事件 @close -->
    <el-dialog @close='dialogVisible=false' :visible="dialogVisible">
      <!-- 点击图片显示素材的上传组件 @selectOneImg 接受子组件 传来的图片路径-->
      <select-img @selectOneImg="receiveImg"></select-img>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 是否显示弹层
      selectIndex: -1 // -1 是不可能出现的下标 所以不影响传输的下标
    }
  },
  methods: {
    // 点击时打开弹层
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index // 打开位置的下标
    },
    // 接受子组件图片路径   上传于素材公用一个抛出方法名  互不影响
    receiveImg (url) {
      // alert(url)
      // 要传值给images的  但是props是只读事件  所以要穿给父组件 publish
      // 把下标也传过去
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogVisible = false
    }
  }

}
</script>

<style lang='less' scoped>
.cover-img {
  display: flex;
  margin-left: 60px;
  .cove-item {
    border: 1px solid #ccc;
    padding: 2px;
    padding: 10px;
    width: 220px;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
