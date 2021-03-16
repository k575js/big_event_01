$(function () {
    // 需求1 发送ajax请求 拿到数据 使用模板引擎渲染页面
    initArtCateList();

    // 需求2 添加文章分类
    let indexAdd = null;
    $('#btnAdd').on('click', function () {
        //利用框架代码 显示提示添加文章类别区域
        indexAdd = layui.layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });
    })

    // 需求3 添加文章分类 (使用事件代理完成)
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layui.layer.msg(res.message);
                // 清空form 重构文章分类列表 关闭弹出框
                $('#form-add')[0].reset();
                initArtCateList();
                layui.layer.close(indexAdd)
            }
        })
    })

    // 需求4 修改文章分类
    let idnexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出框 form表单
        idnexEdit = layui.layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        });
        // 发送ajax请求 数据 渲染到form表单
        // 先拿到Id
        let Id = $(this).attr('data-Id');
        $.ajax({
            url: '/my/article/cates/' + Id,
            type: 'GET',
            success: (res) => {
                console.log(res);
                if (res.status != 0) return alyui.layer.msg(res.message)
                // form表单数据填充
                layui.form.val('form-edit', res.data)

            }
        })
    })

    // 需求5 修改文章分类 (使用事件代理完成)
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layui.layer.msg(res.message);
                // 清空form 重构文章分类列表 关闭弹出框
                $('#form-edit')[0].reset();
                initArtCateList();
                layui.layer.close(idnexEdit)
            }
        })
    })



    //需求6 删除
    $('tbody').on('click', '.btn-del', function () {
        // 先拿到Id
        let Id = $(this).attr('data-Id');
        // 弹出 询问框
        layui.layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //发送ajax请求
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                type: 'GET',
                success: (res) => {
                    console.log(res);
                    if (res.status != 0) return alyui.layer.msg(res.message)
                    // 重构文章分类列表 提示删除成功 关闭弹出框 
                    initArtCateList();
                    layui.layer.msg('删除成功');
                    layui.layer.close(index);

                }
            })

        });
    })



















    // 封装函数 拿到文章类别列表数据 渲染
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: (res) => {
                // console.log(res);
                let htmlStr = template('tmp', { data: res.data });
                $('tbody').html(htmlStr)
            }
        })
    }
})