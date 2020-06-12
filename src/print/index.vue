<template>
    <div>
        <div style="text-align: right;">
            <el-button icon="el-icon-edit" type="primary" v-if="!edit_model" @click="entryEditModel(true)">编辑模式</el-button>
            <el-button icon="el-icon-success" type="primary" v-else @click="entryEditModel(false)">取消编辑</el-button>
            <el-button icon="el-icon-printer" type="info" v-if="!edit_model" v-print="'#printContent'">打印单据</el-button>
        </div>
        <div id="printContent">
            <div class="title">
                <h class="company">{{send}}建材行</h>
                <h class="form">销售单出库单</h>
            </div>
            
           <div class="subject">
               <div class="chil1">
                    <div style="position: absolute;left: 30px;">
                        <h>发货单位：</h> <h v-if="!edit_model">{{send}}</h>
                        <el-input clearable size="mini" v-else v-model="send" placeholder="发货单位" style="width:200px"></el-input>
                    </div>
                    <div style="position: absolute; left: 320px;">
                        <h>录单日期: </h> <h v-if="!edit_model"><span style="padding-left: 10px">{{recever_data}}</span></h>
                        <el-date-picker v-else size="mini" v-model="recever_data" type="date" placeholder="选择日期" 
                        value-format="yyyy-MM-dd" style="width:200px" @change="dataChange"></el-date-picker>
                    </div>
                    
                </div>
                <div class="chil2">
                    <div style="position: absolute;left: 30px;">
                        <h> 收货单位：</h> <h v-if="!edit_model">{{recever}}</h>
                        <el-input clearable size="mini" v-else v-model="recever" placeholder="收货单位" style="width:200px"></el-input>
                    </div>
                    <div style="position: absolute; left: 320px;">
                        <h>单据编号:</h> <h v-if="!edit_model"><span style="padding-left: 10px">{{seq_no}}</span></h>
                        <el-input size="mini" v-else v-model="seq_no" style="width:200px"></el-input>
                    </div>
                </div>
            
            </div>
            <div :class="{'cs_table':!edit_model, 'edit_cs_table': edit_model}">
                <el-table stripe size='mini' :data="tableData" border  show-summary :summary-method="getSummaries">
                    <el-table-column align="center" prop="pname" label="商品名称" :width="edit_model?'150':'140'">
                        <template slot-scope="{row}">
                            <el-input clearable size="mini" class="edit-cell"  v-if="edit_model" placeholder="输入商品名称"   v-model="row.pname"></el-input>
                            <span v-if="!edit_model">{{row.pname}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="norms" label="规格型号" :width="edit_model?'150':'140'">
                        <template slot-scope="{row}">
                            <el-autocomplete clearable size="mini" class="edit-cell" v-if="edit_model"  v-model="row.norms" :fetch-suggestions="querySearchNorms" 
                            placeholder="输入规格" @select="handleSelectNorms"></el-autocomplete>
                            <span v-if="!edit_model">{{row.norms}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="unit" label="单位" :width="edit_model?'100':'50'">
                        <template slot-scope="{row}">
                            <el-autocomplete clearable size="mini" class="edit-cell" v-if="edit_model"  v-model="row.unit" :fetch-suggestions="querySearchUnit" 
                            placeholder="单位" @select="handleSelectUnit"></el-autocomplete>
                            <span v-if="!edit_model">{{row.unit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="count" label="数量" :width="edit_model?'150':'70'">
                        <template slot-scope="{row}">
                            <el-input clearable size="mini" class="edit-cell" v-if="edit_model"    v-model="row.count"></el-input>
                            <span v-if="!edit_model">{{Number(row.count)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="单价" :width="edit_model?'150':'80'">
                        <template slot-scope="{row}">
                            <el-input clearable size="mini" width="20px" class="edit-cell" v-if="edit_model"    v-model="row.price"></el-input>
                            <span v-if="!edit_model">{{ number_format(Number(row.price).toFixed(2), 2)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="money" label="金额" :width="edit_model?'150':'150'">
                        <template slot-scope="{row}">
                            <span > {{row.moneyFormat = number_format((row.price * row.count).toFixed(2), 2)}}</span>
                            <span v-show="false"> {{ row.money = (row.price * row.count).toFixed(2) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="help" label="备注" :width="edit_model?'150':'100'">
                        <template slot-scope="{row}">
                            <el-input clearable size="mini" class="edit-cell" v-if="edit_model"    v-model="row.help"></el-input>
                            <span v-if="!edit_model">{{row.help}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" v-if="edit_model" prop="operate" label="操作" width="150">
                        <template slot-scope="{row, $index}" >
                            <el-button round size="mini" type="danger" plain v-if="$index != tableData.length - 1" @click="delRow(row, $index)">删除</el-button>
                            <el-button v-if="$index == tableData.length - 1" plain type="success" round size="mini" @click="addRow(row, $index)">添加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="height:8px">
            </div>
            <div class="tail">
                <div class="tail_1">
                    <span>仓库地址：{{address}}</span> 
                </div>
                <div class="tail_1 o1">
                    <span>电话（传值）：&nbsp;&nbsp;0755-28304709</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>18123780098 曾生</span>
                </div>
                <div class="tail_1 o2">
                    <div style="position: relative;">
                        <div style="position: absolute;top: 16px;width: 80px;text-align: left;">
                            <span>注意事项：</span> 
                        </div>
                        <div style="position: absolute;top: 16px;width: 600px;text-align: left;padding-left: 20px;">
                            <span style="padding-left: 50px;">1.出库前请检查，商品在运输过程中破损，客户自理</span>
                            <br/>
                            <span style="padding-left: 50px;">2.商品出库15天后，不设退货换货！谢谢合作！</span>
                        </div>           
                    </div>         
                </div>
                <div class="tail_1 o3">
                    <div>
                        <span>制单人:</span> <span>小梁</span>
                        <span style="padding-left: 180px;">发货人:</span>
                        <span style="padding-left: 180px;">收货人:</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import data from '@/print/all.json'
export default {
    data() {
        return {
            send: '新鹏城仓',
            address: '深圳市龙岗区宝丽路63号（新鹏城仓）',
            recever: '',
            recever_data: '',
            seq_no: '',
            edit_model: false, // 编辑模式
            showEdit: [], //显示编辑框
            showBtn: [],
            showBtnOrdinary: true,
            tableData: [],
            defaultData: {
                pname: '',
                norms: '',
                unit: '片',
                count: 0,
                price: 0,
                money: 0,
                moneyFormat: '0.00',
                help: ''
            }
        }
    },
    mounted: function(){
        // console.log(data)
        this.recever_data = this.dateFormat('YYYY-mm-dd', new Date())
        this.seq_no = 'XH' + this.recever_data.replace(/-/g, '') + '001'
    },
    methods: {
        number_format(number, decimals, dec_point, thousands_sep) {
            console.log('number_format' + number)
        　　/*
        　　 * 参数说明：
        　　 * number：要格式化的数字
        　　 * decimals：保留几位小数
        　　 * dec_point：小数点符号
        　　 * thousands_sep：千分位符号
        　　 * */
        　　 number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        　　 var n = !isFinite(+number) ? 0 : +number,
        　　 prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        　　sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        　　dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        　　s = '',
        　　 toFixedFix = function(n, prec) {
        　　　　var k = Math.pow(10, prec);
        　　　　return '' + Math.ceil(n * k) / k;
        　　};

        　　s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        　　 var re = /(-?\d+)(\d{3})/;
        　　 while(re.test(s[0])) {
        　　　　s[0] = s[0].replace(re, "$1" + sep + "$2");
        　　}

        　　if((s[1] || '').length < prec) {
            　　 s[1] = s[1] || '';
            　　s[1] += new Array(prec - s[1].length + 1).join('0');
        　　}
        　　　　return s.join(dec);
        },
        querySearchNorms(queryString, cb) {
            var restaurants = data['all_norms']
            cb(restaurants);
        },
        handleSelectNorms(item) {
            console.log(item);
        },
        querySearchUnit(queryString, cb) {
            var restaurants = data['all_unit']
            cb(restaurants);
        },
        handleSelectUnit(item) {
            console.log(item);
        },
        addRow(data, index) {
            if (index > 6) {
                this.$message({
                        showClose: true,
                        message: '每页最大打印8条记录',
                        type: 'error'
                    });
                return
            }
            // 校验
            if(data['pname'] === '' || data['norms'] === '' || data['unit'] === '' 
                || Number(data['count']) === 0 || Number(data['price']) === 0) {
                    this.$message({
                        showClose: true,
                        message: '请填写内容！',
                        type: 'error'
                    });
                return
            }
            var copy = this.deepCopy(this.defaultData)
            this.tableData.push(copy)
        },
        delRow(data, index) {
            this.tableData.splice(index, 1)
        },
        entryEditModel(isOpen) {
            if (isOpen) {
                if (this.tableData.length == 0) {
                    // var copy = JSON.parse(JSON.stringify(this.defaultData))
                    var copy = this.deepCopy(this.defaultData)
                    this.tableData.push(copy)
                }
                this.edit_model = true
            } else {
                let last = this.tableData.length - 1
                let lastData = this.tableData[last]
                if(lastData['pname'] === '' || lastData['norms'] === '' || lastData['unit'] === '' ) {
                    this.tableData.splice(last, 1)
                }
                this.edit_model = false
            }
            
        },
        dataChange(data) {
            this.seq_no = 'XH' + data.replace(/-/g, '') + '001'
        },
        dateFormat(fmt, date) {
            let ret;
            const opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "m+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "M+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString()          // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        },
        money(val) {
            val = val.toString().replace(/\$|\,/g, "");
            if (isNaN(val))
            {
                val = "0";
            }
            let sign = (val == (val = Math.abs(val)));
            val = Math.floor(val * 100 + 0.50000000001);
            let cents = val % 100;
            val = Math.floor(val / 100).toString();
            if (cents < 10)
            {
                cents = "0" + cents;
            }
            for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); I++)
            {
                val = val.substring(0, val.length - (4 * i + 3)) + "," + val.substring(val.length - (4 * i + 3));
            }

            return (((sign) ? "" : "-") + val + "." + cents);
        },
        deepCopy(obj) {
            var str, newobj = obj.constructor === Array ? [] : {};//constructor 属性返回对创建此对象的数组函数的引用。创建相同类型的空数据
            if (typeof obj !== 'object') {
                return;
            } else {
                for (var i in obj) {
                if (typeof obj[i] === 'object'){//判断对象的这条属性是否为对象
                    newobj[i] = newObj(obj[i]);//若是对象进行嵌套调用
                }else{
                    newobj[i] = obj[i];
                }
                }
            }
            return newobj;//返回深度克隆后的对象
        },
        print() {
            alert(this.height)
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '总价';
                return;
            }
            // const values = data.map(item => (Number(item[column.property])));
            const values = data.map(item => column.property === 'money' ? (Number(item[column.property])) : NaN);
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] = this.number_format(sums[index], 2) + ' 元';
            } else {
                sums[index] = '';
            }
            });
            return sums;
        }
    }
}
</script>
<style scope>
    @page{
        size: A4 landscape; /*portrait： 纵向打印,  landscape: 横向*/
        margin: 0; /* 取消页眉页脚 */
    }

    .title{
        /* text-align: center; */
        position: relative;
        height: 34px;
        font-size: 20px;

    }

    .title .company{
        position: absolute;
        left: 150px;
    }

    .title .form {
        position: absolute;
        left: 400px;
    }

    .subject{
        font-size: 12px;
        padding-left: 45px;
    }

    .subject .chil1{
        position: relative;
        height: 30px;
    }

    .subject .chil1 hl{
        position: absolute;
        left: 30px;
    }

    .subject .chil1 hr{
        position: absolute;
        left: 400px;
    }

    .subject .chil2{
        position: relative;
        height: 30px;
    }

    .subject .chil2 hl{
        position: absolute;
        left: 30px;
    }

    .subject .chil2 hr{
        position: absolute;
        left: 400px;
    }

    .cs_table {
        text-align: center;
        margin-left: 40px;
        width: 731px;
        border-bottom: 1px solid #2c3e50;
        border-right: 1px solid #2c3e50;
    }

    .edit_cs_table {
        text-align: center;
        margin-left: 40px;
        width: 1151px;
        padding-top: 8px;
        /* border-bottom: 1px solid #EBEEF5; */
    }

    .tail{
        font-size: 10px;
        position: relative;
        letter-spacing: 2px;

    }

    .tail_1 {
        position: absolute;
        left: 40px;
    }

    .o1{
        top: 20px;
    }
    .o2{
        top: 24px;
    }

    .o3{
        top: 78px
    }

    .edit-cell {
        width: 100%;
    }

    .edit_cell_80 {
        width: 80px;
    }
    
    .edit_cell_100 {
        width: 100px;
    }

    .edit_cell_150 {
        width: 100px;
    }

    .edit_cell_200 {
        width: 200px;
    }
    
    .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
        border-color: #2c3e50 ; 
    }

    .el-table--border::after, .el-table--group::after, .el-table::before{
        background-color: #2c3e50 ;
    }

    .el-table thead{
        color: #2c3e50 ;
    }

    #printContent{
        height: 350px;
    }
</style>