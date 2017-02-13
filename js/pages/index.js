/**
 * Created by cosmosev on 2016/12/26.
 */

$(function () {
    //登陆注册/我的订单切换
    var IfLogin=localStorage.getItem("phoneNum");
    if(IfLogin){
        $(".site-name").html("<div class=''><a href='?ctl=orderList'>我的订单</a>  <a href='javascript:;' onclick='logOut()'>退出</a></div>")
    }else {
        $(".site-name").html("<a href='login.html'>登录</a>  <a href='register.html'>注册</a>")
    }

    $("#navBtn li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#reload").load("tpl/"+$(this).attr("id")+".html");
    });
    //获取地址栏的信息
    var hash = GetRequest("ctl");
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
        case "orderList":
        case "newsList":
        case "hotel_details":
        case "perOrder":
        case "order_details":
            $(".nav li").removeClass("active");
            break;
    }
});

function logOut() {
    localStorage.removeItem("phoneNum");
    location.reload();
}