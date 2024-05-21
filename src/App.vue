<template>
  <div id="app">
      <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

html, body {
  height: 100%;
  margin: 0; /* 移除默认的margin */
}

#app {
  height: 90%;
  width: 100%;
}
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 占满屏幕高度 */
}

.content {
  width: 100%; /* 占满父容器宽度 */
  max-width: 800px; /* 可以设置最大宽度 */
  padding: 20px; /* 可以设置内边距 */
  background-color: #f0f0f0;
}
</style>
