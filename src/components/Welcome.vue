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
      <div id="main" style="width: 500px;height:300px;"></div>
    </el-card>

<!--      表单区域-->
  <el-card style="margin-top: 10px;padding: 0">

    <template>
      <el-table
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%" :stripe="true" max-height="300">
              <el-table-column
                      fixed
                      prop="data"
                      label="登録日付"
                      align="center">
              </el-table-column>
              <el-table-column
                      prop="pname"
                      label="項目"
                      align="center">
              </el-table-column>
              <el-table-column
                      prop="cname"
                      label="お客様名"
                      align="center">
              </el-table-column>
              <el-table-column
                      prop="paydata"
                      label="入金日付"
                      align="center">
              </el-table-column>
              <el-table-column
                      prop="money"
                      label="金額"
                      align="center">
              </el-table-column>
              <el-table-column
                      prop="department"
                      label="部署"
                      align="center">
              </el-table-column>
              <el-table-column
                      prop="memo"
                      label="メモ"
                      align="center">
              </el-table-column>
        <el-table-column align="right" fixed="right" width="150">
          <template slot="header" slot-scope="scope">
            <el-input
                    v-model="search"
                    size="mini"
                    placeholder="検索"/>
          </template>
          <template slot-scope="scope" >
            <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">編集</el-button>
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">削除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-card>

  <el-dialog
          title="編集"
          :visible.sync="alter"
          width="50%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="alter = false">取 消</el-button>
    <el-button type="primary" @click="alter = false">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>
<script>
//echarts
import echarts from "echarts"

  export default {
    data(){
      return{
          //table的值
          tableData: [],
          alter: false,
          search: ''
      }
      },
      created() {
        this.getTableList();
      },
      methods: {
        // 获取tableList
          async getTableList(){
              const {data:res} = await this.$http.get("table");
              this.tableData = res.TableList;
          }
      },
      // 此时，页面上的元素已经被渲染完毕了
      async mounted() {
          // 3基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('main'));

          var option = {
              legend: {},
              tooltip: {
                  trigger: 'axis',
                  showContent: false
              },
              dataset: {
                  source: [
                      ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                      ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                      ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                  ]
              },
              xAxis: {type: 'category'},
              yAxis: {gridIndex: 0},
              grid: {top: '55%'},
              series: [
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {
                      type: 'pie',
                      id: 'pie',
                      radius: '30%',
                      center: ['50%', '25%'],
                      label: {
                          formatter: '{b}: {@2012} ({d}%)'
                      },
                      encode: {
                          itemName: 'product',
                          value: '2012',
                          tooltip: '2012'
                      }
                  }
              ]
          };

          myChart.on('updateAxisPointer', function (event) {
              var xAxisInfo = event.axesInfo[0];
              if (xAxisInfo) {
                  var dimension = xAxisInfo.value + 1;
                  myChart.setOption({
                      series: {
                          id: 'pie',
                          label: {
                              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                          },
                          encode: {
                              value: dimension,
                              tooltip: dimension
                          }
                      }
                  });
              }
          });
          myChart.setOption(option)
        }
  }
</script>

<style lang="less" scoped>
  /*.table {*/
  /*  width: 100%;*/
  /*  font-size: 14px;*/
  /*}*/
</style>
