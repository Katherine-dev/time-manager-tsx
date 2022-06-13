module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/time-manager-tsx/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
