const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const reactDomServer = require('react-dom/server')
const httpProxyMiddleware = require('http-proxy-middleware')
const asyncBootsrap = require('react-async-bootstrapper')
const serialize = require('serialize-javascript')
const ejs = require('ejs')
const path = require('path')
const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}
const compiler = webpack(serverConfig)
const mfs = new MemoryFs
const Module = module.constructor
compiler.outputFileSystem = mfs
let serverBundle, createStoreMap
compiler.watch({}, (err, stats) => {
  console.log('wathch')
  if (err) throw err
  // stats=stats.toJson()
  // stats.errors.forEach(err=>console.log(err))
  // stats.warnings.forEach(warn=>console.warn(warn))
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  console.log(bundlePath)
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  console.log(bundle)
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
  console.log(serverBundle)
  createStoreMap = m.exports.createStoreMap
  console.log(m.exports.createStoreMap)
})
const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
  }, {})
}
module.exports = function (app) {
  app.use('/public', httpProxyMiddleware({
    target: 'http://localhost:8888'
  }))
  app.get('*', (req, res) => {
    getTemplate().then(template => {
      const routerContext = {}
      console.log(createStoreMap)
      const stores = createStoreMap()
      const app = serverBundle(stores, routerContext, req.url)
      asyncBootsrap(app).then(() => {
        if (routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.send()
          return
        }
        const state = getStoreState(stores)
        const content = reactDomServer.renderToString(app)
        // res.send(template.replace('<!--app-->', content))
        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state)
        })
        res.send(html)
      })
      // const content = reactDomServer.renderToString(serverBundle)
    })
  })
}
