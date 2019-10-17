<template>
  <div class="map">
    <div class="map-left"></div>
    <div class="map-container" id="map" ref="rootmap"></div>
  </div>
</template>

<script>
import "ol/ol.css";
// import { Map, View } from "ol";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import {get as getProjection} from "ol/proj";
import {getWidth, getTopLeft} from 'ol/extent';
import WmtsTile from "ol/tilegrid/WMTS"
export default {
  name: "Map",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    var projection = getProjection("EPSG:4326");
    var projectionExtent = projection.getExtent();
    var size = getWidth(projectionExtent) / 256;
    var resolutions = [];
    for (var z = 2; z < 20; ++z) {
        resolutions[z] = size / Math.pow(2, z);
    }
    const mapcontainer = this.$refs.rootmap;
    this.map = new Map({
      target: mapcontainer,
      layers: [
         new Tile({
                source: new WMTS({
                    url: "http://t{0-6}.tianditu.com/vec_c/wmts?tk=989f24f7d561469d99771709bce85875",
                    layer: "vec",
                    style: "default",
                    matrixSet: "c",
                    format: "tiles",
                    wrapX: true,
                    tileGrid: new WmtsTile({
                        origin:  getTopLeft(projectionExtent),
                        //resolutions: res.slice(0, 15),
                        resolutions: resolutions,
                        matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                    })
                }),
            }),
            new Tile({
                source: new WMTS({
                    url: "http://t{0-6}.tianditu.com/cva_c/wmts?tk=989f24f7d561469d99771709bce85875",
                    layer: "cva",
                    style: "default",
                    matrixSet: "c",
                    format: "tiles",
                    wrapX: true,
                    tileGrid: new WmtsTile({
                        origin:  getTopLeft(projectionExtent),
                        resolutions: resolutions,
                        matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                    })
                }),
            })
      ],
      view: new View({
        projection: "EPSG:4326",
        center: [112.929332, 28.234405],
        zoom: 12
      })
    });
  }
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
    border-right: solid 1px #ddd;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  }
  .map-container {
    width: calc(100% - 230px);
    height: 100%;
  }
}
</style>