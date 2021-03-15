$(function () {
    getUserInfo();
})

// 封装一个函数 用于发送ajax请求 获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        data: {},
        headers: { //api文档中规定 发送这个需要配置 Header
            Authorization: localStorage.getItem('token') || ''
        },
        success: (res) => {
            console.log(res);
            if (res.status != 0) return layui.layer.msg(res.message);
            // 修改 左侧导航栏顶部用户名字
            let { nickname, username, user_pic } = res.data;
            let name = nickname || username;
            $('#welcome').html(`欢迎${name}`)
            // 修改头像 有头像 显示头像 
            if (user_pic != null) {
                $('.layui-nav-img').attr('src', user_pic).siblings('.text-avatar').hide();
            } else {
                $('.text-avatar').html(name[0].toUpperCase()).siblings('.layui-nav-img').hide();
            }
        }
    })
}