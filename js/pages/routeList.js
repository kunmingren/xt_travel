/**
 * Created by cosmosev on 2016/12/26.
 */

$(function() {
    // “函数内全局的变量”
    // 每页显示 4条
    var pagerNum = 4;
    getTravel_guides(true);
    //获取旅游线路列表数据
    function getTravel_guides(isInit,num) {
        // isInit,是否是初次加载
        var pager =1;
        if (!isInit) {
           pager = num;
        }
        $.ajax({
            type: "GET",
            // todo 
            // url: geturl("backend/preTravel_guides"),
            url: 'http://www.aifavor.com/backend/getGuideInfos',
            dataType: "json",
            data: {
                // m是页数，n是每页显示数
                "m": pager,
                "n": pagerNum
            },
            asnyc:true,
            success: function(data) {
                if (data.rescode == 200) {
                    debugger;
                    console.log(data);
                    initListStyle(data.travel_guides);
                    if (isInit) {
                        // pager只加载页面时，初始化一次
                        setPager(data.totalCounts);
                    }
                }
            }
        });
    }

    // 初始化，列表样式
    function initListStyle(list) {
        debugger;
        var len = list.length,html="";
        for (var i = 0; i < len; i++) {
            // html += "<div class='list-item' onclick='routeDetail("+list[i].id+")'>"+
            html += "<div class='list-item' onclick='goToRouteDetail("+list[i].id+")'>"+
                        "<div class='row'>"+
                            "<div class='col-xs-12 clearfix'>"+
                                "<div class='pull-left upPerson'>来自<span >"+list[i].upPerson+"</span></div>"+
                                "<div class='pull-right recommend'><span>"+ list[i].recommend +"</span>点赞</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>"+
                                "<a class='list-item-title'>"+list[i].name+"</a>"+
                            "</div>"+
                        "</div>";
            if (Object.getOwnPropertyNames(list[i].pic).length ==0 ) {
                  html +=    "<div class='row list-item-body'>"+
                                 "<div class='col-xs-12'>"+
                                     "<div class='head'>"+list[i].description+"</div>"+
                                 "</div>"+
                                 "<div class='col-xs-12 clearfix'>"+
                                     "<div class='pull-right'>"+list[i].readCounts+"浏览</div>"+
                                 "</div>"+
                             "</div>"+
                         "</div>";
            } else if (Object.getOwnPropertyNames(list[i].pic).length == 1){
                // 一张图片的情况下
                html +=     "<div class='row list-item-body'>"+
                                  "<div class='col-md-3'>"+
                                  // todo
                                      "<div><img class='list-item-img' src='"+list[i].pic[0]+"'> </div>"+
                                  "</div>"+

                                  "<div class='col-md-9'>"+
                                      "<div>"+list[i].description+"浏览</div>"+
                                      "<div class='pull-right'>"+list[i].readCounts+"浏览</div>"+
                                  "</div>"+
                             "</div>"+
                         "</div>";
            } else {
                html +=     "<div class='row list-item-body'>"+
                                 "<div class='col-xs-12'>"+
                                     "<div class='head'>"+list[i].description+"</div>"+
                                 "</div>"+
                                 "<div class='col-md-12'>"+
                                     "<div class='row'>"+
                                         "<div class='col-xs-6'><img class='list-item-img' src='"+list[i].pic[0]+"'> </div>"+
                                         "<div class='col-xs-6'><img class='list-item-img' src='"+list[i].pic[0]+"'> </div>"+
                                     "</div>"+
                                 "<div class='col-xs-12 clearfix'>"+
                                     "<div class='pull-right list-item-readCounts'>"+list[i].readCounts+"浏览</div>"+
                                 "</div>"+
                             "</div>"+
                         "</div>";
            }
        }
        $(".routeList .route-list-body").html(html);
    }
    // 设置 分页
    function setPager(total){
        debugger;
        var totalPages = Math.ceil(total/pagerNum);
        $('#route-list-pagination').jqPaginator({
            // todo 
            totalPages: totalPages,
            visiblePages: 4,
            currentPage: 1,
            onPageChange: function(num, type) {
              debugger;
              if (type.indexOf('init') == 0) {
                return;
              }
              getTravel_guides(false,num)
            }
        });
    }
    

});
// 只能放在全局中，否则页面调用不到
// 跳转到攻略详情页
function goToRouteDetail(id) {
    location.href="?ctl=route&id="+id;
}