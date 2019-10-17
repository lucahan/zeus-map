<template>
    <div class="map">
        <div class="map-left">
            <!-- 导航头 -->
            <a-tabs defaultActiveKey="1">
                <a-tab-pane tab="专题" key="1" class="map-left-tabPane">
                    <div style="height: 100px;" class="map-left-tabPane-item">
                        <img :src="tdtMap" alt="" />
                        天地图街道图
                    </div>
                    <div style="height: 100px;" class="map-left-tabPane-item">
                        <img :src="tdtImage" alt="" />
                        天地图卫星图
                    </div>
                    <div style="height: 100px;" class="map-left-tabPane-item">
                        <img :src="tdtDem" alt="" />
                        天地图地形图
                    </div>
                </a-tab-pane>
                <a-tab-pane tab="图层" key="2" forceRender>
                    <a-tree
                            checkable
                            :treeData="treeData"
                            @select="this.onSelect"
                            @check="this.onCheck"
                    >
                        <span slot="title0010" style="color: #1890ff">sss</span>
                    </a-tree>
                </a-tab-pane>
                <a-tab-pane tab="书签" key="3">

                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="map-container" id="map" ref="rootmap">
            <!-- 待抽离，地图控制组件（放大，缩小，全图） -->
            <div class="map-control">
                <div class="map-control-nav mar-bottom-10" title="全图">
                    <div class="icons-list">
                        <a-icon type="home"/>
                    </div>
                </div>

                <div class="map-control-nav mar-bottom-10" title="平移">
                    <div class="icons-list">
                        <a-icon type="drag"/>
                    </div>
                </div>

                <div class="map-control-nav" title="放大">
                    <div class="icons-list">
                        <a-icon type="plus"/>
                    </div>
                </div>

                <div class="map-control-nav" title="缩小">
                    <div class="icons-list">
                        <a-icon type="minus"/>
                    </div>
                </div>
            </div>
            <!-- 地图鼠标移动坐标显示组件 -->
            <div class="map-realTimeCoor">
                <span>坐标：{{realTimeCoors}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Map from "ol/Map";
    import View from "ol/View";
    import {defaults as defaultControls} from 'ol/control';
    import Tile from "ol/layer/Tile";
    import {register} from "ol/proj/proj4";
    import proj4 from "proj4";
    import WMTS from "ol/source/WMTS";
    import {get as getProjection} from "ol/proj";
    import {getWidth, getTopLeft} from "ol/extent";
    import WmtsTile from "ol/tilegrid/WMTS";
    import tdtMap from "@/assets/tianditumap.png"
    import tdtDem from "@/assets/tianditudem.png"
    import tdtImage from "@/assets/tiandituimage.png"

    const treeData = [
        {
            title: 'parent 1',
            key: '0-0',
            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',
                    children: [
                        {title: 'leaf', key: '0-0-0-0'},
                        {title: 'leaf', key: '0-0-0-1'},
                    ],
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    children: [{key: '0-0-1-0', slots: {title: 'title0010'}}],
                },
            ],
        },
    ];
    export default {
        name: "Map",
        data() {
            return {
                tdtMap:tdtMap,
                tdtDem:tdtDem,
                tdtImage:tdtImage,
                map: null,
                treeData,
                realTimeCoors: null
            };
        },
        mounted() {
            proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
            register(proj4);

            const projection = getProjection("EPSG:4326");
            const projectionExtent = projection.getExtent();
            const size = getWidth(projectionExtent) / 256;
            let resolutions = [], matrixIds = [];
            for (let z = 0; z < 20; z++) {
                resolutions[z] = size / Math.pow(2, z);
                matrixIds[z] = z;
            }
            const mapcontainer = this.$refs.rootmap;
            this.map = new Map({
                target: mapcontainer,
                controls: defaultControls({
                    attribution: false,
                    rotate: false,
                    zoom: false
                }),
                layers: [
                    new Tile({
                        source: new WMTS({
                            url:
                                "http://t{0-6}.tianditu.com/vec_c/wmts?tk=989f24f7d561469d99771709bce85875",
                            layer: "vec",
                            style: "default",
                            matrixSet: "c",
                            format: "tiles",
                            tileGrid: new WmtsTile({
                                origin: getTopLeft(projectionExtent),
                                resolutions: resolutions,
                                matrixIds: matrixIds
                            })
                        })
                    }),
                    new Tile({
                        source: new WMTS({
                            url:
                                "http://t{0-6}.tianditu.com/cva_c/wmts?tk=989f24f7d561469d99771709bce85875",
                            layer: "cva",
                            style: "default",
                            matrixSet: "c",
                            format: "tiles",
                            tileGrid: new WmtsTile({
                                origin: getTopLeft(projectionExtent),
                                resolutions: resolutions,
                                matrixIds: matrixIds
                            })
                        })
                    })
                ],
                view: new View({
                    projection: "EPSG:4326",
                    center: [112.9979, 28.2099],
                    zoom: 12,
                    maxZoom: 18
                })
            });
            this.realTimeCoors = 'X:' + this.map.getView().getCenter()[0].toFixed(4) + ',Y:' + this.map.getView().getCenter()[1].toFixed(4);
            this.map.on('pointermove', (event) => {
                this.realTimeCoors = 'X:' + event.coordinate[0].toFixed(4) + ',Y:' + event.coordinate[1].toFixed(4);
            })
        },
        methods: {
            onSelect(selectedKeys, info) {
                console.log('selected', selectedKeys, info);
            },
            onCheck(checkedKeys, info) {
                console.log('onCheck', checkedKeys, info);
            },
        },
    };
</script>

<style scoped lang="less">
    .map {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;

        .map-left {
            width: 230px;
            height: 100%;
            z-index: 1;
            border-right: solid 1px #ddd;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
            .map-left-tabPane{
                padding: 10px;
                .map-left-tabPane-item{
                    margin-bottom: 20px;
                    padding: 0 10px 0 10px;
                    height: 100px;
                    display: flex;
                    flex-direction: row;
                    justify-content:space-between;
                    align-items:center;
                    border-bottom: solid 1px #ccc;
                    border-top: solid 1px #ccc;
                    img{
                        height: 90%;
                    }
                    &:hover{
                        cursor: pointer;
                        background: #B0C4DE;
                    }
                }
            }
        }

        .map-container {
            width: calc(100% - 230px);
            height: 100%;
            position: relative;

            > .map-control {
                position: absolute;
                z-index: 100;
                right: 20px;
                bottom: 60px;

                > .map-control-nav {
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    border: solid 1px #ccc;
                    background: #ffffff;
                    text-align: center;
                    color: #444444;

                    &:hover {
                        color: #fff;
                        cursor: pointer;
                        background: #595ca0;
                    }
                }
            }

            > .map-realTimeCoor {
                position: absolute;
                bottom: 10px;
                right: 0;
                z-index: 100;
                color: #444;

                > span {
                    background: #fff;
                    border: solid 1px #ccc;
                    border-radius: 4px;
                    width: 200px;
                    padding: 5px;
                    height: 30px;
                    line-height: 30px;
                    margin-right: 10px;
                }
            }
        }
    }

    .mar-bottom-10 {
        margin-bottom: 10px;
    }
</style>