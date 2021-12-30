module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/login/' : '/',
  css: {
    extract: false
  }
}
