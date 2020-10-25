module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],

      alias: {
        // '@': 'src',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@/store'
      }
    }
  }
}

