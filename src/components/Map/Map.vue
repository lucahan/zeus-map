<template>
    <div class="map" id="map" ref="rootmap">
    </div>
</template>

<script>
    import "ol/ol.css";
    import { Map, View } from "ol";
    import TileLayer from "ol/layer/Tile";
    import OSM from "ol/source/OSM";
    export default {
        name: "Map",
        data() {
            return {
                map: null
            };
        },
        mounted() {
            // var mapcontainer = this.$refs.rootmap;
            this.map = new Map({
                target: "map",
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                view: new View({
                    projection: "EPSG:4326",    //使用这个坐标系
                    center: [114.064839,22.548857],  //深圳
                    zoom: 12
                })
            });
        }
    }
</script>

<style scoped lang="less">
    .map{
        width: 100%;
        height: 100%;
    }
</style>