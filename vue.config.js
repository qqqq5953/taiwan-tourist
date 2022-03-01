module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/scss/main.scss";',
      }
    }
  },

  configureWebpack: {
    externals: {
      Vue: "vue"
    }
  },

  publicPath: '/tourist-site-project/dist/'
}