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

<!--      表单区域-->
      <template>
<!--         <div class="common-table">-->
<!--        -->
<!--         </div>-->
          <el-table
                  :data="tableData"
                  border
                  style="width: 100%">
              <el-table-column
                      fixed
                      prop="date"
                      label="日期"
                      width="150">
              </el-table-column>
              <el-table-column
                      prop="name"
                      label="姓名"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="province"
                      label="省份"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="city"
                      label="市区"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="address"
                      label="地址"
                      width="300">
              </el-table-column>
              <el-table-column
                      prop="zip"
                      label="邮编"
                      width="120">
              </el-table-column>
              <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                  <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                      <el-button type="text" size="small">编辑</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </template>
  </div>
</template>
<script>
//echarts
import echarts from "echarts"

  export default {
    data(){
      return{
          tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
          }, {
              date: '2016-05-04',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1517 弄',
              zip: 200333
          }, {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1519 弄',
              zip: 200333
          }, {
              date: '2016-05-03',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1516 弄',
              zip: 200333
          }]
      }
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
