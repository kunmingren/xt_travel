/**
 * Created by 83471 on 2016/12/26.
 */

var category_id=2;
$(function () {
    //日期插件
    var start = {
        elem: '#hotel_st',
        format: 'YYYY-MM-DD',
        // min: laydate.now(), //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istime: false,
        istoday: false,
        choose: function(datas){
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas; //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#hotel_ed',
        format: 'YYYY-MM-DD',
        // min: laydate.now(),
        max: laydate.now(),
        istime: false,
        istoday: false,
        choose: function(datas){
            start.max = datas;
            start.start = datas; //将结束日的初始值设定为开始日
        }
    };
    laydate(start);
    laydate(end);

    $('.condition-input').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
    });

    getHotelsNum({"category_id": category_id,"page": 1,"currentPage":1,"pageCount":5},initHotelsNum,initHotels);
});


//获取景点数量
function getHotelsNum(data, fn1,fn2) {
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
function initHotelsNum(data,currentPage){
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
                getHotelsNum(data,initHotelsNum,initHotels);
            }

        }
    });
}
function initHotels(Info){
    $(".hotelsList").html("");
    for(var key in Info){
        var info=Info[key];
        var description=info.description;
        if(description.length > 40){
            description=description.substr(0,40)+"...";
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
                    "<h3 class='hotelName'>"+info.name_zh+"</h3>" +
                    "<div class='hotelInfo'>" +
                        "<div style='margin-top: 30px; margin-bottom: 30px; color: #aaaaaa;'>" +
                            "<p>地址：<span>"+info.address+"</span></p>" +
                            "<p>电话：<span>"+info.phone+"</span></p>" +
                            "<p>简介：<span>"+description+"</span></p>" +
                        "</div>" +
                        "<div class='text-right' style='padding-bottom: 10px;'><span style='color: red;'>¥</span> <span style='color: red; font-size: 24px;'>"+info.per_capita_price+"</span> 起</div>" +
                        "<div class='text-right'><button class='btn btn-commom' hotelId='"+info.id+"' onclick='hotelDetails($(this))'>查看详情</button></div>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>");
        $(".hotelsList").append($ticket);
    }
};


function hotelDetails(obj) {
    var hotelId=obj.attr("hotelId");
    location.href="?ctl=hotel_details";
    localStorage.setItem("hotelId",hotelId);
}
