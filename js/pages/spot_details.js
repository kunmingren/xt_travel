/**
 * Created by cosmosev on 2017/1/6.
 */
var spotId=localStorage.getItem("spotId");
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
    };
}