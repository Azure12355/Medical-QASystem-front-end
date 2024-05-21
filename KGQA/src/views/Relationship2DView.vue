<template>
  <div>
    <div id="myChart" style="width: 100%; height: 600px; padding: 0; margin: 0;"></div>
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
    this.drawLine();
    this.bindEvents();
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart.showLoading();

      this.fetchDataAndUpdateChart("/api/getAllEntities"); // 假设的初始数据请求
    },

    //异步请求, 用于请求数据
    async fetchDataAndUpdateChart(url, params) {
      try {
        //异步请求, 请求数据
        const response = await axios.get(url, { params });
        //解构赋值
        const { categories, data, links } = response.data;
        //根据返回的数据生成option对象
        const option = this.generateChartOption(categories, data, links);
        //绘制图表
        this.myChart.setOption(option, true);
        this.myChart.hideLoading();
      } catch (error) {
        this.$message.error("异步请求数据异常！！！")
        // 处理错误情况
      }
    },

    generateChartOption(categories, data, links) {
      return {
        // backgroundColor: "white",
        title: {
          // text: '红楼梦人物关系图',
          textStyle: {
            // color: "white",
            fontWeight: "lighter",
          },
        },
        animationDurationUpdate: 100,
        animationEasingUpdate: "quinticInOut",
        legend: {
          x: "center",
          show: true,
          data: categories.map((category) => {
            return category.name;
          })
        },

        // 配置项根据需要自定义
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 50,
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 4],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10,
                },
                formatter: "{c}",
              },
            },
            force: {
              repulsion: 2500,
              edgeLength: [10, 100],
            },
            focusNodeAdjacency: true,
            draggable: true,
            roam: true,
            categories: categories,
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10,
                },
              },
            },
            // force: {
            //   repulsion: 1000,
            // },
            tooltip: {
              formatter: function (node) {
                // 区分连线和节点，节点上额外显示其他数字
                if (!node.value) {
                  return node.data.name;
                } else {
                  return node.data.name + ":" + node.data.showNum;
                }
              },
            },
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0.3,
              },
            },
            // progressiveThreshold: 700,

            nodes: data.map((node) => {
              return node;
            }),
            links: links,
            // 其他配置...
          },
        ],
        // 其他配置...
      };
    },

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

body > .el-container {
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
