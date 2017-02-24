/**
 * Created by cosmosev on 2016/12/26.
 */

$(function() {
    // debugger;
    var routeId = GetRequest("id");
    getPreTravel_guides(initPreTravel_guides,routeId);
    // 分享按钮 初始化
    var shareBtn = $('.routePage .row.info  .socal .social-share');
    var share = $('.routePage .row.info  .socal .socalShare');
    InitClickShare(shareBtn);
    share.click(function(event) {
        // todo 点击其它区域 分享按钮隐藏
        /* Act on the event */
        ClickShare(shareBtn);
    });
    var nav = $(".routePage .essaybody.row .nav .naviagtion");
    // top 必须在函数外获取，不能每次滚动都获取，
    var top = nav.offset().top + 20;

    // 滚动监听函数
    $(document).scroll(function(event) {
        /* Act on the event */
        // 小于768px的，不固定导航条
        if ($(window).width() < 768) {
            return;
        }
        var doc = $(document);
        if (doc.scrollTop() >= top) {
            if (!nav.hasClass('fixedDom')) {
                nav.addClass('fixedDom');
            }
        } else {
            if (nav.hasClass('fixedDom')) {
                nav.removeClass('fixedDom');
            }
        }

    });
    

    //获取 旅游 线路 
    function getPreTravel_guides(fn,routeId) {
        $.ajax({
            type: "GET",
            url: geturl("backend/preTravel_guides"),
            // todo  数据写死
            data: {
                travel_guide_id: routeId
            },
            dataType: "json",
            success: function(data) {
                if (data.rescode == 200) {
                    fn(data.travel_guide)
                }
            }
        });
    }
    // 初始化，设置 详情页 样式
    function initPreTravel_guides(data) {
        var jQuerydom = $(".routePage .essaybody.row .bodytext");
        // 设置 头部内容
        $(".routePage .head.row .banner").css({
            "background-image": "url('" + data.background_pic + "')",
        });
        $(".routePage .info.row .user-img").css({
            "background-image": "url('" + data.icon_pic + "')",
        });
        //  todo  $(".routePage .info.row .blog-description").text(data.des)
        $(".routePage .info.row .blog-description").text("上有天堂，下有西塘");
        $(".routePage .info.row .writer-name").text(data.upPerson);
        $(".routePage .info.row .blog-date").text(data.travel_time);
        $(".routePage .info.row .blog-readCounts span").text(data.readCounts);
        $(".routePage .info.row .socal .thumbUp span").text(data.recommend);

        $(".routePage .essaybody.row .description").text(data.description);
        $(".routePage .essaybody.row .bodyName").text(data.name);
        initThumbsUp(data.id, data.recommend);
        initEssayBody(data)
    }

    // 设置文章主体部分
    function initEssayBody(data) {
        var info = data.travel_guide_detail;
        var dom1 = $(".routePage .essaybody.row .bodytext"),
            dom2 = $(".routePage .essaybody.row .nav .naviagtion");
        var html1 = '',
            html2 = "<a href='#href0' class='nav-bar href0 navtitle'>" + data.name + "</a>";
        for (var i = 0; i < info.length; i++) {
            html1 += "<div class='paragraph' id='href" + (i + 1) + "'><h6>" + info[i].day + ' ' + info[i].title + "</h6><div class='img'><img src=" + info[i].material + "></div><div class='des'>" + info[i].description + "</div></div>";
            html2 += "<a class='nav-bar navbody " + "href" + (i + 1) + "' href='#href" + (i + 1) + "'>" + info[i].day + ' ' + info[i].title + "</a>";
        }
        dom1.html(html1);
        dom2.html(html2);
        var pags = $(".routePage .essaybody.row .col-md-9 .paragraph");
        // 文章主体的段落加载完之后再绑定监听事件
        // 滚动监听函数
        $(document).scroll(function(event) {
            /* Act on the event */
            var doc = $(document);
            // todo 页面滚动 + 数组遍历，需要修复
            pags.each(function(index, el) {
                var el = $(el),
                    top = $(el).offset().top;
                if ((top - doc.scrollTop() > -20) && (top - doc.scrollTop() < 50)) {
                    var idMark = el.attr('id');
                    $(".routePage .essaybody.row .nav .naviagtion ." + idMark).addClass('active').siblings().removeClass('active');

                }
            });

        });


    }

    // localstorage 初始化点赞数
    function initThumbsUp(id, rd) {
        // 文章点赞为空时，建立数组
        if (!localStorage.thumbsUp) {
            var arrA = [];
            localStorage.thumbsUp = JSON.stringify(arrA);
        }
        var arrB = JSON.parse(localStorage.thumbsUp);
        var flag = arrB.some(function(element, index, array) {
            return element.key == id;
        })
        if (!flag) {
            arrB.push({ key: id, value: 0, recommend: rd })
        }
        localStorage.thumbsUp = JSON.stringify(arrB);
        initThisEssayThumbs(id, rd);
        $('.routePage  .blog-detail .socal .thumbUp').click(function(event) {
            /* Act on the event */
            ClickThumsbUp(id)
        });
    }
    // 初始化某篇文章是否点赞
    function initThisEssayThumbs(id, rd) {
        var arrA = JSON.parse(localStorage.thumbsUp);
        for (var i = 0; i < arrA.length; i++) {
            if (arrA[i].key == id) {
                if (arrA[i].value == 0) {
                    $('.routePage .row.info .blog .blog-detail .socal .thumbUp').css({
                        "background-image": 'url(img/notthumbsUp.png)'
                    });
                } else {
                    $('.routePage .row.info .blog .blog-detail .socal .thumbUp').css({
                        "background-image": 'url(img/thumbsUp.png)'
                    });
                }
                $(".routePage .info.row .socal .thumbUp span").text(arrA[i].recommend);
                return;
            }
        }
    }
    // 点赞
    function ClickThumsbUp(id, rd) {
        var arrA = JSON.parse(localStorage.thumbsUp);
        var val, action, data, key, count;
        for (var i = 0; i < arrA.length; i++) {
            if (arrA[i].key == id) {
                key = i;
                val = arrA[i].value;
                count = arrA[i].recommend;
                if (val == 0) {
                    action = "add";
                    val = 1;
                    count++;
                } else {
                    action = "reduce";
                    val = 0;
                    if (count > 0) {
                        count--;
                    }
                }
                data = {
                    travelId: id,
                    action: action
                };
                $.ajax({
                    type: "POST",
                    url: geturl("backend/guideRecommendApp"),
                    // todo 
                    data: JSON.stringify(data),
                    dataType: "json",
                    success: function(data) {
                        if (data.rescode == 200) {
                            arrA[key].value = val;
                            arrA[key].recommend = count;
                            localStorage.thumbsUp = JSON.stringify(arrA);
                            initThisEssayThumbs(id, count);
                        }
                    }
                });
            }
        }
    }
    // 分享按钮 初始化
    function InitClickShare(ele) {
        ele.css({
            display: 'none'
        });
    }
    // 点击 显示 分享按钮
    function ClickShare(ele) {
        var display = ele.css('display');
        if (display == 'block') {
            ele.css('display', 'none');
        } else {
            ele.css('display', 'block');
        }
    }
});
