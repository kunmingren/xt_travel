/**
 * Created by cosmosev on 2017/2/11.
 */
var hotelId=localStorage.getItem("hotelId");
var phoneNum=localStorage.getItem("phoneNum");
$(document).ready(function () {
    $(".hotel").css("display","block");
    $("#hotelNav li").click(function () {
        var type=$(this).attr("id");
        $(this).addClass("active").siblings("li").removeClass("active");
        $("."+type).css("display","block").siblings(".box-body").css("display","none");
    });

    getHotelDetail({"spot_id":hotelId},initHotelDetail);

    //总评
    searchHotelTotalComment({"spot_id":hotelId},initHotelTotalComment);

    //评价
    searchHotelCommentsNum({"spot_id":hotelId},initHotelCommentsNum);


    $("#judgeSubmit").click(function () {
        var grade=$(".judgeStar input").eq(0).val();
        var environment_grade=$(".judgeStar input").eq(1).val();
        var service_grade=$(".judgeStar input").eq(2).val();
        var facility_grade=$(".judgeStar input").eq(3).val();
        var health_grade=$(".judgeStar input").eq(4).val();
        var JudgeTitle=$("#JudgeTitle").val();
        var JudgeMain=$("#JudgeMain").val();
        if(phoneNum==null){
            layer.msg("请先登陆再评价！",{
                time:1000
            })
        }else {
            if(grade=="" || environment_grade=="" || service_grade=="" || facility_grade=="" || health_grade==""){
                layer.msg("您还未做出全部星级评价！",{
                    time:1000
                })
            }else {
                var data={
                    "spot_id":hotelId,
                    "title":JudgeTitle,
                    "content":JudgeMain,
                    "user_id":phoneNum,
                    "grade":grade,
                    "environment_grade":environment_grade,
                    "service_grade":service_grade,
                    "facility_grade":facility_grade,
                    "health_grade":health_grade
                };
                addUserHotelComment(data)
            }
        }
    })
});


//获取景点详情
function getHotelDetail(data, fn) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/getSpotsInfos"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.spots,data.goods);
            }
        }
    });
}
function initHotelDetail(sInfo,sIntro) {
    var description=sInfo.description;
    if(description.length>=40){
        description=description.substr(0,40)+"...";
        $(".hotelDes").html(description);
    }
    $(".ticket_pic img").attr("src",sInfo.pic);
    $(".hotelName").html(sInfo.name_zh);
    $(".hotelAddress").html(sInfo.address);
    $(".hotelPhone").html(sInfo.phone);
}


//获取总评
function searchHotelTotalComment(data, fn) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "GET",
        url: geturl("backend/searchHotelTotalComment"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.grade);
            }
        }
    });
}
function initHotelTotalComment(Info) {
    $(".spotScore").html("");
    var grade=parseInt(Info);
    var stars="";
    for (var i=0;i<grade;i++){
        stars+="<img src='star-on.png'>"
    }
    for (var j=0;j<5-grade;j++){
        stars+="<img src='star-off.png'>"
    }
    $(".spotScore").html(stars+"<span>"+Info+"</span>");
}




//初始化分页
function searchHotelCommentsNum(data, fn) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "GET",
        url: geturl("backend/searchHotelComments"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                console.log(data);
                fn(data.count);
            }
        }
    });
}
function initHotelCommentsNum(data) {
    var total = data;
    var visiblePages = 5;
    var totalPages = Math.ceil(total / visiblePages);
    $.jqPaginator('#pagination1', {
        totalPages: totalPages,
        visiblePages: visiblePages,
        currentPage: 1,
        onPageChange: function(num, type) {
            var data= {
                "page_size": 5,
                "start_idx": num,
                "spot_id":hotelId
            };
            searchHotelComments(data,initHotelComments);
        }
    });
}
function searchHotelComments(data, fn) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/searchHotelComments"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn(data);
            }
        }
    });
}
function initHotelComments(data) {
    var grade=parseInt(data.secenic_grade);
    var stars="";
    for (var i=0;i<grade;i++){
        stars+="<img src='star-on.png'>"
    }
    for (var j=0;j<5-grade;j++){
        stars+="<img src='star-off.png'>"
    }
    $(".Scored p").html(data.secenic_grade);
    $(".Scored .spotScore").html(stars+"<span>"+data.count+"</span>");
    $(".spotPgsrow5 .percent").html(data.grade_5);
    $(".spotPgsrow4 .percent").html(data.grade_4);
    $(".spotPgsrow3 .percent").html(data.grade_3);
    $(".spotPgsrow2 .percent").html(data.grade_2);
    $(".spotPgsrow1 .percent").html(data.grade_1);
    $(".spotPgsrow5 .progress-bar").css("width",data.grade_5);
    $(".spotPgsrow4 .progress-bar").css("width",data.grade_4);
    $(".spotPgsrow3 .progress-bar").css("width",data.grade_3);
    $(".spotPgsrow2 .progress-bar").css("width",data.grade_2);
    $(".spotPgsrow1 .progress-bar").css("width",data.grade_1);
    $(".spotJudge p span").eq(0).html(data.total_environment_grade);
    $(".spotJudge p span").eq(1).html(data.total_service_grade);
    $(".spotJudge p span").eq(2).html(data.total_facility_grade);
    $(".spotJudge p span").eq(3).html(data.total_health_grade);

    var Info=data.Contents;
    $(".JudgeList").html("");
    for (var key in Info) {
        var info=Info[key];
        var grades=parseInt(info.grade);
        var star="";
        for (var i=0;i<grades;i++){
            star+="<img src='star-on.png'>"
        }
        for (var j=0;j<5-grades;j++){
            star+="<img src='star-off.png'>"
        }
        var title=info.title;
        if(title==""){
            title="未命名"
        }
        var content=info.content;
        if(content==""){
            content="该用户比较懒，没写评价~"
        }
        var time=info.time.split(" ")[0];
        var $div=$("<div class='visitorJudge clearfix'>" +
            "<div class='visitorInfo'><img src='img/pic3.jpg'><div>"+info.user_id+"</div></div>" +
            "<div class='VJudgeDetail'>" +
            "<div>"+title+"</div>" +
            "<div class='spotScore clearfix'>" + star +"<span>   "+time+"</span></div>" +
            "<div>"+content+"</div>" +
            "</div>" +
            "</div>");

        $(".JudgeList").append($div);
    }
}



//发送评价
function addUserHotelComment(data) {
    if(!data){
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/addUserHotelComment"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                layer.msg("评价成功！感谢您的评价！",{
                    time:1000
                },function () {
                    location.reload()
                })
            }
        }
    });
}