<template>
  <el-container class="full-height-container">
    <el-container>
      <!-- 侧边导航栏 -->
      <el-aside width="220px">
        <el-col class="full-height-container" :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#171b39"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item >
              <strong style="font-size: 18px;">Neo4j知识问答</strong>
            </el-menu-item>
            <el-menu-item index="1" @click="handleGoTo('/search')">
              <i class="el-icon-search"></i>
              <span>检索实体关系</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleGoTo('/entityModel')">
              <i class="el-icon-s-help"></i>
              <span slot="title">实体抽象模型</span>
            </el-menu-item>
            <el-menu-item index="3" @click="handleGoTo('/relationship2d')">
              <i class="el-icon-picture-outline-round"></i>
              <span slot="title">2D实体关系全貌</span>
            </el-menu-item>
            <el-menu-item index="4" @click="handleGoTo('/relationship3d')">
              <i class="el-icon-menu"></i>
              <span slot="title">知识图谱数据分析</span>
            </el-menu-item>
            <el-menu-item index="5" @click="handleGoTo('/question')">
              <i class="el-icon-s-opportunity"></i>
              <span slot="title">知识图谱问答</span>
            </el-menu-item>
            <el-menu-item index="6" @click="handleGoTo('/chatbot')">
              <i class="el-icon-share"></i>
              <span slot="title">智能问答机器人</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <!-- 中心内容区 -->
      <el-container class="container">
        <el-header class="title gradient-text"
          >Neo4j知识图谱智能问答系统</el-header
        >
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "MainContainer",
  props: {
    msg: String,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleGoTo(route) {
      //获取当前路由路径
      const currentRoute = this.$router.currentRoute.path;

      //检查当前路由是否和目标路由相同
      if (currentRoute !== route) {
        //如果不同, 则执行导航
        this.$router.push(route);
      }
    },
  },
};
</script>

<style scoped>
.el-header.title {
  font-size: 24px;
  font-weight: bold;
  /* 其他样式属性 */
  background-color: #171b39;
  color: #44d2c2;
  border-radius: 20px;
  width: 95%;
  text-align: center;
  margin: auto;
  margin-top: 10px;
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
  /* background-image: linear-gradient(to bottom, #44d2c2, #5091fe); */
  color: #333;
  text-align: center;
  line-height: 160px;
  width: 100%;
  background-color: transparent;
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

.full-height-container {
  height: 100vh; /* 将 full-height-container 的高度设置为视口高度的百分之百 */
}

/* 侧边导航栏 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 219px;
  /* min-height: 400px; */
  height: 100%;
}
</style>
