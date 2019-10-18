<template>
  <div class="map-control">
    <div class="map-control-nav mar-bottom-10" title="全图">
      <div class="icons-list">
        <a-icon type="home" />
      </div>
    </div>

    <div class="map-control-nav mar-bottom-10" title="平移">
      <div class="icons-list">
        <a-icon type="drag" />
      </div>
    </div>

    <div class="map-control-nav" title="放大">
      <div class="icons-list">
        <a-icon type="plus" />
      </div>
    </div>

    <div class="map-control-nav" title="缩小">
      <div class="icons-list">
        <a-icon type="minus" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapContol"
};
</script>

<style lang="less" scoped>
.map-control {
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
</style>