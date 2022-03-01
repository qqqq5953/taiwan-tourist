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

  publicPath: '/taiwan-tourist/dist/'
}