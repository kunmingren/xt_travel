/**
 * Created by cosmosev on 2017/1/6.
 */

var category_id=4;
$(document).ready(function () {
    getTicketsNum({"category_id": category_id,"page": 1,"currentPage":1,"pageCount":5},initTicketsNum,initTickets);
});

//获取景点数量
function getTicketsNum(data, fn1,fn2) {
    if(!data && !fn1 && !fn2){
        return;
    }
    $.ajax({
        type: "GET",
        url: geturl("backend/spots1"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn1(data.totalCount,data.currentPage);
                fn2(data.spots)
            }
        }
    });
}
function initTicketsNum(data,currentPage){
    var total = data;
    var visiblePages = 5;
    var totalPages = Math.ceil(total / visiblePages);
    $.jqPaginator('#pagination1', {
        totalPages: totalPages,
        visiblePages: visiblePages,
        currentPage: Number(currentPage),
        onPageChange: function(num, type) {
            if(currentPage!=num){
                var data= {
                    "category_id": category_id,
                    "page": num,
                    "currentPage":num,
                    "pageCount":visiblePages
                };
                getTicketsNum(data,initTicketsNum,initTickets);
            }

        }
    });
}
function initTickets(Info){
    $(".tickets").html("");
    for(var key in Info){
        var info=Info[key];
        var description=info.description;
        if(description.length > 70){
            description=description.substr(0,70)+"...";
        }
        var $ticket=$("<div class='panel panel-default'>" +
            "<div class='panel-body ticket'>" +
                "<div class='col-xs-12 col-sm-7 ticket_pic no-padding'>" +
                    "<div class='col-md-8'>" +
                        "<a href='javascript:;' class='thumbnail'>" +
                            "<img src='"+info.pic+"' class='img-responsive'>" +
                        "</a>" +
                    "</div>" +
                    "<div class='col-md-4'>" +
                        "<a href='javascript:;' class='thumbnail'>" +
                            "<img src='"+info.pic+"' class='img-responsive'>" +
                        "</a>" +
                    "</div>" +
                    "<div class='col-md-4'>" +
                        "<a href='javascript:;' class='thumbnail'>" +
                            "<img src='"+info.pic+"' class='img-responsive'>" +
                        "</a>" +
                    "</div>" +
                "</div>" +
                "<div class='col-xs-12 col-sm-5 no-padding'>" +
                    "<h3 class='ticketName'>"+info.name_zh+"" +
                        "<div class='text-right'><span style='color: red; font-size: 12px;'>¥ </span><span style='color: red; font-size: 24px;'>"+info.price+"</span> 起</div>" +
                    "</h3>" +
                    "<div class='order_btn clearfix'>" +
                        "<button class='btn btn-commom pull-right' ticketsId='"+info.id+"' onclick='order($(this))'>立即预定</button>" +
                    "</div>" +
                    "<div class='well pull-left'>" +
                        "<h4 class='ticket_title'>票种简介</h4>" +
                        "<p class='gray'>"+description+"</p>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>");
        $(".tickets").append($ticket);
    }
}

function order(obj) {
    location.href='?ctl=perOrder'
}
