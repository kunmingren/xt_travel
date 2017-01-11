/**
 * Created by cosmosev on 2016/12/26.
 */

$(function () {


    $("#navBtn li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#reload").load("tpl/"+$(this).attr("id")+".html");
    });
    //获取地址栏的信息
    var hash = location.hash;
    //switch判断状态
    switch(hash)
    {
        case "":
            $("#reload").load("tpl/home.html");
            break;
        case "#home":
            $("#reload").load("tpl/home.html");
            break;
        case "#tickets":
            $("#reload").load("tpl/tickets.html");
            break;
        case "#hotels":
            $("#reload").load("tpl/hotels.html");
            break;
        case "#specialty":
            $("#reload").load("tpl/specialty.html");
            break;
        case "#route":
            $("#reload").load("tpl/route.html");
            break;
    }
});