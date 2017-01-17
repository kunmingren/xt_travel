/**
 * Created by cosmosev on 2016/12/26.
 */

$(function () {
    $("#navBtn li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#reload").load("tpl/"+$(this).attr("id")+".html");
    });
    //获取地址栏的信息
    var hash = GetRequest();
    if(!hash){
        $("#home").addClass("active").siblings("li").removeClass("active");
        $("#reload").load("tpl/home.html");
    }else {
        $("#"+hash).addClass("active").siblings("li").removeClass("active");
        $("#reload").load("tpl/"+hash+".html");
    }
    //switch判断状态
    switch(hash)
    {
        case "spot_details":
            $("#spots").addClass("active").siblings("li").removeClass("active");
            break;
        case "orderList":
            $(".nav li").removeClass("active");
            break;
    }
});