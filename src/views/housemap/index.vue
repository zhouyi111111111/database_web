<template>
  <div id="map-container"></div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { getEstateList } from "@/api/modules/estate";
import { getPointList } from "@/api/modules/fixpoint";
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
    getTableList() {
      let newParams = { pageNum: 1, pageSize: 50, type: 1 };
      return getEstateList(newParams);
    },
    getPoint() {
      let newParams = { pageNum: 1, pageSize: 50, type: 1 };
      return getPointList(newParams);
    },
    closeInfoWindow() {
      this.map.clearInfoWindow();
    },
    createInfoWindow(title, content) {
      let info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      // info.style.width = "400px";
      // 定义顶部标题
      let top = document.createElement("div");
      let titleD = document.createElement("div");
      let closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.onclick = this.closeInfoWindow;

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      let middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "white";
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      let bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "0px";
      bottom.style.margin = "0 auto";
      let sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },
    addmarker() {
      this.map.clearMap();
      this.getTableList().then(res => {
        let list = res.data.list;
        for (let i = 0; i < list.length; i++) {
          let marker = new AMap.Marker({
            map: this.map,
            title: list[i].estatename,
            position: [list[i].lug, list[i].lat]
          });

          // 实例化信息窗体
          let title = `${list[i].estatename}<span style="font-size:11px;color:#F00;">价格:${list[i].price}万</span>`,
            content = [];
          content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>套内面积：" + list[i].farea);
          content.push("户型：" + list[i].arch);
          content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");
          let infoWindow = new AMap.InfoWindow({
            isCustom: true, // 使用自定义窗体
            content: this.createInfoWindow(title, content.join("<br/>")),
            offset: new AMap.Pixel(16, -45)
          });

          AMap.Event.addListener(
            marker,
            "click",
            function () {
              infoWindow.open(this.map, marker.getPosition());
            }.bind(this)
          );
          this.map.add(marker);
        }
      });
      this.getPoint().then(res => {
        let list = res.data.list;
        for (let i = 0; i < list.length; i++) {
          let marker = new AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
            map: this.map,
            title: list[i].name,
            position: [list[i].lng, list[i].lat]
          });
          this.map.add(marker);
        }
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
          this.map = new AMap.Map("map-container", {
            viewMode: "3D", //  是否为3D地图模式
            zoom: 13, // 初始化地图级别
            center: [121.4498846931383, 31.231549708171933], //中心点坐标
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

<style>
html,
body,
#map-container {
  height: 100%;
  width: 100%;
}

.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
}

.content-window-card p {
  height: 2rem;
}

.custom-info {
  border: solid 1px silver;
}

div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

div.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}

div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
}

div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

div.info-bottom img {
  position: relative;
  z-index: 104;
}

span {
  margin-left: 5px;
  font-size: 11px;
}

.info-middle img {
  float: left;
  margin-right: 6px;
}
</style>
