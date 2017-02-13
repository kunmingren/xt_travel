/**
 * Created by cosmosev on 2016/12/26.
 */

$(function () {
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay: 5000,

        // 分页器
        pagination: '.swiper-pagination',

        // 前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });
    getSpots({"category_id":0},initSpots,0);
    getPreorderCategeories(initPreorderCategeories);
    getNotice(initNotice);
    getTips(initTips)
});

//获取分类
function getPreorderCategeories(fn){
    if(!fn){
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/getPreorderCategeories"),
        dataType: "json",
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.info)
            }
        }
    });
}
function initPreorderCategeories(Info){
    $("#homeTabs").html("");
    for(var key in Info){
        var info=Info[key];
        var $li=$("<li class='col-sm-3 col-xs-12' categoryId='"+info.id+"' onclick='changeTabs($(this))'>" +
                "<a href='javascript:;'>"+info.name_zh+"</a>" +
            "</li>");
        $("#homeTabs").append($li);
    }
    initFirstTab();
}

//初始化第一个分类
function initFirstTab() {
    $("#homeTabs li").eq(0).children("a").addClass("active")
}

//点击切换分类内容
function changeTabs(obj) {
    obj.children("a").addClass("active");
    obj.siblings("li").children("a").removeClass("active");
    var categoryId=obj.attr("categoryId");
    var data={
        "category_id":categoryId
    };
    getSpots(data,initSpots,categoryId);
}
//获取分类内容
function getSpots(data, fn,categoryId) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "GET",
        url: geturl("backend/spots1"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.spots,categoryId)
            }
        }
    });
}
function initSpots(Info,categoryId) {
    var spotsUrl=['tickets','spots','hotels','specialty'];
    $("#homeSpotsLists").html("");
    for (var key in Info){   //=0;key<Info.length; key++
        if(key==5){
            break;
        }
        var info=Info[key];
        var perPrice="";
        if(spotsUrl[categoryId] != 'spots'){
            perPrice="人均："+info.per_capita_price+"元"
        }
        var name_zh=info.name_zh;
        if(name_zh.length > 5){
            name_zh=name_zh.substr(0,4)+"...";
        }
        var $div=$("<div class='col-sm-6 col-md-4'>" +
                    "<div class='thumbnail'>" +
                        "<img src='"+info.pic+"' style='width:360px; height:240px;'>" +
                        "<div class='caption clearfix'>" +
                            "<p class='h5 pull-left'><strong title='"+info.name_zh+"'>"+name_zh+"</strong> "+perPrice+"</p>" +
                            "<p class='clearfix'><a target='_blank' href='javascript:;' class='pull-right btn btn-success' role='button'>查看详情</a></p>" +
                        "</div>" +
                    "</div>" +
                "</div>");
        $("#homeSpotsLists").append($div)
    }
    var $more=$("<div class='col-sm-6 col-md-4'>" +
            "<div class='thumbnail_more text-center'>" +
                "<a href='?ctl="+spotsUrl[categoryId]+"'>更多&gt;</a>" +
            "</div>" +
        "</div>");
    $("#homeSpotsLists").append($more)
}



//获取新闻动态
function getNotice(fn){
    if(!fn){
        return;
    }
    $.ajax({
        type: "GET",
        url: geturl("backend/getNotice"),
        dataType: "json",
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.notice)
            }
        }
    });
}
function initNotice(Info){
    $("#newsList").html("");
    for(var key in Info){
        if(key >=2){
            break;
        }
        var info=Info[key];
        var sendTime=info.sendTime;
        sendTime=sendTime.split(" ")[0];
        var descripe=info.descripe;
        if(descripe.length > 46){
            descripe=descripe.substr(0,46)+"...";
        }
        var $div=$("<div class='media col-md-6 col-sm-12 col-xs-12'>" +
                "<a class='media-left col-sm-6 col-xs-12' href='javascript:;'>" +
                    "<img src='"+info.pic+"' style='width: 100%; min-width: 200px; max-width: 300px;' />" +
                "</a>" +
                "<div class='media-body col-sm-6 col-xs-12'>" +
                    "<h4 class='media-heading'>"+info.summary+"</h4>" +
                    "<p>"+sendTime+"</p>" +
                    "<p>"+descripe+"</p>" +
                    "<a href='javascript:;' class='pull-right btn btn-success' role='button'>查看更多</a>" +
                "</div>" +
            "</div>");
        $("#newsList").append($div);
    }
}

//获取旅游攻略
function getTips(fn){
    if(!fn){
        return;
    }
    $.ajax({
        type: "GET",
        url: geturl("backend/getTips"),
        dataType: "json",
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.travel_guides)
            }
        }
    });
}
function initTips(Info){
    $("#routeList").html("");
    for(var key in Info){
        if(key>=4){
            break;
        }
        var info=Info[key];
        var description=info.description;
        if(description.length > 40){
            description=description.substr(0,40)+"...";
        }
        var $div=$("<div class='col-sm-4 col-md-3'>" +
                "<a href='javascript:;'>" +
                    "<div class='thumbnail'>" +
                        "<img src='"+info.material+"' style='width:260px; height:197px;' />" +
                        "<div class='caption gray clearfix'>" +
                            "<h4 class='black'>"+info.name+"</h4>" +
                            "<span class='glyphicon glyphicon-map-marker'></span>浙江省嘉兴市嘉善县" +
                            "<p class='black'>"+description+"</p>" +
                            "<p class='pull-left'>"+info.upPerson+"</p><span class='pull-right'>"+info.travel_time+"</span>" +
                        "</div>" +
                    "</div>" +
                "</a>" +
            "</div>");
        $("#routeList").append($div);
    }
}