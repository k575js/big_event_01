$(function () {
    initArtCateList();


    // 封装函数
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