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

const mapInitConfig = {
  center: [112.9979, 28.2099],
  zoom: 12,
  maxZoom: 18,
  projection: "EPSG:4326"
};

let map = null;

/**
 * 地图初始化方法
 * @param {*} target 地图挂载点 div的id
 */
function initMap(target) {
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
  map = new Map({
    target: target,
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
      projection: mapInitConfig.projection,
      center: mapInitConfig.center,
      zoom: mapInitConfig.zoom,
      maxZoom: mapInitConfig.maxZoom
    })
  });
  return map;
}

function getMap(){
    return map;
}

function addLayer(params) {
    
}

export default {
  mapInitConfig,
  initMap,//地图初始化
  getMap,//获取当前map对象
  addLayer,//添加图层，通用方法
};
