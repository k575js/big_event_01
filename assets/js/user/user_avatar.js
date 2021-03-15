window.onload = function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2.选择文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 3.#file的状态变了 选择图片后 修改裁剪区域
    $('#file').on('change', function (e) {
        let file = e.target.files[0]; //拿到用户选择的文件
        if (!file) return layui.layer.msg('图片不能为空');
        let newImgURL = URL.createObjectURL(file); //根据选择的文件，创建一个对应的 URL 地址
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 4.点击确认  上传头像
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            url: '/my/update/avatar',
            type: 'POST',
            data: { avatar: dataURL },
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layui.layer.msg(res.message)    //状态判断
                layui.layer.msg('头像更改成功')     //提示信息
                window.parent.getUserInfo();        //渲染用户信息
            }
        })
    })
}