<template>
  <div class='box'>
    <div class='back'>
      <div :style='hourStyle' class='hou'></div>
      <div :style='minStyle' class='min'></div>
      <div :style='secondStyle' class='sec'></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hour: 12,
      min: 60,
      sec: 60
    }
  },
  methods: {
    updateTime () {
      let currentDate = new Date() // 当前时间
      this.hour = currentDate.getHours() // 获取当时的小时
      this.min = currentDate.getMinutes() // 获取当前的分钟
      this.sec = currentDate.getSeconds() // 获取当前的秒
    }
  },
  created () {
    this.updateTime()
    setInterval(() => {
      this.updateTime()
    }, 1000)// 一秒调用一次
  },
  // 属性选择器
  computed: {
    //   - 时针 =》 8点 =》 一圈 360deg =>  一格30deg => 30*8=>240deg
    // - 分针 =》 20分 =》 1圈360deg => 一格6deg => 20* 6 =》 120deg
    // - 秒针 =》 20秒 =》 一圈360deg => 1格6deg => 20*6 => 120deg

    // 时针
    hourStyle () {
      let hour = this.hour - 12 ? this.hour - 12 : this.hour
      let rowDeg = hour * 30 + this.min / 60 * 30 // 时针加上 分针的角度
      return { transform: `rotate(${rowDeg}deg)` }
    },
    // 分
    minStyle () {
      let rowDeg = this.min * 6
      return { transform: `rotate(${rowDeg}deg)` }
    },
    // 秒
    secondStyle () {
      let rowDeg = this.sec * 6
      return { transform: `rotate(${rowDeg}deg)` }
    }
  }
}
</script>

<style lang='less' scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  .back {
    background-image: url(../../assets/img/back.png);
    background-size: cover;
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    position: relative;
    .hou,
    .min,
    .sec {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 150px;
      transform-origin: 0 100%;
    }
    .hou {
      background-image: url(../../assets/img/hou.png);
      width: 7px;
      height: 60px;
    }
    .min {
      background-image: url(../../assets/img/min.png);
      width: 5px;
      height: 90px;
    }
    .sec {
      background-image: url(../../assets/img/sec.png);
      width: 3px;
      height: 110px;
    }
  }
}
</style>
