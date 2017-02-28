/**
 * Created by cosmosev on 2017/1/6.
 */
var spotId=localStorage.getItem("spotId");
var phoneNum=localStorage.getItem("phoneNum");
$(document).ready(function () {
    $(".spotDetails").css("display","block");
    $("#spotNav li").click(function () {
        var type=$(this).attr("id");
        $(this).addClass("active").siblings("li").removeClass("active");
        $("."+type).css("display","block").siblings(".box-body").css("display","none");
    });
    getSpotDetail({"spot_id":spotId},initSpotDetail);

    $(".voicePlay").click(function () {
        var myAudio=$("audio")[0];
        if(myAudio.paused){
            myAudio.play();
            $(this).removeClass("glyphicon glyphicon-play").addClass("glyphicon glyphicon-pause");
        }else{
            myAudio.pause();
            $(this).removeClass("glyphicon glyphicon-pause").addClass("glyphicon glyphicon-play");
        }
    });

    //总评
    searchSecenicTotalComment({"spot_id":spotId},initSecenicTotalComment);

    //
    searchSecenicCommentsPage({"spot_id":spotId},initSecenicCommentsPage);

    $("#judgeSubmit").click(function () {
        var judgeStar=$("#judgeStar input").val();
        var JudgeTitle=$("#JudgeTitle").val();
        var JudgeMain=$("#JudgeMain").val();
        if(phoneNum==null){
            layer.msg("请先登陆再评价！",{
                time:1000
            })
        }else {
            if(judgeStar==""){
                layer.msg("您还未做出星级评价！",{
                    time:1000
                })
            }else {
                var data={
                    "spot_id":spotId,
                    "title":JudgeTitle,
                    "content":JudgeMain,
                    "user_id":phoneNum,
                    "grade":judgeStar
                };
                addUserSecenicComment(data)
            }
        }
    })
});

//获取景点详情
function getSpotDetail(data, fn) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "GET",
        url: geturl("backend/spot_detail"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.spots,data.intro);
            }
        }
    });
}
function initSpotDetail(sInfo,sIntro) {
    var description=sInfo.description;
    if(description.length>=100){
        description.substr(0,99)+"..."
    }
    $(".spotImg img").attr("src",sInfo.pic);
    $(".spotName").html(sInfo.address);
    $(".spotDsp").html(sInfo.description);
    if(sIntro.audio.length>0){
        $("audio").attr("src",sIntro.audio[0].material);
    }else {
        $(".voice").css("visibility","hidden");
        $(".voicePlay").css("visibility","hidden")
    }

    $(".spotDetails").html("");
    var pic_text=sIntro.pic_text;
    for(var key in pic_text){
        var $p=$("<p>"+pic_text[key].description+"</p>");
        var $img=$("<img src='"+pic_text[key].material+"' class='img-responsive' style='width: 500px; height: 250px;' />");
        $(".spotDetails").append($p).append($img);
    }
}


//获取总评
function searchSecenicTotalComment(data, fn) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "GET",
        url: geturl("backend/searchSecenicTotalComment"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.grade);
            }
        }
    });
}
function initSecenicTotalComment(Info) {
    $("#spotScore").html("");
    var grade=parseInt(Info);
    var stars="";
    for (var i=0;i<grade;i++){
        stars+="<img src='star-on.png'>"
    }
    for (var j=0;j<5-grade;j++){
        stars+="<img src='star-off.png'>"
    }
    $("#spotScore").html(stars+"<span>"+Info+"</span>");
}


//初始化分页
function searchSecenicCommentsPage(data, fn) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "GET",
        url: geturl("backend/searchSecenicComments"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn(data.count);
            }
        }
    });
}
function initSecenicCommentsPage(data) {
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
                "spot_id":spotId
            };
            searchSecenicComments(data,initSecenicComments);
        }
    });
}
//
function searchSecenicComments(data, fn) {
    if(!data){
        return;
    }
    if(!fn){
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/searchSecenicComments"),
        dataType: "json",
        data:data,
        success: function (data) {
            if (data.rescode == 200) {
                fn(data);
            }
        }
    });
}
function initSecenicComments(data) {
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
function addUserSecenicComment(data) {
    if(!data){
        return;
    }
    $.ajax({
        type: "POST",
        url: geturl("backend/addUserSecenicComment"),
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