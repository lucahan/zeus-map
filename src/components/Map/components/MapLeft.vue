<template>
  <div class="map-left">
    <!-- 导航头 -->
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="地图" key="1" class="map-left-tabPane">
        <div class="map-left-tabPane-item" @click="changeBaseMap('map')">
          <img :src="tdtMap" alt />街道图
        </div>
        <div class="map-left-tabPane-item" @click="changeBaseMap('image')">
          <img :src="tdtImage" alt />卫星图
        </div>
        <div class="map-left-tabPane-item" @click="changeBaseMap('dem')">
          <img :src="tdtDem" alt />地形图
        </div>
      </a-tab-pane>
      <a-tab-pane tab="区域" key="2" forceRender>
        <a-tree checkable :treeData="treeData" @select="this.onSelect" @check="this.onCheck">
          <span slot="title0010" style="color: #1890ff">sss</span>
        </a-tree>
      </a-tab-pane>
      <a-tab-pane tab="书签" key="3">书签</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import ZeusMap from '@/config/ZeusMap';
import tdtMap from "@/assets/tianditumap.png";
import tdtDem from "@/assets/tianditudem.png";
import tdtImage from "@/assets/tiandituimage.png";
const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          { title: "leaf", key: "0-0-0-0" },
          { title: "leaf", key: "0-0-0-1" }
        ]
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [{ key: "0-0-1-0", slots: { title: "title0010" } }]
      }
    ]
  }
];
export default {
  name: "MapLeft",
  props: ["map"],
  data() {
    return {
      $map: null,
      tdtMap: tdtMap,
      tdtDem: tdtDem,
      tdtImage: tdtImage,
      baseMapSelected: "map",
      treeData
    };
  },
  watch: {
    map(newValue) {
      this.$map = newValue;
    }
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
    onCheck(checkedKeys, info) {
      console.log("onCheck", checkedKeys, info);
    },
    changeBaseMap(currentLayer) {
      if (currentLayer !== this.baseMapSelected) {
        const layer = ZeusMap.getTdtLayer(currentLayer);
        this.$map.removeLayer(ZeusMap.Global_Map_Config.baseLayer);
        this.$map.addLayer(layer);
        ZeusMap.Global_Map_Config.baseLayer = layer;
        this.baseMapSelected = currentLayer;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.map-left {
  width: 230px;
  height: 100%;
  z-index: 1;
  border-right: solid 1px #ddd;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  .map-left-tabPane {
    padding: 10px;
    > div{
      height: 100px;
      &:hover{
        background: rgb(209, 237, 255);
      }
    }

    .map-left-tabPane-item {
      margin-bottom: 20px;
      padding: 0 10px 0 10px;
      height: 100px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px #ccc;
      border-top: solid 1px #ccc;
      img {
        height: 90%;
      }
      &:hover {
        cursor: pointer;
        background: #b0c4de;
      }
    }
  }
}
</style>