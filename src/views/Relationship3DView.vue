<template>
  <div>
    <div id="myChart1" style="width: 100%; height: 300px; padding: 0; margin: 0"></div>
    <div id="myChart2" style="width: 100%; height: 365px; padding: 0; margin: 0"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      myChart: null, // 初始化图表实例的变量
    };
  },

  mounted() {
    this.draw();
    this.bindEvents();
  },

  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      this.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      this.myChart1.showLoading();
      this.myChart2.showLoading();

      // this.fetchDataAndUpdateChart("/api/static/data.json"); // 假设的初始数据请求]
      // this.fetchDataAndUpdateChart(
      //   "/apache/data/asset/data/les-miserables.json"
      // );
      const option1 = this.generateChartOption1();
      this.myChart1.setOption(option1, true);
      this.myChart1.hideLoading();
      const option = this.generateChartOption2();
      this.myChart2.setOption(option, true);
      this.myChart2.hideLoading();
    },

    //异步请求, 用于请求数据
    async fetchDataAndUpdateChart(url) {
      try {
        axios
          .get(url)
          .then((data) => {
            const option = this.generateChartOption1(data.data);
            this.myChart1.setOption(option, true);
            this.myChart1.hideLoading();
          })
          .catch((error) => {
            this.$message.error("请求发送错误!!!", error);
          });
      } catch (error) {
        this.$message.error("请求发送错误!!!", error);
      }
    },

    //构造南丁格尔玫瑰图option
    generateChartOption2() {
      return {
        title: {
          text: "知识图谱数据分析",
          subtext: "实体关系数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: [
            "相关疾病",
            "推荐药物",
            "药物成分",
            "普通药物",
            "推荐食用",
            "禁止食用",
            "可以食用",
            "所需检查",
            "疾病所属",
            "疾病症状",
          ],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "实体数据比例",
            type: "pie",
            radius: [20, 140],
            center: ["25%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              { value: 29, name: "疾病" },
              { value: 11, name: "药物" },
              { value: 25, name: "食品" },
              { value: 18, name: "检查" },
              { value: 12, name: "科室" },
              { value: 7, name: "药物成分" },
              { value: 15, name: "症状" },
            ],
          },
          {
            name: "实体关系比例",
            type: "pie",
            radius: [20, 140],
            center: ["75%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data: [
              { value: 0, name: "相关疾病" },
              { value: 14, name: "推荐药物" },
              { value: 32, name: "药物成分" },
              { value: 4, name: "普通药物" },
              { value: 12, name: "推荐食用" },
              { value: 7, name: "禁止食用" },
              { value: 7, name: "可以食用" },
              { value: 10, name: "所需检查" },
              { value: 3, name: "疾病所属" },
              { value: 12, name: "疾病症状" },
            ],
          },
        ],
      };
    },

    //构造环形布局关系图option
    generateChartOption1() {
      const colors = ["#5470C6", "#91CC75", "#EE6666"];
      return {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          right: "20%",
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["医疗实体", "实体关系", "比例模型"],
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            // prettier-ignore
            data: [
              "肺气肿",
              "伤寒性心肌炎",
              "不安腿综合征",
              "感冒",
              "咽喉炎",
              "中风",
              "苯中毒",
              "糖尿病",
              "肺泡蛋白质沉积症",
              "狂犬病",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "医疗实体",
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "实体关系",
            position: "right",
            alignTicks: true,
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "模型",
            position: "left",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "医疗实体",
            type: "bar",
            data: [
              3.0, 15.0, 21.0, 8, 1, 41, 11, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "实体关系",
            type: "bar",
            yAxisIndex: 1,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "比例模型",
            type: "line",
            yAxisIndex: 2,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      };
    },

    //绑定相关事件
    bindEvents() {
      document.addEventListener("keypress", (e) => {
        if (e.which == 13) {
          this.fetchDataAndUpdateChart("/search_name", {
            name: document.getElementById("search").value,
          });
        }
      });

      window.onresize = () => {
        this.myChart.resize();
      };
    },
  },
};
</script>

<style>
.tableBar {
  /* display: flex; */
  margin-bottom: 20px;
  /* justify-content: space-between; */
  margin-top: -60px;
  height: 80px;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
