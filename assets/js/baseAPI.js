// 开发环境 服务器地址
let baseURL = 'http://api-breakingnews-web.itheima.net';
// 测试环境 服务器地址
// 生产环境 服务器地址
// 需要哪个地址就打开哪个地址的注释

// 拦截所有ajax请求 get/post/ajax
// 处理参数
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;  //拼接对应的服务器地址
})