<template>
  <div>
    <!-- 面包屑全局组件 -->
    <mybread level1="数据报表" level2="可视化" class="mybread"> </mybread>

    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
var echarts = require('echarts')

export default {
  data() {
    return {}
  },
  methods: {
    async userRchart() {
      // init
      var myChart = echarts.init(document.getElementById('main'))
      // option

      const res = await this.$axios.get(`reports/type/1`)

        // console.log(res)

      var option = {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }

      // setOption
      myChart.setOption(option)


      
    }
  },
  mounted() {
    this.userRchart()
  }
}
</script>

<style>
</style>
