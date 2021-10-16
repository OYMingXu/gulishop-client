module.exports = {
   lintOnSave: false, //禁用eslint
   devServer:{
      proxy: {
         "/api": {
           target: "http://39.98.123.211",
         //   是否要去掉api
         //   pathRewrite: {"^/api/v2" : ""}
         }
       }
   }
}