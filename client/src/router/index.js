import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/todos",
  },
  {
    path: "/todos",
    name: "todos",
    // route level code-splitting
    // this generates a separate chunk (todo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "todo" */ "../views/TodoView.vue"),
  },
  {
    path: "/:catchAll(.*)", // Catch-all für ungültige Routen
    redirect: "/todos", // Weiterleitung auch bei ungültigen Routen
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
