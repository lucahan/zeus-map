<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <a-layout-header>
            <div class="logo-title">
                Zeus-Map
            </div>
            <!--<span>Zeus-Map</span>-->
            <a-menu
                    theme="dark"
                    mode="horizontal"
                    :defaultSelectedKeys="['1']"
                    :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1">地图</a-menu-item>
                <a-menu-item key="2">数据</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content>
            <div class="main"
                 :style="{ background: '#fff',minHeight: '280px' }" >
                <Map></Map>
            </div>
        </a-layout-content>
    </a-layout>
</template>
<script>
    import Map from '../components/Map/Map'
    export default {
        name: "Main",
        components:{
            Map
        }
    }
</script>

<style scoped>
    #components-layout-demo-top .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
    }
    .main{
        height:calc(100vh - 64px);
        position: relative;
    }
    .logo-title{
        width: 120px;
        line-height: 64px;
        font-size: 20px;
        color: #ffffff;
        float: left;
    }
</style>