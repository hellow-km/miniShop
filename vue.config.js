console.log(process.env.NODE_ENV);
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets'
      }
    }
  },
}
