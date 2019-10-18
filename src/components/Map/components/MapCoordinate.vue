<template>
    <div class="map-coordinate">
        <span>坐标：{{coordinate}}</span>
    </div>
</template>

<script>
    export default {
        name: "MapCoordinate",
        data() {
            return {
                coordinate: null
            }
        },
    }
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