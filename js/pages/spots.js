/**
 * Created by cosmosev on 2017/1/6.
 */

var category_id=1;
$(document).ready(function () {

    $("#viewDetails").click(function () {
        $("#spots").addClass("active").siblings("li").removeClass("active");
        location.href="?ctl=spot_details";
        $("#reload").load("tpl/spot_details.html");
    });
    getSpotsNum({"category_id": category_id,"page": 1,"currentPage":1,"pageCount":5},initSpotsNum,initSpots);
});

//获取景点数量
function getSpotsNum(data, fn1,fn2) {
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
function initSpotsNum(data,currentPage){
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
                getSpotsNum(data,initSpotsNum,initSpots);
            }

        }
    });
}
function initSpots(Info){
    $("#spotsList").html("");
    for(var key in Info){
        var info=Info[key];
        var description=info.description;
        if(description.length > 70){
            description=description.substr(0,70)+"...";
        }
        var grade=parseInt(info.comment_grade);
        var stars="";
        for (var i=0;i<grade;i++){
            stars+="<img src='star-on.png'>"
        }
        for (var j=0;j<5-grade;j++){
            stars+="<img src='star-off.png'>"
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
                    "<h3 class='spotName'>"+info.name_zh+"</h3>" +
                    "<div class='order_btn clearfix'>" +
                        "<div class='spotScore clearfix'>" + stars + "<span>"+info.comment_grade+"</span>" +
                        "</div>" +
                        "<button class='btn btn-commom pull-right' spotId='"+info.id+"' onclick='spotDetails($(this))'>查看详情</button>" +
                    "</div>" +
                    "<div class='well pull-left'>" +
                        "<h4 class='ticket_title'>景点简介</h4>" +
                        "<p class='gray'>"+description+"</p>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>");
        $("#spotsList").append($ticket);
    }
}

function spotDetails(obj) {
    var spotId=obj.attr("spotId");
    location.href="?ctl=spot_details";
    localStorage.setItem("spotId",spotId);
}