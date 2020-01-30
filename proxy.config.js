module.exports = {
  '/test-table': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/test-table': `/${process.env.VUE_APP_BASE_API}/test-table`
    }
  },
  '/body-part': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/body-part': `/${process.env.VUE_APP_BASE_API}/body-part`
    }
  },
  '/muscle': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/muscle': `/${process.env.VUE_APP_BASE_API}/muscle`
    }
  },
  '/exercise': {
    target: `${process.env.VUE_APP_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: {
      '^/exercise': `/${process.env.VUE_APP_BASE_API}/exercise`
    }
  }
}
