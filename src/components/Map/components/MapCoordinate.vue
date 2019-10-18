<template>
  <div class="map-coordinate">
    <span>坐标：{{coor}}</span>
  </div>
</template>

<script>
export default {
  name: "MapCoordinate",
  data() {
    return {
      coor: null
    };
  },
  props: ["coordinate"],
  created() {
    this.coor = this.coordinate;
  },
  watch: {
    coordinate(val) {
      //message即为父组件的值，val参数为值
      this.coor = val; //将父组件的值赋给childrenMessage 子组件的值
    }
  }
};
</script>

<style lang="less" scoped>
.map-coordinate {
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
</style>