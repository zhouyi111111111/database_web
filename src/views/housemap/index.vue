<template>
  <el-card class="usermap">
    <div id="map-container"></div>
  </el-card>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
  // 设置安全密钥
  securityJsCode: "41e61d4e48da1920af5bdde523f7087f"
};
// const map;
export default {
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  created() {
    this.initMap();
  },
  methods: {
    addmarker() {
      let icon = "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png";
      let marker = new window.AMap.Marker({
        map: map,
        title: "一个点", //tem.title,
        icon,
        position: [121.214777, 31.287584]
      });

      map.add(marker);

      const info = {
        name: "天一广场",
        address: "浙江省宁波市海曙区中山东路188号",
        phone: "(0574)87683088",
        time: "10:00-22:00"
        //imageUrl: square
      };

      marker.on("click", function (e) {
        let infoWindow = new window.AMapUI.SimpleInfoWindow({
          infoTitle: `<span style="font-size: 14px;">${info.name}</span>`,
          infoBody: `
            <el-card class="info-card">
              <div class="info-address">${info.address}</div>
              <div class="info-time">${info.time}</div>
              <el-button class="info-phone" type="primary">${info.phone}</el-button>
            </el-card>
          `
        });
        infoWindow.open(map, e.lnglat);
      });
    },
    initMap() {
      AMapLoader.load({
        key: "f5fe7dfbbbc69ae7372279438d89649c", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        AMapUI: {
          version: "1.1",
          plugins: ["overlay/SimpleInfoWindow"]
        }
      })
        .then(AMap => {
          console.log(AMap);
          map = new AMap.Map("map-container", {
            viewMode: "2D", //  是否为3D地图模式
            zoom: 13, // 初始化地图级别
            center: [121.214755, 31.285606], //中心点坐标
            resizeEnable: true
          });
          this.addmarker();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
#map-container {
  width: 800px;
  height: 500px;
}

.usermap {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
