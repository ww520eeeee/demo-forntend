<template>
  <div>
<!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">TOP</el-breadcrumb-item>
      <el-breadcrumb-item>売上管理</el-breadcrumb-item>
      <el-breadcrumb-item>売上詳細</el-breadcrumb-item>
    </el-breadcrumb>

<!--    卡片视图区域-->
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 500px;height:350px;"></div>
    </el-card>
  </div>
</template>
<script>
//echarts
import echarts from "echarts"

  export default {
    data(){
      return{}
      },
      created() {
      },
      // 此时，页面上的元素已经被渲染完毕了
      async mounted() {
          // 3基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('main'));

          // const {data: res } = await this.$http.get("reports/type/1")
          // if(res.meta.status !== 200){
          //     return this.$message.error("データ取り込み失敗!")
          // }
          // 4指定图表的配置项和数据
          var option = {
              title: {
                  text: '売上表'
              },
              tooltip: {},
              legend: {
                  data:['売上']
              },
              xAxis: {
                  data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
              },
              yAxis: {},
              series: [{
                  name: '销量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20]
              }]
          };

          myChart.setOption(option)
        }
  }
</script>

<style lang="less" scoped>

</style>
