<template>
    <div class="main">
        <el-container :style="{height: (height - 2) + 'px'}">
            <el-header>
                <!-- 头部 -->
                <div class="header">
                    <div :class="{'logo-collapsed':isCollapse, 'logo-expanded':!isCollapse}">
                        {{!isCollapse ? 'Logo' : 'L'}}
                    </div>
                    <div class="header_center">
                        <!-- <el-button icon="el-icon-search" circle @click="isCollapse = !isCollapse"></el-button> -->
                        <div v-if="!isCollapse" @click="isCollapse = !isCollapse" class="btn-collapsed">
                            <li class="el-icon-s-fold"></li>
                        </div>
                        <div v-else @click="isCollapse = !isCollapse" class="btn-collapsed">
                            <span class="el-icon-s-unfold"></span>
                        </div>
                        
                    </div>
                    <div class="header_right">Admin@qq.com</div>
                </div>
            </el-header>
            <el-container>
                <el-aside :class="{'menu-collapsed':isCollapse, 'menu-expanded':!isCollapse}">
                        <el-menu default-active="1-4-1" @select=selectRout :collapse="isCollapse" background-color="#f0f1f6">
                           <el-menu-item index="/">
                                <i class="el-icon-s-home"></i>
                                <span slot="title">Home</span>
                            </el-menu-item>
                           <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>导航一</span>
                                </template>
                                <template slot="title"></template>
                                <el-menu-item index="/pro">商品列表</el-menu-item>
                                <el-menu-item index="/doc">出库单</el-menu-item>
                                <el-menu-item index="/print">打印单据</el-menu-item>
                                <el-menu-item index="1-4">选项1</el-menu-item>
                            </el-submenu>
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">导航二</span>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <i class="el-icon-document"></i>
                                <span slot="title">导航三</span>
                            </el-menu-item>
                        </el-menu>
                </el-aside>
                <el-main>
                    <div class="c-main">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
           height: `${document.documentElement.clientHeight}`,
           isCollapse: false
        }
    },
    mounted: function(){
        
    },
    methods: {
        selectRout(index, indexPath) {
            console.log('index', index)
            console.log('indexPath', indexPath)
            this.$router.push(index)
        }
        
    }

}
</script>
<style>
    body {
        margin: 0px;
    }

    .el-header {
        background-color: #20a0ff;
        color: #fff;
        text-align: center;
        line-height: 60px;

        position: relative;
        width: 100%;
        height: 60px;  
    }
    
    .el-menu{
        height: 100%;
    }

    .el-aside {
        background-color: #f0f1f6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        position: absolute;
        right: 0;
        top: 60px;
        bottom: 0;
        left: 230px;
        overflow-y: scroll;
    }
    
    /* .el-submenu .el-menu {
        background-color: #e4e8f1!important;
    } */

    body > .el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    
    /* .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    } */

    .main{
        min-width: 1200px;
        min-height: 500px;
    }

    .logo-expanded {
        width: 190px;
        float: left;
        height: 60px;
        font-size: 22px;
        padding-right: 19px;
        border-color: hsla(62,77%,76%,.3);
        border-right-width: 1px;
        border-right-style: solid;
    }

    .logo-collapsed{
        width: 20px;
        float: left;
        font-size: 22px;
        padding-right: 23px;
        border-color: hsla(62,77%,76%,.3);
        border-right-width: 1px;
        border-right-style: solid;
    }

    .header_center{
        width: calc(100% - 300px - 200px);
        float: left;
        margin-left: 20px;
        text-align: left;
    }

    .header_right{
        float: right;
        width: 200px;
        text-align: right;
    }

    .btn-collapsed{
        width: 60px;
        text-align: center;
        cursor: pointer;
    }

    .menu-collapsed {
        height: 100%;
        width: 65px !important;
    }

    .menu-expanded {
        height: 100%;
        width: 230px !important;
        text-align: left;
    }
</style>