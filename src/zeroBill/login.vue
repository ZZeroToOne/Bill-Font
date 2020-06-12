<template>
    <div id="login">
        <div class="login_box">
            <div class="login_l_img">
                <img :src="bgpic">
            </div>

            <div class="login">
                <div class="login_logo"><a href="#"><img :src="logo"></a></div>
                <div class="login_name">
                    <p>超级系统</p>
                </div>

                <div>
                    <div>
                        <el-input v-model="userName" placeholder="用户名"></el-input>
                    </div>

                    <div style="padding-top:24px">
                        <el-input v-model="password" show-password placeholder="密码"></el-input>
                    </div>
                    <div style="padding-top:24px">
                        <el-button type="primary" @click="loginAction">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            登陆
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </el-button>
                    </div>
                    
                </div>

            </div>
        </div>

        <div class="copyright">
            <p>Zero有限公司 版权所有©2019-2020 技术支持电话：000-00000000</p>
        </div>

        <el-dialog
            title="登陆成功"
            :visible.sync="dialogVisible"
            width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <div style="text-align: center;">
                    <div>用户名: {{userEntity.userName}}</div>
                    <div>电话: {{userEntity.phone}}</div>
                    <div>email: {{userEntity.email}}</div>
                </div>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>

        
    </div>
</template>

<script>
export default {
    data() {
        return {
            bgpic:require("../assets/login/login-img.png"),
            logo:require("../assets/login/login_logo.png"),
            userName: 'admin',
            password: 'admin',
            userEntity: {
                email: null,
                loginName: null,
                phone: null,
                userId: null,
                userName: null
            },
            dialogVisible: false
        }
    },
    methods: {
        loginAction() {
            let params = new URLSearchParams();
            params.append('loginName', this.userName)
            params.append('password', this.password)
            this.$axios.post(this.$ip + '/zero/bill/login', params)
            .then((response)=> {
                if(response.data.code === 0) {
                    this.userEntity = response.data.data
                    this.dialogVisible = true
                }else if(response.data.code === 5) {
                    this.$message.error(response.data.msg);
                }
            })
            .catch(function (error) {
                console.log('error', error)
            });
        }
    }
}
</script>
<style>
    /* body{
        background: #93defe;
        background-size: cover;
    } */

    #login .login_box {
        width: 1100px;
        margin: 120px auto 0;
    }

    #login .login_box .login_l_img {
        float: left;
        width: 432px;
        height: 440px;
        margin-left: 50px;
    }

    #login .login_logo {
        width: 110px;
        height: 110px;
        border: 5px solid #93defe;
        border-radius: 100px;
        background: #fff;
        text-align: center;
        line-height: 110px;
        position: absolute;
        top: -60px;
        right: 132px;
    }

    #login .login_name {
        width: 100%;
        float: left;
        text-align: center;
        margin-top: 20px;
    }

    #login .login {
        height: 360px;
        width: 400px;
        padding: 50px;
        background-color: #ffffff;
        border-radius: 6px;
        box-sizing: border-box;
        float: right;
        margin-right: 50px;
        position: relative;
        margin-top: 50px;
    }

    #login .login p{
        font-size: 20px;
        font-weight:bold
    }

    #login .login_logo img {
        width: 60px;
        height: 60px;
        display: inline-block;
        vertical-align: middle;
    }

    .copyright {
        font-size: 14px;
        color: #fff;
        display: block;
        width: 100%;
        float: left;
        text-align: center;
        margin-top: 120px;
        font-weight:bold;
        letter-spacing: 0.8px;
    }
</style>