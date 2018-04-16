const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const reactDomServer = require('react-dom/server')
const httpProxyMiddleware = require('http-proxy-middleware')
const path = require('path')
const serverConfig = require('../../build/webpack.config.server')
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}
const compiler = webpack(serverConfig)
const mfs =  new MemoryFs
const Module = module.constructor
let serverBundle
compiler.outputFileSystem = mfs
compiler.watch({}, (err, stats) => {
  if (err) throw err
  // stats=stats.toJson()
  // stats.errors.forEach(err=>console.log(err))
  // stats.warnings.forEach(warn=>console.warn(warn))
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})
module.exports = function (app) {
  app.use('/public', httpProxyMiddleware({
    target: 'http://localhost:8888'
  }))
  app.get('*', (req, res) => {
    getTemplate().then(template => {
      const content = reactDomServer.renderToString(serverBundle)
      console.log(content)
      res.send(template.replace('<!--app-->', content))
    })
  })
}
