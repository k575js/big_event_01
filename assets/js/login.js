$(function () {
    // 需求1 点击去注册按钮 切换到注册界面
    $('#link_reg').on('click', function () {
        $('.login-Box').hide();
        $('.reg-Box').show();
    })
    // 需求2 点击去登录按钮 切换到登录界面
    $('#link_login').on('click', function () {
        $('.reg-Box').hide();
        $('.login-Box').show();
    })

    // 需求3 登录界面 自定义表单规则
    // 使用了layui框架 会有一个layui对象  对里面的 form属性进行操作    form属性有个verify方法实现自定义表单验证规则
    let form = layui.form;
    form.verify({
        // verify()的参数 是一个对象 
        // 属性是校验规则的名称  值可以是函数或者数组
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value != $('.reg-Box input[name=password]').val()) return '两次密码输入不正确';
        }
    })


    let layer = layui.layer; //优化使用layui的弹出层
    // 需求3 用户注册功能  用submit事件 语义化更强
    $('#form_reg').on('submit', function (e) {
        e.preventDefault(); //阻止浏览器默认提交行为
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $('.reg-Box input[name=username]').val(),
                password: $('.reg-Box input[name=password]').val()
            },
            success: (res) => {
                // console.log(res);
                // 优化使用layui的弹出层
                if (res.status != 0) return layer.msg(res.message, { icon: 5 }, () => { $('#form_reg')[0].reset(); });
                layer.msg('恭喜你,注册成功!', { icon: 6 });
                $('#link_login').click();       //切换到登录界面
                $('#form_reg')[0].reset();      //注册界面表单内容清空
            }
        })
    })

    // 需求4 用户登录功能  用submit事件 语义化更强
    $('#form_login').on('submit', function (e) {
        e.preventDefault(); //阻止浏览器默认提交行为
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $('#form_login').serialize(),
            success: (res) => {
                // console.log(res);
                // 优化使用layui的弹出层
                if (res.status != 0) return layer.msg('用户名密码不正确', { icon: 5 }, () => { $('#form_reg')[0].reset(); });
                // 成功后操作 提示信息 跳转页面 保存res的token值到本地存储
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';

            }
        })
    })

})