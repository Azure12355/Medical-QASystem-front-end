<template>
  <div>
    <div
      id="myChart"
      style="width: 100%; height: 600px; padding: 0; margin: 0"
    ></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.draw();
  },

  methods: {
    draw() {
      //初始化myChart对象
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart.showLoading();

      //获取需要渲染的数据
      const data = this.fetchData(
        "/api/getEntityModel"
      );

      console.log(data);
    },

    //axios请求获取数据
    async fetchData(url) {
      try {
        return axios.get(url).then((data) => {
          console.log(typeof data, data);
          console.log(data.data);
          this.myChart.hideLoading();
          const option = this.generateChartOption(data.data);
          this.myChart.setOption(option);
        });
      } catch (error) {
        this.$message.error("获取数据失败...");
      }
    },

    //构造echarts所需option对象
    generateChartOption(graph) {
      return {
        tooltip: {},
        legend: [
          {
            data: graph.categories.map(function (a) {
              return a.name;
            }),
          },
        ],
        series: [
          {
            name: "Les Miserables",
            type: "graph",
            layout: "none",
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: {
              show: true,
              position: "right",
              formatter: "{b}",
            },
            labelLayout: {
              hideOverlap: true,
            },
            scaleLimit: {
              min: 0.4,
              max: 2,
            },
            lineStyle: {
              color: "source",
              curveness: 0.3,
            },
          },
        ],
      };
    },
  },
};
</script>

<style></style>
