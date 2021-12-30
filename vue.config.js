const BASE_URL = process.env.NODE_ENV === 'production' ? '/login/' : '/'
module.exports = {
  publicPath: BASE_URL,
  css: {
    extract: false
  }
}
