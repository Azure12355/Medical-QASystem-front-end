import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/entityModel",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/components/MainContainer.vue"),
    children: [
      {
        path: "/search",
        component: () => import("@/views/SearchView.vue"),
        name: "Search",
        meta: {
          title: "实体搜索",
          icon: "el-icon-s-promotion",
        },
      },
      {
        path: "/entityModel",
        component: () => import("@/views/EntityModelView.vue"),
        name: "EntityModel",
        meta: {
          title: "实体模型",
          icon: "el-icon-s-promotion",
        },
      },

      {
        path: "/relationship2d",
        component: () => import("@/views/Relationship2DView.vue"),
        meta: {
          title: "2D关系全貌",
        },
      },
      {
        path: "/relationship3d",
        component: () => import("@/views/Relationship3DView.vue"),
        meta: {
          title: "3D关系全貌",
        },
      },
      {
        path: "/question",
        component: () => import("@/views/KGQAView.vue"),
        meta: {
          title: "知识图谱问答",
        },
      },
      {
        path: "/chatbot",
        component: () => import("@/views/ChatBotView.vue"),
        meta: {
          title: "智能问答机器人",
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
