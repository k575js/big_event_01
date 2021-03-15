$(function () {
    // 需求1 使用layui完成表单自定义校验
    layui.form.verify({
        nickname: function (val) {
            if (val.length < 1 || val.length > 6) {
                return '用户昵称必须在1-6位之间!!'
            }
        }
    })

    //需求2 基本资料页面加载完毕 发送ajax请求 渲染基本资料页面
    initUserInfo();

    //需求3 点击重置按钮 input框显示用户原始数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    //需求4 点击提交修改 修改用户信息 左侧导航栏用户信息变化
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) return layui.layer.msg(res.message);
                layui.layer.msg('恭喜你,修改信息成功!');
                window.parent.getUserInfo() //调用父window的全局函数getUserInfo  左侧导航栏用户信息变化
            }
        })
    })

    // 封装函数
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) return layui.layer.msg(res.message);
                // 成功后渲染
                layui.form.val('formUserInfo', res.data)
            }
        })
    }
})