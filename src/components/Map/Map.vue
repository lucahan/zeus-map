<template>
  <div class="map">
      <!-- 地图导航组件 -->
    <MapLeft></MapLeft>
    <div class="map-container" id="map" ref="rootmap">
      <!-- 地图控制组件（放大，缩小，全图） -->
      <MapControl :map="map"></MapControl>
      <!-- 地图坐标组件 -->
      <MapCoordinate :coordinate="coordinate"></MapCoordinate>
    </div>
  </div>
</template>

<script>
import ZeusMap from '@/config/ZeusMap';
import MapControl from "@/components/Map/components/MapControl.vue";
import MapLeft from "@/components/Map/components/MapLeft.vue";
import MapCoordinate from '@/components/Map/components/MapCoordinate.vue';

export default {
  name: "Map",
  data() {
    return {
      map: null,
      coordinate:null
    };
  },
  components: {
    MapControl,
    MapLeft,
    MapCoordinate
  },
  mounted() {
    const mapcontainer = this.$refs.rootmap;
    this.map = ZeusMap.initMap(mapcontainer);
    const tdtLayer = ZeusMap.getTdtLayer('map');
    this.map.addLayer(tdtLayer);
    //底图赋值
    ZeusMap.Global_Map_Config.baseLayer = tdtLayer;
    //初始化坐标值设置
    this.coordinate =
      "X:" +
      this.map
        .getView()
        .getCenter()[0]
        .toFixed(4) +
      ",Y:" +
      this.map
        .getView()
        .getCenter()[1]
        .toFixed(4);
    this.map.on("pointermove", event => {
      this.coordinate =
        "X:" +
        event.coordinate[0].toFixed(4) +
        ",Y:" +
        event.coordinate[1].toFixed(4);
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

  .map-container {
    width: calc(100% - 230px);
    height: 100%;
    position: relative;
  }
}
</style>