import Map from "ol/Map";
import View from "ol/View";
import {defaults as defaultControls} from "ol/control";
import Tile from "ol/layer/Tile";
import {Group as LayerGroup} from 'ol/layer';
import {register} from "ol/proj/proj4";
import proj4 from "proj4";
import WMTS from "ol/source/WMTS";
import {get as getProjection} from "ol/proj";
import {getWidth, getTopLeft} from "ol/extent";
import WmtsTile from "ol/tilegrid/WMTS";

let Global_Map_Config = {
    baseLayer:null,
    mapInitConfig:{
        center: [112.9979, 28.2099],
        zoom: 12,
        maxZoom: 18,
        projection: "EPSG:4490"
    }
};

let map = null;

/**
 * 地图初始化方法
 * @param {*} target 地图挂载点 div的id
 */
function initMap(target) {
    proj4.defs('EPSG:4490','GEOGCS["China Geodetic Coordinate System 2000",DATUM["China_2000",SPHEROID["CGCS2000",6378137,298.257222101,AUTHORITY["EPSG","1024"]],AUTHORITY["EPSG","1043"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4490"]]');
    register(proj4);

    map = new Map({
        target: target,
        controls: defaultControls({
            attribution: false,
            rotate: false,
            zoom: false
        }),
        view: new View({
            projection: Global_Map_Config.mapInitConfig.projection,
            center: Global_Map_Config.mapInitConfig.center,
            zoom: Global_Map_Config.mapInitConfig.zoom,
            maxZoom: Global_Map_Config.mapInitConfig.maxZoom
        })
    });
    return map;
}

function getMap() {
    return map;
}

/**
 *
 * @param type 返回的天地图类型 map街道图/image影像图/地形图
 */
function getTdtLayer(type) {
    let layer;
    const projection = getProjection("EPSG:4326");
    const projectionExtent = projection.getExtent();
    const size = getWidth(projectionExtent) / 256;
    let resolutions = [],
        matrixIds = [];
    for (let z = 0; z < 20; z++) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }
    if (type === 'map') {
        const vec = new Tile({
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
        });
        const cva = new Tile({
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
        });
        layer = new LayerGroup({
            layers:[vec,cva]
        })
    } else if (type === 'image') {
        const img_c = new Tile({
            source: new WMTS({
                url:
                    "http://t{0-6}.tianditu.com/img_c/wmts?tk=989f24f7d561469d99771709bce85875",
                layer: "img",
                style: "default",
                matrixSet: "c",
                format: "tiles",
                tileGrid: new WmtsTile({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds
                })
            })
        });
        const cia = new Tile({
            source: new WMTS({
                url:
                    "http://t{0-6}.tianditu.com/cia_c/wmts?tk=989f24f7d561469d99771709bce85875",
                layer: "cia",
                style: "default",
                matrixSet: "c",
                format: "tiles",
                tileGrid: new WmtsTile({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds
                })
            })
        });
        layer = new LayerGroup({
            layers:[img_c,cia]
        })
    } else if (type === 'dem') {
        const ter = new Tile({
            source: new WMTS({
                url:
                    "http://t{0-6}.tianditu.com/ter_c/wmts?tk=989f24f7d561469d99771709bce85875",
                layer: "ter",
                style: "default",
                matrixSet: "c",
                format: "tiles",
                tileGrid: new WmtsTile({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds
                })
            })
        });
        const cta = new Tile({
            source: new WMTS({
                url:
                    "http://t{0-6}.tianditu.com/cva_c/wmts?tk=989f24f7d561469d99771709bce85875",
                layer: "cta",
                style: "default",
                matrixSet: "c",
                format: "tiles",
                tileGrid: new WmtsTile({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds
                })
            })
        });
        layer = new LayerGroup({
            layers:[ter,cta]
        })
    }
    return layer;
}

export default {
    initMap,//地图初始化
    getMap,//获取当前map对象
    //addLayer,//添加图层，通用方法
    getTdtLayer,//获取天地图图层
    Global_Map_Config
};
