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
    getSpotsNum({"category_id":category_id},initSpotsNum);
});

//获取景点数量
function getSpotsNum(data, fn) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/spots1"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.count);
            }
        }
    });
}
function initSpotsNum(data){
    var total = data;
    var visiblePages = 5;
    var totalPages = Math.ceil(total / visiblePages);
    $.jqPaginator('#pagination1', {
        totalPages: totalPages,
        visiblePages: visiblePages,
        currentPage: 1,
        onPageChange: function(num, type) {
            var data= {
                "category_id": category_id,
                "page": num
            };
            getSpots(data,initSpots);
        }
    });
}
//获取分页景点
function getSpots(data, fn) {
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
                fn(data.spots);
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
                        "<div class='spotScore clearfix'>" +
                            "<img src='img/starFull.png'>" +
                            "<img src='img/starFull.png'>" +
                            "<img src='img/starFull.png'>" +
                            "<img src='img/starFull.png'>" +
                            "<img src='img/starEmpty.png'>" +
                            "<span>4.6</span>" +
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