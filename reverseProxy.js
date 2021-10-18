const httpProxy = require("http-proxy");
const url = require('url');
const express = require('express');
const { createProxyMiddleware, Filter, Options, RequestHandler } = require('http-proxy-middleware');

const app = express();

//key value pairs

const redis = {
  device1: "3001",
  device2: "3002",
}

// app.use("/remote/device1", createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true, pathRewrite: {"^/remote/device1": ""} }))
// app.use("/remote/device2", createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true, pathRewrite: {"^/remote/device2": ""} }))
app.use('/socket.io', createProxyMiddleware({ changeOrigin: true, router: function (req){
    console.log("socket query: " + req.query.token);
    return {
      protocol: "http",
      host: "localhost",
      port: redis[req.query.token] || 3001,
      ws: true ,
    }
}}));
app.listen(80);

// let proxy = httpProxy
//   .createProxyServer({
//     target: "http://localhost:9002",
//     ws: true,
//   })
//   .listen(80);

// proxy.on("proxyReq", function (proxyReq, req, res, options) {
//   console.log("new Proxy request " + req.url);
//   if (req.url.startsWith("/token")) {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const token = url.searchParams();
//   }
//   if (req.url.startsWith("/socket.io")) {
//     const queryObject = url.parse(req.url,true).query;
//     console.log(queryObject);

//   }
// });



//app.use('/javascripts/app.js', createProxyMiddleware({ target: 'http://localhost:9002', changeOrigin: true }));
// app.use('/javascripts/app.js', createProxyMiddleware({ target: 'http://localhost:9002', changeOrigin: true, router: function(req){
//   console.log(req.query);
//   const host = getHost(req.query.token)
//   return host
// } }));



// app.use('/remotecontrol', createProxyMiddleware({ target: 'http://localhost:9002/', changeOrigin: true }));
// app.use('/socket.io', createProxyMiddleware({ target: 'http://localhost:9002', changeOrigin: true, ws: true , router: function(req){
//   console.log(req.query);
//   const host = getHost(req.query.token)
//   return host
// }}));
// app.use('/device1', createProxyMiddleware({ target: 'http://localhost:9002', changeOrigin: true, pathRewrite: {"^/device1": ""}}));
// app.use('/socket.io', createProxyMiddleware({ target: 'http://localhost:9002/socket.io', changeOrigin: true, router: function (req){
//   if(req.query.userId == 123451)
//     return {
//       protocol: "http",
//       host: "localhost",
//       port: 9002,
//       ws: true ,
//     } 
//     return {
//       protocol: "http",
//       host: "localhost",
//       port: 9003,
//       ws: true
//     } 
// }}));
// app.use('/device2', createProxyMiddleware({ target: 'http://localhost:9003', changeOrigin: true,  pathRewrite: {"^/device2": ""}}));


function getHost(token){
  if(token == "5")
    return {
      protocol: "http",
      host: "localhost",
      port: 9002
    } 
  if(token == "4"){
    return {
      protocol: "http",
      host: "localhost",
      port: 9003
    }
  }
  return {
    protocol: "http",
    host: "localhost",
    port: 9002
  } 
}