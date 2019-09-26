<template>
  <!-- 图文概况测试 -->
  <el-card>
    <bread-crumb slot='header'>
      <template slot='title'>
        图文概况
      </template>
    </bread-crumb>
    <el-row type='flex' justify="space-between">
      <div class='echartA' ref='workChart'></div>
      <div class='echartB' ref='fileChart'></div>
    </el-row>
  </el-card>
</template>

<script>
import echarts from 'echarts' // 三方安装 npm i echarts -s
export default {
  data () {
    return {
      // 动态复制   变成动态
      workData: [820, 932, 901, 934, 1290, 1330, 1320],
      fileData: [10, 52, 200, 334, 390, 330, 220]
    }
  },
  methods: {
    // s数据变化
    updateData () {
      this.workData = this.workData.map(item => {
        return item * (Math.random() + 0.5)
      })
      this.fileData = this.fileData.map(item => {
        return item * (Math.random() + 0.7)
      })
    },
    setworkOption () {
      this.workChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.workData,
          type: 'line'
        }]
      })
    },
    setfileOption () {
      // 生活图表的渲染
      this.fileChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.fileData
          }
        ]
      })
    }

  },
  created () {
    // 一秒钟调用一次   不能直接多用
    setInterval(() => {
      this.updateData() // 更新的数据  一旦数据变化需要重新的setoPtion  created无法做到  使用watch
    }, 1000)
  },
  watch: {
    workData (newValue) {
      this.setworkOption()
    },
    fileData (newValue) {
      this.setfileOption()
    }
  },

  mounted () {
    // 初始化图形表
    this.workChart = echarts.init(this.$refs.workChart)
    this.fileChart = echarts.init(this.$refs.fileChart)
    // 渲染到页面 使用setOption方法渲染 在百度里复制option 后的对象  黏贴到
    // 工作图表的渲染   封装渲染
    this.setfileOption()
    this.setworkOption()
  }
}
</script>

<style lang='less' scoped>
.echartA,
.echartB {
  width: 500px;
  height: 400px;
}
</style>
