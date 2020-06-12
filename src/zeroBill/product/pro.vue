<template>
    <div>
        <div class="bread_crumb">
            <div class="bread_crumb_left"><strong>Table</strong></div>
            <div class="bread_crumb_right">
                <span>导航一 /</span>
                <span class="bread_current">Table</span>
            </div>
        </div>
        <div class="row_search">
            <div class="_search_inner">
                 <div class="_search">
                        <el-input size="small" style="width:180px;padding-left:10px" placeholder="请输入内容" v-model="input" clearable></el-input>
                        <el-button style="margin-left: 10px" size="small" type="primary">查询</el-button>
                        <el-button style="margin-left: 10px" size="small" type="primary">新增</el-button>
                </div>
            </div>
        </div>
    
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>
<style scoped>
    .bread_crumb{
        height: 17px;
        text-align: left;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    .bread_crumb_left {
        width: 200px;
        float: left;
        color: #475669;
        font-weight: bold;
        font-size: 14px;
    }

    .bread_crumb_right{
        float: right;
        font-size: 13px;
        line-height: 1;
    }

    .bread_current {
        color: #97a8be;
    }

    .row_search{
        /* height: 30px; */
        /* position: relative; */
        background: #f2f2f2;
        margin: 10px 0;
    }

    ._search_inner{
        padding: 8px 0px;
    }
    ._search{
        text-align: left;
    }
    
</style>