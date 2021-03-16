$(function () {
    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = new Date(dtStr);

        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());

        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }

    // 模拟请求参数
    let P = {
        pagenum: 1,           //是	int	页码值
        pagesize: 4,           //	是	int	每页显示多少条数据
        cate_id: '',           //否	string	文章分类的 Id
        state: '',           //否	string	文章的状态，可选值有：已发布、草稿
    }
    // 需求2 请求数据 初始化文章列表
    initTable();
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            type: 'GET',
            data: P,
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layui.layer.msg(res.status);
                let htmlStr = template('tmp', { data: res.data });
                $('tbody').html(htmlStr);
                // 调用分页
                renderPage(res.total)

            }
        })
    }


    // 需求3 头部筛选 中第一个下拉框 分类列表 数据渲染
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


    // 需求4 筛选按钮点击 发送表单 进行筛选
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        // 赋值
        P.cate_id = cate_id;
        P.state = state;
        // 初始化文章列表
        initTable()
    })


    // 需求5 封装分页方法
    function renderPage(total) {
        layui.laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: P.pagesize, //每页几条
            curr: P.pagenum,  //第几页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], //自定义分页参数
            limits: [2, 3, 4, 5],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                //首次不执行
                if (!first) {
                    //do something
                    // 页码切换数据同步
                    P.pagenum = obj.curr;
                    P.pagesize = obj.limit;
                    initTable()   //重新渲染页面
                }
            }
        });
    }

    // 需求6 删除功能 (事件委托)
    $('tbody').on('click', '.btn-del', function () {
        let id = $(this).attr('data-id')        //拿到对应id
        layer.confirm('是否?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + id,
                type: 'get',
                data: {},
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) return layui.layer.msg(res.status);
                    layui.layer.msg('删除成功');

                    // 页面汇总删除按钮 个数等于1  ,  页码大于1(满足的话 页面页码值减一)
                    if ($('.btn-del').length == 1 && P.pagenum > 1) P.pagenum--;
                    initTable()
                }
            })
            layer.close(index);
        });

    })











})