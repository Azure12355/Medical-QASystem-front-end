<template>
  <div>
    <!-- 页面头部效果 -->
    <div class="tableBar">
      <label  for="" style="margin-right: 5px">实体名称:</label>
      <el-input
        v-model="entityName"
        placeholder="请输入实体名称"
        style="width: 50%; font-size: 18px; margin-left: 15px;"
      />
      <el-button 
      type="primary" 
      style="margin-left: 25px; font-size: 18px; border-radius: 15px; box-shadow: 2px 2px 5px gray" 
      @click="drawLine()"
      >查询</el-button
      >
    </div>
    <div id="myChart" class="search-view-container" style="width: 100%; height: 610px"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      entityName: '喘息样支气管炎',
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

      this.fetchDataAndUpdateChart("/api/searchEntity", { entityName: this.entityName }); // 假设的初始数据请求
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
          // text: '医疗实体关系图',
          textStyle: {
            color: "black",
            fontWeight: "bold",
          },
        },
        animationDurationUpdate: 0,
        animationEasingUpdate: "cubicInOut",
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
            edgeSymbolSize: [6, 10],
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
              roam: true,
              friction: 0.1,
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
          },
        ],
      };
    },

    bindEvents() {
      document.addEventListener("keypress", (e) => {
        if (e.which == 13) {
          this.fetchDataAndUpdateChart("/api/searchEntity", {
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

#myChart {
  margin-top: 40px;
}

.search-view-container {
  border: 2px solid #a6d1f0;
  border-radius: 10px;
}

.tableBar {
  /* display: flex; */
  margin-bottom: 20px;
  /* justify-content: space-between; */
  margin-top: -60px;
  height: 80px;
}

.tableBar > label {
  font-family: "微软雅黑";
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
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
