// 开发环境 服务器地址
let baseURL = 'http://api-breakingnews-web.itheima.net';
// 测试环境 服务器地址
// 生产环境 服务器地址
// 需要哪个地址就打开哪个地址的注释

// 拦截所有ajax请求 get/post/ajax
// 处理参数
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;  //1.拼接对应的服务器地址

    //  2.如果请求的接口路径在/my/之下  需要设置头信息 接口除了/api/不用设置 
    //  其余都要放在这个文件夹写 headers需要手动添加Authorization
    if (params.url.indexOf('/my') != -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        // 登录拦截
        //  ajax请求完成时 返回的信息里有一个responseJSON 
        // 当status等于1 和 message为 "身份认证失败！" 时  进行登录拦截
        params.complete = function (res) {
            console.log(res);
            let { status, message } = res.responseJSON;
            if (status == 1 && message == "身份认证失败！") {
                // 登录拦截 
                // 1.跳转回login界面
                location.href = '/login.html'
                // 2.清空本地token
                localStorage.removeItem('token')

            }
        }
    }
})