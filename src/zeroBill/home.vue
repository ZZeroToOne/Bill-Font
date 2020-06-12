<template>
    <div>
        <!-- <div>
            {{ this.data1 }}
        </div> -->
        <!-- <el-row>
            <el-col :span="12">
                <div id="myChart" class="chartColumn"></div>
            </el-col>
            <el-col :span="12">
                <div id="myChart1" class="chartColumn"></div>
            </el-col>
        </el-row> -->
        <el-row>
            <el-col :span="12">
                <div id="myChart2" class="chartColumn"></div>
            </el-col>
            <el-col :span="12">
                <div id="myChart3" class="chartColumn"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            websock: null,
            data1: [4, 42, 42, 5, 6, 42],
            myChart2: {},
            myChart2_Option: {},
        }
    },
    mounted() {
        this.drawLine()
        this.initWebSocket()
    },
    methods: {
        initWebSocket(){ //初始化weosocket
            //ws地址
            var wsuri = "ws:////localhost:8090/ws/asset";
            this.websock = new WebSocket(wsuri);
            var self = this
            this.websock.onmessage = function(e){
                self.websocketonmessage(e);
            } 
            this.websock.onclose = function(e){
                // websocketclose(e);
                 console.log("connection closed (" + e.code + ")");
            }
            this.websock.onopen = function () {
                // websocketOpen();
                 console.log("连接成功");
            }

            //连接发生错误的回调方法
            this.websock.onerror = function () {
                console.log("WebSocket连接发生错误");
            }
        },
        websocketonmessage(e) {
            try
            {
                let data = JSON.parse(e.data)
                let product = data['product']
                let area = data['area']
                if (product) this.data1 = product
                if (area) this.data2 = area
            
                

            }
            catch(err){
                console.error(err)
            }
        },
        drawLine(){
            // // 基于准备好的dom，初始化echarts实例
            // let myChart = this.$echarts.init(document.getElementById('myChart'))
            // // 绘制图表
            // myChart.setOption({
            //     title: { text: '' },
            //     tooltip: {},
            //     xAxis: {
            //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // });

            // // 基于准备好的dom，初始化echarts实例
            // let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
            // // 绘制图表
            // myChart1.setOption({
            //     title: { text: '' },
            //     tooltip: {},
            //     xAxis: {
            //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // });
            // 基于准备好的dom，初始化echarts实例
            this.myChart2 = this.$echarts.init(document.getElementById('myChart2'))
           
            // 绘制图表
            this.myChart2_Option = {
                title: { text: '' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: this.data1
                }]
            }
            console.log(this.myChart2_Option)
            this.myChart2.setOption(this.myChart2_Option);

            // 基于准备好的dom，初始化echarts实例
            let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        
            let option = {
                title: {
                    // text: '堆叠区域图'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {normal: {}},
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
            // 绘制图表
            myChart3.setOption(option);
        }
    },
    watch: {
        //观察option的变化
      data1: {
        handler(newVal, oldVal) {
          this.drawLine()
        },
        deep: true //对象内部属性的监听，关键。
      }
    }
}
</script>
<style scoped>
    .chartColumn {
         width: 100%;
        height: 400px;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        position: relative;
        background: transparent;
    }
</style>