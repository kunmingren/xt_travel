/**
 * Created by cosmosev on 2016/12/26.
 */

$(function() {
    debugger;
    // “函数内全局的变量”
    // 每页显示 4条
    var pagerNum = 4;
    getNewList(true);
    //获取新闻线路列表数据
    function getNewList(isInit,num) {
        // isInit,是否是初次加载
        var pager =1;
        if (!isInit) {
           pager = num;
        }
        $.ajax({
            type: "GET",
            // todo 
            // 写死的参数
            // url: geturl("backend/preTravel_guides"),
            url: 'https://www.aifavor.com/backend/getPreNoticeList',
            dataType: "json",
            data: {
                // m是页数，n是每页显示数
                "m": pager,
                "n": pagerNum
            },
            asnyc:true,
            success: function(data) {
                if (data.rescode == 200) {
                    initListStyle(data.notice);
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
        console.log(list)
        var len = list.length,html="";
        for (var i = 0; i < len; i++) {
            html += "<div class='list-item' onclick='goToNewDetail("+list[i].id+")'>"+
                        "<div class='row'>"+
                            "<div class='col-xs-12'>"+
                                "<a class='list-item-title'>"+list[i].subject+"</a>"+
                            "</div>"+
                            "<div class='col-xs-12 list-item-info clearfix'>"+
                                "<div class='pull-left upPerson'><span >"+list[i].transPerson+"</span></div>"+
                                "<div class='pull-left '><span>"+ list[i].sendTime +"</span></div>" +
                            "</div>" +
                        "</div>";
            if (Object.getOwnPropertyNames(list[i].pic).length == 0) {
                  html +=    "<div class='row list-item-body'>"+
                                 "<div class='col-xs-12'>"+
                                     "<div class='head'>"+list[i].descripe+"</div>"+
                                 "</div>"+
                                 "<div class='col-xs-12 clearfix'>"+
                                     "<div class='pull-right readCounts'><span>"+list[i].readCounts+"</span>浏览</div>"+
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
                                      "<div>"+list[i].descripe+"浏览</div>"+
                                      "<div class='pull-right readCounts'><span class=''>"+list[i].readCounts+"</span>浏览</div>"+
                                  "</div>"+
                             "</div>"+
                         "</div>";
            } else {
                html +=     "<div class='row list-item-body'>"+
                                 "<div class='col-xs-12'>"+
                                     "<div class='head'>"+list[i].descripe+"</div>"+
                                 "</div>"+
                                 "<div class='col-md-12'>"+
                                     "<div class='row list-item-2imgs'>"+
                                         "<div class='col-xs-6'><img class='list-item-img' src='"+list[i].pic[0]+"'> </div>"+
                                         "<div class='col-xs-6'><img class='list-item-img' src='"+list[i].pic[0]+"'> </div>"+
                                     "</div>"+
                                 "<div class='col-xs-12 clearfix'>"+
                                 // .list-item-readCounts 专门为两张图片的类
                                     "<div class='pull-right list-item-readCounts readCounts'><span>"+list[i].readCounts+"</span>浏览</div>"+
                                 "</div>"+
                             "</div>"+
                         "</div>";
            }
        }
        $(".newList .new-list-body").html(html);
    }
    // 设置 分页
    function setPager(total){
        var totalPages = Math.ceil(total/pagerNum);
        $('#new-list-pagination').jqPaginator({
            // todo 
            totalPages: totalPages,
            visiblePages: 4,
            currentPage: 1,
            onPageChange: function(num, type) {
              if (type.indexOf('init') == 0) {
                return;
              }
              getNewList(false,num)
            }
        });
    }
    

});
// 只能放在全局中，否则页面调用不到
// 跳转到攻略详情页
function goToNewDetail(id) {
    location.href="?ctl=route&id="+id;
}