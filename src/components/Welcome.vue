<template>
<div>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
<!--    面包屑导航区-->
<!--    <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--      <el-breadcrumb-item :to="{ path: '/home' }">TOP</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>売上管理</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>売上詳細</el-breadcrumb-item>-->
<!--    </el-breadcrumb>-->

<!--    卡片视图区域-->
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 500px;height:300px;"></div>
    </el-card>

<!--      表单区域-->
<!--  <el-card style="margin-top: 10px;padding: 0">-->

    <template>
      <el-table
              :data="tableData.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()) ||
              data.data.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%;margin-top: 10px" :stripe="true" max-height="300" empty-text="適切なデータがありません">
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
                    @click="Edit = true">編集</el-button>
            <el-button
                    size="mini"
                    type="danger"
                    @click="Delete = true">削除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
<!--  </el-card>-->
<!--編集box-->
  <el-dialog
          title="編集"
          :visible.sync="Edit"
          width="50%">
      <el-form :model="form">
          <el-form-item label="金額" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="メモ" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="Edit = false">キャンセル</el-button>
    <el-button type="primary" @click="Edit = false">確 定</el-button>
  </span>
  </el-dialog>
<!--  確認box-->
    <el-dialog
            title="確認"
            :visible.sync="Delete"
            width="30%"
            :before-close="handleClose">
        <span>削除してよろしいですか</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="Delete = false">キャンセル</el-button>
    <el-button type="primary" @click="Delete = false">確 定</el-button>
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
          search: '',
          Edit: false,
          Delete: false,
          form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
          },
          formLabelWidth: '120px'
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
