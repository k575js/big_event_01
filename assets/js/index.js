$(function () {
    getUserInfo();

    //需求2  点击退出按钮 弹出提示框 确定后退出(销毁token 页面跳转login页面)
    $('#btnLogout').on('click', function () {
        // 弹出弹出框
        layer.confirm('是否退出后台界面', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地token  2.页面跳转
            localStorage.removeItem('token')
            location.href = '/login.html'

            // 关闭询问框
            layer.close(index);
        });
    })
})

// 封装一个函数 用于发送ajax请求 获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        data: {},
        // headers: { //api文档中规定 发送这个需要配置 Header  【因为在/my/下的接口都需要设置头信息 把它写在 baseAPI.js当中】
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) return layui.layer.msg(res.message);
            // 修改 左侧导航栏顶部用户名字
            let { nickname, username, user_pic } = res.data;
            let name = nickname || username;
            $('#welcome').html(`欢迎${name}`)
            // 修改头像 有头像 显示头像 
            if (user_pic != null) {
                $('.layui-nav-img').attr('src', user_pic).show().siblings('.text-avatar').hide();
            } else {
                $('.text-avatar').html(name[0].toUpperCase()).siblings('.layui-nav-img').hide();
            }
        }
    })
}