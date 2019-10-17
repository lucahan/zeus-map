<template>
    <div class="map">
        <div class="map-left">

        </div>
        <div class="map-container" id="map" ref="rootmap">
        
        </div>
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
            const mapcontainer = this.$refs.rootmap;
            this.map = new Map({
                target: mapcontainer,
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                view: new View({
                    projection: "EPSG:4326",
                    center: [112.929332,28.234405],
                    zoom: 12
                })
            });
        }
    }
</script>

<style scoped lang="less">
    .map{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        .map-left{
            width: 230px;
            height: 100%;
            border-right: solid 1px #ddd;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        }
        .map-container{
            width: calc(100% - 230px);
            height: 100%
        }
    }
</style>