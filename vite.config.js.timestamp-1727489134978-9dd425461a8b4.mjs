// vite.config.js
import { defineConfig } from "file:///C:/Users/nevesfg/Desktop/FRONTEND/Outros%20Projetos/CassinoChina/node_modules/vite/dist/node/index.js";
import laravel from "file:///C:/Users/nevesfg/Desktop/FRONTEND/Outros%20Projetos/CassinoChina/node_modules/laravel-vite-plugin/dist/index.mjs";
import vue from "file:///C:/Users/nevesfg/Desktop/FRONTEND/Outros%20Projetos/CassinoChina/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import i18n from "file:///C:/Users/nevesfg/Desktop/FRONTEND/Outros%20Projetos/CassinoChina/node_modules/laravel-vue-i18n/dist/vite.mjs";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.js"],
      refresh: true
    }),
    vue({
      template: {
        base: null,
        includeAbsolute: false
      }
    }),
    i18n()
  ],
  resolve: {
    alias: {}
  },
  define: {
    global: "window"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxuZXZlc2ZnXFxcXERlc2t0b3BcXFxcRlJPTlRFTkRcXFxcT3V0cm9zIFByb2pldG9zXFxcXENhc3Npbm9DaGluYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbmV2ZXNmZ1xcXFxEZXNrdG9wXFxcXEZST05URU5EXFxcXE91dHJvcyBQcm9qZXRvc1xcXFxDYXNzaW5vQ2hpbmFcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL25ldmVzZmcvRGVza3RvcC9GUk9OVEVORC9PdXRyb3MlMjBQcm9qZXRvcy9DYXNzaW5vQ2hpbmEvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBsYXJhdmVsIGZyb20gJ2xhcmF2ZWwtdml0ZS1wbHVnaW4nO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IGkxOG4gZnJvbSAnbGFyYXZlbC12dWUtaTE4bi92aXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIGxhcmF2ZWwoe1xuICAgICAgICAgICAgaW5wdXQ6IFsncmVzb3VyY2VzL2Nzcy9hcHAuY3NzJywgJ3Jlc291cmNlcy9qcy9hcHAuanMnXSxcbiAgICAgICAgICAgIHJlZnJlc2g6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICB2dWUoe1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBiYXNlOiBudWxsLFxuICAgICAgICAgICAgICAgIGluY2x1ZGVBYnNvbHV0ZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGkxOG4oKSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcblxuICAgICAgICB9XG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgICAgZ2xvYmFsOiAnd2luZG93J1xuICAgIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0WCxTQUFTLG9CQUFvQjtBQUN6WixPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUVqQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDSixPQUFPLENBQUMseUJBQXlCLHFCQUFxQjtBQUFBLE1BQ3RELFNBQVM7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxNQUNBLFVBQVU7QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLGlCQUFpQjtBQUFBLE1BQ3JCO0FBQUEsSUFDSixDQUFDO0FBQUEsSUFDRCxLQUFLO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTyxDQUVQO0FBQUEsRUFDSjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osUUFBUTtBQUFBLEVBQ1o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
