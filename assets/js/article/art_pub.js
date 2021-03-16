$(function () {
    // 需求1 文章类别 中第一个下拉框 分类列表 数据渲染
    initCate();
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            data: {},
            success: (res) => {
                // console.log(res);
                if (res.status != 0) layui.layer.msg(res.status);
                let htmlStr = template('options', { data: res.data });
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()  //手动二次渲染一下
            }
        })
    }
    // 需求2 初始化富文本编辑器
    initEditor()

    // 需求3 图片裁剪
    // 3.1. 初始化图片裁剪器
    var $image = $('#image')
    // 3.2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3.3. 初始化裁剪区域
    $image.cropper(options)


    // 需求4 图片上传
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    // 需求5 渲染裁剪区 选择文件 同步修改图片预览区
    $('#coverFile').on('change', function (e) {
        var file = e.target.files[0]
        // 非空校验
        if (file === undefined) {
            return layui.layer.msg('您可以选着一张照片作为封面')
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    // 需求5 状态参数定义
    let state = '已发布';
    $('#btnSave2').on('click', function () {
        state = '草稿'
    })

    // 需求6 fa发布文章
    $('#form-pub').on('submit', function (e) {
        // 阻止默认事件
        e.preventDefault()
        // 创建fd
        let fd = new FormData(this);
        // 
        fd.append('state', state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                console.log(...fd);

                pubArt(fd);
            });
    })

    // 封装一个函数 发表文章ajax
    function pubArt(fd) {
        $.ajax({
            url: '/my/article/add',
            type: 'POST',
            data: fd,
            contentType: false,     //设置为false
            processData: false,		//设置为false
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layui.layer.msg(res.message);
                layui.layer.msg('发表成功')
                location.href = '/article/art_list.html'
            }

        })
    }

})