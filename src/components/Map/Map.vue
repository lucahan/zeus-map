<template>
  <div class="map">
      <!-- 地图导航组件 -->
    <MapLeft></MapLeft>
    <div class="map-container" id="map" ref="rootmap">
      <!-- 地图控制组件（放大，缩小，全图） -->
      <MapControl></MapControl>
      <!-- 地图坐标组件 -->
      <MapCoordinate></MapCoordinate>
    </div>
  </div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls } from "ol/control";
import Tile from "ol/layer/Tile";
import { register } from "ol/proj/proj4";
import proj4 from "proj4";
import WMTS from "ol/source/WMTS";
import { get as getProjection } from "ol/proj";
import { getWidth, getTopLeft } from "ol/extent";
import WmtsTile from "ol/tilegrid/WMTS";
import MapControl from "@/components/Map/components/MapControl.vue";
import MapLeft from "@/components/Map/components/MapLeft.vue";
import MapCoordinate from '@/components/Map/components/MapCoordinate.vue';

export default {
  name: "Map",
  data() {
    return {
      map: null,
    };
  },
  components: {
    MapControl,
    MapLeft,
    MapCoordinate
  },
  mounted() {
    proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
    register(proj4);

    const projection = getProjection("EPSG:4326");
    const projectionExtent = projection.getExtent();
    const size = getWidth(projectionExtent) / 256;
    let resolutions = [],
      matrixIds = [];
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
    // this.realTimeCoors =
    //   "X:" +
    //   this.map
    //     .getView()
    //     .getCenter()[0]
    //     .toFixed(4) +
    //   ",Y:" +
    //   this.map
    //     .getView()
    //     .getCenter()[1]
    //     .toFixed(4);
    // this.map.on("pointermove", event => {
    //   this.realTimeCoors =
    //     "X:" +
    //     event.coordinate[0].toFixed(4) +
    //     ",Y:" +
    //     event.coordinate[1].toFixed(4);
    // });
  }
};
</script>

<style scoped lang="less">
.map {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  .map-container {
    width: calc(100% - 230px);
    height: 100%;
    position: relative;
  }
}
</style>